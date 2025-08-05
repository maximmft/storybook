import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { SubscriptionCard } from "./SubscriptionCard";

const mockSubscriptionData = {
  name: "Abonnement Premium",
  details: [
    { text: "Lorem Ipsum" },
    { text: "Lorem Ipsum" },
    { text: "Lorem Ipsum" },
  ],
  validityDate: "depuis novembre 2023",
  paymentMethod: "VISA **** **** **** 0102",

};

const meta: Meta<typeof SubscriptionCard> = {
  title: "Molecules/Cards/SubscriptionCard",
  component: SubscriptionCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    
    name: {
      control: { type: "text" },
      description: "Nom de l'abonnement"
    },
    details: {
      control: { type: "object" },
      description: "Liste des détails de l'offre"
    },
    validityDate: {
      control: { type: "text" },
      description: "Date de validité de l'abonnement"
    },
    paymentMethod: {
      control: { type: "text" },
      description: "Méthode de paiement"
    }
  },
};

export default meta;
type Story = StoryObj<typeof SubscriptionCard>;

export const Default: Story = {
  args: {
    ...mockSubscriptionData,
  }
};