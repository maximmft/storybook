import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { OpeningHourCard } from "./OpeningHourCard";

const mockDayData = {
  name: "Lundi",
  isEnabled: false,
  morningHours: {
    start: "09:00",
    end: "12:00"
  },
  afternoonHours: {
    start: "14:00",
    end: "22:00"
  }
};

const meta: Meta<typeof OpeningHourCard> = {
  title: "Molecules/Cards/OpeningHourCard",
  component: OpeningHourCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    day: {
      description: "Day data object containing name, enabled state, and opening hours"
    },
    onToggleChange: {
      description: "Callback function called when toggle state changes"
    }
  },
};

export default meta;
type Story = StoryObj<typeof OpeningHourCard>;

export const Default: Story = {
 render: () => {
    return (
        <div className="w-[400px]">
            <OpeningHourCard day={mockDayData}/>
        </div>
    )
 }
};

export const Filled: Story = {
    args: {
        day: {
          name: "Mardi",
          isEnabled: true,
          morningHours: {
            start: "09:00",
            end: "12:00"
          }
        },
    onToggleChange: (enabled: boolean) => console.log('Toggle changed:', enabled)
  }
};


export const Filled2: Story = {

    args :{
        day: {
          name: "Mercredi",
          isEnabled: true,
          morningHours: {
            start: "09:00",
            end: "12:00"
          },
          afternoonHours: {
            start: "14:00",
            end: "18:00"
          }
        },
        onToggleChange: (enabled: boolean) => console.log('Toggle changed:', enabled)
      },
    render: (args) => {


        return (
            <div className="w-[400px]">
                <OpeningHourCard {...args}/>
            </div>
        )
     }

};
