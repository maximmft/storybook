import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { ActionCard } from "./ActionCard";
import { CopyPlus, FileText, Plus, Upload } from "lucide-react";

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
    icon: {
      control: { type: "select" },
      options: ["CopyPlus", "FileText", "Plus", "Upload"],
      mapping: {
        CopyPlus: CopyPlus,
        FileText: FileText,
        Plus: Plus,
        Upload: Upload,
      },
      description: "Icône à afficher en haut de la carte",
    },
    primaryButtonLabel: {
      control: { type: "text" },
      description: "Label du bouton principal",
    },
    secondaryButtonLabel: {
      control: { type: "text" },
      description: "Label du bouton secondaire",
    },
    showSecondaryButton: {
      control: { type: "boolean" },
      description: "Afficher ou masquer le bouton secondaire",
    },
    onPrimaryClick: {
      action: "primary button clicked",
    },
    onSecondaryClick: {
      action: "secondary button clicked",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ActionCard>;

export const Default: Story = {
  args: {
    title: "Ajouter vos prestations",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
    icon: CopyPlus,
    primaryButtonLabel: "Ajouter une prestation +",
    secondaryButtonLabel: "Importer un fichier Excel",
    showSecondaryButton: true,
  },
};

export const SingleButton: Story = {
  args: {
    title: "Créer un nouveau document",
    description: "Commencez par créer un nouveau document pour organiser vos données.",
    icon: FileText,
    primaryButtonLabel: "Créer un document",
    showSecondaryButton: false,
  },
};

export const CustomIcons: Story = {
  args: {
    title: "Télécharger vos fichiers",
    description: "Importez vos documents existants pour les traiter automatiquement.",
    icon: Upload,
    primaryButtonLabel: "Parcourir les fichiers",
    secondaryButtonLabel: "Glisser-déposer",
    showSecondaryButton: true,
  },
};

export const CustomLabels: Story = {
  args: {
    title: "Gérer vos projets",
    description: "Organisez et suivez l'avancement de tous vos projets en cours.",
    icon: Plus,
    primaryButtonLabel: "Nouveau projet",
    secondaryButtonLabel: "Dupliquer un projet existant",
    showSecondaryButton: true,
  },
};