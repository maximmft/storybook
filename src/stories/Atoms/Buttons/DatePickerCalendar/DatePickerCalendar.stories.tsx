import type { Meta, StoryObj } from "@storybook/react-webpack5";
import DatePickerCalendar from "./DatePickerCalendar.tsx";

const meta: Meta<typeof DatePickerCalendar> = {
  title: "Atoms/Buttons/DatePickerCalendar",
  component: DatePickerCalendar,
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

export const DateNotSelected: Story = {
  args: {
    disabled: false,
    isSelected: false,
    date: "1"
  },
};

export const DateSelected: Story = {
  args: {
    disabled: false,
    isSelected: true,
    date: "2"
  },
};