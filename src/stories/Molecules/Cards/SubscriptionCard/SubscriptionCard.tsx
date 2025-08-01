import { CreditCardIcon } from "@phosphor-icons/react";
import { CalendarBlankIcon } from "@phosphor-icons/react/dist/ssr";
import { Component, Trash } from "lucide-react";
import { IconButton } from "src/stories/Atoms/Buttons/IconButton/IconButton";

export interface SubscriptionDetail {
  text: string;
}

export interface SubscriptionCardProps {
  name: string;
  details: SubscriptionDetail[];
  validityDate: string;
  paymentMethod: string;
  status?: "active" | "inactive" | "expired";
}

export const SubscriptionCard = ({
  name,
  details,
  validityDate,
  paymentMethod,
}: SubscriptionCardProps) => {
  const iconsProps = {
    size: 14,
    className: "shrink-0",
  };

  const settings = [
    {
      icon: <Component color="#a29d98" {...iconsProps} />,
      label: "Changer d'abonnement",
      onclick: () => {},
    },
    {
      icon: <CreditCardIcon color="#a29d98" {...iconsProps} />,
      label: "Changer le mode de paiement",
      onclick: () => {},
    },
    {
      icon: <Trash color="#F03538" {...iconsProps} />,
      label: "Supprimer",
      onclick: () => {},
    },
  ];

  return (
    <div className="w-full flex flex-col rounded-[8px] p-6 gap-4 border">
      <div className="flex flex-row justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-[18px] text-greyscale-800">{name}</h1>
        </div>
        <IconButton variant="secondary" settings={settings} />
      </div>

      <div>
        <p className="text-[14px] text-greyscale-800 font-medium">
          Détails de l'offre
        </p>

        {details.map((detail, index) => (
          <span key={index}>
            <span className="text-greyscale-800 text-[14px] font-normal">
              {detail.text}
            </span>
            {index < details.length - 1 && (
              <span className="text-[#B4B4B4] mx-2"> • </span>
            )}
          </span>
        ))}
      </div>

      <div>
        <div className="flex flex-row items-center text-[14px] gap-2">
          <CalendarBlankIcon color="#A29D98" />
          <p className="text-greyscale-600">Date de validité</p>
          <p className="font-light">{validityDate}</p>
        </div>
        <div className="flex flex-row items-center text-[14px] gap-2">
          <CreditCardIcon color="#A29D98" />
          <p className="text-greyscale-600">Mode de paiement</p>
          <p className="font-light">{paymentMethod}</p>
        </div>
      </div>
    </div>
  );
};
