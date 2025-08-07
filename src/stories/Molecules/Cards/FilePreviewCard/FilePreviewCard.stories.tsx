import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { FilePreviewCard } from "./FilePreviewCard";

const mockFileData = {
  name: "image_prestation.jpeg",
  image_url: "/brochure_hotel.png",
  size: "500kb"
};

const meta: Meta<typeof FilePreviewCard> = {
  title: "Molecules/Cards/FilePreviewCard",
  component: FilePreviewCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      description: "Name of the uploaded file",
      control: "text",
    },
    image_url: {
      description: "URL/path to the image file",
      control: "text",
    },
    size: {
      description: "Size of the file (e.g., '500kb', '2mb')",
      control: "text",
    },
    onUndo: {
      description: "Callback function when undo button is clicked",
      action: "undo clicked",
    },
    onDelete: {
      description: "Callback function when delete button is clicked",
      action: "delete clicked",
    },
  },
  args: {
    ...mockFileData,
    onUndo: () => console.log("Undo clicked"),
    onDelete: () => console.log("Delete clicked"),
  },
};

export default meta;
type Story = StoryObj<typeof FilePreviewCard>;

export const Default: Story = {
  render: (args) => {
    return (
      <div className="w-[400px] p-4">
        <FilePreviewCard {...args} />
      </div>
    );
  },
};

export const LongFileName: Story = {
  args: {
    name: "very_long_file_name_with_many_characters_presentation_final_v2.jpeg",
    image_url: "/brochure_hotel.png",
    size: "1.2mb",
  },
  render: (args) => {
    return (
      <div className="w-[400px] p-4">
        <FilePreviewCard {...args} />
      </div>
    );
  },
};

export const SmallFile: Story = {
  args: {
    name: "small.jpg",
    image_url: "/brochure_hotel.png",
    size: "45kb",
  },
  render: (args) => {
    return (
      <div className="w-[400px] p-4">
        <FilePreviewCard {...args} />
      </div>
    );
  },
};