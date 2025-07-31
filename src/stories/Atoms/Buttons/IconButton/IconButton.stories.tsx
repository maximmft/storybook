import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { fn } from "storybook/test";
import { ArrowLeft, Pencil, ToggleRight, Trash } from "lucide-react";
import { IconButton } from "./IconButton.tsx";

const meta: Meta<typeof IconButton> = {
  title: "Atoms/Buttons/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "tertiary", "quaternary", "alert"],
    },
    size: {
      table: { disable: true },
    },
    disabled: {
      control: { type: "boolean" },
    },
    settings: {
      control: { type: "object" },
      description:
        "Array of settings for dropdown menu. When provided, icon becomes optional and Ellipsis is used automatically.",
    },
    icon: {
      control: false,
      description:
        "Icon component. Required when no settings provided, optional when settings exist.",
    },
  },
  args: { onClick: fn() },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    icon: ArrowLeft,
  },
};

export const Alert: Story = {
  args: {
    variant: "alert",
    icon: ArrowLeft,
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    icon: ArrowLeft,
  },
};

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
    icon: ArrowLeft,
  },
};

export const QuaternaryDisabled: Story = {
  args: {
    variant: "quaternary",
    icon: ArrowLeft,
    disabled: true,
  },
};

export const WithSettings: Story = {
  args: {
    variant: "secondary",
    settings: [
      {
        icon: <Pencil color="#a29d98" size={14} className="shrink-0" />,
        label: "Modifier",
        onclick: fn(),
      },
      {
        icon: <ToggleRight color="#a29d98" size={14} className="shrink-0" />,
        label: "Désactiver l'installation",
        onclick: fn(),
      },
      {
        icon: <Trash color="#F03538" size={14} className="shrink-0" />,
        label: "Supprimer",
        onclick: fn(),
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "When settings are provided, the button automatically uses the Ellipsis icon and shows a dropdown menu on hover. Hover over the button to see the dropdown.",
      },
    },
  },
};

export const WithoutSettings: Story = {
  args: {
    variant: "secondary",
    icon: ArrowLeft,
  },
  parameters: {
    docs: {
      description: {
        story:
          "When no settings provided, an icon is required and the button behaves as a simple icon button.",
      },
    },
  },
};
