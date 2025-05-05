import { useCollectionFilters } from "@/app/hooks/useCollectionFilters";
import "@testing-library/jest-dom";
import { renderHook, act } from "@testing-library/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// mock navigation functions
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}));

describe("useCollectionFilters", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
    (usePathname as jest.Mock).mockReturnValue("/collections/all");
    mockPush.mockClear();
  });

  it("set the search query and updates the URL", () => {
    const { result } = renderHook(() => useCollectionFilters());
    act(() => {
      result.current.handleGeneralSearch("bags");
    });
    expect(result.current.searchQuery).toBe("bags");
    expect(mockPush).toHaveBeenCalledWith("/search?query=bags");
  });

  it("selects a color and updates the URL", () => {
    const { result } = renderHook(() => useCollectionFilters());

    act(() => {
      result.current.handleColorSelection("red");
    });

    expect(result.current.filters.colors).toContain("red");
    expect(mockPush).toHaveBeenCalledWith("/collections/all?colors=red");
  });

  it("selects availability filter inStock", () => {
    const { result } = renderHook(() => useCollectionFilters());

    const mockEvent = {
      target: {
        name: "inStock",
        checked: true,
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleAvailabilityFilterChange(mockEvent);
    });

    expect(result.current.filters.availability.inStock).toBe(true);
    expect(mockPush).toHaveBeenCalledWith("/collections/all?inStock=true");
  });

  it("selects availability filter outOfStock", () => {
    const { result } = renderHook(() => useCollectionFilters());
    const mockEvent = {
      target: {
        name: "outOfStock",
        checked: true,
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleAvailabilityFilterChange(mockEvent);
    });

    expect(result.current.filters.availability.outOfStock).toBe(true);
    expect(mockPush).toHaveBeenCalledWith("/collections/all?outOfStock=true");
  });

  it("applies sortBy filter", () => {
    const { result } = renderHook(() => useCollectionFilters());
    const mockEvent = {
      target: {
        value: "date",
      },
    } as unknown as React.ChangeEvent<HTMLSelectElement>;
    act(() => {
      result.current.handleSortByChange(mockEvent);
    });
    expect(result.current.sortBy).toBe("date");
    expect(mockPush).toHaveBeenCalledWith("/collections/all?sort_by=date");
  });

  it("clears the filters", () => {
    const { result } = renderHook(() => useCollectionFilters());

    act(() => {
      result.current.handleClearFilters();
    });

    expect(result.current.filters.colors).toEqual([]);
    expect(result.current.filters.availability.inStock).toBe(false);
    expect(result.current.filters.availability.outOfStock).toBe(false);
    expect(result.current.searchQuery).toBe("");
    expect(result.current.sortBy).toBe("");
    expect(mockPush).toHaveBeenCalledWith("/collections/all");
  });
});
