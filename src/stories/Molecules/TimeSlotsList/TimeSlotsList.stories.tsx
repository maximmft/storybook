import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { TimeSlotsList } from "./TimeSlotsList";

const timeSlots = [
  "07:00",
  "08:00", 
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00"
];

const meta: Meta<typeof TimeSlotsList> = {
  title: "Molecules/TimeSlotsList",
  component: TimeSlotsList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    timeSlots: {
      control: "object",
      description: "Liste des créneaux horaires disponibles",
    },
    selectedTime: {
      control: "text",
      description: "Créneau horaire sélectionné",
    },
    disabled: {
      control: "boolean",
      description: "Désactive tous les créneaux",
    },
    disabledTimes: {
      control: "object",
      description: "Liste des créneaux horaires spécifiques désactivés",
    },
    onTimeSlotSelect: {
      action: "timeSlotSelected",
      description: "Callback appelé lors de la sélection d'un créneau",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TimeSlotsList>;

export const Default: Story = {
  args: {
    timeSlots: timeSlots,
    selectedTime: null,
    disabled: false,
    disabledTimes: [],
  },
  render: (args) => (
    <div className="w-[159px]">
      <TimeSlotsList {...args} />
    </div>
  ),
};

export const WithSelectedTime: Story = {
  args: {
    ...Default.args,
    selectedTime: "10:00",
  },
  render: (args) => (
    <div className="w-[159px]">
      <TimeSlotsList {...args} />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
  render: (args) => (
    <div className="w-[159px]">
      <TimeSlotsList {...args} />
    </div>
  ),
};

export const WithSpecificDisabledTime: Story = {
  args: {
    ...Default.args,
    disabledTimes: ["10:00"],
  },
  render: (args) => (
    <div className="w-[159px]">
      <TimeSlotsList {...args} />
    </div>
  ),
};

export const WithMultipleDisabledTimes: Story = {
  args: {
    ...Default.args,
    disabledTimes: ["09:00", "12:00", "15:00"],
  },
  render: (args) => (
    <div className="w-[159px]">
      <TimeSlotsList {...args} />
    </div>
  ),
};
