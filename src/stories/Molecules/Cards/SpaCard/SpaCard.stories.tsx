import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { SpaCard } from "./SpaCard";
import { useState } from "react";

const meta: Meta<typeof SpaCard> = {
  title: "Molecules/Cards/SpaCard",
  component: SpaCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "selectable"]
    },
    establishment: {
      control: "object"
    },
    company: {
      control: "object"  
    },
    manager: {
      control: "object"
    }
  },
};

export default meta;
type Story = StoryObj<typeof SpaCard>;

export const Default: Story = {
  args: {
    variant: "default",
    establishment: {
      name: "Grand Hôtel de la Plage",
      category: "Hôtel & spa",
      starRating: 5,
      imageUrl: "/brochure_hotel.png",
      status: "active"

    },
    company: {
      name: "Luxury Hotels Group",
      contactName: "Marie Martin"
    },
    manager: {
      name: "Sophie Durand",
      imageUrl: "/brochure_hotel.png"
    }
  },
  render: (args) => (
    <div className="w-[514px]">
      <SpaCard {...args} />
    </div>
  ),
};

export const MultipleCards: Story = {
  render: () => {
    const [selectedCards, setSelectedCards] = useState<string[]>([]);

    const cards = [
      {
        id: "1",
        establishment: {
          name: "Grand Hôtel de la Plage",
          category: "Hôtel & spa",
          starRating: 5,
          imageUrl: "/brochure_hotel.png",
          status: "active"

        },
        company: {
          name: "Luxury Hotels Group",
          contactName: "Marie Martin"
        },
        manager: {
          name: "Sophie Durand",
          imageUrl: "/brochure_hotel.png"
        }
      },
      {
        id: "2",
        establishment: {
          name: "Château des Thermes",
          category: "Resort & spa",
          starRating: 4,
          imageUrl: "/brochure_hotel.png",
          status: "active"
        },
        company: {
          name: "Wellness Resorts SA",
          contactName: "Pierre Dubois"
        },
        manager: {
          name: "Sophie Durand",
          imageUrl: "/brochure_hotel.png"
        }
      },  
    ];

    const handleCardSelect = (cardId: string) => {
      setSelectedCards(prev => 
        prev.includes(cardId) 
          ? prev.filter(id => id !== cardId)
          : [...prev, cardId]
      );
    };

    return (
      <div className="w-[514px] space-y-4">
        {cards.map((card) => (
          <SpaCard
            key={card.id}
            variant="selectable"
            establishment={card.establishment}
            company={card.company}
            manager={card.manager}
            isSelected={selectedCards.includes(card.id)}
            onSelect={() => handleCardSelect(card.id)}
          />
        ))}
      </div>
    );
  },
};