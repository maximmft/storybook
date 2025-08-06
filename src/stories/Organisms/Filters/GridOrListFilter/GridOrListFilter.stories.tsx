import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Menu, Grid3X3 } from "lucide-react";
import GridOrListFilter from "./GridOrListFilter";

const meta: Meta<typeof GridOrListFilter> = {
  title: "Organisms/Filters/GridOrListFilter",
  component: GridOrListFilter,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Composant de tabs personnalisé avec support des icônes. Permet de naviguer entre différents contenus avec un design moderne et des transitions fluides.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    defaultValue: {
      control: { type: "number" },
      description: "Index de l'onglet sélectionné par défaut",
    },
  },
};

export default meta;
type Story = StoryObj<typeof GridOrListFilter>;

export const Default: Story = {
  args: {
    tabs: [
      {
        label: "Liste",
        icon: <Menu size={16} />,
        content: (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Contenu de la Liste</h3>
            <p>Voici le contenu de l'onglet Liste avec une vue en liste des éléments.</p>
          </div>
        ),
      },
      {
        label: "Tableau",
        icon: <Grid3X3 size={16} />,
        content: (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Contenu du Tableau</h3>
            <p>Voici le contenu de l'onglet Tableau avec une vue en grille des éléments.</p>
          </div>
        ),
      },
    ],
    defaultValue: 0,
  },
  parameters: {
    docs: {
      description: {
        story: "Version par défaut avec deux onglets (Liste et Tableau) incluant leurs icônes respectives.",
      },
    },
  },
};