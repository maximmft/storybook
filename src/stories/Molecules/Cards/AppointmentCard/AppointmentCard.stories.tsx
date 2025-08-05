import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { AppointmentCard, AppointmentData } from "./AppointmentCard";

const mockAppointmentData: AppointmentData = {
  id: "1",
  customer: {
    firstname: "Sophie",
    lastname: "Dupont",
    email: "sophie.dupont@gmail.com",
    phone: "+33 6 23 55 67 89",
  },
  appointment: {
    date: "28/07/25",
    time: "10:00",
    duration: 150,
    price: 250,
    services: ["Teint parfait", "Beauté des mains", "Massage"],
    rooms: ["Salle de beauté", "Salle de massage"],
    options: [],
    status: "pending",
  },
};

const mockAppointmentWithOptions: AppointmentData = {
  id: "2",
  customer: {
    firstname: "Marie",
    lastname: "Martin",
    email: "marie.martin@gmail.com",
    phone: "+33 6 23 55 67 89",
  },
  appointment: {
    date: "28/07/25",
    time: "10:00",
    duration: 120,
    price: 180,
    services: ["Teint parfait", "Beauté des mains", "Massage"],
    rooms: ["Salle de beauté", "Salle de massage"],
    options: ["Produits bio", "Musique relaxante"],
    status: "pending",
  },
};

const mockCompletedAppointment: AppointmentData = {
  id: "3",
  customer: {
    firstname: "Julie",
    lastname: "Leblanc",
    email: "julie.leblanc@gmail.com",
    phone: "+33 6 12 34 56 78",
  },
  appointment: {
    date: "25/07/25",
    time: "14:30",
    duration: 90,
    price: 150,
    services: ["Soin du visage"],
    rooms: ["Salle de beauté"],
    options: [],
    status: "pending",
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
      <div className="w-[318px]">
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
