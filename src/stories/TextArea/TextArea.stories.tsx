import type { Meta, StoryObj } from "@storybook/react-webpack5";
import {TextArea} from "./TextArea";

const meta: Meta<typeof TextArea> = {
  title: "Inputs/TextArea",
  component: TextArea,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    label: {
      control: "text",
      description: "Label du champ textarea",
    },
    disabled: {
      control: "boolean",
      description: "Désactive le champ",
    },
    error: {
      control: "text",
      description: "Message d'erreur à afficher",
    },
    placeholder: {
      control: "text",
      description: "Texte de placeholder",
    },
    value: {
      control: "text",
      description: "Valeur initiale du champ",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "Description",
    placeholder: "Saisissez votre description...",
  },
};

export const WithValue: Story = {
  args: {
    label: "Description",
    placeholder: "Saisissez votre description...",
    value: "Texte déjà saisi dans le champ",
  },
};

export const Error: Story = {
  args: {
    label: "Description",
    placeholder: "Saisissez votre description...",
    error: "Ce champ est requis",
    value: "",
  },
};

export const ErrorWithValue: Story = {
  args: {
    label: "Description",
    placeholder: "Saisissez votre description...",
    error: "La description doit contenir au moins 10 caractères",
    value: "Court",
  },
};

export const Disabled: Story = {
  args: {
    label: "Description",
    placeholder: "Champ désactivé",
    disabled: true,
  },
};
