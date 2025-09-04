import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Button } from "src/stories/Atoms/Buttons/Button/Button";
import { useState } from "react";
import { FeedbackModal } from "./FeedbackModal";
import { Dropdown } from "src/stories/Atoms/Inputs/Dropdown/Dropdown";
import { AppointmentCard } from "src/stories/Molecules/Cards/AppointmentCard/AppointmentCard";
import { useForm } from "react-hook-form";

const options = [
  { id: "1", label: "Client indisponible" },
  { id: "2", label: "Changement de planning" },
  { id: "3", label: "Problème technique" },
  { id: "4", label: "Autre raison" },
];

const AppointmentContent = () => {
  return (
    <AppointmentCard
      data={{
        customer: {
          firstname: "Sophie",
          lastname: "Dupont",
          email: "sophie.dupont@gmail.com",
          phoneNumber: "+33 6 23 55 67 89", 
        },
        appointment: {
          totalDuration: 150, 
          totalPrice: 250, 
          id: "#ID09847693",
          comment: "Nouvelle réservation", 
          datetime: "2025-07-28T10:00:00+02:00", 
          status: "pending" as const,
          format: "solo",
          services: [
            {
              serviceName: "Teint parfait",
              price: 150,
              duration: 90,
              beneficiary: {
                firstname: "Sophie",
                lastname: "Dupont",
                email: "sophie.dupont@gmail.com",
              },
              preference: "woman",
              room: "Salle de beauté",
              options: [],
            },
            {
              serviceName: "Beauté des mains",
              price: 50,
              duration: 30,
              beneficiary: {
                firstname: "Sophie",
                lastname: "Dupont",
                email: "sophie.dupont@gmail.com",
              },
              preference: "woman",
              room: "Salle de beauté",
              options: [],
            },
            {
              serviceName: "Massage",
              price: 50,
              duration: 30,
              beneficiary: {
                firstname: "Sophie",
                lastname: "Dupont",
                email: "sophie.dupont@gmail.com",
              },
              preference: "woman",
              room: "Salle de massage",
              options: [],
            },
          ],
        },
      }}
      size="small"
      variant="compact"
    />
  );
};

const FormContent = () => {
  const { register, watch } = useForm({
    defaultValues: {
      cancellationReason: "", 
    },
  });

  return (
    <div className="space-y-6">
      <Dropdown
        label="Motif d'annulation"
        required
        placeholder="Sélectionner un motif"
        options={options}
        register={register("cancellationReason")}
        fieldName="cancellationReason"
        watch={watch}
      />
    </div>
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
          "Modale d'annulation avec formulaire incluant un dropdown pour sélectionner le motif d'annulation.",
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
          "Modale de confirmation de modification avec boutons d'action.",
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
          "Modale de validation de rendez-vous avec affichage de l'AppointmentCard.",
      },
    },
  },
};