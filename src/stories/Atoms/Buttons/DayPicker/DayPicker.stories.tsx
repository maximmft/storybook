import type { Meta, StoryObj } from "@storybook/react-webpack5";
import DayPicker from "./DayPicker.tsx";

const meta: Meta<typeof DayPicker> = {
  title: "Atoms/Buttons/DayPicker",
  component: DayPicker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
    isSelected: {
      control: { type: "boolean" },
      description: "Whether the time slot is selected"
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DayNotSelected: Story = {
  args: {
    disabled: false,
    isSelected: false,
    day: "lundi"
  },
};

export const DaySelected: Story = {
  args: {
    disabled: false,
    isSelected: true,
    day: "lundi"
  },
};

export const Days: Story = {
  render: () => {
    const daysOfWeek = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
    
    return (
      <div className="flex gap-2 p-4">
        {daysOfWeek.map((day, index) => (
          <DayPicker
            key={day}
            day={day}
            onClick={() => {}}
            disabled={false}
            isSelected={index === 2} 
          />
        ))}
      </div>
    );
  }
};