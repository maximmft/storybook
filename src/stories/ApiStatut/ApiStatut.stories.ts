import type { Meta, StoryObj } from "@storybook/react-webpack5";
import ApiStatut from "./ApiStatut.tsx";

const meta: Meta<typeof ApiStatut> = {
  title: "ApiStatut",
  component: ApiStatut,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    connection: {
      type: "boolean",
      description: "Détermine si l'API est connectée ou non",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const On: Story = {
  args: {
    connection: true
  },
};

export const Off: Story = {
  args: {
    connection: false
  },
};
