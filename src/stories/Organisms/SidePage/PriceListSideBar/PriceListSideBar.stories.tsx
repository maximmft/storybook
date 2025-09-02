import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { PriceListSideBar } from "./PriceListSideBar.tsx";
import { useState } from "react";
import { Button } from "src/stories/Atoms/Buttons/Button/Button.tsx";

const PricedListmockData = {
  title: "Grille tarifaire semaine",
  startDate: "2025-01-01T00:00:00.000Z",
  endDate: "2025-01-01T23:59:59.999Z",
  applyAllYear: true,
  annualRecurrence: true,
  markupTypology: {id: "1", label: "En pourcentage (%)"},
  markupRate: 10,
  opening: {
    days: ["Lundi", "Mardi", "Mercredi"],
    hours: {
      opening: "10:00",
      ending: "22:00"
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
        {
          id: "2-3",
          service: {
            duration: "75",
            format: "Solo",
            name: "Massage californien thérapeutique",
            price: "130",
          },
        },
        {
          id: "2-4",
          service: {
            duration: "60",
            format: "Duo",
            name: "Massage californien duo",
            price: "180",
          },
        },
      ],
    },
    
    {
      id: "3",
      title: "Massages suédois",
      mainToggleValue: true,
      services: [
        {
          id: "3-1",
          service: {
            duration: "50",
            format: "Solo",
            name: "Massage suédois classique",
            price: "100",
          },
        },
        {
          id: "3-2",
          service: {
            duration: "70",
            format: "Solo",
            name: "Massage suédois deep tissue",
            price: "135",
          },
        },
        {
          id: "3-3",
          service: {
            disabled: true,
            duration: "60",
            format: "Solo",
            name: "Massage suédois sportif (maintenance)",
            price: "125",
          },
        },
        {
          id: "3-4",
          service: {
            duration: "90",
            format: "Solo",
            name: "Massage suédois intégral",
            price: "160",
          },
        },
      ],
    },
    
    {
      id: "4",
      title: "Soins du visage",
      mainToggleValue: false,
      services: [
        {
          id: "4-1",
          service: {
            duration: "30",
            format: "Solo",
            name: "Soin du visage express",
            price: "60",
          },
        },
        {
          id: "4-2",
          service: {
            duration: "60",
            format: "Solo",
            name: "Soin du visage hydratant",
            price: "85",
          },
        },
        {
          id: "4-3",
          service: {
            duration: "75",
            format: "Solo",
            name: "Soin du visage anti-âge",
            price: "110",
          },
        },
        {
          id: "4-4",
          service: {
            duration: "90",
            format: "Solo",
            name: "Soin du visage premium",
            price: "140",
          },
        },
      ],
    },
    
    {
      id: "5",
      title: "Gommages et enveloppements",
      mainToggleValue: true,
      services: [
        {
          id: "5-1",
          service: {
            duration: "45",
            format: "Solo",
            name: "Gommage corps au sel marin",
            price: "75",
          },
        },
        {
          id: "5-2",
          service: {
            duration: "60",
            format: "Solo",
            name: "Enveloppement algues marines",
            price: "95",
          },
        },
        {
          id: "5-3",
          service: {
            duration: "75",
            format: "Solo",
            name: "Gommage + enveloppement",
            price: "120",
          },
        },
        {
          id: "5-4",
          service: {
            disabled: true,
            duration: "90",
            format: "Solo",
            name: "Soin corps complet (rénovation)",
            price: "150",
          },
        },
      ],
    },
  ],
};

const meta: Meta<typeof PriceListSideBar> = {
  title: "Organisms/SidePage/PriceListSideBar",
  component: PriceListSideBar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Composant sidebar pour afficher les détails d'une grille tarifaire avec différentes catégories de services organisées par CardSelect.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PriceListSideBar>;

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
        <PriceListSideBar 
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
          "Version desktop de la sidebar avec une grille tarifaire complète incluant plusieurs catégories : Massages balinais, californiens, suédois, soins du visage, et gommages.",
      },
    },
  },
};
