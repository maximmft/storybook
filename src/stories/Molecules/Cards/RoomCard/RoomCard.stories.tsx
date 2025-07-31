import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { RoomCard } from "./RoomCard";

const mockRoomData = {
  name: "Nom de la salle",
  maxPersons: 2,
  attachedServices: 20,
  isEnabled: true
};

const meta: Meta<typeof RoomCard> = {
  title: "Molecules/Cards/RoomCard",
  component: RoomCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    room: {
      description: "Room data object containing name, capacity, and services information"
    },
    onToggleChange: {
      description: "Callback function called when toggle state changes"
    }
  },
};

export default meta;
type Story = StoryObj<typeof RoomCard>;

export const Default: Story = {
  args: {
    room: mockRoomData,
    onToggleChange: (enabled: boolean) => console.log('Toggle changed:', enabled)
  }
};

export const NoAttachedService: Story = {
  args: {
    room: {
      ...mockRoomData,
      name: "Salle de massage",
      isEnabled: true,
      attachedServices: undefined
    },
    onToggleChange: (enabled: boolean) => console.log('Toggle changed:', enabled)
  }
};

export const Disabled: Story = {
  args: {
    room: {
      ...mockRoomData,
      name: "Salle désactivée",
      isEnabled: false
    },
    onToggleChange: (enabled: boolean) => console.log('Toggle changed:', enabled)
  }
};