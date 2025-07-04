import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { fn } from "storybook/test";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./Button.tsx";

const meta: Meta<typeof Button> = {
  title: "Buttons/CustomButton",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "tertiary"],
    },
    size: {
      table: { disable: true }, 
    },
    icon: {
      control: { type: "select" },
      options: ["none", "arrow-left", "arrow-right"],
      mapping: {
        none: undefined,
        "arrow-left": ArrowLeft,
        "arrow-right": ArrowRight,
      },
    },
    iconPosition: {
      control: { type: "select" },
      options: ["right", "left"],
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
    label: "Button",
  },
};

export const PrimaryWithIcon: Story = {
  args: {
    variant: "primary",
    label: "Button",
    icon: ArrowRight,
    iconPosition: "right"
  },
};


export const PrimaryAlert: Story = {
  args: {
    variant: "primary",
    label: "Button",
    error: true,
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    label: "Button",
  },
};

export const SecondaryWithIcon: Story = {
  args: {
    variant: "secondary",
    label: "Button",
    icon: ArrowRight,
    iconPosition: "right"
  },
};


export const SecondaryAlert: Story = {
  args: {
    variant: "secondary",
    label: "Button",
    error: true,
  },
};

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
    label: "Button",
  },
};

export const TertiaryAlert: Story = {
  args: {
    variant: "tertiary",
    label: "Ajout",
    error: true,
  },
};

export const TertiaryWithErrorWithIcon: Story = {
  args: {
    variant: "tertiary",
    label: "Ajout",
    error: true,
    icon: ArrowLeft,
    iconPosition: "left"
  },
};
