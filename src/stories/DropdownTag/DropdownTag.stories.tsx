import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { DropdownTag } from "./DropdownTag.tsx";
import { SettingsIcon, UserIcon } from "lucide-react";


const basicOptions = [
  { id: "1", label: "JavaScript" },
  { id: "2", label: "TypeScript" },
  { id: "3", label: "React" },
  { id: "4", label: "Vue.js" },
  { id: "5", label: "Angular" },
  { id: "8", label: "Java", disabled: true },
];

const categoryOptions = [
  { id: "1", label: "Frontend", icon: SettingsIcon, iconPosition: "left" as const },
  { id: "2", label: "Backend", icon: SettingsIcon, iconPosition: "left" as const },
  { id: "3", label: "DevOps", icon: SettingsIcon, iconPosition: "left" as const },
  { id: "4", label: "Mobile", icon: SettingsIcon, iconPosition: "left" as const },
];

const teamOptions = [
  { id: "1", label: "Alice", icon: UserIcon, iconPosition: "left" as const },
  { id: "2", label: "Ismail", icon: UserIcon, iconPosition: "left" as const },
  { id: "3", label: "Abou", icon: UserIcon, iconPosition: "left" as const },
  { id: "4", label: "Coline", icon: UserIcon, iconPosition: "left" as const },
];


const meta: Meta<typeof DropdownTag> = {
  title: "Inputs/DropdownTag",
  component: DropdownTag,
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
    variant: {
      control: { type: "select" },
      options: ["default", "error"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    options: basicOptions,
    placeholder: "Sélectionner des technologies",
  },
};

export const WithIcons: Story = {
  args: {
    options: categoryOptions,
    placeholder: "Choisir des catégories",
  },
};

export const TeamMembers: Story = {
  args: {
    options: teamOptions,
    placeholder: "Assigner à des membres",
  },
};

export const ErrorState: Story = {
  args: {
    options: basicOptions,
    placeholder: "Champ requis",
    variant: "error",
  },
};

export const Disabled: Story = {
  args: {
    options: basicOptions,
    placeholder: "Tags désactivés",
    disabled: true,
  },
};

export const SingleSelect: Story = {
  args: {
    options: basicOptions,
    placeholder: "Sélection unique",
    multiSelect: false,
  },
};

export const Empty: Story = {
  args: {
    options: [],
    placeholder: "Sélection unique",
    multiSelect: false,
  },
};