import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Notification } from "./Notification";

const meta: Meta<typeof Notification> = {
  title: "Molecules/Notification",
  component: Notification,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Story avec toutes les notifications
export const Default: Story = {
  args: {
    notifications: [
      { bookingId: "1", statut: "CANCELLED", name: "Jérome" },
      { bookingId: "2", statut: "MODIFIED", name: "Natalie" },
      { bookingId: "3", statut: "NEW", name: "Natalie" },
    ]
  },
};

// Story avec une seule notification annulée
export const SingleCancelled: Story = {
  args: {
    notifications: [
      { bookingId: "1", statut: "CANCELLED", name: "Jérome" }
    ]
  },
};

// Story avec une seule notification modifiée
export const SingleModified: Story = {
  args: {
    notifications: [
      { bookingId: "2", statut: "MODIFIED", name: "Natalie" }
    ]
  },
};

// Story avec une seule nouvelle notification
export const SingleNew: Story = {
  args: {
    notifications: [
      { bookingId: "3", statut: "NEW", name: "Marie" }
    ]
  },
};


export const ManyNotifications: Story = {
  args: {
    notifications: [
      { bookingId: "1", statut: "NEW", name: "Alice" },
      { bookingId: "2", statut: "MODIFIED", name: "Bob" },
      { bookingId: "3", statut: "CANCELLED", name: "Charlie" },
      { bookingId: "4", statut: "NEW", name: "Diana" },
      { bookingId: "5", statut: "MODIFIED", name: "Eve" },
      { bookingId: "6", statut: "CANCELLED", name: "Frank" },
      { bookingId: "7", statut: "NEW", name: "Grace" }
    ]
  },
};