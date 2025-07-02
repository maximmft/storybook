import type { Meta, StoryObj } from "@storybook/react-webpack5";
import Feedback from "./Feedback.tsx";

const meta: Meta<typeof Feedback> = {
  title: "Feedback",
  component: Feedback,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "published",
        "NotPublished",
        "modificationSaved",
        "modificationNotPublished",
        "error",
        "warning",
        "lastModification",
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Published: Story = {
  args: {
    variant: "published",
  },
};

export const NotPublished: Story = {
  args: {
    variant: "NotPublished",
  },
};

export const ModificationNotPublished: Story = {
  args: {
    variant: "modificationNotPublished",
  },
};

export const ModificationSaved: Story = {
  args: {
    variant: "modificationSaved",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    label: "Attention nananana",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    label: "Erreur de nananana",
  },
};

export const LastModification: Story = {
  args: {
    variant: "lastModification",
    label: "Dernière modification 16 décembre 2024 à 16:00",
  },
};
