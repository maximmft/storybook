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
    pages: 12,
  },
};
