import type { Meta, StoryObj } from "@storybook/react-webpack5";
import PriceDisplay from "./PriceDisplay.tsx";

const meta: Meta<typeof PriceDisplay> = {
  title: "Components/PriceDisplay",
  component: PriceDisplay,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    currentPrice: {
      control: { type: "number" },
      description: "The current price to display"
    },
    initialPrice: {
      control: { type: "number" },
      description: "The initial price for comparison"
    },
    size: {
      control: { type: "select" },
      options: ["xs", "s", "m", "lg"],
      description: "Size variant of the price display"
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;


export const SmallSize: Story = {
  args: {
    currentPrice: 250,
    initialPrice: 200,
    size: "s"
  }
};

export const PriceIncreaseLargeSize: Story = {
  args: {
    currentPrice: 150,
    initialPrice: 100,
    size: "lg"
  }
};

export const PriceDecreaseMediumSize: Story = {
  args: {
    currentPrice: 200,
    initialPrice: 120,
    size: "m",
    variant: "comparing"

  }
};

export const ExtraSmall: Story = {
  args: {
    currentPrice: 45,
    initialPrice: 50,
    size: "xs",
    variant: "comparing"
  }
};