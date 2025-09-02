import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { AddingPriceList } from "./AddingPriceList.tsx";
import { useState } from "react";
import { Button } from "src/stories/Atoms/Buttons/Button/Button.tsx";

const PricedListmockData = {
  title: "Grille tarifaire semaine",
  startDate: "2025-01-01T00:00:00.000Z",
  endDate: "2025-01-01T23:59:59.999Z",
  applyAllYear: true,
  annualRecurrence: true,
  markupTypology: { id: "1", label: "En pourcentage (%)" },
  markupRate: 15,
  opening: {
    days: ["Lundi", "Mardi", "Mercredi"],
    hours: {
      opening: "10:00",
      ending: "22:00",
    },
  },
  categories: [
    {
      id: "1",
      title: "Massages balinais",
      mainToggleValue: true,
      services: [
        {
          id: "1-1",
          service: {
            duration: "60",
            format: "Solo",
            name: "Massage balinais traditionnel",
            price: "120",
          },
        },
        {
          id: "1-2",
          service: {
            duration: "90",
            format: "Solo",
            name: "Massage balinais aux huiles essentielles",
            price: "150",
          },
        },
        {
          id: "1-3",
          service: {
            duration: "60",
            format: "Duo",
            name: "Massage balinais en couple",
            price: "200",
          },
        },
        {
          id: "1-4",
          service: {
            disabled: true,
            duration: "120",
            format: "Solo",
            name: "Massage balinais premium (indisponible)",
            price: "180",
          },
        },
      ],
    },
    {
      id: "2",
      title: "Massages californiens",
      mainToggleValue: false,
      services: [
        {
          id: "2-1",
          service: {
            duration: "45",
            format: "Solo",
            name: "Massage californien détente",
            price: "90",
          },
        },
        {
          id: "2-2",
          service: {
            duration: "60",
            format: "Solo",
            name: "Massage californien relaxant",
            price: "110",
          },
        },
      ],
    },
    {
      id: "3",
      title: "Soins du visage",
      mainToggleValue: false,
      services: [
        {
          id: "3-1",
          service: {
            duration: "30",
            format: "Solo",
            name: "Soin du visage express",
            price: "60",
          },
        },
        {
          id: "3-2",
          service: {
            duration: "60",
            format: "Solo",
            name: "Soin du visage hydratant",
            price: "85",
          },
        },
      ],
    },
  ],
};

const meta: Meta<typeof AddingPriceList> = {
  title: "Organisms/SidePage/AddingPriceList",
  component: AddingPriceList,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Composant sidebar pour créer une nouvelle grille de majoration personnalisée avec sélection de prestations et configuration des horaires.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof AddingPriceList>;

export const Desktop: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="w-screen h-screen">
        <div className="w-[250px] p-10">
          <Button
            onClick={() => setIsOpen(true)}
            label={"Clique ici pour ouvrir"}
            variant="secondary"
          />
        </div>
        <AddingPriceList
          data={PricedListmockData}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Version desktop de la sidebar pour créer une grille de majoration avec formulaire complet incluant sélection de prestations et configuration des horaires d'application.",
      },
    },
  },
};
