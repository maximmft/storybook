import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { SearchBar } from "./SearchBar.tsx";

const meta: Meta<typeof SearchBar> = {
  title: "Inputs/SearchBar",
  component: SearchBar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder du champ de recherche",
    },
    disabled: {
      control: "boolean",
      description: "Désactive le champ",
    },
    error: {
      control: "boolean",
      description: "Affiche l'état d'erreur",
    },
    defaultValue: {
      control: "text",
      description: "Valeur par défaut du champ",
    },
    onSearch: {
      action: "searched",
      description: "Fonction appelée lors de la recherche",
    },
    onClear: {
      action: "cleared",
      description: "Fonction appelée lors de la suppression",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Rechercher...",
  },
};

export const WithValue: Story = {
  args: {
    placeholder: "Rechercher...",
    defaultValue: "Texte de recherche",
  },
};

export const Error: Story = {
  args: {
    placeholder: "Rechercher...",
    error: true,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Rechercher...",
    disabled: true,
  },
};