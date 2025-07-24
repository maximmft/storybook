import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Command } from 'lucide-react';
import { DropdownItem } from "./DropdownItem.tsx";

const meta: Meta<typeof DropdownItem> = {
  title: "Atoms/Buttons/DropdownItem",
  component: DropdownItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      table: { disable: true },
    },
    onCheckChange: { action: 'checkbox-changed' },
    icon: {
      control: { type: "select" },
      options: ["none", "icon"],
      mapping: {
        none: undefined,
        "icon": Command,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    icon: Command,
    label: "Dropdown",
  },
};

export const WithCheckbox: Story = {
  args: {
    label: "Option avec checkbox",
    variant: "checkbox",
    checked: false,
  },
};

export const CheckboxChecked: Story = {
  args: {
    label: "Option cochée",
    variant: "checkbox", 
    checked: true,
  },
};