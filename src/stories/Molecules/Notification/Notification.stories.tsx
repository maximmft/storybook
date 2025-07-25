import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Notification } from "./Notification";

const meta: Meta<typeof Notification> = {
  title: "Molecules/Notification",
  component: Notification,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    notifications: {
      control: "object",
      description: "Liste des notifications à afficher",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Notification>;

export const Default: Story = {
  args: {
    notifications: [
      {
        bookingId: "1",
        statut: "CANCELLED",
        name: "Jérome",
        time: "2025-07-25T08:55:00Z",
      },
    ],
  },
};

export const Multiple: Story = {
  args: {
    notifications: [
      {
        bookingId: "1",
        statut: "NEW",
        name: "Abou",
        time: "2025-07-22T07:00:00Z",
      },
      {
        bookingId: "2",
        statut: "MODIFIED",
        name: "Vincent",
        time: "2025-07-22T08:15:00Z",
      },
      {
        bookingId: "3",
        statut: "CANCELLED",
        name: "Valina",
        time: "2025-07-22T09:30:00Z",
      },
    ],
  },
};
