import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Button } from "src/stories/Atoms/Buttons/Button/Button";
import { useState } from "react";
import { ExportModal } from "./ExportModal";
import RadioButton from "src/stories/Atoms/Inputs/RadioButton/RadioButton";

const FormContent = () => {
  const [selectedExportView, setSelectedExportView] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("");

  const exportViewOptions = [
    {
      id: "export-view-filtered",
      label: "Vue filtrée",
      value: "filtered",
      description: "Exporter uniquement les données visibles après filtrage"
    },
    {
      id: "export-view-complete",
      label: "Tout le tableau",
      value: "complete", 
      description: "Exporter toutes les données du tableau"
    }
  ];

  const exportFormatOptions = [
    {
      id: "export-format-csv",
      label: "CSV",
      value: "csv",
      description: "Fichier de valeurs séparées par des virgules",
      fileExtension: ".csv"
    },
    {
      id: "export-format-excel",
      label: "Excel",
      value: "excel",
      description: "Classeur Microsoft Excel",
      fileExtension: ".xlsx"
    },
    {
      id: "export-format-pdf",
      label: "PDF",
      value: "pdf",
      description: "Document PDF pour impression",
      fileExtension: ".pdf"
    },
    {
      id: "export-format-png",
      label: "PNG",
      value: "png",
      description: "Image PNG du tableau",
      fileExtension: ".png"
    }
  ];

  const handleCheckExportView = (value: string) => {
    setSelectedExportView(value);
  };

  const handleCheckFormat = (value: string) => {
    setSelectedFormat(value);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col space-y-4">
          <p className="text-[16px]">Sélectionnez la vue d'export souhaité.</p>
          <div className="flex flex-col gap-2">
            {exportViewOptions.map((option) => (
              <RadioButton
                key={option.id}
                id={option.id}
                label={option.label}
                size="medium"
                value={option.value}
                checked={selectedExportView === option.value}
                onChange={() => handleCheckExportView(option.value)}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <p className="text-[16px]">
            Sélectionnez le format d'export souhaité.
          </p>
          <div className="flex flex-col gap-2">
            {exportFormatOptions.map((option) => (
              <RadioButton
                key={option.id}
                id={option.id}
                label={option.label}
                size="medium"
                value={option.value}
                checked={selectedFormat === option.value}
                onChange={() => handleCheckFormat(option.value)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
const meta: Meta<typeof ExportModal> = {
  title: "Organisms/Modals/ExportModal",
  component: ExportModal,
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
type Story = StoryObj<typeof ExportModal>;

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
        <ExportModal
          title="Exporter la liste des clients"
          isOpen={open}
          onClose={() => setOpen(false)}
          onSubmit={handleValidate}
          maxWidth="428px"
          maxHeight="430px"
        >
          <FormContent />
        </ExportModal>
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
