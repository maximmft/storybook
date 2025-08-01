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

export const MultipleCards: Story = {
  render: () => {
    const cards = [
      {
        name: "Jour de l'an",
        recurrence: true,
        hours: { start: "08:00", end: "23:00" },
        date: { start: "01/01/2025", end: "01/01/2025" },
        markupPrice: "Grille jours fériés",
      },
      {
        name: "Fête du travail",
        recurrence: true,
        hours: { start: "10:00", end: "20:00" },
        date: { start: "01/05/2025", end: "01/05/2025" },
        markupPrice: "+15%",
      },
      {
        name: "Vacances de Pâques",
        recurrence: false,
        hours: { start: "09:00", end: "21:00" },
        date: { start: "06/04/2025", end: "22/04/2025" },
        markupPrice: "Grille vacances",
      },
    ];

    return (
      <div className="flex flex-col gap-4 w-[400px]">
        {cards.map((card, index) => (
          <ExceptionnalOpeningCard key={index} day={card} />
        ))}
      </div>
    );
  },
};
