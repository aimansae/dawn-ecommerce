import React from "react";

type FormInputProps = {
  type: string;
  id: string;
  name: string;
  placeholder?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  checked?: boolean;
  minLength?: number;
};

const FormInput = ({
  type,
  id,
  name,
  placeholder,
  value,
  onChange,
  label,
  checked,
  minLength,
}: FormInputProps) => {
  return (
    <>
      {type === "checkbox" ? (
        <label className="flex items-center gap-1 whitespace-nowrap text-sm">
          <input
            type="checkbox"
            id={id}
            name={name}
            checked={checked}
            onChange={onChange}
            className="h-4 w-4 accent-[#334FB4]"
          />
          {label}
        </label>
      ) : (
        <>
          <label htmlFor={id} className="sr-only">
            {label}
          </label>
          <input
            required
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            minLength={minLength}
            className="w-full rounded-lg border border-gray-300 p-3 focus:border-[#334FB4] focus:outline-none focus:ring-1 focus:ring-[#334FB4]"
          />
        </>
      )}
    </>
  );
};

export default FormInput;
