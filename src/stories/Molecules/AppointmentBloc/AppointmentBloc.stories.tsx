import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { AppointmentBloc } from "./AppointmentBloc";

const meta: Meta<typeof AppointmentBloc> = {
  title: "Molecules/AppointmentBloc",
  component: AppointmentBloc,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    service: {
      control: { type: "object" },
      description: "Détails du service avec bénéficiaire",
    },
    editMode: {
      control: { type: "boolean" },
      description: "Active le mode édition avec des inputs",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AppointmentBloc>;

export const WithoutOptions: Story = {
  args: {
    service: {
      serviceName: "Teint parfait",
      format: "Solo",
      duration: 60,
      price: 150,
      beneficiary: {
        firstname: "Sophie",
        lastname: "Dupont",
        email: "sophie.dupont@gmail.com",
      },
      preference: "Femme",
      room: "Salle de beauté",
      options: [],
    },
  },
  render: (args) => {
    return (
      <div className="w-[389px]">
        <AppointmentBloc {...args} />
      </div>
    );
  },
};

export const WithOptions: Story = {
  args: {
    service: {
      serviceName: "Soin visage complet",
      format: "Premium",
      duration: 90,
      price: 200,
      beneficiary: {
        firstname: "Marie",
        lastname: "Martin",
        email: "marie.martin@example.com",
      },
      preference: "Homme",
      room: "Salle VIP",
      options: [
        { name: "Masque hydratant", price: 10 },
        { name: "Massage relaxant", price: 15 },
        { name: "Sérum anti-âge", price: 10 },
      ],
    },
  },
  render: (args) => {
    return (
      <div className="w-[600px]">
        <AppointmentBloc {...args} />
      </div>
    );
  },
};

export const EditMode: Story = {
  args: {
    service: {
      serviceName: "Teint parfait",
      format: "Solo",
      duration: 60,
      price: 150,
      beneficiary: {
        firstname: "Sophie",
        lastname: "Dupont",
        email: "sophie.dupont@gmail.com",
      },
      preference: "Femme",
      room: "Salle de beauté",
      options: [],
    },
    editMode: true,
  },
  render: (args) => {
    return (
      <div className="w-[389px]">
        <AppointmentBloc {...args} />
      </div>
    );
  },
};
