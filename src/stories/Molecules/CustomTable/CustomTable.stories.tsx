import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { CustomTable } from "./CustomTable";
import { useState } from "react";

const columnsBooking = [
  { id: "status", label: "Statut" },
  { id: "date", label: "Date" },
  { id: "time", label: "Heure" },
  { id: "therapist", label: "Masseur" },
  { id: "reservationId", label: "ID Réservation" },
  { id: "service", label: "Prestation" },
  { id: "type", label: "Type" },
  { id: "room", label: "Salles" },
];

const tableRowsBooking = [
  {
    status: "validated",
    date: "21/10/2024",
    time: "10:00",
    therapist: { imageUrl: "/brochure_hotel.png", label: "Marie" },
    reservationId: "RES-2024-001",
    service: "Massage relaxant",
    type: "Solo",
    room: "Salle 1",
  },
  {
    status: "pending",
    date: "22/10/2024",
    time: "14:30",
    therapist: { imageUrl: "/brochure_hotel.png", label: "Pierre" },
    reservationId: "RES-2024-002",
    service: "Consultation",
    type: "Duo",
    room: "Salle 3",
  },
  {
    status: "cancelled",
    date: "23/10/2024",
    time: "09:15",
    therapist: { imageUrl: "/brochure_hotel.png", label: "Coline" },
    reservationId: "RES-2024-003",
    service: "Soins visage",
    type: "Solo",
    room: "Salle 2",
  },
];

const columnsServices = [
  { id: "status", label: "Statut" },
  { id: "serviceName", label: "Nom de la prestation" },
  { id: "type", label: "Type de prestation" },
  { id: "brand", label: "Marque" },
  { id: "price", label: "Prix" },
  { id: "format", label: "Format" },
  { id: "duration", label: "Durée" },
];

const tableRowsServices = [
  {
    status: "validated",
    serviceName: "Massage relaxant aux huiles essentielles",
    type: "Massage",
    brand: "Clarins",
    price: "85€",
    format: "Solo",
    duration: "60 min",
  },
  {
    status: "pending",
    serviceName: "Soin visage anti-âge",
    type: "Soin visage",
    brand: "La Mer",
    price: "120€",
    format: "Solo",
    duration: "75 min",
  },
  {
    status: "cancelled",
    serviceName: "Massage en duo pierres chaudes",
    type: "Massage",
    brand: "Cinq Mondes",
    price: "180€",
    format: "Duo",
    duration: "90 min",
  },
  {
    status: "validated",
    serviceName: "Gommage corps relaxant",
    type: "Gommage",
    brand: "Thalgo",
    price: "65€",
    format: "Solo",
    duration: "45 min",
  },
  {
    status: "validated",
    serviceName: "Consultation bien-être personnalisée",
    type: "Consultation",
    brand: "Spa Propriétaire",
    price: "45€",
    format: "Solo",
    duration: "30 min",
  },
  {
    status: "pending",
    serviceName: "Rituel détox complet",
    type: "Rituel",
    brand: "Sothys",
    price: "150€",
    format: "Solo",
    duration: "120 min",
  },
  {
    status: "validated",
    serviceName: "Massage sportif récupération",
    type: "Massage",
    brand: "Decléor",
    price: "95€",
    format: "Solo",
    duration: "60 min",
  },
  {
    status: "cancelled",
    serviceName: "Soin corps hydratant premium",
    type: "Soin corps",
    brand: "Sisley",
    price: "200€",
    format: "Solo",
    duration: "90 min",
  },
  {
    status: "pending",
    serviceName: "Massage couple romantique",
    type: "Massage",
    brand: "L'Occitane",
    price: "220€",
    format: "Duo",
    duration: "75 min",
  },
  {
    status: "validated",
    serviceName: "Réflexologie plantaire thérapeutique",
    type: "Réflexologie",
    brand: "Weleda",
    price: "70€",
    format: "Solo",
    duration: "50 min",
  },
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

const BookingStory = () => {
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleCheck = (index: number) => {
    if (selectedIndexes.includes(index)) {
      setSelectedIndexes(selectedIndexes.filter((i) => i !== index));
    } else {
      setSelectedIndexes([...selectedIndexes, index]);
    }
  };

  const handleSelectAll = () => {
    if (selectedIndexes.length === tableRowsBooking.length) {
      setSelectedIndexes([]);
    } else {
      setSelectedIndexes(tableRowsBooking.map((_, i) => i));
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  return (
    <div className="w-[865px]">
      <CustomTable
        columns={columnsBooking}
        rows={tableRowsBooking}
        selectedIndexes={selectedIndexes}
        onCheck={handleCheck}
        onSelectAll={handleSelectAll}
        showHeader={true}
        color="secondary"
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPage={rowsPerPage}
        page={page}
      />
    </div>
  );
};

export const Booking: Story = {
  render: () => <BookingStory />,
};

const ServicesStory = () => {
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleCheck = (index: number) => {
    if (selectedIndexes.includes(index)) {
      setSelectedIndexes(selectedIndexes.filter((i) => i !== index));
    } else {
      setSelectedIndexes([...selectedIndexes, index]);
    }
  };

  const handleSelectAll = () => {
    if (selectedIndexes.length === tableRowsServices.length) {
      setSelectedIndexes([]);
    } else {
      setSelectedIndexes(tableRowsServices.map((_, i) => i));
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  return (
    <div className="w-[865px]">
      <CustomTable
        columns={columnsServices}
        rows={tableRowsServices}
        selectedIndexes={selectedIndexes}
        onCheck={handleCheck}
        onSelectAll={handleSelectAll}
        showHeader={true}
        color="primary"
        variantColumns={["type"]}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPage={rowsPerPage}
        page={page}
      />
    </div>
  );
};

export const Services: Story = {
  render: () => <ServicesStory />,
};
