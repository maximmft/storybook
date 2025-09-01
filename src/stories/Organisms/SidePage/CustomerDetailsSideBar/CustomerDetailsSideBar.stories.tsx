import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { CustomerDetailsSideBar } from "./CustomerDetailsSideBar.tsx";
import { useState } from "react";
import { Button } from "src/stories/Atoms/Buttons/Button/Button.tsx";

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
      status: 'confirmed' as const,
      comment: "Lorem ipsum dolor sit amet consectetur. Nunc at tellus sagittis nunc tincidunt at odio massa.",
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
      status: 'confirmed' as const,
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
      id: "#ID09847692",
      status: 'cancelled' as const,
      comment: "Annulé par la cliente pour raisons personnelles.",
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
      totalDuration: 90,
      totalPrice: 85,
      id: "#ID09847692",
      status: 'cancelled' as const,
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
        component:
          "Composant sidebar pour afficher les détails d'un client avec ses informations personnelles, statistiques, adresse et notes.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof CustomerDetailsSideBar>;

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
        story: "Version desktop de la sidebar avec les détails du client et plusieurs rendez-vous.",
      },
    },
  },
};