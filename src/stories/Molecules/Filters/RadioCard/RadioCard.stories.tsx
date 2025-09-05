import { RadioCard } from "./RadioCard";
import { StarIcon, SettingsIcon } from "lucide-react";
import { SealIcon } from "@phosphor-icons/react";
import type { DropdownOption } from "src/stories/Atoms/Inputs/Dropdown/Dropdown";
import { Meta, StoryObj } from "@storybook/react-webpack5";
import { useForm } from "react-hook-form";

type DefaultFormData = {
  selectedRadio: string; 
  cosmeticBrand: string;
};

type MultipleFormData = {
  selectedRadio: string;
  cosmeticBrand: string;
  beauty: string; 
  massage: string; 
};

const meta: Meta<typeof RadioCard> = {
  title: "Molecules/Filters/RadioCard",
  component: RadioCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    id: { control: "text" },
    dropdownMultiSelect: { control: "boolean" },
    dropdownPlaceholder: { control: "text" },
    labelDropdown: { control: "text" },
    labelRadio: { control: "text" },
    title: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof RadioCard>;

const radioCardsData = [
  {
    id: "1",
    title: "Choisissez une marque de cosmétique",
    labelDropdown: "Marques",
    labelRadio: "Option Cosmétique",
    fieldName: "cosmeticBrand",
    optionsDropdown: [
      { id: "1", label: "Shiseido", icon: StarIcon, iconPosition: "left" },
      { id: "2", label: "La Mer", icon: SealIcon, iconPosition: "left" },
    ] as DropdownOption[],
  },
  {
    id: "2",
    title: "Choisissez votre soin beauté",
    labelDropdown: "Soins beauté",
    labelRadio: "Option Beauté",
    fieldName: "beauty",
    optionsDropdown: [
      { id: "1", label: "Soin", icon: StarIcon, iconPosition: "left" },
      { id: "2", label: "Masque", icon: SettingsIcon, iconPosition: "left" },
    ] as DropdownOption[],
  },
  {
    id: "3",
    title: "Choisissez un massage",
    labelDropdown: "Massages",
    labelRadio: "Option Massages",
    fieldName: "massage",
    optionsDropdown: [
      { id: "1", label: "Régénérant", icon: SealIcon, iconPosition: "left" },
      { id: "2", label: "Profond", icon: StarIcon, iconPosition: "left" },
      {
        id: "3",
        label: "Pas top",
        icon: SettingsIcon,
        iconPosition: "left",
        disabled: true,
      },
    ] as DropdownOption[],
  },
];

export const Default: Story = {
  args: {
    id: "1",
    title: "Choisissez une marque de cosmétique",
    labelDropdown: "Marques",
    labelRadio: "Option Cosmétique",
    dropdownMultiSelect: false,
    dropdownPlaceholder: "Sélectionnez une marque",
    optionsDropdown: [
      { id: "1", label: "Shiseido", icon: StarIcon, iconPosition: "left" },
      { id: "2", label: "La Mer", icon: SealIcon, iconPosition: "left" },
    ],
  },
  render: (args) => {
    const { register, watch } = useForm<DefaultFormData>();
    
    const selectedRadio = watch("selectedRadio");

    return (
      <form>
        <RadioCard
          {...args}
          radioValue={args.id} 
          radioRegister={register("selectedRadio")} 
          RadioButtonChecked={selectedRadio === args.id}
          dropdownRegister={register('cosmeticBrand')}
          dropdownFieldName="cosmeticBrand"
          watch={watch}
          showDropdown
        />
      </form>
    );
  },
};

export const Multiple: Story = {
  render: () => {
    const { register, watch } = useForm<MultipleFormData>();
    
    const selectedRadio = watch("selectedRadio");

    return (
      <form>
        <div className="flex flex-row gap-6">
          {radioCardsData.map(
            ({ id, title, labelDropdown, labelRadio, optionsDropdown, fieldName }) => (
              <RadioCard
                key={id}
                id={id}
                title={title}
                labelDropdown={labelDropdown}
                labelRadio={labelRadio}
                radioValue={id} 
                radioRegister={register("selectedRadio")} 
                RadioButtonChecked={selectedRadio === id}
                optionsDropdown={optionsDropdown}
                dropdownMultiSelect={false}
                dropdownPlaceholder={`Sélectionnez ${labelDropdown.toLowerCase()}`}
                dropdownRegister={register(fieldName as keyof MultipleFormData)}
                dropdownFieldName={fieldName as keyof MultipleFormData}
                watch={watch}
                showDropdown
              />
            )
          )}
        </div>
      </form>
    );
  },
};

export const MultipleWithoutDropDown: Story = {
  render: () => {
    const { register, watch } = useForm<MultipleFormData>();
    
    const selectedRadio = watch("selectedRadio");

    return (
      <form>
        <div className="flex flex-row gap-6">
          {radioCardsData.map(
            ({ id, title, labelRadio }) => (
              <RadioCard
                key={id}
                id={id}
                title={title}
                labelRadio={labelRadio}
                radioValue={id} // Valeur du radio
                radioRegister={register("selectedRadio")} // Register pour le radio
                RadioButtonChecked={selectedRadio === id}
                watch={watch}
                showDropdown={false}
              />
            )
          )}
        </div>
      </form>
    );
  },
};
