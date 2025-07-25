import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Pagination } from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Molecules/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    pages: [1, 2, 3, 4, 5, 6],
  },
};

export const FewPages: Story = {
  args: {
    pages: [1, 2, 3],
  },
};
