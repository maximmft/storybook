import { BarChart3, Home, Settings, Users, FileText } from "lucide-react";
import { NavItem } from "./NavItem";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

const meta: Meta<typeof NavItem> = {
  title: "Atoms/Buttons/NavItem",
  component: NavItem,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#334155' },
        { name: 'light', value: '#ffffff' },
      ],
    },
  },
  tags: ["autodocs"],
  argTypes: {
    setting: {
      control: { type: "text" },
      description: "Le texte affiché dans le NavItem",
    },
    isActive: {
      control: { type: "boolean" },
      description: "État actif du NavItem",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Désactive le NavItem",
    },
    icon: {
      control: { type: "select" },
      options: ["none", "home", "dashboard", "users", "settings", "documents"],
      mapping: {
        none: undefined,
        home: Home,
        dashboard: BarChart3,
        users: Users,
        settings: Settings,
        documents: FileText,
      },
      description: "L'icône affichée à côté du texte",
    },
    onClick: {
      action: "clicked",
      description: "Fonction appelée lors du clic",
    },
  },
  args: {
    setting: "Dashboard",
    isActive: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    setting: "Dashboard",
    icon: BarChart3,
  },
};

export const Active: Story = {
  args: {
    setting: "Dashboard",
    icon: BarChart3,
    isActive: true,
  },
};

export const Disabled: Story = {
  args: {
    setting: "Dashboard",
    icon: BarChart3,
    disabled: true,
  },
};

export const WithHomeIcon: Story = {
  args: {
    setting: "Accueil",
    icon: Home,
  },
};

export const WithUsersIcon: Story = {
  args: {
    setting: "Utilisateurs",
    icon: Users,
  },
};

export const WithSettingsIcon: Story = {
  args: {
    setting: "Paramètres",
    icon: Settings,
  },
};

export const WithoutIcon: Story = {
  args: {
    setting: "Sans icône",
    icon: undefined,
  },
};


export const AllStates: Story = {
  render: () => (
    <div className="space-y-4">
      <NavItem setting="Default" icon={BarChart3} />
      <NavItem setting="Active" icon={BarChart3} isActive={true} />
      <NavItem setting="Disabled" icon={BarChart3} disabled={true} />
    </div>
  ),
  parameters: {
    controls: { disable: true },
  },
};