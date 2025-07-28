import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { useState } from "react";
import { CardSelect } from "./CardSelect";

const mockServices = [
  {
    service: {
      format: "Solo",
      price: "150",
      duration: "60",
      name: "Massage relaxant complet",
    },
  },
  {
    service: {
      format: "Duo",
      price: "120",
      duration: "60",
      name: "Massage détente à deux",
    },
  },
  {
    service: {
      format: "Solo",
      price: "200",
      duration: "90",
      name: "Massage thérapeutique premium",
      disabled: true
    },
  },
];

const meta: Meta<typeof CardSelect> = {
  title: "Molecules/Filters/CardSelect",
  component: CardSelect,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Composant de sélection de cartes avec services et options de filtrage (contrôlé).",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: {
        type: "text",
      },
      description: "Titre affiché en en-tête de la sélection",
    },
    services: {
      control: false,
      description: "Liste des services à afficher",
    },
    editableChildren: {
      control: "boolean",
      description: "Les enfants sont-ils éditables",
    },
    disabled: {
      control: "boolean",
      description: "Le composant est-il désactivé",
    },
  },
};

export default meta;
type Story = StoryObj<typeof CardSelect>;

export const Default: Story = {
  render: (args) => {
    const [mainToggleValue, setMainToggleValue] = useState<boolean>(false);
    const [selectedServices, setSelectedServices] = useState<number[]>([]);

    const handleMainToggleChange = (value: boolean) => {
      setMainToggleValue(value);
    };

    const handleServiceToggle = (index: number) => {
      if (selectedServices.includes(index)) {
        setSelectedServices(selectedServices.filter((value) => value !== index));
      } else {
        setSelectedServices([...selectedServices, index]);
      }
    };

    return (
      <CardSelect
        {...args}
        mainToggleValue={mainToggleValue}
        selectedServices={selectedServices}
        onMainToggleChange={handleMainToggleChange}
        onServiceToggle={handleServiceToggle}
      />
    );
  },
  args: {
    title: "Massages balinais",
    services: mockServices,
  },
};

export const NonEditable: Story = {
  render: (args) => {
    const [mainToggleValue, setMainToggleValue] = useState<boolean>(false);
    const [selectedServices, setSelectedServices] = useState<number[]>([]);

    const handleMainToggleChange = (value: boolean) => {
      setMainToggleValue(value);
    };

    const handleServiceToggle = (index: number) => {
      if (selectedServices.includes(index)) {
        setSelectedServices(selectedServices.filter((value) => value !== index));
      } else {
        setSelectedServices([...selectedServices, index]);
      }
    };

    return (
      <CardSelect
        {...args}
        mainToggleValue={mainToggleValue}
        selectedServices={selectedServices}
        onMainToggleChange={handleMainToggleChange}
        onServiceToggle={handleServiceToggle}
      />
    );
  },
  args: {
    title: "Massage balinais",
    services: mockServices,
    editableChildren: false,
  },
};
