import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { DropdownTag } from "./DropdownTag.tsx";

// Mock icons pour les exemples
const TagIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
  </svg>
);

const UserIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const CategoryIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

const basicOptions = [
  { id: "1", label: "JavaScript" },
  { id: "2", label: "TypeScript" },
  { id: "3", label: "React" },
  { id: "4", label: "Vue.js" },
  { id: "5", label: "Angular" },
  { id: "6", label: "Node.js" },
  { id: "7", label: "Python" },
  { id: "8", label: "Java", disabled: true },
];

const categoryOptions = [
  { id: "1", label: "Frontend", icon: CategoryIcon, iconPosition: "left" as const },
  { id: "2", label: "Backend", icon: CategoryIcon, iconPosition: "left" as const },
  { id: "3", label: "DevOps", icon: CategoryIcon, iconPosition: "left" as const },
  { id: "4", label: "Mobile", icon: CategoryIcon, iconPosition: "left" as const },
  { id: "5", label: "Database", icon: CategoryIcon, iconPosition: "left" as const },
];

const teamOptions = [
  { id: "1", label: "Alice Martin", icon: UserIcon, iconPosition: "left" as const },
  { id: "2", label: "Bob Johnson", icon: UserIcon, iconPosition: "left" as const },
  { id: "3", label: "Charlie Wilson", icon: UserIcon, iconPosition: "left" as const },
  { id: "4", label: "Diana Brown", icon: UserIcon, iconPosition: "left" as const },
  { id: "5", label: "Eva Davis", icon: UserIcon, iconPosition: "left" as const, disabled: true },
];

const longOptions = Array.from({ length: 20 }, (_, i) => ({
  id: `${i + 1}`,
  label: `Tag ${i + 1}`,
}));

const meta: Meta<typeof DropdownTag> = {
  title: "Components/DropdownTag",
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
    placeholder: "Sélectionner des technologies",
    onSelectionChange: (selected) => console.log("Selection:", selected),
  },
};

export const WithIcons: Story = {
  args: {
    options: categoryOptions,
    placeholder: "Choisir des catégories",
    onSelectionChange: (selected) => console.log("Selection:", selected),
  },
};

export const TeamMembers: Story = {
  args: {
    options: teamOptions,
    placeholder: "Assigner à des membres",
    onSelectionChange: (selected) => console.log("Selection:", selected),
  },
};

export const ErrorState: Story = {
  args: {
    options: basicOptions,
    placeholder: "Champ requis",
    variant: "error",
    onSelectionChange: (selected) => console.log("Selection:", selected),
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
    onSelectionChange: (selected) => console.log("Selection:", selected),
  },
};

export const LongList: Story = {
  args: {
    options: longOptions,
    placeholder: "Liste avec beaucoup d'options",
    maxHeight: 150,
    onSelectionChange: (selected) => console.log("Selection:", selected),
  },
};

export const Empty: Story = {
  args: {
    options: [],
    placeholder: "Aucun tag disponible",
    onSelectionChange: (selected) => console.log("Selection:", selected),
  },
};