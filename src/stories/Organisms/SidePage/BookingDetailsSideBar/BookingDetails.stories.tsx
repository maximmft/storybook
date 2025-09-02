import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { BookingDetails } from "./BookingDetails.tsx";
import { useState } from "react";
import { Button } from "src/stories/Atoms/Buttons/Button/Button.tsx";

const mockBookingData = {
  status: "pending",
  customer: {
    firstname: "sophie",
    lastname: "Dupont",
    email: "sophie.dupont@gmail.com",
    phoneNumber: "+33 6 23 45 67 89",
  },
  appointment: {
    totalDuration: 90,
    totalPrice: 250,
    id: "#ID09847693",
    datetime: "2025-07-28T10:00:00+02:00",
    comment:
      "Lorem ipsum dolor sit amet consectetur. Nunc at tellus sagittis nunc tincidunt at odio massa. Sapien adipiscing duis facilisis",
    services: [
      {
        serviceName: "Teint parfait",
        format: "solo",
        price: 150,
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
      {
        serviceName: "Beauté des mains",
        format: "solo",
        price: 100,
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
    ],
  },
  information: {
    createdAt: "2025-07-27T08:30:00+02:00",
    canal: "Relax massage",
    paiment: "Bon cadeau",
  },
  notes: "",
};

const meta: Meta<typeof BookingDetails> = {
  title: "Organisms/SidePage/BookingDetails",
  component: BookingDetails,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Composant sidebar pour afficher et modifier les détails d'une réservation avec informations client, services et notes.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    booking: {
      description: "Données complètes de la réservation",
      control: { type: "object" },
      table: {
        type: {
          summary: "BookingData",
          detail: `{
  status: string; // "pending" | "confirmed" | "cancelled" | "completed"
  customer: {
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
  };
  appointment: {
    totalDuration: number; // en minutes
    totalPrice: number; // en euros
    id: string; // identifiant de la réservation
    comment: string; // commentaire du client
    datetime: string; // format ISO datetime (ex: "2025-07-28T10:00:00+02:00")
    services: Array<{
      serviceName: string;
      format: string; // "solo" | "duo" | etc.
      price: number; // en euros
      duration: number; // en minutes
      beneficiary: {
        firstname: string;
        lastname: string;
        email: string;
      };
      preference: string; // "woman" | "man" | etc.
      room: string; // nom de la salle
      options: Array<{
        name: string;
        price: number;
      }>;
    }>;
  };
  information: {
    createdAt: string; // date de création au format ISO datetime
    canal: string; // canal de réservation
    paiment: string; // moyen de paiement
  };
  notes: string; // notes sur la prestation
}`
        }
      }
    },
    isOpen: {
      description: "État d'ouverture/fermeture de la sidebar",
      control: { type: "boolean" },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" }
      }
    },
    setIsOpen: {
      description: "Fonction callback pour contrôler l'état d'ouverture de la sidebar",
      control: false,
      table: {
        type: { summary: "(isOpen: boolean) => void" }
      },
      action: "setIsOpen"
    }
  },
};

export default meta;
type Story = StoryObj<typeof BookingDetails>;

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
        <BookingDetails
          booking={mockBookingData}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Sidebar des détails de réservation avec mode consultation et édition. Affiche les informations client, services réservés, commentaires et permet la modification des détails.",
      },
    },
  },
};