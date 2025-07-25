import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { useState } from "react";
import RadioButton from "./RadioButton";

const teamOptions = [
  { id: "1", label: "Alice" },
  { id: "2", label: "Ismail" },
  { id: "3", label: "Abou" },
  { id: "4", label: "Coline" },
];

const meta: Meta<typeof RadioButton> = {
  title: "Atoms/Inputs/RadioButton",
  component: RadioButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedValue(event.target.value);
    };

    return (
      <>
        {teamOptions.map(({ id, label }) => (
          <RadioButton
            key={id}
            id={id}
            label={label}
            value={id}
            checked={selectedValue === id}
            onChange={handleChange}
          />
        ))}
      </>
    );
  },
};
