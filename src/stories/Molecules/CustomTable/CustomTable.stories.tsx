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

const defaultColumns = [
  { id: "name", label: "Nom", align: "left" as const },
  { id: "email", label: "Email", align: "left" as const },
  { id: "role", label: "Rôle", align: "center" as const },
  { id: "status", label: "Statut", align: "center" as const },
  { id: "createdAt", label: "Date de création", align: "center" as const },
];

const defaultRows = [
  {
    name: { imageUrl: "/brochure_hotel.png", label: "Alice Dupont" },
    email: "alice.dupont@example.com",
    role: "Administrateur",
    status: "validated",
    createdAt: "15/01/2024",
  },
  {
    name: { imageUrl: "/brochure_hotel.png", label: "Bob Martin" },
    email: "bob.martin@example.com",
    role: "Utilisateur",
    status: "pending",
    createdAt: "20/01/2024",
  },
  {
    name: { imageUrl: "/brochure_hotel.png", label: "Claire Leroy" },
    email: "claire.leroy@example.com",
    role: "Modérateur",
    status: "cancelled",
    createdAt: "25/01/2024",
  },
  {
    name: { imageUrl: "/brochure_hotel.png", label: "David Rousseau" },
    email: "david.rousseau@example.com",
    role: "Utilisateur",
    status: "validated",
    createdAt: "30/01/2024",
  },
];

