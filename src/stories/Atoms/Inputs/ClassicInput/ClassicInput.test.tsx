import { test, expect, describe, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ClassicInput } from "./ClassicInput";

describe("ClassicInput Component", () => {
  test("renders with required props", () => {
    render(<ClassicInput label="Test Label" />);

    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("shows required asterisk when required is true", () => {
    render(<ClassicInput label="Required Field" required />);

    expect(screen.getByText("Required Field")).toBeInTheDocument();
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  test("renders with placeholder", () => {
    render(<ClassicInput label="Test" placeholder="Enter text here" />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("placeholder", "Enter text here");
  });

  test("renders in disabled state", () => {
    render(<ClassicInput label="Disabled Field" disabled />);

    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();

    const label = screen.getByText("Disabled Field");
    expect(label).toHaveStyle({ color: "#D4D0CB" });
  });

  test("handles different input types", () => {
    render(<ClassicInput label="Email" type="email" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("type", "email");
  });

  test("handles user input", () => {
    render(<ClassicInput label="Text Input" />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Hello World" } });

    expect(input).toHaveValue("Hello World");
  });

  test("works with react-hook-form register", () => {
    const mockRegister = {
      name: "testField",
      onChange: vi.fn(),
      onBlur: vi.fn(),
      ref: vi.fn(),
    };

    render(<ClassicInput label="Form Field" register={mockRegister} />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("name", "testField");

    fireEvent.change(input, { target: { value: "test" } });
    expect(mockRegister.onChange).toHaveBeenCalled();

    fireEvent.blur(input);
    expect(mockRegister.onBlur).toHaveBeenCalled();
  });

  test("displays field value from watch function", () => {
    const mockWatch = vi.fn().mockReturnValue("Watched Value");

    render(
      <ClassicInput
        label="Watched Field"
        fieldName="testField"
        watch={mockWatch}
      />
    );

    expect(mockWatch).toHaveBeenCalledWith("testField");
  });

  test("handles null/undefined values from watch safely", () => {
    const mockWatch = vi.fn().mockReturnValue(null);

    render(
      <ClassicInput
        label="Null Value Field"
        fieldName="testField"
        watch={mockWatch}
      />
    );

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("handles numeric values from watch", () => {
    const mockWatch = vi.fn().mockReturnValue(123);

    render(
      <ClassicInput
        label="Numeric Field"
        fieldName="numberField"
        watch={mockWatch}
      />
    );

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("forwards ref correctly", () => {
    const ref = vi.fn();

    render(<ClassicInput ref={ref} label="Ref Test" />);

    expect(ref).toHaveBeenCalled();
  });

});
