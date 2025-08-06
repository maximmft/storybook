import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { SideNav } from "./SideNav.tsx";
import { BarChart3, Bell, Building, Calendar, Link, Settings, Shield, Users } from "lucide-react";
import { useState } from "react";

const menuGroups = [
  {
    items: [
      { id: "Dashboard", label: "Dashboard", icon: BarChart3 },
      { id: "Réservations", label: "Réservations", icon: Calendar },
    ],
  },
  {
    subtitle: "Réglages",
    items: [
      { id: "Clients", label: "Clients", icon: Users },
      { id: "Établissement", label: "Établissement", icon: Building },
      { id: "Connexion API", label: "Connexion API", icon: Link },
      { id: "Paramètres", label: "Paramètres", icon: Settings },
    ]
  },
  {
    subtitle: "Support",
    items: [
      { id: "Notifications", label: "Notifications", icon: Bell },
      { id: "Sécurité", label: "Sécurité", icon: Shield },
    ]
  }
];

const simpleGroups = [
  {
    items: [
      { id: "Dashboard", label: "Dashboard", icon: BarChart3 },
      { id: "Réservations", label: "Réservations", icon: Calendar },
      { id: "Clients", label: "Clients", icon: Users },
    ],
  }
];

const meta: Meta<typeof SideNav> = {
  title: "Organisms/SideNav",
  component: SideNav,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Composant de navigation latérale dynamique avec titre personnalisable et liens organisés par sections avec sous-titres.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: {
        type: "text",
      },
      description: "Titre affiché en en-tête de la navigation",
      defaultValue: "Espace Pro",
    },
    showBackButton: {
      control: "boolean",
      description: "Afficher le bouton de retour",
      defaultValue: true,
    },
    menuGroups: {
      control: false, 
      description: `Groupes de menu à afficher. Structure attendue :
      
\`\`\`typescript
MenuGroup[] = [
  {
    subtitle?: string, // Sous-titre optionnel du groupe
    items: MenuItem[] // Liste des éléments de menu
  }
]

MenuItem = {
  id: string,        // Identifiant unique
  label: string,     // Texte affiché
  icon: ComponentType<any> // Composant d'icône
}
\`\`\`

**Exemple :**
\`\`\`typescript
[
  {
    subtitle: "Réglages",
    items: [
      { id: "clients", label: "Clients", icon: Users },
      { id: "settings", label: "Paramètres", icon: Settings }
    ]
  }
]
\`\`\``,
      table: {
        type: {
          summary: "MenuGroup[]",
          detail: `interface MenuGroup {
  subtitle?: string;
  items: MenuItem[];
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}`
        }
      }
    },
    selectedItem: {
      control: {
        type: "text",
      },
      description: "ID de l'élément actuellement sélectionné",
      table: {
        type: { summary: "string" }
      }
    },
    onItemClick: {
      control: false,
      description: "Fonction appelée lors du clic sur un élément de menu",
      table: {
        type: { summary: "(item: string) => void" }
      }
    },
  },
};

export default meta;
type Story = StoryObj<typeof SideNav>;

export const EspacePro: Story = {
  args: {
    title: "Espace Pro",
    showBackButton: true,
  },
  render: (args) => {
    const [selectedItem, setSelectedItem] = useState("Dashboard");
    
    const handleItemClick = (item: string) => {
      setSelectedItem(item);
    };
    
    return (
      <div className="h-screen">
        <SideNav
          {...args}
          menuGroups={menuGroups}
          onItemClick={handleItemClick}
          selectedItem={selectedItem}
        />
      </div>
    );
  },
};

export const Simple: Story = {
  args: {
    title: "Navigation",
    showBackButton: false,
  },
  render: (args) => {
    const [selectedItem, setSelectedItem] = useState("Dashboard");
    
    const handleItemClick = (item: string) => {
      setSelectedItem(item);
    };
    
    return (
      <div className="h-screen">
        <SideNav
          {...args}
          menuGroups={simpleGroups}
          onItemClick={handleItemClick}
          selectedItem={selectedItem}
        />
      </div>
    );
  },
};