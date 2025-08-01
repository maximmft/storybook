import { Building2, Star, Tag as LucideTag, UserRound } from "lucide-react";

type TagsType = {
  name: string;
  style: string;
  icon?: string | React.ReactElement;
};

export type VariantsType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

type TagStatus = keyof typeof tagsConfig;

interface TagProps {
  status?: TagStatus;
  variant?: VariantsType;
  label?: string;
  icon?: string | React.ReactElement; // Nouvelle prop pour icône personnalisée
}

const baseTagsStyle =
  "flex flex-row w-fit max-h-[22px] items-center justify-center border rounded-[4px] px-2 py-1 text-[10px] font-semibold shrink-0 whitespace-nowrap";

export const tagsConfig: Record<string, TagsType> = {
  active: {
    name: "Actif",
    style: "bg-[#E8F8EC] border-[#4EC06D] text-[#4EC06D]",
    icon: "•",
  },
  inactive: {
    name: "Inactif",
    style: "bg-[#FCE6E6] border-[#F03538] text-[#F03538]",
    icon: "•",
  },
  disabled: {
    name: "Désactivé",
    style: "bg-[#FCE6E6] border-[#F03538] text-[#F03538]",
    icon: "•",
  },
  incomplete: {
    name: "Incomplet",
    style: "bg-[#FEF3EB] border-[#F08037] text-[#F08037]",
    icon: "•",
  },
  published: {
    name: "Publié",
    style: "bg-[#ECF6FF] border-[#2EA1FF] text-[#2EA1FF]",
    icon: "•",
  },
  pending: {
    name: "En attente",
    style: "bg-[#FCE6E6] border-[#F08037] text-[#F08037]",
    icon: "•",
  },
  validated: {
    name: "Validée",
    style: "bg-[#E8F8EC] border-[#4EC06D] text-[#4EC06D]",
    icon: "•",
  },
  cancelled: {
    name: "Annulée",
    style: "bg-[#FCE6E6] border-[#F03538] text-[#F03538]",
    icon: "•",
  },
  in_progress: {
    name: "En cours",
    style: "bg-[#ECF6FF] border-[#2EA1FF] text-[#2EA1FF]",
    icon: "•",
  },
  past: {
    name: "Passée",
    style: "bg-[#F7F5F3] border-[#A29D98] text-[#A29D98]",
    icon: "•",
  },
  to_follow_up: {
    name: "À relancer",
    style: "bg-[#FCE6E6] border-[#F08037] text-[#F08037]",
    icon: "•",
  },
  to_contact: {
    name: "À contacter",
    style: "bg-[#FCE6E6] border-[#F03538] text-[#F03538]",
    icon: "•",
  },
  qualified: {
    name: "Qualifié",
    style: "bg-[#ECF6FF] border-[#2EA1FF] text-[#2EA1FF]",
    icon: "•",
  },
  contracted: {
    name: "Contractualisé",
    style: "bg-[#E8F8EC] border-[#4EC06D] text-[#4EC06D]",
    icon: "•",
  },
  archived: {
    name: "Archivé",
    style: "bg-[#F7F5F3] border-[#A29D98] text-[#A29D98]",
    icon: "•",
  },

  inbound: {
    name: "Inbound",
    style: "bg-[#EEF5FB] border-[#5A6E81] text-[#5A6E81]",
    icon: <LucideTag size={8} strokeWidth={3} />,
  },
  outbound: {
    name: "Outbound",
    style: "bg-[#FDF8EC] border-[#8B6309] text-[#8B6309]",
    icon: <LucideTag size={8} strokeWidth={3} />,
  },
  administrator: {
    name: "Administrateur",
    style: "bg-[#ECF6FF] border-[#2EA1FF] text-[#2EA1FF]",
    icon: <Star size={8} strokeWidth={3} fill="#2EA1FF" />,
  },
  manager: {
    name: "Manager",
    style: "bg-[#EEF5FB] border-[#5A6E81] text-[#5A6E81]",
    icon: <UserRound size={10} strokeWidth={3} />,
  },
  freelance: {
    name: "Freelance",
    style: "bg-[#FDF8EC] border-[#8B6309] text-[#8B6309]",
    icon: <UserRound size={10} strokeWidth={3} />,
  },
  establishment_name: {
    name: "Nom de l'établissement",
    style: "bg-[#EEF5FB] border-[#98B2CD] text-[#5A6E81]",
    icon: <Building2 size={10} strokeWidth={3} />,
  },
  care_category: {
    name: "Catégorie de soin",
    style: "bg-[#E6F0E7] border-[#A7BEAB] text-[#486060]",
    icon: <Star size={8} strokeWidth={3} />,
  },
  promotions: {
    name: "Promotions",
    style: "bg-[#FDF8EC] border-[#8B6309] text-[#8B6309]",
    icon: <LucideTag size={8} strokeWidth={3} />,
  },
  vip_client: {
    name: "Client VIP",
    style: "bg-[#FDF8EC] border-[#F3CC72] text-[#8B6309]",
    icon: <Star size={8} strokeWidth={3} />,
  },
  payment_pending: {
    name: "Paiement en attente",
    style: "bg-[#ECF6FF] border-[#2EA1FF] text-[#2EA1FF]",
    icon: "•",
  },
  undefined: {
    name: "Non défini",
    style: "bg-[#EEF5FB] border-[#98B2CD] text-[#5A6E81]",
  },
};

export default function Tag({ status, variant, label, icon }: TagProps) {
  const colorVariants = {
    1: {
      style: "bg-[#EEF5FB] border-[#98B2CD] text-[#5A6E81]",
    },
    2: {
      style: "bg-[#E6F0E7] border-[#A7BEAB] text-[#486060]",
    },
    3: {
      style: "bg-[#F7EFE8] border-[#E6D8CC] text-[#796758]",
    },
    4: {
      style: "bg-[#FDF8EC] border-[#F3CC72] text-[#8B6309]",
    },
    5: {
      style: "bg-[#F5E8F7] border-[#C8A7D1] text-[#6B4C7A]",
    },
    6: {
      style: "bg-[#FFF0F0] border-[#F0B3B3] text-[#8B4A4A]",
    },
    7: {
      style: "bg-[#E8F5F5] border-[#A7D1D1] text-[#4C7A7A]",
    },
    8: {
      style: "bg-[#F0F0E8] border-[#D1D1A7] text-[#7A7A4C]",
    },
  };

  const tag = status ? tagsConfig[status] : null;
  const variantConfig = variant ? colorVariants[variant] : null;
  const style = variantConfig ? variantConfig.style : tag?.style;

  if (!tag && !variant) return null;

  const displayIcon = icon || tag?.icon;

  return (
    <div className={`${baseTagsStyle} ${style}`}>
      {displayIcon && (
        <span className="mr-1 shrink-0 flex items-center justify-center w-[10px] h-[10px]">
          {displayIcon}
        </span>
      )}
      <span className="font-normal text-[10px]">{label || tag?.name}</span>
    </div>
  );
}