import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { BookingDelayCard } from "./BookingDelayCard";

const meta: Meta<typeof BookingDelayCard> = {
  title: "Molecules/Cards/BookingDelayCard",
  component: BookingDelayCard,
  parameters: {
    layout: "centered",
 
  },
  tags: ["autodocs"],
  argTypes: {
    allowLastBooking: {
      control: { type: "boolean" },
      description: "État du toggle pour autoriser les réservations de dernière minute",
      table: {
        type: { summary: "boolean" },
      }
    },
    minimumDelayText: {
      control: { type: "text" },
      description: "Texte décrivant le délai minimum requis",
      table: {
        type: { summary: "string" },
      }
    },
    onToggle: {
      description: "Callback function called when toggle state changes",
      action: "toggled",
    },
  }
};

export default meta;
type Story = StoryObj<typeof BookingDelayCard>;


export const Default: Story = {
  args: {
    allowLastBooking: false,
    minimumDelayText: "Au moins 1 jour avant",
  },
  parameters: {
    docs: {
      description: {
        story: "État par défaut avec un délai minimum d'une journée et les réservations de dernière minute désactivées."
      }
    }
  }
};

