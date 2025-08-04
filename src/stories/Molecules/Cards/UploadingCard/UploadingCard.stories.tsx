import { UploadingCard } from "./UploadingCard";

export default {
  title: 'Molecules/Cards/UploadingCard',
  component: UploadingCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Composant d\'upload de fichiers avec drag & drop, barre de progression et gestion d\'erreurs.'
      }
    }
  },
  tags: ["autodocs"],
  argTypes: {
    maxSize: {
      control: { type: 'number' },
      description: 'Taille maximale autorisée en bytes'
    },
    uploadSpeed: {
      control: { type: 'number' },
      description: 'Vitesse d\'upload simulée en MB/s'
    },
    acceptedTypes: {
      control: { type: 'object' },
      description: 'Types de fichiers acceptés'
    },
    onFileSelect: {
      action: 'file selected',
      description: 'Callback appelé lors de la sélection d\'un fichier'
    }
  }
};

export const Default = {
  args: {
    maxSize: 10 * 1024 * 1024,
    uploadSpeed: 2, 
    acceptedTypes: [".pdf", ".jpg", ".jpeg", ".png", ".zip"],
    onFileSelect: (file: File) => {
      console.log('Fichier sélectionné:', file.name);
    }
  }
};