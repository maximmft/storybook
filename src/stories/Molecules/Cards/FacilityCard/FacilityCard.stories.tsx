import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { FacilityCard } from "./FacilityCard";

const mockFacilityData = {
  name: "Piscine",
  status: "active",
  openingHours: "09:00 - 21:00",
  closingDateStart: "01/11/2024",
  closingDateEnd: "01/12/2024",
  capacity: 25,
  layoverTime: 15,
  image: "/brochure_hotel.png"
};

const meta: Meta<typeof FacilityCard> = {
  title: "Molecules/Cards/FacilityCard",
  component: FacilityCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof FacilityCard>;

export const Default: Story = {
  args: {
    facility: mockFacilityData
  }
};

export const Inactive: Story = {
  args: {
    facility: {...mockFacilityData, status: "inactive"}
  }
};

export const Disabled: Story = {
  args: {
    facility: {...mockFacilityData, status: "disabled"}
  }
};