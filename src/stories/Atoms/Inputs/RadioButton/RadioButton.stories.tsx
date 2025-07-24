import type { Meta, StoryObj } from "@storybook/react-webpack5";
import RadioButton from "./RadioButton.tsx";

const teamOptions = [
  { id: "1", label: "Alice" },
  { id: "2", label: "Ismail" },
  { id: "3", label: "Abou" },
  { id: "4", label: "Coline" },
];

const meta: Meta<typeof RadioButton> = {
  title: "Inputs/RadioButton",
  component: RadioButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    options: {
      description: "Liste des options pour les boutons radio",
      control: { type: "object" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: teamOptions,
  },
};
