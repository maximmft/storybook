import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { ExceptionnalOpeningCard } from "./ExceptionnalOpeningCard";

const mockDayData = {
  name: "Jour de l'an",
  recurrence: false,
  hours: {
    start: "08:00",
    end: "23:00",
  },
  date: {
    start: "01/01/2025",
    end: "01/01/2025",
  },
  markupPrice: "Grille de majoration jours fériés",
};

const meta: Meta<typeof ExceptionnalOpeningCard> = {
  title: "Molecules/Cards/ExceptionnalOpeningCard",
  component: ExceptionnalOpeningCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    day: {
      description:
        "Day data object containing name, recurrence state, hours, dates and markup price",
    },
    onToggleChange: {
      description: "Callback function called when toggle state changes",
      action: "toggled",
    },
    showRecurrence: {
      description: "Whether to show the recurrence toggle",
      control: "boolean",
      defaultValue: true,
    },
    showMarkupPrice: {
      description: "Whether to show the markup price",
      control: "boolean",
      defaultValue: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof ExceptionnalOpeningCard>;

export const Default: Story = {
  render: () => {
    return (
      <div className="w-[400px]">
        <ExceptionnalOpeningCard day={mockDayData} />
      </div>
    );
  },
};

export const WithRecurrence: Story = {
  render: () => {
    return (
      <div className="w-[400px]">
        <ExceptionnalOpeningCard
          day={{
            ...mockDayData,
            name: "Noël",
            recurrence: true,
            date: {
              start: "25/12/2024",
              end: "25/12/2024",
            },
          }}
        />
      </div>
    );
  },
};

// Nouvelle story : Sans récurrence
export const WithoutRecurrence: Story = {
  render: () => {
    return (
      <div className="w-[400px]">
        <ExceptionnalOpeningCard
          day={{
            name: "Événement ponctuel",
            hours: { start: "10:00", end: "18:00" },
            date: { start: "15/03/2025", end: "15/03/2025" },
            markupPrice: "Tarif normal",
          }}
          showRecurrence={false}
        />
      </div>
    );
  },
};

// Nouvelle story : Sans grille de majoration
export const WithoutMarkupPrice: Story = {
  render: () => {
    return (
      <div className="w-[400px]">
        <ExceptionnalOpeningCard
          day={{
            name: "Ouverture simple",
            recurrence: true,
            hours: { start: "09:00", end: "17:00" },
            date: { start: "10/06/2025", end: "10/06/2025" },
          }}
          showMarkupPrice={false}
        />
      </div>
    );
  },
};

// Nouvelle story : Minimaliste (ni récurrence ni majoration)
export const Minimal: Story = {
  render: () => {
    return (
      <div className="w-[400px]">
        <ExceptionnalOpeningCard
          day={{
            name: "Ouverture basique",
            hours: { start: "08:00", end: "20:00" },
            date: { start: "05/07/2025", end: "05/07/2025" },
          }}
          showRecurrence={false}
          showMarkupPrice={false}
        />
      </div>
    );
  },
};

export const MultipleCards: Story = {
  render: () => {
    const cards = [
      {
        data: {
          name: "Jour de l'an",
          recurrence: true,
          hours: { start: "08:00", end: "23:00" },
          date: { start: "01/01/2025", end: "01/01/2025" },
          markupPrice: "Grille jours fériés",
        },
        showRecurrence: true,
        showMarkupPrice: true,
      },
      {
        data: {
          name: "Événement spécial",
          hours: { start: "10:00", end: "20:00" },
          date: { start: "01/05/2025", end: "01/05/2025" },
          markupPrice: "+15%",
        },
        showRecurrence: false,
        showMarkupPrice: true,
      },
      {
        data: {
          name: "Ouverture simple",
          recurrence: false,
          hours: { start: "09:00", end: "21:00" },
          date: { start: "06/04/2025", end: "22/04/2025" },
        },
        showRecurrence: true,
        showMarkupPrice: false,
      },
    ];

    return (
      <div className="flex flex-col gap-4 w-[400px]">
        {cards.map((card, index) => (
          <ExceptionnalOpeningCard
            key={index}
            day={card.data}
            showRecurrence={card.showRecurrence}
            showMarkupPrice={card.showMarkupPrice}
          />
        ))}
      </div>
    );
  },
};