import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { HeaderSpa } from "./HeaderSpa.tsx";

const meta: Meta<typeof HeaderSpa> = {
  title: "Organisms/HeaderSpa",
  component: HeaderSpa,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Composant Header pour les pages SPA avec statut de publication, navigation par onglets et boutons d'action.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    spa: {
      control: "object",
      description: "Informations du SPA avec statut et données",
    },
  },
};

export default meta;
type Story = StoryObj<typeof HeaderSpa>;

export const NotPublished: Story = {
  args: {
    spa: {
      name: "Spa Wellness & Détente",
      statutPage: "notPublished",
      information: {
        statut: "modificationNotPublished"
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: "SPA non publié avec des modifications non sauvegardées"
      }
    }
  }
};

export const Published: Story = {
  args: {
    spa: {
      name: "Spa Royal Relaxation",
      statutPage: "published",
      information: {
        statut: "modificationSaved"
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: "SPA publié avec les dernières modifications sauvegardées"
      }
    }
  }
};