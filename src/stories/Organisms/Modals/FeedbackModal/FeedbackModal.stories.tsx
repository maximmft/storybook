import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Button } from "src/stories/Atoms/Buttons/Button/Button";
import { useState } from "react";
import { FeedbackModal } from "./FeedbackModal";
import { Dropdown } from "src/stories/Atoms/Inputs/Dropdown/Dropdown";
import { AppointmentCard } from "src/stories/Molecules/Cards/AppointmentCard/AppointmentCard";

const options = [
  { id: "1", label: "Option" },
  { id: "2", label: "Option2" },
  { id: "3", label: "Option3" },
];

const AppointmentContent = () => {
  return (
    <AppointmentCard
      data={{
        appointment: {
          date: "28/07/25",
          duration: 150,
          options: [],
          price: 250,
          rooms: ["Salle de beauté", "Salle de massage"],
          services: ["Teint parfait", "Beauté des mains", "Massage"],
          status: "pending",
          time: "10:00",
        },
        customer: {
          email: "sophie.dupont@gmail.com",
          firstname: "Sophie",
          lastname: "Dupont",
          phone: "+33 6 23 55 67 89",
        },
        id: "1",
      }}
      size="small"
      variant="compact"
    />
  );
};

const FormContent = () => {
  return (
    <>
      <div className="space-y-6">
        <Dropdown
          label="Motif d'annulation"
          required
          placeholder="Placeholder"
          options={options}
        />
      </div>
    </>
  );
};

const meta: Meta<typeof FeedbackModal> = {
  title: "Organisms/Modals/FeedbackModal",
  component: FeedbackModal,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Composant de modale de feedback réutilisable qui affiche une icône de feedback et accepte du contenu personnalisé via les children. Inclut la gestion d'état d'ouverture/fermeture et un design système cohérent.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      description: "Contenu à afficher dans la modale (optionnel)",
      control: false,
      table: {
        type: { summary: "ReactElement" },
        defaultValue: { summary: "undefined" },
      },
    },
    isOpen: {
      description: "État d'ouverture de la modale",
      control: { type: "boolean" },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onClose: {
      description: "Fonction appelée pour fermer la modale",
      action: "closed",
      table: {
        type: { summary: "() => void" },
      },
    },
    typeModal: {
      description: "Type de feedback à afficher",
      control: { type: "select" },
      options: ["question", "warning", "published", "mail"],
      table: {
        type: { summary: '"question" | "warning" | "published" | "mail"' },
      },
    },
    title: {
      description: "Titre principal de la modale",
      control: { type: "text" },
      table: {
        type: { summary: "string" },
      },
    },
    subtitle: {
      description: "Sous-titre optionnel de la modale",
      control: { type: "text" },
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    onSubmit: {
      description: "Fonction appelée lors de la soumission du formulaire",
      action: "submitted",
      table: {
        type: { summary: "() => void" },
        defaultValue: { summary: "undefined" },
      },
    },
    maxHeight: {
      description: "Hauteur maximale de la modale (en px, rem, etc.)",
      control: { type: "text" },
      table: {
        type: { summary: "string" },
      },
    },
    maxWidth: {
      description: "Largeur maximale de la modale (en px, rem, etc.)",
      control: { type: "text" },
      table: {
        type: { summary: "string" },
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof FeedbackModal>;

export const Cancellation: Story = {
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
        <FeedbackModal
          title="Pourquoi annulez-vous cette réservation?"
          subtitle="Partagez-nous le motif d'annulation."
          isOpen={open}
          typeModal="question"
          onClose={() => setOpen(false)}
          onSubmit={handleValidate}
          maxHeight="411px"
          maxWidth="397px"
        >
          <FormContent />
        </FeedbackModal>
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

export const Modify: Story = {
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
        <FeedbackModal
          title="Êtes-vous sûr de vouloir modifier cette réservation ?"
          isOpen={open}
          typeModal="warning"
          onClose={() => setOpen(false)}
          onSubmit={handleValidate}
          maxHeight="254px"
          maxWidth="397px"
        />
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

export const Appointment: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    const handleValidate = () => {
      console.log("Formulaire validé");
      setOpen(false);
    };

    const displayTitle = () => {
      return (
        <p>
          Voici votre nouvelle réservation. <br /> Souhaitez-vous la valider ?
        </p>
      );
    };

    return (
      <div className="w-[900px] h-[800px] justify-center flex flex-row items-center">
        <div>
          <Button
            variant="primary"
            label="Ouvrir"
            onClick={() => setOpen(true)}
          />
        </div>
        <FeedbackModal
          title={displayTitle()}
          isOpen={open}
          typeModal="question"
          onClose={() => setOpen(false)}
          onSubmit={handleValidate}
          maxHeight="433px"
          maxWidth="527px"
        >
          <AppointmentContent />
        </FeedbackModal>
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
