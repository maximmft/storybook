import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { fn } from "storybook/test";
import CustomTabs from "./CustomTabs.tsx";

const tabs = [
  { label: "Tab 1", content: "Content 1" },
  { label: "Tab 2", content: "Content 2" },
  { label: "Tab 3", content: "Content 3", disabled: true },
  { label: "Tab 4", content: "Content 4" },

];

const meta: Meta<typeof CustomTabs> = {
  title: "CustomTabs",
  component: CustomTabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { 
    onChange: fn(),
    tabs: tabs
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    tabs: tabs,
    defaultValue: 0,
    variant: "standard"

  },
};

export const Secondary: Story = {
  args: {
    tabs: tabs,
    defaultValue: 0,
    variant: "solid"
  },
};
