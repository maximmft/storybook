import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { CustomTable } from "./CustomTable";
import { useState } from "react";
import Tag from "src/stories/Atoms/Informations/Tag/Tag";
import PhotoCell from "src/stories/Atoms/Cells/PhotoCell/PhotoCell";

const headerTitles = ["Statut","Date","Heure","Nom","Prénom","ID Réservation","Prestation","Type","Salles"];
const tableRowData = [
  [
    <Tag status="validated" />,
    "21/10/2024",
    "10:00",
    "Dupont",
    <PhotoCell imageSrc="/avatar1.jpg" size="small" label="Marie" />,
    "RES-2024-001",
    "Massage relaxant",
    "Solo",
    "Salle 1"
  ],
  [
    <Tag status="pending" />,
    "22/10/2024",
    "14:30",
    "Martin",
    <PhotoCell imageSrc="/avatar2.jpg" size="small" label="Pierre" />,
    "RES-2024-002",
    "Consultation",
    "Duo",
    "Salle 3"
  ],
  [
    <Tag status="cancelled" />,
    "23/10/2024",
    "09:15",
    "Bernard",
    <PhotoCell imageSrc="/avatar3.jpg" size="small" label="Sophie" />,
    "RES-2024-003",
    "Soins visage",
    "Solo",
    "Salle 2"
  ],
  [
    <Tag status="validated" />,
    "24/10/2024",
    "16:45",
    "Rousseau",
    <PhotoCell imageSrc="/avatar4.jpg" size="small" label="Jean" />,
    "RES-2024-004",
    "Séance ostéo",
    "Duo",
    "Salle 4"
  ],
  [
    <Tag status="pending" />,
    "25/10/2024",
    "11:20",
    "Moreau",
    <PhotoCell imageSrc="/avatar5.jpg" size="small" label="Claire" />,
    "RES-2024-005",
    "Massage sportif",
    "Solo",
    "Salle 1"
  ]
 ];
const meta: Meta<typeof CustomTable> = {
  title: "Molecules/Table/CustomTable",
  component: CustomTable,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
  
    selectedIndexes: {
      control: { type: "object" },
      description: "Array des index sélectionnés",
    },
  },
};

export default meta;
type Story = StoryObj<typeof CustomTable>;

const DefaultStory = () => {
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);

  const handleCheck = (index: number) => {
    if (selectedIndexes.includes(index)) {
      setSelectedIndexes(selectedIndexes.filter((i) => i !== index));
    } else {
      setSelectedIndexes([...selectedIndexes, index]);
    }
  };

  const handleSelectAll = () => {
    if (selectedIndexes.length === tableRowData.length) {
      setSelectedIndexes([]); 
    } else {
      setSelectedIndexes(tableRowData.map((_, i) => i)); 
    }
  };

  return (
    <div className="w-[865px]">
      <CustomTable
        selectedIndexes={selectedIndexes}
        onCheck={handleCheck}        
        onSelectAll={handleSelectAll}
        showHeader={true}
        headerTitles={headerTitles}
        tableRowData={tableRowData}
        color="primary"
      />
    </div>
  );
};

const MultipleItemsStory = () => {
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);

  const handleCheck = (index: number) => {
    if (selectedIndexes.includes(index)) {
      setSelectedIndexes(selectedIndexes.filter((i) => i !== index));
    } else {
      setSelectedIndexes([...selectedIndexes, index]);
    }
  };

  const handleSelectAll = () => {
    if (selectedIndexes.length === tableRowData.length) {
      setSelectedIndexes([]);
    } else {
      setSelectedIndexes(tableRowData.map((_, i) => i));
    }
  };

  return (
    <div className="w-[865px]">
      <CustomTable
        tableRowData={tableRowData}
        selectedIndexes={selectedIndexes}
        onCheck={handleCheck}
        onSelectAll={handleSelectAll}
        showHeader={true}
        headerTitles={headerTitles}
      />
    </div>
  );
};

export const Default: Story = {
  render: () => <DefaultStory />,
};

export const MultipleItems: Story = {
  render: () => <MultipleItemsStory />,
};
