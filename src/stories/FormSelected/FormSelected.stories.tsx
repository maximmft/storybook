import type { Meta, StoryObj } from "@storybook/react-webpack5";
import FormSelected from "./FormSelected.tsx";
import { Grid } from "lucide-react";

const meta: Meta<typeof FormSelected> = {
  title: "Components/FormSelected",
  component: FormSelected,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    title: {
      control: { type: "text" },
      description: "Main title of the accordion"
    },
    subtitle: {
      control: { type: "text" },
      description: "Optional subtitle/description"
    },
    disabled: {
      control: { type: "boolean" },
    },
    initiallyOpen: {
      control: { type: "boolean" },
      description: "Whether the accordion starts open"
    },
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "Nom de la solution/plateforme",
    subtitle: "Bénéficiez d'un canal de réservation en ligne disponible 24h/24 - 7j",
    disabled: false,
    initiallyOpen: false,
    icon: <Grid size={14}/>,
    children: (
      <div>
        <p className="mb-3 text-sm">
          Cette solution vous permet de gérer vos réservations de manière autonome.
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-1 text-xs">
          <li>Nana</li>
          <li>Nono</li>
          <li>Nunu</li>
          <li>Nene</li>
        </ul>
      </div>
    )
  },
};

export const InitiallyOpen: Story = {
  args: {
    title: "Nom de la solution/plateforme",
    subtitle: "Bénéficiez d'un canal de réservation en ligne disponible 24h/24 - 7j",
    disabled: false,
    initiallyOpen: true,
    icon: <Grid size={14}/>,
    children: (
      <div className=" space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Nana</span>
          <input type="checkbox" className="rounded" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Tata</span>
          <input type="checkbox" className="rounded" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Lala</span>
          <input type="checkbox" className="rounded" defaultChecked />
        </div>
      </div>
    )
  },
};

export const Disabled: Story = {
  args: {
    title: "Nom de la solution/plateforme",
    subtitle: "Bénéficiez d'un canal de réservation en ligne disponible 24h/24 - 7j",
    disabled: true,
    initiallyOpen: false,
    icon: <Grid size={14}/>,
    children: (
      <div className="p-4 bg-gray-100 rounded-lg">
        <p className="text-gray-500">
          Contenu disponible uniquement avec un abonnement premium.
        </p>
      </div>
    )
  },
};
