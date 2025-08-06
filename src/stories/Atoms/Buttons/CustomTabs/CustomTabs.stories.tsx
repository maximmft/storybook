import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { fn } from "storybook/test";
import CustomTabs from "./CustomTabs.tsx";
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';

const tabs = [
  { label: "Tab 1", content: "Content 1" },
  { label: "Tab 2", content: "Content 2" },
  { label: "Tab 3", content: "Content 3", disabled: true },
  { label: "Tab 4", content: "Content 4" },
];

const tabsWithIcons = [
  { 
    label: "Accueil", 
    content: "Contenu de l'accueil",
    icon: <HomeIcon />,
    iconPosition: 'start' as const
  },
  { 
    label: "Profil", 
    content: "Contenu du profil",
    icon: <PersonIcon />,
    iconPosition: 'start' as const
  },
  { 
    label: "Paramètres", 
    content: "Contenu des paramètres", 
    disabled: true,
    icon: <SettingsIcon />,
    iconPosition: 'start' as const
  },
  { 
    label: "À propos", 
    content: "Contenu à propos",
    icon: <InfoIcon />,
    iconPosition: 'end' as const
  },
  { 
    label: "Paramètres", 
    content: "Contenu des paramètres", 
    disabled: true,
    icon: <SettingsIcon />,
    iconPosition: 'start' as const
  },

];

const meta: Meta<typeof CustomTabs> = {
  title: "Atoms/Buttons/CustomTabs",
  component: CustomTabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    onChange: fn(),
    tabs: tabs
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    tabs: tabs,
    defaultValue: 0,
    variant: "standard"
  },
};

export const Secondary: Story = {
  args: {
    tabs: tabs,
    defaultValue: 0,
    variant: "solid"
  },
};


export const WithIconsSolid: Story = {
  args: {
    tabs: tabsWithIcons,
    defaultValue: 0,
    variant: "solid"
  },
};

