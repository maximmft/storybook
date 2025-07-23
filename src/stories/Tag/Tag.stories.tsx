import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import Tag, { tagsConfig } from "./Tag.tsx";

const meta: Meta<typeof Tag> = {
  title: "Informations/Tag",
  component: Tag,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    status: {
      control: { type: "select" },
      options: [
        "active",
        "inactive",
        "incomplete",
        "published",
        "pending",
        "validated",
        "cancelled",
        "in_progress",
        "past",
        "to_follow_up",
        "to_contact",
        "qualified",
        "contracted",
        "archived",
        "inbound",
        "outbound",
        "administrator",
        "manager",
        "freelance",
        "establishment_name",
        "care_category",
        "promotions",
        "vip_client",
        "undefined",
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    status: "validated",
  },
};

export const VipClient: Story = {
  args: {
    status: "vip_client",
  },
};

const tagsExemple = [
  { name: "produit 1" },
  { name: "produit 2" },
  { name: "produit 3" },
  { name: "produit 4" },
];

export const AllTagsVariants: Story = {
  render: () => {
    return (
      <div className="flex flex-wrap gap-2 ">
        {tagsExemple.map((tag, index) => (
          <Tag variant={(index + 1) as 1 | 2 | 3 | 4} label={tag.name} />
        ))}
      </div>
    );
  },
};

export const AllTagsStatut: Story = {
  render: () => {
    return (
      <div className="flex flex-wrap gap-2 ">
        {Object.entries(tagsConfig).map((tag) => (
          <Tag status={tag[0]} />
        ))}
      </div>
    );
  },
};
