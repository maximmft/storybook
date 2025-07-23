import type { Meta, StoryObj } from "@storybook/react-webpack5";
import Feedback from "./Feedback.tsx";

const meta: Meta<typeof Feedback> = {
  title: "Informations/Feedback",
  component: Feedback,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["statut", "modale"],
    },
    type: {
      control: { type: "select" },
      options: [
        "published",
        "NotPublished", 
        "modificationSaved",
        "modificationNotPublished",
        "error",
        "warning",
        "lastModification",
        "question"
      ],
    },
    label: {
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Feedback>;

export const Published: Story = {
  args: {
    type: "published",
    variant: "statut",
  },
};

export const NotPublished: Story = {
  args: {
    type: "NotPublished",
    variant: "statut",
  },
};

export const ModificationNotPublishedYet: Story = {
  args: {
    type: "modificationNotPublished",
    variant: "statut",
  },
};

export const ModificationSaved: Story = {
  args: {
    type: "modificationSaved",
    variant: "statut",
  },
};

export const Warning: Story = {
  args: {
    type: "warning",
    label: "Attention nananana",
    variant: "statut",
  },
};

export const Error: Story = {
  args: {
    type: "error",
    label: "Erreur de nananana",
    variant: "statut",
  },
};

export const LastModification: Story = {
  args: {
    type: "lastModification",
    label: "Dernière modification 16 décembre 2024 à 16:00",
    variant: "statut",
  },
};

export const PublishedModal: Story = {
  args: {
    type: "published",
    variant: "modale",
  },
};

export const WarningModal: Story = {
  args: {
    type: "warning",
    variant: "modale",
  },
};

export const QuestionModal: Story = {
  args: {
    type: "question",
    variant: "modale",
  },
};

export const MailModal: Story = {
  args: {
    type: "mail",
    variant: "modale",
  },
};
