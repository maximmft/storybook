import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { DropdownSearchSelect } from "./DropdownSearchSelect";
import { SettingsIcon, UserIcon } from "lucide-react";

const basicOptions = [
  { id: "1", label: "JavaScript" },
  { id: "2", label: "TypeScript" },
  { id: "3", label: "React" },
  { id: "4", label: "Vue.js" },
  { id: "5", label: "Angular" },
  { id: "6", label: "Java", disabled: true },
];

const categoryOptions = [
  { id: "1", label: "Frontend", icon: SettingsIcon, iconPosition: "left" as const },
  { id: "2", label: "Backend", icon: SettingsIcon, iconPosition: "left" as const },
  { id: "3", label: "DevOps", icon: SettingsIcon, iconPosition: "left" as const },
  { id: "4", label: "Mobile", icon: SettingsIcon, iconPosition: "left" as const },
];

const meta: Meta<typeof DropdownSearchSelect> = {
  title: "Molecules/Inputs/DropdownSearchSelect",
  component: DropdownSearchSelect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
    error: {
      control: { type: "boolean" },
    },
    multiSelect: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Technologies",
    options: basicOptions,
    placeholder: "Sélectionner des technologies",
    multiSelect: true,
  },
};

export const WithIcons: Story = {
  args: {
    label: "Catégories",
    options: categoryOptions,
    placeholder: "Choisir des catégories",
    multiSelect: true,
  },
};

export const SingleSelect: Story = {
  args: {
    label: "Catégorie",
    options: categoryOptions,
    placeholder: "Choisir une catégorie",
    multiSelect: false,
  },
};