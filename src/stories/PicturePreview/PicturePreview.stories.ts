import type { Meta, StoryObj } from "@storybook/react-webpack5";
import PicturePreview from "./PicturePreview.tsx";
import brochure_hotel from "/public/borchure_hotel.png"

const meta: Meta<typeof PicturePreview> = {
  title: "Components/PicturePreview",
  component: PicturePreview,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: { type: 'text' },
      description: 'File size (e.g., "500kb", "2.5mb")',
    },
    name: {
      control: { type: 'text' },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    image_url: brochure_hotel,
    size: "500kb",
    name: "borchure_hotel.pdf",
  },
};

