import type { Meta, StoryObj } from "@storybook/react-webpack5";
import PricingTags from "./PricingTags.tsx";

const meta: Meta<typeof PricingTags> = {
  title: "Statut/PricingTags",
  component: PricingTags,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    label: { type: "string" },
    currentPrice: { type: "number" },
    initialPrice: { type: "number" },
    isIncreased: { type: "boolean" },
    isDecreased: { type: "boolean" },
    color: {
      control: { type: "select" },
      options: ["primary", "secondary", "tertiary", "quaternary", "quinary"],
    },
    variant: {
      control: { type: "select" },
      options: [ "full", "short"],
    },

   
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const MajorationFull: Story = {
  args: {
    label: "Majoration soirée",
    currentPrice: 100,
    initialPrice: 80,
    isIncreased: true,
    color: "primary",
    variant: "full"
  },
};

export const MinorationFull: Story = {
  args: {
    label: "Offre spéciale",
    currentPrice: 100,
    initialPrice: 130,
    isDecreased: true,
    color: "tertiary",
    variant: "full"
  },
};

export const MinorationShort: Story = {
  args: {
    label: "Offre spéciale",
    currentPrice: 100,
    initialPrice: 130,
    isDecreased: true,
    color: "quaternary",
    variant: "percentage"
  },
};


