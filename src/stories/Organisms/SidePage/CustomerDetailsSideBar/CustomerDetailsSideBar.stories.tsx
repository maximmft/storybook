import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { CustomerDetailsSideBar } from "./CustomerDetailsSideBar";
import { useState } from "react";
import { Button } from "src/stories/Atoms/Buttons/Button/Button";

const mockCustomerData = {
  customer: {
    firstname: "sophie",
    lastname: "Dupont",
    email: "sophie.dupont@gmail.com",
    phoneNumber: "+33 6 23 45 67 89",
    status: "vip",
    gender: "femme",
    birthday: "1989-07-10",
    address: {
      street: "33 avenue de la Résistance",
      zipcode: "75008",
      city: "Paris",
      country: "FRANCE",
    },
  },
  stats: {
    bookingsNumber: 12,
    visitNumber: 38,
  },
  note: "Lorem ipsum dolor sit amet consectetur. Purus eu aliquam tellus hendrerit. Sed tincidunt duis pulvinar velit tristique. Bibendum cras tincidunt at tortor suspendisse...",
  appointments: [
    {
      totalDuration: 150,
      totalPrice: 250,
      id: "#ID09847693",
      status: "confirmed" as const,
      comment:
        "Lorem ipsum dolor sit amet consectetur. Nunc at tellus sagittis nunc tincidunt at odio massa.",
      datetime: "2025-07-28T10:00:00+02:00",
      services: [
        {
          serviceName: "Teint parfait",
          format: "solo",
          price: 150,
          duration: 90,
          beneficiary: {
            firstname: "sophie",
            lastname: "Dupont",
            email: "sophie.dupont@gmail.com",
          },
          preference: "woman",
          room: "Salle de beauté",
          options: [],
        },
        {
          serviceName: "Beauté des mains",
          format: "solo",
          price: 50,
          duration: 30,
          beneficiary: {
            firstname: "sophie",
            lastname: "Dupont",
            email: "sophie.dupont@gmail.com",
          },
          preference: "woman",
          room: "Salle de beauté",
          options: [],
        },
        {
          serviceName: "Massage",
          format: "solo",
          price: 50,
          duration: 30,
          beneficiary: {
            firstname: "sophie",
            lastname: "Dupont",
            email: "sophie.dupont@gmail.com",
          },
          preference: "woman",
          room: "Salle de massage",
          options: [],
        },
      ],
    },
    {
      totalDuration: 120,
      totalPrice: 180,
      id: "#ID09847694",
      status: "confirmed" as const,
      comment: "Rendez-vous de suivi pour les soins du visage.",
      datetime: "2025-10-15T14:30:00+02:00",
      services: [
        {
          serviceName: "Soin du visage premium",
          format: "solo",
          price: 120,
          duration: 75,
          beneficiary: {
            firstname: "sophie",
            lastname: "Dupont",
            email: "sophie.dupont@gmail.com",
          },
          preference: "woman",
          room: "Salle de beauté",
          options: [],
        },
        {
          serviceName: "Épilation sourcils",
          format: "solo",
          price: 60,
          duration: 45,
          beneficiary: {
            firstname: "sophie",
            lastname: "Dupont",
            email: "sophie.dupont@gmail.com",
          },
          preference: "woman",
          room: "Salle de beauté",
          options: [],
        },
      ],
    },
    {
      totalDuration: 90,
      totalPrice: 85,
      id: "#ID09847695",
      status: "completed" as const,
      comment: "Service bien réalisé, cliente satisfaite.",
      datetime: "2025-06-15T16:00:00+02:00",
      services: [
        {
          serviceName: "Massage relaxant",
          format: "solo",
          price: 85,
          duration: 90,
          beneficiary: {
            firstname: "sophie",
            lastname: "Dupont",
            email: "sophie.dupont@gmail.com",
          },
          preference: "woman",
          room: "Salle de massage",
          options: [],
        },
      ],
    },
    {
      totalDuration: 60,
      totalPrice: 45,
      id: "#ID09847696",
      status: "completed" as const,
      comment: "Soin rapide avant un événement spécial.",
      datetime: "2025-05-12T09:00:00+02:00",
      services: [
        {
          serviceName: "Manucure express",
          format: "solo",
          price: 45,
          duration: 60,
          beneficiary: {
            firstname: "sophie",
            lastname: "Dupont",
            email: "sophie.dupont@gmail.com",
          },
          preference: "woman",
          room: "Salle de beauté",
          options: [],
        },
      ],
    },
    {
      totalDuration: 90,
      totalPrice: 85,
      id: "#ID09847697",
      status: "cancelled" as const,
      comment: "Annulé par la cliente pour raisons personnelles.",
      datetime: "2025-03-12T12:00:00+02:00",
      services: [
        {
          serviceName: "Massage tonifiant",
          format: "solo",
          price: 85,
          duration: 90,
          beneficiary: {
            firstname: "sophie",
            lastname: "Dupont",
            email: "sophie.dupont@gmail.com",
          },
          preference: "woman",
          room: "Salle de massage",
          options: [],
        },
      ],
    },
  ],
  information: {
    createdAt: "2025-07-27T08:30:00+02:00",
    canal: "Relax massage",
    paiment: "Bon cadeau",
  },
  notes: "",
};

