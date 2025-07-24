import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { fn } from "storybook/test";
import { ArrowLeft } from "lucide-react";
import { IconButton } from "./IconButton.tsx";

const meta: Meta<typeof IconButton> = {
  title: "Atoms/Buttons/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "tertiary", "quaternary", "error"],
    },
    size: {
      table: { disable: true }, 
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
  args: { onClick: fn() },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    icon: ArrowLeft
  },
};


export const Error: Story = {
  args: {
    variant: "error",
    icon: ArrowLeft

  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    icon: ArrowLeft

  },
};

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
    icon: ArrowLeft

  },
};

export const Quaternary: Story = {
  args: {
    variant: "quaternary",
    icon: ArrowLeft,
    disabled: true
  },
};
