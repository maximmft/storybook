import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { PromotionCard } from "./PromotionCard";

const meta: Meta<typeof PromotionCard> = {
  title: "Molecules/Cards/PromotionCard",
  component: PromotionCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: ["published", "draft", "error"]
    },
    hasError: {
      control: "boolean"
    },
    title: {
      control: "text"
    },
    duration: {
      control: "text"
    },
  },
};

export default meta;
type Story = StoryObj<typeof PromotionCard>;

export const Default: Story = {
  args: {
    title: "Bain Thérapie",
    imageUrl: "/brochure_hotel.png",
    duration: "01/12/2024 - 31/12/2024",
    status: "published",
    hasError: false,
    onEdit: () => console.log("Edit clicked")
  },
  render: (args) => (
    <div className="p-4">
      <PromotionCard {...args} />
    </div>
  ),
};

export const WithError: Story = {
  args: {
    title: "Forfait Bien-être",
    imageUrl: "/brochure_hotel.png",
    duration: "05/04/2025 - 15/04/2025",
    status: "published",
    hasError: true,
    onEdit: () => console.log("Edit clicked")
  },
  render: (args) => (
    <div className="p-4">
      <PromotionCard {...args} />
    </div>
  ),
};