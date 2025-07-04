import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { fn } from "storybook/test";
import { SelectButton } from "./SelectButton.tsx";

const meta: Meta<typeof SelectButton> = {
  title: "Buttons/SelectButton",
  component: SelectButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      table: { disable: true },
    },
  },
  args: { onClick: fn() },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "Button",
    options: [
      { name: "option1", value: "option1" },
      { name: "option2", value: "option2" },
      { name: "option3", value: "option3" },
      { name: "option4", value: "option4" },
    ],
  },
};

export const SingleSelection: Story = {
  args: {
    label: "Button",
    multiple: false,
    options: [
      { name: "option1", value: "option1" },
      { name: "option2", value: "option2" },
    ],
  },
};

export const MultipleSelection: Story = {
  args: {
    label: "Button",
    multiple: true,
    options: [
      { name: "option1", value: "option1" },
      { name: "option2", value: "option2" },
      { name: "option3", value: "option3" },
      { name: "option4", value: "option4" },
    ],

    disabled: false
  },
};


export const Disabled: Story = {
  args: {
    label: "Button",
    disabled: true,
    options: [
      { name: "option1", value: "option1" },
      { name: "option2", value: "option2" },
      { name: "option3", value: "option3" },
      { name: "option4", value: "option4" },
    ],
  },
};