const meta: Meta<typeof CustomerDetailsSideBar> = {
  title: "Organisms/SidePage/CustomerDetailsSideBar",
  component: CustomerDetailsSideBar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Composant sidebar pour afficher les détails d'un client avec ses informations personnelles, statistiques, adresse et notes.

## Props Interface

\`\`\`typescript
interface CustomerDetailsSideBarProps {
  customerData: CustomerDetailsData;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface CustomerDetailsData {
  customer: {
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    status: string;
    gender: string;
    birthday: string;
    address: {
      street: string;
      zipcode: string;
      city: string;
      country: string;
    };
  };
  stats: {
    bookingsNumber: number;
    visitNumber: number;
  };
  note: string;
  appointments: Array<{
    totalDuration: number;
    totalPrice: number;
    id: string;
    comment: string;
    status: "pending" | "confirmed" | "cancelled" | "completed";
    datetime: string;
    services: Array<{
      serviceName: string;
      format: string;
      price: number;
      duration: number;
      beneficiary: {
        firstname: string;
        lastname: string;
        email: string;
      };
      preference: string;
      room: string;
      options: Array<{
        name: string;
        price: number;
      }>;
    }>;
  }>;
  information: {
    createdAt: string;
    canal: string;
    paiment: string;
  };
  notes: string;
}
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    customerData: {
      description: "Données complètes du client avec informations personnelles, stats et rendez-vous",
      control: false,
    },
    isOpen: {
      description: "État d'ouverture/fermeture de la sidebar",
      control: { type: "boolean" },
      type: "boolean",
    },
    setIsOpen: {
      description: "Fonction callback pour contrôler l'état d'ouverture de la sidebar",
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof CustomerDetailsSideBar>;

export const Desktop: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="w-screen h-screen bg-gray-50">
        <div className="p-10">
          <div className="w-[250px]">
            <Button
              onClick={() => setIsOpen(true)}
              label="Ouvrir le profil client"
              variant="primary"
            />
          </div>
          <p className="mt-4 text-sm text-gray-600">
            Cliquez sur le bouton pour ouvrir la sidebar des détails client
          </p>
        </div>
        <CustomerDetailsSideBar
          customerData={mockCustomerData}
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
          "Profil d'une cliente VIP avec plusieurs rendez-vous confirmés, passés et annulés. Affiche toutes les fonctionnalités : informations personnelles, statistiques détaillées, notes et historique complet des appointments organisés par onglets.",
      },
    },
  },
};