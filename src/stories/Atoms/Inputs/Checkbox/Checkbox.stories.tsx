import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Checkbox } from "./Checkbox.tsx";

const meta: Meta<typeof Checkbox> = {
  title: "Atoms/Inputs/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    checked: {
      control: { type: "boolean" },
      description: "Whether the checkbox is checked"
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the checkbox is disabled"
    },
    onCheckChange: {
      action: "checked changed",
      description: "Callback function when checkbox state changes"
    }
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
  },
};
