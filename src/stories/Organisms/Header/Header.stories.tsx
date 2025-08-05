import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Header } from "./Header.tsx";

const meta: Meta<typeof Header> = {
  title: "Organisms/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Composant Header avec navigation, icônes d'action et profil utilisateur.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    user: {
      control: "object",
      description: "Informations de l'utilisateur connecté",
    },
    title: {
      control: "text",
      description: "Titre de la page",
    },
    pathname: {
      control: {
        type: "radio",
      },
      options: ["/", "/customer", "/availabilities"],
      description: "Chemin simulé pour les tests",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

const defaultUser = {
  picture: "/brochure_hotel.png",
  firstname: "Sophie",
  lastname: "Durant",
};

export const Default: Story = {
  args: {
    user: defaultUser,
    pathname: "/",
    title: "Accueil",
  },
};

export const CustomerPage: Story = {
  args: {
    user: defaultUser,
    pathname: "/customer",
    title: "Client",
  },
};

export const AvailabilitiesPage: Story = {
  args: {
    user: defaultUser,
    pathname: "/availabilities",
    title: "Disponibilités",
  },
};