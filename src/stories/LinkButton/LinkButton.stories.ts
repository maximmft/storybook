import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { LinkButton } from "./LinkButton.tsx";

const meta: Meta<typeof LinkButton> = {
  title: "LinkButton",
  component: LinkButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      table: { disable: true }, 
    },
    disabled: {
      control: { type: "boolean" },
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
  },
  args: { href: "#" },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    icon: ArrowRight,
    label: "Link",
  },
};