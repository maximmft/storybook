import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { AppointmentCard, AppointmentData } from "./AppointmentCard";

const mockAppointmentData: AppointmentData = {
  customer: {
    firstname: "Sophie",
    lastname: "Dupont",
    email: "sophie.dupont@gmail.com",
    phoneNumber: "+33 6 23 55 67 89",
  },
  appointment: {
    totalDuration: 150,
    totalPrice: 250,
    id: "#ID09847693",
    comment: "Lorem ipsum dolor sit amet consectetur.",
    datetime: "2025-07-28T10:00:00+02:00", 
    status: "pending",
    format: "solo",
    services: [
      {
        serviceName: "Teint parfait",
        price: 150,
        duration: 90,
        beneficiary: {
          firstname: "Sophie",
          lastname: "Dupont",
          email: "sophie.dupont@gmail.com",
        },
        preference: "woman",
        room: "Salle de beauté",
        options: [],
      },
      {
        serviceName: "Beauté des mains",
        price: 50,
        duration: 30,
        beneficiary: {
          firstname: "Sophie",
          lastname: "Dupont",
          email: "sophie.dupont@gmail.com",
        },
        preference: "woman",
        room: "Salle de beauté",
        options: [],
      },
      {
        serviceName: "Massage",
        price: 50,
        duration: 30,
        beneficiary: {
          firstname: "Sophie",
          lastname: "Dupont",
          email: "sophie.dupont@gmail.com",
        },
        preference: "woman",
        room: "Salle de massage",
        options: [],
      },
    ],
  },
};

const mockAppointmentWithOptions: AppointmentData = {
  customer: {
    firstname: "Marie",
    lastname: "Martin",
    email: "marie.martin@gmail.com",
    phoneNumber: "+33 6 23 55 67 89",
  },
  appointment: {
    totalDuration: 120,
    totalPrice: 180,
    id: "#ID09847694",
    comment: "Rdv avec options spéciales.",
    datetime: "2025-07-28T10:00:00+02:00",  
    format: "solo",
    status: "confirmed",
    services: [
      {
        serviceName: "Teint parfait",
        price: 100,
        duration: 60,
        beneficiary: {
          firstname: "Marie",
          lastname: "Martin",
          email: "marie.martin@gmail.com",
        },
        preference: "woman",
        room: "Salle de beauté",
        options: [
          { name: "Produits bio", price: 20 },
          { name: "Musique relaxante", price: 10 },
        ],
      },
      {
        serviceName: "Massage",
        price: 50,
        duration: 60,
        beneficiary: {
          firstname: "Marie",
          lastname: "Martin",
          email: "marie.martin@gmail.com",
        },
        preference: "woman",
        room: "Salle de massage",
        options: [],
      },
    ],
  },
};

const mockCompletedAppointment: AppointmentData = {
  customer: {
    firstname: "Julie",
    lastname: "Leblanc",
    email: "julie.leblanc@gmail.com",
    phoneNumber: "+33 6 12 34 56 78",
  },
  appointment: {
    totalDuration: 90,
    totalPrice: 150,
    format: "solo",
    id: "#ID09847695",
    comment: "Soin terminé avec succès.",
    datetime: "2025-07-25T14:30:00+02:00",
    status: "completed",
    services: [
      {
        serviceName: "Soin du visage",
        price: 150,
        duration: 90,
        beneficiary: {
          firstname: "Julie",
          lastname: "Leblanc",
          email: "julie.leblanc@gmail.com",
        },
        preference: "woman",
        room: "Salle de beauté",
        options: [],
      },
    ],
  },
};

const meta: Meta<typeof AppointmentCard> = {
  title: "Molecules/AppointmentCard",
  component: AppointmentCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["compact", "detailed"],
    },
    size: {
      control: { type: "radio" },
      options: ["small", "medium"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof AppointmentCard>;

export const CompactSmall: Story = {
  args: {
    variant: "compact",
    size: "small",
    data: mockAppointmentData,
  },
  render: (args) => {
    return (
      <div className="w-[418px]">
        <AppointmentCard {...args} />
      </div>
    );
  },
};

export const CompactMedium: Story = {
  args: {
    variant: "compact",
    size: "medium",
    data: mockAppointmentWithOptions,
  },
  render: (args) => {
    return (
      <div className="w-[500px]">
        <AppointmentCard {...args} />
      </div>
    );
  },
};

export const Detailed: Story = {
  args: {
    variant: "detailed",
    data: mockCompletedAppointment,
  },
  render: (args) => {
    return (
      <div className="w-[800px]">
        <AppointmentCard {...args} />
      </div>
    );
  },
};