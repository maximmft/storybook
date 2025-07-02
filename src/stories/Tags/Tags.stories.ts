import type { Meta, StoryObj } from "@storybook/react-webpack5";
import Tags from "./Tags.tsx";

const meta: Meta<typeof Tags> = {
  title: "Tags",
  component: Tags,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    status: {
      control: { type: "select" },
      options: [
        "1", "2", "3", "4",
        "active", "inactive", "incomplete", "published",
        "pending", "validated", "cancelled", "in_progress", "past",
        "to_follow_up", "to_contact", "qualified", "contracted", "archived",
        "inbound", "outbound",
        "administrator", "manager", "freelance",
        "establishment_name", "care_category", "promotions",
        "vip_client", "undefined"
      ],
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    status: "validated"
  },
};

export const Promotion: Story = {
  args: {
    status: "promotion"
  },
};

export const Pending: Story = {
  args: {
    status: "pending"
  },
};

export const VipClient: Story = {
  args: {
    status: "vip_client"
  },
};