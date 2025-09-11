import { test, describe, vi, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import RadioButton from "./RadioButton";

const TestComponent = () => {
  const { register, watch, handleSubmit } = useForm();
  const [formData, setFormData] = useState(null);

  const onSubmit = (data: any) => {
    setFormData(data);
  };

  const optionsRadio = [
    {
      id: "1",
      label: "Radio1",
      value: "value1",
    },
    {
      id: "2",
      label: "Radio2",
      value: "value2",
    },
    {
      id: "3",
      label: "Radio3",
      value: "value3",
    },
  ];

  return (
    <>
      {optionsRadio.map((option) => (
        <RadioButton
          value={option.value}
          key={option.id}
          register={register("radioGroup")}
          id={option.id}
          label={option.label}
        />
      ))}
      <button onClick={handleSubmit(onSubmit)}>Submit</button>
      {formData && (
        <div data-testid="form-result">{JSON.stringify(formData)}</div>
      )}
    </>
  );
};

describe("RadioButton Component", () => {
  test("should allow only one radio button selection in a group", () => {});
  render(<TestComponent />);
  const radio1 = screen.getByLabelText("Radio1");
  const radio2 = screen.getByLabelText("Radio2");
  fireEvent.click(radio1);
  expect(radio1).toBeChecked();
  expect(radio2).not.toBeChecked();
  fireEvent.click(radio2);
  expect(radio2).toBeChecked();
  expect(radio1).not.toBeChecked();
});

test("should render as checked when checked prop is true", () => {
  render(<RadioButton checked={true} label="Test" id="test" value="test" />);
  expect(screen.getByRole("radio")).toBeChecked();
});
