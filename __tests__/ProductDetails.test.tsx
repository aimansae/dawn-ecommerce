import React from "react";
import { render, screen } from "@testing-library/react";
import ProductDetails from "@/components/ProductDetails";
import { ProductType } from "@/app/types/types";
import "@testing-library/jest-dom";
import { CartProvider } from "@/app/context/CartContext";
import { CountryProvider } from "@/app/context/CountryContext";
import userEvent from "@testing-library/user-event";
const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({ push: mockPush })),
  usePathname: jest.fn(() => "/product/sera-tote"),
  useSearchParams: jest.fn(() => new URLSearchParams({ quantity: "1 " })),
}));

const mockProduct: ProductType = {
  id: "1",
  name: "Sera Tote",
  category: ["bags"],
  prices: {
    currency: "USD",
    regular: "100",
    sale: "80",
  },
  availableColors: [
    {
      color: "red",
      colorCategory: "red",
      tag: "available",
      imageUrl: ["/img/red-front.jpg"],
    },
    {
      color: "green",
      colorCategory: "green",
      tag: "available",
      imageUrl: ["/img/green-front.jpg"],
    },
  ],
  status: "inStock",
  availability: "available",
  createdAt: "May 2 2025",
  description: "A stylish tote bag",
};
jest.mock("@/utils/functions", () => ({
  convertPriceToCurrency: (price: number) => price.toFixed(2),
}));

jest.mock("@/context/CountryContext", () => {
  const original = jest.requireActual("@/context/CountryContext");
  return {
    ...original,
    useCountry: () => ({
      selectedLocation: { currency: "USD", currencySymbol: "$" },
      exchangeRate: 1,
    }),
  };
});

jest.mock("next/image", () => {
  const NextImage = (props: Record<string, unknown>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { fill, ...rest } = props;
    return <img {...rest} />;
  };
  NextImage.displayName = "NextImage";
  return NextImage;
});

describe("ProductDetails", () => {
  it("renders product info correctly", async () => {
    window.scrollTo = jest.fn();
    render(
      <CountryProvider>
        <CartProvider>
          <ProductDetails product={mockProduct} />
        </CartProvider>
      </CountryProvider>
    );
    //check for product name
    expect(screen.getByText("Sera Tote")).toBeInTheDocument();
    //check for product price
    expect(screen.getByText("$ 80.00 USD")).toBeInTheDocument();
    //check for product colors
    const expectedColors = ["red", "green"];
    for (const color of expectedColors) {
      const button = screen.getByRole("button", { name: color });
      expect(button).toBeInTheDocument();
      await userEvent.click(button);
      expect(mockPush).toHaveBeenCalledWith(
        `/product/sera-tote?quantity=1&color=${color}`,
        {
          scroll: false,
        }
      );
      const img = screen.getByRole("img", { name: /sera tote/i });
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", `/img/${color}-front.jpg`);
      mockPush.mockClear();
    }
    expect(screen.getByText(/a stylish tote bag/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add to cart/i, hidden: true })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /buy now/i, hidden: true })
    ).toBeInTheDocument();
  });
  it("navigates to cart on 'buy now' click", async () => {
    render(
      <CountryProvider>
        <CartProvider>
          <ProductDetails product={mockProduct} />
        </CartProvider>
      </CountryProvider>
    );
    const buyNowButton = screen.getByText(/buy now/i);
    await userEvent.click(buyNowButton);
    expect(mockPush).toHaveBeenCalledWith("/checkout");
  });
});
