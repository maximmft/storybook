import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { RoleCard } from "./RoleCard";

const mockUserData = {
  role: "Administrateur",
 
};

const meta: Meta<typeof RoleCard> = {
  title: "Molecules/Cards/RoleCard",
  component: RoleCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
   
  },
};

export default meta;
type Story = StoryObj<typeof RoleCard>;

export const Default: Story = {
  args: {
    user: mockUserData,
  }
};