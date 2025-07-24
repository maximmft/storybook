import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { fn } from "storybook/test";
import { AddingButton } from "./AddingButton.tsx";

const meta: Meta<typeof AddingButton> = {
  title: "Atoms/Buttons/AddingButton",
  component: AddingButton,
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
  },
};

