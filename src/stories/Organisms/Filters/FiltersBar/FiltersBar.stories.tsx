import type { Meta, StoryObj } from "@storybook/react-webpack5";
import FiltersBar from "./FiltersBar";

const meta: Meta<typeof FiltersBar> = {
  title: "Organisms/Filters/FiltersBar",
  component: FiltersBar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Barre de filtres avec boutons secondaires et icônes. Permet de filtrer du contenu par différentes catégories.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FiltersBar>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Version par défaut avec les filtres standards (Prestations, Type, Date, Durée). Chaque filtre a son onClick qui log dans la console.",
      },
    },
  },
};