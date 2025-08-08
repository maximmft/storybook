import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { BookingDetailsSideBar } from "./BookingDetailsSideBar.tsx";

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
    date: "28/07/2025",
    time: "10:00",
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
        preference: "Femme",
        room: "Salle de beauté",
        options: []
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
        options: []
      },
    ],
  },
  information: {
    createdAt: "27/07/2025",
    canal: "Relax massage",
    paiment: "Bon cadeau"
  },
  notes: ""
};

const meta: Meta<typeof BookingDetailsSideBar> = {
  title: "Organisms/BookingDetailsSideBar",
  component: BookingDetailsSideBar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Composant Footer avec navigation, newsletter et réseaux sociaux. Comprend une section de liens organisés en colonnes, un formulaire d'inscription à la newsletter et les icônes des réseaux sociaux.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof BookingDetailsSideBar>;

export const Desktop: Story = {
  render: () => {
    return (
      <div className="w-screen bg-slate-400">
        <BookingDetailsSideBar booking={mockBookingData} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Version desktop du footer avec une largeur fixe de 1440px.",
      },
    },
  },
};
