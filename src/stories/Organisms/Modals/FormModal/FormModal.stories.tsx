import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Button } from "src/stories/Atoms/Buttons/Button/Button";
import { ClassicInput } from "src/stories/Atoms/Inputs/ClassicInput/ClassicInput";
import { useState } from "react";
import { FormModal } from "./FormModal";

const FormContent = () => {
  return (
    <>
     

      <div className="space-y-6">
        <ClassicInput
          label="Label title"
          required
          placeholder="Placeholder"
        />

        <ClassicInput
          label="Label title"
          required
          placeholder="Placeholder"
        />

        <ClassicInput
          label="Label title"
          required
          placeholder="Placeholder"
        />
        
        <ClassicInput
          label="Label title 4"
          required
          placeholder="Placeholder"
        />
        
        <ClassicInput
          label="Label title 5"
          required
          placeholder="Placeholder"
        />
        
        <ClassicInput
          label="Label title 6"
          required
          placeholder="Placeholder"
        />
      </div>
    </>
  );
};

const meta: Meta<typeof FormModal> = {
  title: "Organisms/Modals/FormModal",
  component: FormModal,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Composant de modale formulaire réutilisable qui accepte du contenu personnalisé via les children. Inclut la gestion d'état d'ouverture/fermeture et un design système cohérent.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      description: "Contenu à afficher dans la modale",
    },
    isOpen: {
      description: "État d'ouverture de la modale (pour usage externe)",
    },
    onClose: {
      description: "Fonction appelée pour fermer la modale (pour usage externe)",
    },
    onSubmit: {
      description: "Fonction appelée lors de la soumission du formulaire",
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormModal>;

export const Desktop: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    const handleValidate = () => {
      console.log('Formulaire validé');
      setOpen(false);
    };

    return (
      <div className="w-[900px] h-[800px] justify-center flex flex-row items-center">
        <div>
          <Button
            variant="primary"
            label="Ouvrir"
            onClick={() => setOpen(true)}
            className="mb-4"
          />
        </div>
        <FormModal
          title="Titre de la modale"
          subtitle="Remplissez les champs ci-dessous afin de ..."
          isOpen={open}
          onClose={() => setOpen(false)}
          onSubmit={handleValidate}
        >
          <FormContent />
        </FormModal>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Version desktop de la modale avec état contrôlé depuis la story.",
      },
    },
  },
};