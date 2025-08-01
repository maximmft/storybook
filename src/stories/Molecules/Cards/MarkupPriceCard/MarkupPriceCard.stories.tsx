import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { MarkupPriceCard } from "./MarkupPriceCard";

const mockMarkupData = {
  name: "Nom de la grille tarifaire",
  enabled: true,
  applicationPeriod: {
    start: "01/01/2025",
    end: "01/01/2025",
  },
  markedDays: [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ],
  markedHours: {
    start: "19:00",
    end: "22:00",
  },
  markupRate: "10 %",
};

const meta: Meta<typeof MarkupPriceCard> = {
  title: "Molecules/Cards/MarkupPriceCard",
  component: MarkupPriceCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    markupGrid: {
      description:
        "Markup price data object containing name, enabled state, periods, days and rate",
    },
    onToggleChange: {
      description: "Callback function called when toggle state changes",
      action: "toggled",
    },
  },
};

export default meta;
type Story = StoryObj<typeof MarkupPriceCard>;

export const Default: Story = {
  render: () => {
    return (
      <div className="w-[400px]">
        <MarkupPriceCard markupGrid={mockMarkupData} />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <div className="w-[400px]">
        <MarkupPriceCard
          markupGrid={{
            ...mockMarkupData,
            name: "Grille week-end",
            enabled: false,
            markedDays: ["Samedi", "Dimanche"],
            markedHours: {
              start: "10:00",
              end: "18:00",
            },
            markupRate: "15 %",
          }}
        />
      </div>
    );
  },
};
