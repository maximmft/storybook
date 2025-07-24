import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import Separator from "./Separator.tsx";

const meta: Meta<typeof Separator> = {
  title: "Atoms/Separator/Separator",
  component: Separator,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => {

    return (
      <div className="w-[600px]">
        <Separator/>
      </div>
    )

  }
};