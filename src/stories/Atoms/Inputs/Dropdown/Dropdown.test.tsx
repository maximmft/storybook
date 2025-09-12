import { test, describe, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Dropdown } from "./Dropdown";
import { useForm } from "react-hook-form";
import { useState } from "react";

const TestComponent = () => {
  const { register, watch, handleSubmit } = useForm();
  const [formData, setFormData] = useState(null);

  const onSubmit = (data: any) => {
    setFormData(data);
  };

  return (
    <>
      <Dropdown
        label="Test Dropdown"
        options={[
          { id: "1", label: "Option 1" },
          { id: "2", label: "Option 2" },
        ]}
        register={register("dropdown")}
        watch={watch}
        fieldName="dropdown"
        multiSelect={false}
      />
      <button onClick={handleSubmit(onSubmit)}>Submit</button>
      {formData && (
        <div data-testid="form-result">{JSON.stringify(formData)}</div>
      )}
    </>
  );
};

describe("Dropdown Component", () => {
  test("should select option in single mode and close dropdown", () => {
    render(<TestComponent />);
    const button = screen.getByText("Sélectionner une option");
    fireEvent.click(button);
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    const option = screen.getByText("Option 1");
    fireEvent.click(option);
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.queryByText("Option 2")).not.toBeInTheDocument();
  });
});

test("should submit form with selected value", () => {
  render(<TestComponent />);
  const button = screen.getByText("Sélectionner une option");
  fireEvent.click(button);
  const option = screen.getByText("Option 1");
  fireEvent.click(option);
  const submitButton = screen.getByText("Submit");
  fireEvent.click(submitButton);
  expect(screen.getByDisplayValue("1")).toBeInTheDocument();
});
