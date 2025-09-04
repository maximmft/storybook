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
    format: "solo",
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
        component: `
Composant sidebar pour afficher et modifier les détails d'une réservation avec informations client, services et notes.

## Props Interface

\`\`\`typescript
interface BookingDetailsSideBarProps {
  booking: BookingData;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface BookingData {
  status: string;
  customer: {
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
  };
  appointment: {
    totalDuration: number;
    totalPrice: number;
    id: string;
    comment: string;
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
  };
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
    booking: {
      description: "Données complètes de la réservation avec client, appointment et informations",
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