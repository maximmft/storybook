import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { AddingPriceList } from "./AddingPriceList";
import { useState } from "react";
import { Button } from "src/stories/Atoms/Buttons/Button/Button";

const PriceListMockData = {
  title: "Grille de soldes",
  gridPeriod: ['1', '2', '12'],
  applyAllYear: true,
  annualRecurrence: true,
  markupTypology: { id: "1", label: "En pourcentage (%)" },
  markupRate: 15,
  opening: {
    days: [
      { name: "lundi", disabled: false },
      { name: "mardi", disabled: false },
      { name: "mercredi", disabled: true },
      { name: "jeudi", disabled: false },
      { name: "vendredi", disabled: false },
      { name: "samedi", disabled: true },
      { name: "dimanche", disabled: true },
    ],
    hours: {
      opening: "10:00",
      ending: "22:00",
    },
    disabledSlotsByDay: {
      lundi: ["07:00", "08:00", "23:00", "00:00"],
      mardi: ["07:00", "12:00", "19:00"],
      mercredi: [],
      jeudi: ["19:00", "20:00", "21:00"],
      vendredi: [],
      samedi: [],
      dimanche: [],
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
            disabled: false,
          },
        },
        {
          id: "1-2",
          service: {
            duration: "90",
            format: "Solo",
            name: "Massage balinais aux huiles essentielles",
            price: "150",
            disabled: false,
          },
        },
        {
          id: "1-3",
          service: {
            duration: "60",
            format: "Duo",
            name: "Massage balinais en couple",
            price: "200",
            disabled: false,
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
            disabled: false,
          },
        },
        {
          id: "2-2",
          service: {
            duration: "60",
            format: "Solo",
            name: "Massage californien relaxant",
            price: "110",
            disabled: false,
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
            disabled: false,
          },
        },
        {
          id: "3-2",
          service: {
            duration: "60",
            format: "Solo",
            name: "Soin du visage hydratant",
            price: "85",
            disabled: false,
          },
        },
        {
          id: "3-3",
          service: {
            duration: "90",
            format: "Solo",
            name: "Soin du visage anti-âge",
            price: "120",
            disabled: false,
          },
        },
      ],
    },
  ],
};

const EmptyPriceListData = {
  title: "",
  gridPeriod: "",
  applyAllYear: false,
  annualRecurrence: false,
  markupTypology: { id: "", label: "" },
  markupRate: 0,
  opening: {
    days: [
      { name: "lundi", disabled: false },
      { name: "mardi", disabled: false },
      { name: "mercredi", disabled: false },
      { name: "jeudi", disabled: false },
      { name: "vendredi", disabled: false },
      { name: "samedi", disabled: false },
      { name: "dimanche", disabled: false },
    ],
    hours: {
      opening: "",
      ending: "",
    },
    disabledSlotsByDay: {},
  },
  categories: [],
};

const WeekendOnlyData = {
  ...PriceListMockData,
  title: "Grille tarifaire weekend",
  opening: {
    days: [
      { name: "lundi", disabled: true },
      { name: "mardi", disabled: true },
      { name: "mercredi", disabled: true },
      { name: "jeudi", disabled: true },
      { name: "vendredi", disabled: true },
      { name: "samedi", disabled: false },
      { name: "dimanche", disabled: false },
    ],
    hours: {
      opening: "09:00",
      ending: "21:00",
    },
    disabledSlotsByDay: {
      lundi: [],
      mardi: [],
      mercredi: [],
      jeudi: [],
      vendredi: [],
      samedi: ["07:00", "08:00", "22:00", "23:00", "00:00"],
      dimanche: ["07:00", "08:00", "09:00", "22:00", "23:00", "00:00"],
    },
  },
};

