import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Dropdown } from "./Dropdown.tsx";
import { UserIcon, HomeIcon, MailIcon, SettingsIcon } from "lucide-react";

const basicOptions = [
  { id: "1", label: "Option 1" },
  { id: "2", label: "Option 2" },
  { id: "3", label: "Option 3" },
  { id: "4", label: "Option 4 (désactivée)", disabled: true },
];

const optionsWithLeftIcons = [
  { id: "1", label: "Profil", icon: UserIcon, iconPosition: "left" as const },
  { id: "2", label: "Accueil", icon: HomeIcon, iconPosition: "left" as const },
  { id: "3", label: "Messages", icon: MailIcon, iconPosition: "left" as const },
  { id: "4", label: "Paramètres", icon: SettingsIcon, iconPosition: "left" as const, disabled: true },
];

const optionsWithRightIcons = [
  { id: "1", label: "Dashboard", icon: UserIcon, iconPosition: "right" as const },
  { id: "2", label: "Analytics", icon: UserIcon, iconPosition: "right" as const },
  { id: "3", label: "Reports", icon: UserIcon, iconPosition: "right" as const },
];

const checkboxOptions = [
  { id: "1", label: "JavaScript", variant: "checkbox" as const },
  { id: "2", label: "TypeScript", variant: "checkbox" as const },
  { id: "3", label: "React", variant: "checkbox" as const },
  { id: "4", label: "Vue", variant: "checkbox" as const, disabled: true },
];


const meta: Meta<typeof Dropdown> = {
  title: "Inputs/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
    multiSelect: {
      control: { type: "boolean" },
    },
    maxHeight: {
      control: { type: "number" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    options: basicOptions,
    placeholder: "Choisir une option",
    onSelectionChange: (selected) => console.log("Selection:", selected),
  },
};

export const WithLeftIcons: Story = {
  args: {
    options: optionsWithLeftIcons,
    placeholder: "Sélectionner avec icônes à gauche",
    onSelectionChange: (selected) => console.log("Selection:", selected),
  },
};

export const WithRightIcons: Story = {
  args: {
    options: optionsWithRightIcons,
    placeholder: "Sélectionner avec icônes à droite",
    onSelectionChange: (selected) => console.log("Selection:", selected),
  },
};

export const MultiSelect: Story = {
  args: {
    options: checkboxOptions,
    placeholder: "Sélection multiple",
    multiSelect: true,
    onSelectionChange: (selected) => console.log("Multiple selection:", selected),
  },
};

export const MultiSelectWithIcons: Story = {
  args: {
    options: optionsWithLeftIcons.map(opt => ({ ...opt, variant: "checkbox" as const })),
    placeholder: "Multi-sélection avec icônes",
    multiSelect: true,
    onSelectionChange: (selected) => console.log("Multiple selection:", selected),
  },
};

export const Disabled: Story = {
  args: {
    options: basicOptions,
    placeholder: "Dropdown désactivé",
    disabled: true,
  },
};
