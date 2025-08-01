import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { UserCard, UserType } from "./UserCard";
import { useState } from "react";

const mockUser: UserType = {
  id: "1",
  firstname: "Sophie",
  lastname: "Dupont",
  role: "administrator",
  status: "active",
  mail: "sophie.dupont@spa.com",
  jobTitle: "Manageur d'équipe"
};

const mockUser2: UserType = {
  id: "2",
  firstname: "Pierre",
  lastname: "Martin",
  role: "user",
  status: "active",
  mail: "pierre.martin@spa.com",
  jobTitle: "Développeur Frontend"
};

const meta: Meta<typeof UserCard> = {
  title: "Molecules/Cards/UserCard",
  component: UserCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "selectable", "selectableSmall"]
    }
  },
};

export default meta;
type Story = StoryObj<typeof UserCard>;

export const Default: Story = {
  args: {
    variant: "default",
    user: mockUser,
  },
  render: (args) => {
    const [selectedUser, setSelectedUser] = useState("");

    const handleSelect = (value: string) => {
      setSelectedUser(value);
    };

    return (
      <div className="w-[514px]">
        <UserCard 
          {...args}
          onSelect={handleSelect} 
          selectedUser={selectedUser} 
        />
      </div>
    );
  },
};

export const TwoCards: Story = {
  args: {
    variant: "selectable",
  },
  render: (args) => {
    const [selectedUser, setSelectedUser] = useState("");

    const handleSelect = (value: string) => {
      setSelectedUser(value);
    };

    return (
      <div className="w-[514px] flex flex-col gap-4">
        <UserCard 
          user={mockUser} 
          variant={args.variant} 
          onSelect={handleSelect} 
          selectedUser={selectedUser} 
        />
        <UserCard 
          user={mockUser2} 
          variant={args.variant} 
          onSelect={handleSelect} 
          selectedUser={selectedUser} 
        />
      </div>
    );
  },
};

export const TwoCardsSmall: Story = {
  args: {
    variant: "selectableSmall",
  },
  render: (args) => {
    const [selectedUser, setSelectedUser] = useState("");

    const handleSelect = (value: string) => {
      setSelectedUser(value);
    };

    return (
      <div className="w-[514px] flex flex-col gap-4">
        <UserCard 
          user={mockUser} 
          variant={args.variant} 
          onSelect={handleSelect} 
          selectedUser={selectedUser} 
        />
        <UserCard 
          user={mockUser2} 
          variant={args.variant} 
          onSelect={handleSelect} 
          selectedUser={selectedUser} 
        />
      </div>
    );
  },
};