"use client";
import React, { FormEvent, useState } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFormInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    console.log(formData);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setStatus("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus(
          "Thanks for contacting us. We'll get back to you as soon as possible."
        );
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setError(data.message || "Failed to send message");
      }
    } catch (err) {
      console.log(err);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-9 lg:px-10">
      <h1 className="my-6 mb-4 text-3xl capitalize">Contact us</h1>{" "}
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      {status && (
        <div className="my-6 flex items-start gap-1">
          <span>
            <FaRegCircleCheck className="text-green-600" />
          </span>
          <span className="text-sm">{status}</span>
        </div>
      )}
      <form className="flex flex-col items-start gap-4" onSubmit={handleSubmit}>
        <FormInput
          id="name"
          name="name"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={handleFormInput}
        />
        <FormInput
          id="email"
          name="email"
          type="email"
          placeholder="Email*"
          required
          value={formData.email}
          onChange={handleFormInput}
        />
        <FormInput
          id="phone"
          name="phone"
          type="tel"
          placeholder="Phone number"
          value={formData.phone}
          onChange={handleFormInput}
        />
        <div className="w-full">
          <label className="sr-only" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Your message"
            className="w-full resize-none border p-2"
            value={formData.message}
            onChange={handleFormInput}
            required
            rows={4}
          />
        </div>
        <button type="submit" className="bg-black px-8 py-2 text-white">
          {isLoading ? "Sending..." : "Send"}
        </button>
      </form>
    </section>
  );
};

export default ContactForm;

type InputProps = {
  id: string;
  name: string;
  value: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type: "text" | "email" | "tel";
};

export const FormInput = ({
  id,
  name,
  placeholder,
  value,
  onChange,
  type,
  required,
}: InputProps) => {
  return (
    <>
      <label className="sr-only" htmlFor={id}>
        {name}
      </label>
      <input
        className="w-full border p-2"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        required={required}
      />
    </>
  );
};
