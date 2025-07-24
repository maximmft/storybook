import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { UseFormRegisterReturn } from "react-hook-form";
import ToggleSwitch from "./ToggleSwitch";

const mockRegister: UseFormRegisterReturn = {
  name: "toggleSwitch",
  onChange: async () => true,
  onBlur: async () => true,
  ref: () => {},
};

const meta: Meta<typeof ToggleSwitch> = {
  title: "Inputs/ToggleSwitch",
  component: ToggleSwitch,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    label: {
      control: { type: "text" },
      description: "The label text displayed next to the switch"
    },
    value: {
      control: { type: "boolean" },
      description: "Whether the switch is checked/on"
    },
    register: {
      table: { disable: true },
      description: "React Hook Form register function"
    },
    disabled: {
      control: {type: "boolean"}
    }
  },
  args: {
    register: mockRegister,
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: false,
  },
};

export const Checked: Story = {
  args: {
    value: true,
  },
};

export const Disabled: Story = {
  args: {
    value: false,
    disabled: true
  },
};

export const WithLabel: Story = {
  args: {
    label: "Enable notifications",
    value: false,
  },
};
