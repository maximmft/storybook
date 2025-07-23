import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { ClassicInput } from "./ClassicInput.tsx";

const meta: Meta<typeof ClassicInput> = {
  title: "Inputs/ClassicInput",
  component: ClassicInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    label: {
      control: "text",
      description: "Label du champ",
    },
    disabled: {
      control: "boolean",
      description: "Désactive le champ",
    },
    error: {
      control: "boolean",
      description: "Affiche l'état d'erreur",
    },
    helperText: {
      control: "text",
      description: "Texte d'aide sous le champ",
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel"],
      description: "Type du champ",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "Email",
  },
};


export const Password: Story = {
  args: {
    label: "Mot de passe",
    type: "password",
  },
};

export const Error: Story = {
  args: {
    label: "Email",
    error: true,
    helperText: "Format d'email invalide",
  },
};

export const Disabled: Story = {
  args: {
    label: "Email",
    disabled: true,
  },
};

