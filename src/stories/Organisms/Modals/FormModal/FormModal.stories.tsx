import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Button } from "src/stories/Atoms/Buttons/Button/Button";
import { ClassicInput } from "src/stories/Atoms/Inputs/ClassicInput/ClassicInput";
import { useState } from "react";
import { FormModal } from "./FormModal";
import { useForm } from "react-hook-form";

const FormContent = () => {
  const { register, watch } = useForm();

  return (
    <>
      <div className="space-y-6">
        <ClassicInput
          label="Label title"
          required
          placeholder="Placeholder"
          register={register("input1")}
          fieldName="input1"
          watch={watch}
        />

        <ClassicInput
          label="Label title"
          required
          placeholder="Placeholder"
          register={register("input2")}
          fieldName="input2"
          watch={watch}
        />

        <ClassicInput
          label="Label title"
          required
          placeholder="Placeholder"
          register={register("input3")}
          fieldName="input3"
          watch={watch}
        />
        <ClassicInput
          label="Label title"
          required
          placeholder="Placeholder"
          register={register("input4")}
          fieldName="input4"
          watch={watch}
        />
        <ClassicInput
          label="Label title"
          required
          placeholder="Placeholder"
          register={register("input5")}
          fieldName="input5"
          watch={watch}
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
      description:
        "Fonction appelée pour fermer la modale (pour usage externe)",
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
      console.log("Formulaire validé");
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
        <div className="max-h-[587px] max-w-[527px]">
          <FormModal
            title="Titre de la modale"
            subtitle="Remplissez les champs ci-dessous afin de ..."
            isOpen={open}
            onClose={() => setOpen(false)}
            onSubmit={handleValidate}
            maxWidth="527px"
            maxHeight="587px"
            labelButtonRight="Confirmer"
          >
            <FormContent />
          </FormModal>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Version desktop de la modale avec état contrôlé depuis la story.",
      },
    },
  },
};
