import type { Meta, StoryObj } from "@storybook/react-webpack5";
import PhotoCell from "./PhotoCell.tsx";

const brochure_hotel = "/brochure_hotel.png";

const meta: Meta<typeof PhotoCell> = {
  title: "Atoms/Cells/PhotoCell",
  component: PhotoCell,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    label: {
      control: { type: "text" },
      description: "Optional label text for the photo cell"
    },
    variant: {
      control: { type: "select" },
      options: ["circular", "square"],
      description: "Shape variant of the photo"
    },
    imageSrc: {
      control: { type: "text" },
      description: "Source URL for the image"
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const CircularWithLabel: Story = {
  args: {
    label: "Nom de la prestation",
    variant: "circular",
    imageSrc: brochure_hotel,
  },
};

export const CircularWithoutLabel: Story = {
  args: {
    variant: "circular",
    imageSrc: brochure_hotel,
  },
};

export const SquareWithLabel: Story = {
  args: {
    label: "Nom de la prestation",
    variant: "square",
    imageSrc: brochure_hotel,
  },
};

export const SquareWithoutLabel: Story = {
  args: {
    variant: "square",
    imageSrc: brochure_hotel,
  },
};