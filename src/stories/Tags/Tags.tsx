import { Building2, Star, Tag, User, UserRound } from "lucide-react";
import * as React from "react";

const baseTagsStyle =
  "flex flex-row items-center justify-center border rounded-[4px] px-2 py-1 text-[10px] capitalize font-semibold";

const tagsConfig = {
  "1": {
    name: "Produit n°1",
    style: "bg-[#EEF5FB] border-[#98B2CD] text-[#5A6E81]",
  },
  "2": {
    name: "Produit n°2",
    style: "bg-[#E6F0E7] border-[#A7BEAB] text-[#486060]",
  },
  "3": {
    name: "Produit n°3",
    style: "bg-[#F7EFE8] border-[#E6D8CC] text-[#796758]",
  },
  "4": {
    name: "Produit n°4",
    style: "bg-[#FDF8EC] border-[#F3CC72] text-[#8B6309]",
  },
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
    icon: <Tag size={8} strokeWidth={3}/>,
  },
  outbound: {
    name: "Outbound",
    style: "bg-[#FDF8EC] border-[#8B6309] text-[#8B6309]",
    icon: <Tag size={8} strokeWidth={3}/>,
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
    icon:  <Star size={8} strokeWidth={3} />,
  },
  promotions: {
    name: "Promotions",
    style: "bg-[#FDF8EC] border-[#8B6309] text-[#8B6309]",
    icon: <Tag size={8} strokeWidth={3}/>,
  },
  vip_client: {
    name: "Client VIP",
    style: "bg-[#FDF8EC] border-[#F3CC72] text-[#8B6309]",
    icon:  <Star size={8} strokeWidth={3} />,
  },
  undefined: {
    name: "Non défini",
    style: "bg-[#EEF5FB] border-[#98B2CD] text-[#5A6E81]",
  },
};

export default function Tags({ status }: { status: string }) {
  const tag = tagsConfig[status];

  if (!tag) return null;

  return (
    <div className={`${baseTagsStyle} ${tag.style}`}>
      <span className="mr-1">{tag.icon}</span>
      <span>{tag.name}</span>
    </div>
  );
}
