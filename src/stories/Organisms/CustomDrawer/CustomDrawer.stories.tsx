import { Meta, StoryObj } from "@storybook/react-webpack5";
import { CustomDrawer } from "./CustomDrawer";
import { useState } from "react";
import { Button } from "src/stories/Atoms/Buttons/Button/Button";
import { Pencil } from "lucide-react";
import Tag from "src/stories/Atoms/Informations/Tag/Tag";

const meta: Meta<typeof CustomDrawer> = {
  title: 'Organisms/CustomDrawer',
  component: CustomDrawer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Contrôle l\'ouverture/fermeture du drawer',
    },
    title: {
      control: 'text',
      description: 'Titre affiché dans le header',
    },
    width: {
      control: 'text',
      description: 'Largeur du drawer',
    },
    children: {
      control: false,
      description: 'Contenu principal du drawer',
    },
    footer: {
      control: false,
      description: 'Contenu du footer (optionnel)',
    },
    headerTag: {
      control: false,
      description: 'Éléments supplémentaires dans le header (optionnel)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const DrawerTemplate = (args: any) => {
  const [isOpen, setIsOpen] = useState(args.isOpen);
  
  return (
    <div className="h-screen">
      <div className="p-8">
        <Button 
          label="Ouvrir le drawer" 
          onClick={() => setIsOpen(true)}
        />
      </div>
      <CustomDrawer 
        {...args} 
        isOpen={isOpen} 
        setIsOpen={setIsOpen}
      />
    </div>
  );
};

export const Default: Story = {
  render: DrawerTemplate,
  args: {
    isOpen: false,
    title: "Mon Drawer",
    children: (
      <div className="space-y-4">
        <p>Contenu du drawer...</p>
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Section 1</h3>
          <p>Voici du contenu dans une section.</p>
        </div>
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Section 2</h3>
          <p>Voici du contenu dans une autre section.</p>
        </div>
      </div>
    ),
  },
};

export const WithFooter: Story = {
  render: DrawerTemplate,
  args: {
    isOpen: false,
    title: "Drawer avec Footer",
    children: (
      <div className="space-y-4">
        <p>Contenu du drawer avec un footer...</p>
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Informations</h3>
          <p>Ce drawer contient des boutons d'action dans le footer.</p>
        </div>
      </div>
    ),
    footer: (
      <>
        <Button label="Action principale" icon={Pencil} />
        <Button label="Annuler" variant="secondary" />
        <div className="w-fit">
          <Button
            label="Action de suppression"
            variant="tertiary"
            error
          />
        </div>
      </>
    ),
  },
};

export const WithHeaderTag: Story = {
  render: DrawerTemplate,
  args: {
    isOpen: false,
    title: "Drawer avec Tag",
    headerTag: <Tag status="pending" />,
    children: (
      <div className="space-y-4">
        <p>Ce drawer a un tag dans le header...</p>
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Status</h3>
          <p>Le tag dans le header indique le statut "En attente".</p>
        </div>
      </div>
    ),
  },
};

export const CustomWidth: Story = {
  render: DrawerTemplate,
  args: {
    isOpen: false,
    title: "Drawer Personnalisé",
    width: "600px",
    children: (
      <div className="space-y-4">
        <p>Ce drawer a une largeur personnalisée de 600px...</p>
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Largeur</h3>
          <p>La largeur peut être ajustée selon vos besoins.</p>
        </div>
      </div>
    ),
    footer: (
      <Button label="Valider" />
    ),
  },
};

export const LongContent: Story = {
  render: DrawerTemplate,
  args: {
    isOpen: false,
    title: "Contenu Long",
    children: (
      <div className="space-y-4">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="p-4 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Section {i + 1}</h3>
            <p>
              Contenu de la section {i + 1}. Lorem ipsum dolor sit amet, 
              consectetur adipiscing elit. Sed do eiusmod tempor incididunt 
              ut labore et dolore magna aliqua.
            </p>
          </div>
        ))}
      </div>
    ),
    footer: (
      <Button label="Sauvegarder" />
    ),
  },
};