const AllDaysOpenData = {
  ...PriceListMockData,
  title: "Grille 7j/7",
  opening: {
    days: [
      { name: "lundi", disabled: false },
      { name: "mardi", disabled: false },
      { name: "mercredi", disabled: false },
      { name: "jeudi", disabled: false },
      { name: "vendredi", disabled: false },
      { name: "samedi", disabled: false },
      { name: "dimanche", disabled: false },
    ],
    hours: {
      opening: "09:00",
      ending: "21:00",
    },
    disabledSlotsByDay: {
      lundi: ["07:00", "08:00", "22:00", "23:00", "00:00"],
      mardi: ["07:00", "08:00", "22:00", "23:00", "00:00"],
      mercredi: ["07:00", "08:00", "22:00", "23:00", "00:00"],
      jeudi: ["07:00", "08:00", "22:00", "23:00", "00:00"],
      vendredi: ["07:00", "08:00", "22:00", "23:00", "00:00"],
      samedi: ["07:00", "08:00", "22:00", "23:00", "00:00"],
      dimanche: ["07:00", "08:00", "22:00", "23:00", "00:00"],
    },
  },
};

const meta: Meta<typeof AddingPriceList> = {
  title: "Organisms/SidePage/AddingPriceList",
  component: AddingPriceList,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Composant sidebar pour créer une nouvelle grille de majoration personnalisée avec sélection de prestations et configuration des horaires.

## Props Interface

\`\`\`typescript
interface AddingPriceListProps {
  isOpen: boolean;
  data: PriceListData;
  setIsOpen: (value: boolean) => void;
}

interface PriceListData {
  title: string;
  startDate: string;
  endDate: string;
  applyAllYear: boolean;
  annualRecurrence: boolean;
  markupTypology: { id: string; label: string };
  markupRate: number;
  opening: {
    days: Array<{ name: string; disabled: boolean }>;
    hours: { opening: string; ending: string };
    disabledSlotsByDay: Record<string, string[]>;
  };
  categories: Array<{
    id: string;
    title: string;
    mainToggleValue: boolean;
    services: Array<{
      id: string;
      service: {
        duration: string;
        format: string;
        name: string;
        price: string;
        disabled: boolean;
      };
    }>;
  }>;
}
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    isOpen: {
      description: "Contrôle l'état d'ouverture/fermeture de la sidebar",
      control: { type: "boolean" },
      type: "boolean",
    },
    data: {
      description: "Données de la grille de prix à configurer",
      control: false,
    },
    setIsOpen: {
      description: "Fonction callback pour contrôler l'état d'ouverture",
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof AddingPriceList>;

const AddingPriceListWrapper = ({ data }: { data: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-screen h-screen bg-gray-50">
      <div className="w-[250px] p-10">
        <Button
          onClick={() => setIsOpen(true)}
          label="Ouvrir la grille"
          variant="primary"
        />
      </div>
      <AddingPriceList data={data} setIsOpen={setIsOpen} isOpen={isOpen} />
    </div>
  );
};

export const Desktop: Story = {
  render: () => <AddingPriceListWrapper data={PriceListMockData} />,
  parameters: {
    docs: {
      description: {
        story:
          "Version desktop de la sidebar pour créer une grille de majoration avec formulaire complet incluant sélection de prestations et configuration des horaires d'application.",
      },
    },
  },
};

export const EmptyData: Story = {
  render: () => <AddingPriceListWrapper data={EmptyPriceListData} />,
  parameters: {
    docs: {
      description: {
        story:
          "Version avec des données vides pour tester le comportement du composant sans prestations prédéfinies.",
      },
    },
  },
};

export const WeekendOnly: Story = {
  render: () => <AddingPriceListWrapper data={WeekendOnlyData} />,
  parameters: {
    docs: {
      description: {
        story: "Version weekend uniquement avec lundi-vendredi désactivés et créneaux horaires spécifiques au weekend.",
      },
    },
  },
};

export const AllDaysOpen: Story = {
  render: () => <AddingPriceListWrapper data={AllDaysOpenData} />,
  parameters: {
    docs: {
      description: {
        story: "Version 7j/7 avec tous les jours ouverts et créneaux horaires uniformes.",
      },
    },
  },
};