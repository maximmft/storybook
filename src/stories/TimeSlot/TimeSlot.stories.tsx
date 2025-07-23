import type { Meta, StoryObj } from "@storybook/react-webpack5";
import TimeSlot from "./TimeSlot.tsx";

const meta: Meta<typeof TimeSlot> = {
  title: "Buttons/TimeSlot",
  component: TimeSlot,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    time: {
      control: { type: "text" },
      description: "Time in HH:MM format"
    },
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

export const Primary: Story = {
  args: {
    time: "08:00",
    disabled: false,
    isSelected: false,
    onClick: () => console.log("TimeSlot clicked!")
  },
};

export const Selected: Story = {
  args: {
    time: "08:00",
    disabled: false,
    isSelected: true,
    onClick: () => console.log("TimeSlot clicked!")
  },
};

export const Disabled: Story = {
  args: {
    time: "08:00",
    disabled: true,
    isSelected: false,
  },
};
