import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { ProspectCard } from "./ProspectCard";

const meta: Meta<typeof ProspectCard> = {
  title: "Molecules/Cards/ProspectCard",
  component: ProspectCard,
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
    },
    tags: {
      control: "object"
    },
    metadata: {
      control: "object"
    }
  },
};

export default meta;
type Story = StoryObj<typeof ProspectCard>;

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
    },
    tags: {
      status: "to_contact",
      inboundStatus: "inbound",
      salesman: {
        name: "Lucas Bernard"
      }
    },
    metadata: {
      createdAt: new Date('2025-08-01').getTime()
    }
  },
  render: (args) => (
    <div className="w-[414px]">
      <ProspectCard {...args} />
    </div>
  ),
};