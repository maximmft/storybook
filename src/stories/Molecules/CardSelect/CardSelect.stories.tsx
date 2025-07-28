import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { CardSelect } from "./CardSelect";

const mockServices = [
  {
    service: {
      format: "Solo",
      price: "150",
      duration: "60",
      name: "Massage relaxant complet",
    },
  },
  {
    service: {
      format: "Duo",
      price: "120",
      duration: "60",
      name: "Massage détente à deux",
    },
  },
  {
    service: {
      format: "Solo",
      price: "200",
      duration: "90",
      name: "Massage thérapeutique premium",
    },
  },
];

const meta: Meta<typeof CardSelect> = {
  title: "Molecules/Filters/CardSelect",
  component: CardSelect,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Composant de sélection de cartes avec services et options de filtrage.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: {
        type: "text",
      },
      description: "Titre affiché en en-tête de la sélection",
    },
    services: {
      control: false,
      description: "Liste des services à afficher",
    },
  },
};

export default meta;
type Story = StoryObj<typeof CardSelect>;

export const Default: Story = {
  args: {
    title: "Choisissez votre service",
    services: mockServices,
  },
};

export const NonEditable: Story = {
  args: {
    title: "Choisissez votre service",
    services: mockServices,
    editableChildren: false,
  },
};


export const LongTitle: Story = {
  args: {
    title: "Découvrez notre gamme complète de services de massage et de bien-être pour votre détente",
    services: mockServices,
  },
};
