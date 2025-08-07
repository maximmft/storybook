import { Meta, StoryObj } from '@storybook/react-webpack5';
import { UploadingCard } from './UploadingCard';
import { formatBytes } from 'src/utils/formatBytes';

const meta: Meta<typeof UploadingCard> = {
  title: 'Molecules/Cards/UploadingCard',
  component: UploadingCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Composant d\'upload de fichiers avec drag & drop, barre de progression et gestion d\'erreurs. Supporte l\'upload multiple avec réorganisation par drag & drop.'
      }
    }
  },
  tags: ["autodocs"],
  argTypes: {
    maxSize: {
      control: { type: 'number' },
      description: 'Taille maximale autorisée en bytes',
      defaultValue: 10 * 1024 * 1024
    },
    uploadSpeed: {
      control: { type: 'range', min: 0.5, max: 10, step: 0.5 },
      description: 'Vitesse d\'upload simulée en MB/s',
      defaultValue: 2
    },
    acceptedTypes: {
      control: { type: 'object' },
      description: 'Types de fichiers acceptés',
      defaultValue: [".pdf", ".jpg", ".jpeg", ".png", ".zip"]
    },
    onFileSelect: {
      action: 'file selected',
      description: 'Callback appelé lors de la sélection d\'un fichier'
    },
    onFileRemove: {
      action: 'file removed',
      description: 'Callback appelé lors de la suppression d\'un fichier'
    }
  },
  decorators: [
    (Story) => (
      <div className="w-[450px] p-4">
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    maxSize: 10 * 1024 * 1024, 
    uploadSpeed: 2,
    acceptedTypes: [".pdf", ".jpg", ".jpeg", ".png", ".zip"],
    onFileSelect: (file: File) => {
      console.log('Fichier sélectionné:', file.name, formatBytes(file.size));
    },
    onFileRemove: (file: File) => {
      console.log('Fichier supprimé:', file.name);
    }
  }
};

export const FastUpload: Story = {
  args: {
    ...Default.args,
    uploadSpeed: 8,
  },
  parameters: {
    docs: {
      description: {
        story: 'Configuration avec une vitesse d\'upload rapide (8 MB/s)'
      }
    }
  }
};

export const SlowUpload: Story = {
  args: {
    ...Default.args,
    uploadSpeed: 0.5,
  },
  parameters: {
    docs: {
      description: {
        story: 'Configuration avec une vitesse d\'upload lente (0.5 MB/s) pour tester l\'interface de progression'
      }
    }
  }
};

export const SmallFilesOnly: Story = {
  args: {
    ...Default.args,
    maxSize: 2 * 1024 * 1024, 
  },
  parameters: {
    docs: {
      description: {
        story: 'Configuration limitant la taille des fichiers à 2MB maximum'
      }
    }
  }
};

export const ImagesOnly: Story = {
  args: {
    ...Default.args,
    acceptedTypes: [".jpg", ".jpeg", ".png", ".gif", ".webp"],
  },
  parameters: {
    docs: {
      description: {
        story: 'Configuration acceptant uniquement les images'
      }
    }
  }
};

export const DocumentsOnly: Story = {
  args: {
    ...Default.args,
    acceptedTypes: [".pdf", ".doc", ".docx", ".txt", ".rtf"],
  },
  parameters: {
    docs: {
      description: {
        story: 'Configuration acceptant uniquement les documents'
      }
    }
  }
};

export const Strict: Story = {
  args: {
    maxSize: 1 * 1024 * 1024, 
    uploadSpeed: 1,
    acceptedTypes: [".pdf"],
    onFileSelect: (file: File) => {
      console.log('Fichier PDF sélectionné:', file.name);
    },
    onFileRemove: (file: File) => {
      console.log('Fichier PDF supprimé:', file.name);
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Configuration très restrictive : uniquement PDF, 1MB maximum, vitesse normale'
      }
    }
  }
};


export const Wide: Story = {
  args: Default.args,
  decorators: [
    (Story) => (
      <div className="w-[600px] p-4">
        <Story />
      </div>
    )
  ],
  parameters: {
    docs: {
      description: {
        story: 'Composant dans un conteneur plus large'
      }
    }
  }
};
