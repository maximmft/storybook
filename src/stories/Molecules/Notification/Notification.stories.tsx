import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Notification } from "./Notification";

const meta: Meta = {
  title: "Molecules/Notification",
  component: Notification,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    notifications: [
      { bookingId: "1", statut: "CANCELLED", name: "Jérome", time: "2025-07-25T08:55:00Z" },
      { bookingId: "2", statut: "MODIFIED", name: "Natalie", time: "2025-07-25T08:15:00Z" },
      { bookingId: "3", statut: "NEW", name: "Natalie", time: "2025-07-22T12:30:00Z" },
    ],
  },
};

export const SingleCancelled: Story = {
  args: {
    notifications: [
      { bookingId: "1", statut: "CANCELLED", name: "Jérome", time: "2025-07-25T08:55:00Z" },
    ],
  },
};

export const SingleModified: Story = {
  args: {
    notifications: [
      { bookingId: "2", statut: "MODIFIED", name: "Natalie", time: "2025-07-22T11:30:00Z" },
    ],
  },
};

export const SingleNew: Story = {
  args: {
    notifications: [
      { bookingId: "3", statut: "NEW", name: "Marie", time: "2025-07-22T13:45:00Z" },
    ],
  },
};

export const ManyNotifications: Story = {
  args: {
    notifications: [
      { bookingId: "1", statut: "NEW", name: "Abou", time: "2025-07-22T07:00:00Z" },
      { bookingId: "2", statut: "MODIFIED", name: "Vincent", time: "2025-07-22T08:15:00Z" },
      { bookingId: "3", statut: "CANCELLED", name: "Valina", time: "2025-07-22T09:30:00Z" },
      { bookingId: "4", statut: "NEW", name: "Alice", time: "2025-07-22T10:45:00Z" },
      { bookingId: "5", statut: "MODIFIED", name: "Marius", time: "2025-07-22T12:00:00Z" },
      { bookingId: "6", statut: "CANCELLED", name: "Coline", time: "2025-07-22T13:15:00Z" },
      { bookingId: "7", statut: "NEW", name: "Ismail", time: "2025-07-22T14:30:00Z" },
    ],
  },
};
