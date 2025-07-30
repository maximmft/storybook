import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { CardSelectChildren } from "./CardSelectChildren";
import { UseFormRegisterReturn } from "react-hook-form";

const mockRegister: UseFormRegisterReturn = {
  onChange: async () => {},
  onBlur: async () => {},
  name: "serviceToggle",
  ref: () => {},
};

const defaultService = {
  format: "Solo",
  price: "150",
  duration: "60",
  name: "Massage super cool",
};

const meta: Meta<typeof CardSelectChildren> = {
  title: "Molecules/Filters/CardSelectChildren",
  component: CardSelectChildren,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    toggleValue: {
      control: { type: "boolean" },
      description: "Whether the toggle switch is active/checked",
    },
    service: {
      control: { type: "object" },
      description:
        "Service object containing format, price, duration, and name",
    },
    register: {
      table: { disable: true },
      description: "React Hook Form register function",
    },
  },
  tags: ["autodocs"],
  args: {
    register: mockRegister,
    service: defaultService,
    toggleValue: false,
  },
};

export default meta;
type Story = StoryObj<typeof CardSelectChildren>;

export const Default: Story = {
  render: (args) => (
    <div className="w-[497px]">
      <CardSelectChildren {...args} />
    </div>
  ),
};

export const ToggleActive: Story = {
  args: {
    toggleValue: true,
  },
  render: (args) => (
    <div className="w-[497px]">
      <CardSelectChildren {...args} />
    </div>
  ),
};

export const Error: Story = {
  args: {
    toggleValue: true,
    error: true,
  },
  render: (args) => (
    <div className="w-[497px]">
      <CardSelectChildren {...args} />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    toggleValue: false,
    disabled: true,
  },
  render: (args) => (
    <div className="w-[497px]">
      <CardSelectChildren {...args} />
    </div>
  ),
};

export const LongServiceName: Story = {
  args: {
    service: {
      format: "Solo",
      price: "180",
      duration: "75",
      name: "Massage super long super bien avec un super long nom",
    },
    toggleValue: false,
  },
  render: (args) => <CardSelectChildren {...args} />,
};

