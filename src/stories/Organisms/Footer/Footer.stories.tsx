import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Footer } from "./Footer.tsx.tsx";

const meta: Meta<typeof Footer> = {
  title: "Organisms/Footer",
  component: Footer,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Composant de sélection de cartes avec services et options de filtrage (contrôlé).",
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
    editableChildren: {
      control: "boolean",
      description: "Les enfants sont-ils éditables",
    },
    disabled: {
      control: "boolean",
      description: "Le composant est-il désactivé",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  render: () => {
    return (
      <div className="w-[1440px]">
        <Footer />
      </div>
    );
  },
};
