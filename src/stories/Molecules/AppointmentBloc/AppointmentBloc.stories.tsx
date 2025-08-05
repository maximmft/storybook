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
    customers: {
      control: { type: "object" },
      description: "Tableau des clients (1 pour solo, 2 pour duo)"
    },
    service: {
      control: { type: "object" },
      description: "Détails du service"
    },
    providers: {
      control: { type: "object" },
      description: "Tableau des préférences de prestataires"
    },
    room: {
      control: { type: "text" },
      description: "Salle de prestation"
    },
    editMode: {
      control: { type: "boolean" },
      description: "Active le mode édition avec des inputs"
    },
    options: {
      control: { type: "object" },
      description: "Options supplémentaires"
    }
  },
}
export const EditMode: Story = {
  args: {
    customers: [
      {
        firstName: "Sophie",
        lastName: "Dupont",
        email: "sophie.dupont@gmail.com"
      }
    ],
    service: {
      name: "Teint parfait",
      type: "Solo",
      duration: 60,
      price: 150
    },
    providers: [
      {
        preference: "Femme"
      }
    ],
    room: "Salle de beauté",
    options: [],
    editMode: true
  },
  render: (args) => {
    return (
      <div className="w-[389px]">
        <AppointmentBloc {...args} />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof AppointmentBloc>;

export const WithoutOptions: Story = {
  args: {
    customers: [
      {
        firstName: "Sophie",
        lastName: "Dupont",
        email: "sophie.dupont@gmail.com"
      }
    ],
    service: {
      name: "Teint parfait",
      type: "Solo",
      duration: 60,
      price: 150
    },
    providers: [
      {
        preference: "Femme"
      }
    ],
    room: "Salle de beauté",
    options: []
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
    customers: [
      {
        firstName: "Marie",
        lastName: "Martin",
        email: "marie.martin@example.com"
      }
    ],
    service: {
      name: "Soin visage complet",
      type: "Premium",
      duration: 90,
      price: 200
    },
    providers: [
      {
        preference: "Homme"
      }
    ],
    room: "Salle VIP",
    options: [
      {
        name: "Masque hydratant",
        price: 25
      },
      {
        name: "Massage relaxant",
        price: 35
      },
      {
        name: "Sérum anti-âge",
        price: 40
      }
    ]
  },
  render: (args) => {
    return (
      <div className="w-[600px]">
        <AppointmentBloc {...args} />
      </div>
    );
  },
};

export const WithDuo: Story = {
  args: {
    customers: [
      {
        firstName: "Sophie",
        lastName: "Dupont",
        email: "sophie.dupont@gmail.com"
      },
      {
        firstName: "Jean",
        lastName: "Martin",
        email: "jean.martin@gmail.com"
      }
    ],
    service: {
      name: "Massage duo relaxant",
      type: "Duo",
      duration: 90,
      price: 300
    },
    providers: [
      {
        preference: "Femme"
      },
      {
        preference: "Homme"
      }
    ],
    room: "Salle couple",
    options: [
      {
        name: "Huiles essentielles",
        price: 20
      }
    ]
  },
  render: (args) => {
    return (
      <div className="w-[600px]">
        <AppointmentBloc {...args} />
      </div>
    );
  },
};