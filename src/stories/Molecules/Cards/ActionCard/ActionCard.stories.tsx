import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { ActionCard } from "./ActionCard";

const meta: Meta<typeof ActionCard> = {
  title: "Molecules/Cards/ActionCard",
  component: ActionCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: { type: "text" },
      description: "Titre principal de la carte",
    },
    description: {
      control: { type: "text" },
      description: "Description sous le titre",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ActionCard>;

export const Default: Story = {
  args: {
    title: "Ajouter vos prestations",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
  },
};
