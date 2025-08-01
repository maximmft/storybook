import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { MinorationPriceCard } from "./MinorationPriceCard";

const mockOfferData = {
  name: "Nom de l'offre",
  status: "payment_pending" as const,
  details: {
    title: "Détails de l'offre",
    services: ["Soin perfect Dior", "Teint parfait", "Piscine"]
  },
  conditions: {
    days: ["Lundi", "Mardi", "Mercredi"]
  },
  dates: {
    start: "28/10/2024",
    end: "30/10/2024"
  },
  hours: {
    start: "09:00",
    end: "22:00"
  },
  image: {
    name: "image_prestation.jpeg",
    url: "/brochure_hotel.png",
    size: "500kb"
  },
  price: {
    originalPrice: "350 €",
    discountedPrice: "320 €"
  }
};

const meta: Meta<typeof MinorationPriceCard> = {
  title: "Molecules/Cards/MinorationPriceCard",
  component: MinorationPriceCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    offer: {
      description: "Offer data object containing all offer information",
    },
  },
  args: {
    offer: mockOfferData,
  },
};

export default meta;
type Story = StoryObj<typeof MinorationPriceCard>;

export const Default: Story = {
  render: (args) => {
    return (
      <div className="w-[400px]">
        <MinorationPriceCard {...args} />
      </div>
    );
  },
};