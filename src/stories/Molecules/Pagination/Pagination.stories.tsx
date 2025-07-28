import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Pagination } from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Molecules/Filters/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    pages: {
      control: { type: "object" },
      description: "Liste des numéros de pages à afficher",
    },
  },
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

export const ManyPages: Story = {
  args: {
    pages: Array.from({ length: 20 }, (_, i) => i + 1),
  },
};
