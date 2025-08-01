import { Divider } from "@mui/material";
import { TagIcon } from "@phosphor-icons/react";
import {
  Calendar,
  Clock,
  Trash,
  Eye,
  RefreshCcw,
  Undo2,
  Image,
} from "lucide-react";
import { IconButton } from "src/stories/Atoms/Buttons/IconButton/IconButton";
import PicturePreview from "src/stories/Atoms/Informations/PicturePreview/PicturePreview";
import Tag from "src/stories/Atoms/Informations/Tag/Tag";
import React from "react";

type OfferDetailsType = {
  title: string;
  services: string[];
};

type OfferConditionsType = {
  days: string[];
};

type OfferDatesType = {
  start: string;
  end: string;
};

type OfferHoursType = {
  start: string;
  end: string;
};

type OfferImageType = {
  name: string;
  url: string;
  size: string;
};

type OfferPriceType = {
  originalPrice: string;
  discountedPrice: string;
};

type OfferType = {
  name: string;
  status: string;
  //Définir les status plus tard
  details: OfferDetailsType;
  conditions: OfferConditionsType;
  dates: OfferDatesType;
  hours: OfferHoursType;
  image: OfferImageType;
  price: OfferPriceType;
};

type MinorationPriceCardPropsType = {
  offer: OfferType;
};

export const MinorationPriceCard = ({
  offer,
}: MinorationPriceCardPropsType) => {
  const iconsProps = {
    size: 14,
    className: "shrink-0",
  };

  const settings = [
    {
      icon: <Eye color="#a29d98" {...iconsProps} />,
      label: "Voir les détails de l'offre",
      onclick: (() => {}),
    },
    {
      icon: <RefreshCcw color="#a29d98" {...iconsProps} />,
      label: "Relancer l'offre",
      onclick: (() => {}),
    },
    {
      icon: <Trash color="#F03538" {...iconsProps} />,
      label: "Supprimer",
      onclick: (() => {}),
    },
  ];

  return (
    <div className="w-full flex flex-col border border-[#E3DFDA] rounded-[8px] bg-white">
      <div className="flex justify-between items-start p-6 pb-4">
        <div className="flex flex-col gap-3">
          <Tag status={offer.status} />
          <h3 className="text-[18px] font-normal text-[#3C3A37] leading-tight">
            {offer.name}
          </h3>
        </div>
        <IconButton variant="secondary" settings={settings} />
      </div>

      <Divider className="mx-6" />

      <div className="px-6 py-4">
        <div>
          <h4 className="text-[14px] font-medium text-greyscale-800 mb-1">
            Détails de l'offre
          </h4>
          <p className="text-[14px] font-light text-greyscale-800">
            {offer.details.services.map((service, index) => (
              <React.Fragment key={index}>
                {service}
                {index < offer.details.services.length - 1 && (
                  <span className="text-[#B4B4B4]"> • </span>
                )}
              </React.Fragment>
            ))}
          </p>
        </div>

        <div className="flex items-start gap-3 my-4">
          <span className="text-[14px] font-medium text-greyscale-800 min-w-fit ">
            Conditions de l'offre
          </span>
          <span className="text-[14px] font-light text-greyscale-800">
            {offer.conditions.days.map((day, index) => (
              <React.Fragment key={index}>
                {day}
                {index < offer.conditions.days.length - 1 && (
                  <span className="text-[#B4B4B4]"> • </span>
                )}
              </React.Fragment>
            ))}
          </span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Calendar size={16} color="#3C3A37" className="shrink-0" />
            <span className="text-[14px] font-medium text-greyscale-800 min-w-fit">
              Dates de validité
            </span>
            <span className="text-[14px] font-light text-greyscale-800">
              {offer.dates.start} - {offer.dates.end}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Clock size={16} color="#3C3A37" className="shrink-0" />
            <span className="text-[14px] font-medium text-[#3C3A37] min-w-fit">
              Horaires
            </span>
            <span className="text-[14px] font-light text-greyscale-800">
              {offer.hours.start} - {offer.hours.end}
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Image size={16} color="#3C3A37" className="shrink-0" />
              <span className="text-[14px] font-medium text-greyscale-800">
                Image
              </span>
            </div>
          </div>

          <div className="border border-[#3C3A37] p-3 flex justify-between items-center rounded-[8px]">
            <PicturePreview
              direction="horizontal"
              name={offer.image.name}
              image_url={offer.image.url}
              size={offer.image.size}
            />
            <div className="flex gap-2">
              <IconButton
                icon={Undo2}
                variant="secondary"
                onClick={() => {}}
              />
              <IconButton
                icon={Trash}
                variant="alert"
                onClick={() => {}}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#F8F6F3] rounded-b-[8px] px-6 py-4 flex items-center justify-between">
        <span className="flex flex-row items-center gap-2 text-[14px] font-medium text-greyscale-800">
          <TagIcon size={16} weight="bold" />
          Prix de l'offre avec réduction
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[14px] font-light text-greyscale-500 line-through">
            {offer.price.originalPrice}
          </span>
          <span className="text-[16px] font-medium text-greyscale-800">
            {offer.price.discountedPrice}
          </span>
        </div>
      </div>
    </div>
  );
};