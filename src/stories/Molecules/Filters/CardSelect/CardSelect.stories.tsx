import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { useState } from "react";
import { CardSelect } from "./CardSelect";

const mockServices = [
  {
    id: "1-1",
    service: {
      format: "Solo",
      price: "150",
      duration: "60",
      name: "Massage relaxant complet",
    },
  },
  {
    id: "1-2",
    service: {
      format: "Duo",
      price: "120",
      duration: "60",
      name: "Massage détente à deux",
    },
  },
  {
    id: "1-3",
    service: {
      format: "Solo",
      price: "200",
      duration: "90",
      name: "Massage thérapeutique premium",
      disabled: true,
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
        component:
          "Composant de sélection de cartes avec services et options de filtrage (contrôlé).",
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
    const [selectedServices, setSelectedServices] = useState<string[]>([]);

    const allServicesId = mockServices
      .filter((service) => !service.service.disabled)
      .map((service) => service.id);

    const isAllSelected = allServicesId.every((id) =>
      selectedServices.includes(id)
    );

    const handleMainToggleChange = () => {
      if (isAllSelected) {
        setSelectedServices([]);
      } else setSelectedServices([...allServicesId]);
    };

    const handleServiceToggle = (serviceId: string) => {
      if (selectedServices.includes(serviceId)) {
        setSelectedServices(
          selectedServices.filter((value) => value !== serviceId)
        );
      } else {
        setSelectedServices([...selectedServices, serviceId]);
      }
    };

    return (
      <CardSelect
        {...args}
        mainToggleValue={isAllSelected}
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
    const [selectedServices, setSelectedServices] = useState<string[]>([]);

    const allServicesId = mockServices
      .filter((service) => !service.service.disabled)
      .map((service) => service.id);

    const isAllSelected = allServicesId.every((id) =>
      selectedServices.includes(id)
    );

    const handleMainToggleChange = () => {
      if (isAllSelected) {
        setSelectedServices([]);
      } else setSelectedServices([...allServicesId]);
    };

    const handleServiceToggle = (serviceId: string) => {
      if (selectedServices.includes(serviceId)) {
        setSelectedServices(
          selectedServices.filter((value) => value !== serviceId)
        );
      } else {
        setSelectedServices([...selectedServices, serviceId]);
      }
    };

    return (
      <CardSelect
        {...args}
        mainToggleValue={isAllSelected}
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
