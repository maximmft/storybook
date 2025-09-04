import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Dropdown } from "./Dropdown.tsx";
import { UserIcon, HomeIcon, MailIcon, SettingsIcon } from "lucide-react";
import { useForm } from "react-hook-form";

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

const DropdownWrapper = ({ 
  options, 
  placeholder, 
  multiSelect = false, 
  defaultValue = "", 
  ...props 
}: any) => {
  const { register, watch } = useForm({
    defaultValues: {
      testField: defaultValue,
    },
  });



  return (
    <div className="w-80">
      <Dropdown
        {...props}
        options={options}
        placeholder={placeholder}
        multiSelect={multiSelect}
        register={register("testField")}
        fieldName="testField"
        watch={watch}
      />
    </div>
  );
};

const meta: Meta<typeof Dropdown> = {
  title: "Atoms/Inputs/Dropdown",
  component: Dropdown,
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
    required: {
      control: { type: "boolean" },
    },
    multiSelect: {
      control: { type: "boolean" },
    },
    maxHeight: {
      control: { type: "number" },
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    fieldName: {
      control: { type: "text" },
      description: "Nom du champ pour react-hook-form",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => (
    <DropdownWrapper
      {...args}
      options={basicOptions}
      placeholder="Choisir une option"
      label="Sélection simple"
    />
  ),
};

export const WithPreselectedValue: Story = {
  render: (args) => (
    <DropdownWrapper
      {...args}
      options={basicOptions}
      placeholder="Choisir une option"
      label="Avec valeur pré-sélectionnée"
      defaultValue="2"
    />
  ),
};

export const WithLeftIcons: Story = {
  render: (args) => (
    <DropdownWrapper
      {...args}
      options={optionsWithLeftIcons}
      placeholder="Sélectionner avec icônes à gauche"
      label="Avec icônes à gauche"
    />
  ),
};

export const WithRightIcons: Story = {
  render: (args) => (
    <DropdownWrapper
      {...args}
      options={optionsWithRightIcons}
      placeholder="Sélectionner avec icônes à droite"
      label="Avec icônes à droite"
    />
  ),
};

export const MultiSelect: Story = {
  render: (args) => (
    <DropdownWrapper
      {...args}
      options={checkboxOptions}
      placeholder="Sélection multiple"
      label="Sélection multiple"
      multiSelect={true}
      defaultValue={[]}
    />
  ),
};

export const MultiSelectWithPreselection: Story = {
  render: (args) => (
    <DropdownWrapper
      {...args}
      options={checkboxOptions}
      placeholder="Sélection multiple"
      label="Multi-sélection pré-remplie"
      multiSelect={true}
      defaultValue={["1", "3"]}
    />
  ),
};

export const MultiSelectWithIcons: Story = {
  render: (args) => (
    <DropdownWrapper
      {...args}
      options={optionsWithLeftIcons.map(opt => ({ ...opt, variant: "checkbox" as const }))}
      placeholder="Multi-sélection avec icônes"
      label="Multi-sélection avec icônes"
      multiSelect={true}
      defaultValue={[]}
    />
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <DropdownWrapper
      {...args}
      options={basicOptions}
      placeholder="Dropdown désactivé"
      label="Dropdown désactivé"
      disabled={true}
    />
  ),
};

export const WithError: Story = {
  render: (args) => (
    <DropdownWrapper
      {...args}
      options={basicOptions}
      placeholder="Choisir une option"
      label="Avec erreur"
      error={true}
      required={true}
    />
  ),
};

export const SmallSize: Story = {
  render: (args) => (
    <DropdownWrapper
      {...args}
      options={basicOptions}
      placeholder="Petite taille"
      label="Taille small"
      size="small"
    />
  ),
};

export const LargeSize: Story = {
  render: (args) => (
    <DropdownWrapper
      {...args}
      options={basicOptions}
      placeholder="Grande taille"
      label="Taille large"
      size="large"
    />
  ),
};

export const WithManyOptions: Story = {
  render: (args) => {
    const manyOptions = Array.from({ length: 20 }, (_, i) => ({
      id: `${i + 1}`,
      label: `Option très longue numéro ${i + 1} avec beaucoup de texte`,
    }));

    return (
      <DropdownWrapper
        {...args}
        options={manyOptions}
        placeholder="Beaucoup d'options"
        label="Avec beaucoup d'options"
        maxHeight={150}
      />
    );
  },
};