import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { BrandCatalogCard } from "./BrandCatalogCard";

const meta: Meta<typeof BrandCatalogCard> = {
  title: "Molecules/Cards/BrandCatalogCard",
  component: BrandCatalogCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: ["published", "draft", "error"],
    },

    brandName: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof BrandCatalogCard>;

export const Default: Story = {
  args: {
    brandName: "Shiseido",
    imageUrl: "/brochure_hotel.png",
    status: "published",
  },
  render: (args) => (
    <div className="p-4 w-[450px]">
      <BrandCatalogCard {...args} />
    </div>
  ),
};
