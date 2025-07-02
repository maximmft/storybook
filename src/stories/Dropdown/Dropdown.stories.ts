import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Dropdown } from "../Dropdown/Dropdown.tsx";

const meta: Meta<typeof Dropdown> = {
  title: "Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      table: { disable: true },
    },
   
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
   
  },
};

