import { test, describe, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Checkbox } from "./Checkbox";

const TestComponent = () => {
  const { register, handleSubmit, watch } = useForm();
  const [formData, setFormData] = useState(null);

  const onSubmit = (data: any) => {
    setFormData(data);
  };

  const watchedValues = watch();


  return (
    <>
      <Checkbox
        checked={watchedValues.check1}
        register={register("check1")}
        label="Check1"
      />
      <Checkbox
        checked={watchedValues.check2}
        register={register("check2")}
        label="Check2"
      />
      <Checkbox
        checked={watchedValues.check3}
        register={register("check3")}
        label="Check3"
      />
      <button onClick={handleSubmit(onSubmit)}>Submit</button>
      {formData && (
        <div data-testid="form-result">{JSON.stringify(formData)}</div>
      )}
    </>
  );
};

describe("Checkbox Component", () => {
  test("should check checkbox when clicked", () => {
    render(<TestComponent />);
    const checkboxes = screen.getAllByRole("checkbox");
    const firstCheckbox = checkboxes[0];
    expect(firstCheckbox).not.toBeChecked();
    fireEvent.click(firstCheckbox);
    expect(firstCheckbox).toBeChecked();
  });

  test("should uncheck checkbox when clicked twice", () => {
    render(<TestComponent />);
    const checkboxes = screen.getAllByRole("checkbox");
    const firstCheckbox = checkboxes[0];
    fireEvent.click(firstCheckbox);
    expect(firstCheckbox).toBeChecked();
    fireEvent.click(firstCheckbox);
    expect(firstCheckbox).not.toBeChecked();
  });

  test("should submit form with selected checkbox", async () => {
    render(<TestComponent />);
    const checkboxes = screen.getAllByRole("checkbox");
    const firstCheckbox = checkboxes[0];
    const thirdCheckbox = checkboxes[2];
    fireEvent.click(firstCheckbox);
    fireEvent.click(thirdCheckbox);
    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);
    expect(firstCheckbox).toBeChecked();
    expect(thirdCheckbox).toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();

    const formResult = await screen.findByTestId("form-result");
    expect(formResult).toHaveTextContent('"check1":true');
    expect(formResult).toHaveTextContent('"check3":true');
    expect(formResult).toHaveTextContent('"check2":false');
  });
});
