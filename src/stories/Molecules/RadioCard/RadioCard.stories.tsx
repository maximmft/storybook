import { RadioCard } from "./RadioCard";
import { StarIcon, SettingsIcon } from "lucide-react";
import { SealIcon } from "@phosphor-icons/react";
import type { DropdownOption } from "src/stories/Atoms/Inputs/Dropdown/Dropdown";
import { Meta, StoryObj } from "@storybook/react-webpack5";
import { useState } from "react";

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
    const [selectedValue, setSelectedValue] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedValue(event.target.value);
    };

    return (
      <RadioCard
        {...args}
        onChange={handleChange}
        RadioButtonChecked={selectedValue === args.id}
      />
    );
  },
};

export const Multiple: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedValue(event.target.value);
    };

    return (
      <div className="flex flex-row gap-6">
        {radioCardsData.map(
          ({ id, title, labelDropdown, labelRadio, optionsDropdown }) => (
            <RadioCard
              key={id}
              id={id}
              title={title}
              labelDropdown={labelDropdown}
              labelRadio={labelRadio}
              onChange={handleChange}
              RadioButtonChecked={selectedValue === id}
              optionsDropdown={optionsDropdown}
              dropdownMultiSelect={false}
              dropdownPlaceholder={`Sélectionnez ${labelDropdown.toLowerCase()}`}
            />
          )
        )}
      </div>
    );
  },
};