const meta: Meta<typeof CustomTable> = {
  title: "Molecules/Table/CustomTable",
  component: CustomTable,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## CustomTable

Un composant de tableau personnalisé avec fonctionnalités avancées incluant :
- Sélection multiple avec cases à cocher
- Pagination intégrée
- Actions par ligne (aperçu, copie, suppression)
- Support des cellules photo
- Tags avec variantes colorées
- Tri des colonnes
- Thèmes de couleur (primary/secondary)

### Utilisation

\`\`\`tsx
import { CustomTable } from './CustomTable';

const columns = [
  { id: 'name', label: 'Nom' },
  { id: 'email', label: 'Email' },
];

const rows = [
  { name: 'John Doe', email: 'john@example.com' },
];

<CustomTable
  columns={columns}
  rows={rows}
  selectedIndexes={selectedIndexes}
  onCheck={handleCheck}
  onPageChange={handlePageChange}
  onRowsPerPageChange={handleRowsPerPageChange}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    columns: {
      description: "Configuration des colonnes du tableau",
      control: { type: "object" },
    },
    rows: {
      description: "Données à afficher dans le tableau",
      control: { type: "object" },
    },
    selectedIndexes: {
      description: "Array des index des lignes sélectionnées",
      control: { type: "object" },
    },
    color: {
      description: "Thème de couleur du tableau",
      control: { type: "select" },
      options: ["primary", "secondary"],
    },
    showHeader: {
      description: "Afficher ou masquer l'en-tête du tableau",
      control: { type: "boolean" },
    },
    deletable: {
      description: "Activer l'action de suppression",
      control: { type: "boolean" },
    },
    watchable: {
      description: "Activer l'action d'aperçu",
      control: { type: "boolean" },
    },
    copyable: {
      description: "Activer l'action de copie",
      control: { type: "boolean" },
    },
    watchButtonlabel: {
      description: "Libellé du bouton d'aperçu",
      control: { type: "text" },
    },
    watchButtonIconDirection: {
      description: "Position de l'icône du bouton d'aperçu",
      control: { type: "select" },
      options: ["left", "right"],
    },
    photoCellVariant: {
      description: "Variante des cellules photo",
      control: { type: "select" },
      options: ["circular", "square"],
    },
    variantColumns: {
      description: "Colonnes avec tags de couleur variée",
      control: { type: "object" },
    },
    page: {
      description: "Page actuelle (0-indexée)",
      control: { type: "number" },
    },
    rowsPerPage: {
      description: "Nombre de lignes par page",
      control: { type: "number" },
    },
    onCheck: {
      description: "Callback appelé lors de la sélection d'une ligne",
      action: "checked",
    },
    onSelectAll: {
      description: "Callback appelé lors de la sélection de toutes les lignes",
      action: "selectAll",
    },
    onPageChange: {
      description: "Callback appelé lors du changement de page",
      action: "pageChanged",
    },
    onRowsPerPageChange: {
      description: "Callback appelé lors du changement du nombre de lignes par page",
      action: "rowsPerPageChanged",
    },
  },
};

export default meta;
type Story = StoryObj<typeof CustomTable>;


const DefaultStory = (args: any) => {
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [page, setPage] = useState(args.page || 0);
  const [rowsPerPage, setRowsPerPage] = useState(args.rowsPerPage || 5);

  const handleCheck = (index: number) => {
    if (selectedIndexes.includes(index)) {
      setSelectedIndexes(selectedIndexes.filter((i) => i !== index));
    } else {
      setSelectedIndexes([...selectedIndexes, index]);
    }
    args.onCheck?.(index);
  };

  const handleSelectAll = () => {
    if (selectedIndexes.length === args.rows.length) {
      setSelectedIndexes([]);
    } else {
      setSelectedIndexes(args.rows.map((_: any, i: number) => i));
    }
    args.onSelectAll?.();
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    args.onPageChange?.(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    args.onRowsPerPageChange?.(newRowsPerPage);
  };

  return (
    <div className="w-[1065px]">
      <CustomTable
        {...args}
        selectedIndexes={selectedIndexes}
        onCheck={handleCheck}
        onSelectAll={handleSelectAll}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
      />
    </div>
  );
};

export const Default: Story = {
  render: DefaultStory,
  args: {
    columns: defaultColumns,
    rows: defaultRows,
    color: "primary",
    showHeader: true,
    deletable: false,
    watchable: false,
    copyable: false,
    watchButtonlabel: "Aperçu",
    watchButtonIconDirection: "right",
    photoCellVariant: "circular",
    variantColumns: ["role"],
    page: 0,
    rowsPerPage: 5,
  },
  parameters: {
    docs: {
      description: {
        story: `
Story par défaut modulable permettant de tester toutes les fonctionnalités du tableau via les contrôles Storybook.

**Fonctionnalités testables :**
- Modification des colonnes et données
- Activation/désactivation des actions
- Changement de thème de couleur
- Configuration de la pagination
- Personnalisation des libellés et icônes
        `,
      },
    },
  },
};

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
    <div className="w-[1065px]">
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
  parameters: {
    docs: {
      description: {
        story: `
Exemple d'utilisation pour un système de réservations avec :
- Cellules photo pour les thérapeutes
- Thème de couleur "secondary" (vert)
- Tags de statut (validated, pending, cancelled)
- Pagination configurée à 10 éléments par page
        `,
      },
    },
  },
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
    <div className="w-[1065px]">
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
        watchable
        deletable
        copyable
      />
    </div>
  );
};

export const Services: Story = {
  render: () => <ServicesStory />,
  parameters: {
    docs: {
      description: {
        story: `
Exemple d'utilisation pour un catalogue de services avec :
- Actions complètes (aperçu, copie, suppression)
- Tags colorés pour les types de prestations
- Thème de couleur "primary" (marron)
- Pagination configurée à 5 éléments par page
- Grande quantité de données pour tester la pagination
        `,
      },
    },
  },
};

export const WithoutHeaderAndWatchableOnly: Story = {
  render: DefaultStory,
  args: {
    columns: defaultColumns,
    rows: defaultRows,
    color: "primary",
    showHeader: false,
    watchable: true,
    watchButtonlabel: "Voir les détails",
    watchButtonIconDirection: "left",
    photoCellVariant: "square",
    page: 0,
    rowsPerPage: 3,
  },
  parameters: {
    docs: {
      description: {
        story: `
Exemple sans en-tête de tableau, utile pour des listes simples ou des intégrations dans des composants plus complexes.
        `,
      },
    },
  },
};

export const WithAllActions: Story = {
  render: DefaultStory,
  args: {
    columns: defaultColumns,
    rows: defaultRows,
    color: "secondary",
    showHeader: true,
    deletable: true,
    watchable: true,
    copyable: true,
    watchButtonlabel: "Détails",
    watchButtonIconDirection: "right",
    photoCellVariant: "circular",
    variantColumns: ["role", "status"],
    page: 0,
    rowsPerPage: 5,
  },
  parameters: {
    docs: {
      description: {
        story: `
Exemple avec toutes les actions disponibles activées :
- Bouton d'aperçu/détails
- Bouton de copie  
- Bouton de suppression
- Tags colorés sur plusieurs colonnes
        `,
      },
    },
  },
};