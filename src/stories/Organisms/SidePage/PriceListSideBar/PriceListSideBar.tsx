import {
  Calendar,
  CircleAlert,
  Pencil,
  Clock,
} from "lucide-react";
import { useState } from "react";
import { Button } from "src/stories/Atoms/Buttons/Button/Button";
import Tag from "src/stories/Atoms/Informations/Tag/Tag";
import { CardSelect } from "src/stories/Molecules/Filters/CardSelect/CardSelect";
import { formatDateShort } from "src/utils/formatDate";
import { CustomDrawer } from "../../CustomDrawer/CustomDrawer";

export type ServiceType = {
  id: string;
  service: {
    format: string;
    price: string;
    duration: string;
    name: string;
    disabled?: boolean;
  };
};

export type CategoryType = {
  id: string;
  title: string;
  services: ServiceType[];
  mainToggleValue: boolean;
};

export interface DayConfig {
  name: string;
  disabled: boolean;
}

export interface PriceListDataType {
  title: string;
  startDate?: string;
  endDate?: string;
  gridPeriod?: string[];
  applyAllYear: boolean;
  annualRecurrence: boolean;
  markupTypology: {
    id: string;
    label: string;
  };
  markupRate: number;
  opening: {
    days: DayConfig[];
    hours: {
      opening: string;
      ending: string;
    };
    disabledSlotsByDay?: Record<string, string[]>;
  };
  categories: Array<{
    id: string;
    title: string;
    mainToggleValue: boolean;
    services: Array<{
      id: string;
      service: {
        duration: string;
        format: string;
        name: string;
        price: string;
        disabled: boolean;
      };
    }>;
  }>;
}

export interface PriceListSideBarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  data: PriceListDataType;
}

export const PriceListSideBar = ({
  setIsOpen,
  data,
  isOpen,
}: PriceListSideBarProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const getAllServicesIdByCategory = (categoryId: string) => {
    return data.categories
      .find((category) => category.id === categoryId)
      ?.services.filter((service) => !service.service.disabled)
      .map((service) => service.id);
  };


  const handleMainToggle = (categoryId: string) => {
    const isMainToggleActive = selectedCategories.includes(categoryId);
    const allServicesIdByCategory = getAllServicesIdByCategory(categoryId);
    if (allServicesIdByCategory && !isMainToggleActive) {
      setSelectedServices([...allServicesIdByCategory, ...selectedServices]);
      setSelectedCategories((prev) => [...prev, categoryId]);
    } else if (isMainToggleActive) {
      setSelectedServices((prev) =>
        prev.filter(
          (servicesIds) => !allServicesIdByCategory?.includes(servicesIds)
        )
      );
      setSelectedCategories((prev) => prev.filter((id) => id !== categoryId));
    }
  };

  const handleServicesToggle = (serviceId: string, categoryId: string) => {
    const allServicesIdByCategory = getAllServicesIdByCategory(categoryId);

    const newSelectedServices = selectedServices.includes(serviceId)
    ? selectedServices.filter((id) => id !== serviceId)
    : [...selectedServices, serviceId];

    const areAllServicesSelected = allServicesIdByCategory?.every((serviceId) => newSelectedServices.includes(serviceId))
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
    if (areAllServicesSelected)
    setSelectedCategories((prev) => [...prev, categoryId])
  };


  const footer = () => {
    return (
      <>
        <Button label="Modifier les informations" icon={Pencil} />
        <Button label="Annuler" variant="secondary" />

        <div className="w-fit">
          <Button
            label="Supprimer la grille tarifaire"
            variant="tertiary"
            error
          />
        </div>
      </>
    );
  };


  return (
    <CustomDrawer
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      footer={footer()}
      title={data.title}
      headerTag={<Tag status={"pending"} />
      }
    >

      <section className="flex flex-col gap-4 overflow-scroll pr-4 mb-8">
        <section className="flex flex-col border border-greyscale-400 rounded-lg p-4 gap-2">
          <div className="flex flex-col items-start gap-2">
            <h1 className="text-[18px] mb-4">1. Définition de la grille</h1>
            <div className="flex flex-row text-[14px] gap-x-3">
              <p>Nom de la grille</p>
              <p className="font-light">{data.title}</p>
            </div>
            <div className="flex flex-row text-[14px] gap-x-3">
              <p>Période d'application</p>
              <p className="font-light">
                {data.startDate && formatDateShort(data.startDate)} -{" "}
                {data.endDate && formatDateShort(data.endDate)}
              </p>
            </div>
            {data.applyAllYear && (
              <div className="flex flex-row text-[14px] gap-x-2">
                <p>Appliquer sur toute l'année</p>
                <CircleAlert size={16} color="#A29D98" />
              </div>
            )}
            {data.annualRecurrence && (
              <div className="flex flex-row text-[14px] gap-x-3">
                <p>Récurrence annuelle</p>
                <CircleAlert size={16} color="#A29D98" />
              </div>
            )}
          </div>
        </section>

        <section className="flex flex-col border border-greyscale-400 rounded-lg p-4 gap-2">
          <div className="flex flex-col items-start gap-2">
            <h1 className="text-[18px] mb-4">
              2. Typologie de la majoration
            </h1>
            <div className="flex flex-row text-[14px] gap-x-3">
              <p>Type de majoration</p>
              <p className="font-light">{data.markupTypology.label}</p>
            </div>
            <div className="flex flex-row text-[14px] gap-x-3">
              <p>Taux de majoration</p>
              <p className="font-light">{data.markupRate}</p>
            </div>
          </div>
        </section>

        <section className="flex flex-col border border-greyscale-400 rounded-lg p-4 gap-2">
          <div className="flex flex-col items-start gap-2">
            <h1 className="text-[18px] mb-4">3. Choix des prestations</h1>
            {data.categories.map((category) => {
              return (
                <div
                  className="w-full border border-greyscale-400 rounded-lg "
                  key={category.id}
                >
                  <CardSelect
                    title={category.title}
                    services={category.services}
                    onMainToggleChange={() => handleMainToggle(category.id)}
                    mainToggleValue={selectedCategories.includes(category.id)}
                    onServiceToggle={(serviceId) => handleServicesToggle(serviceId, category.id)}
                    selectedServices={selectedServices}
                    accordionSize="small"
                    editableChildren={false}
                    childrenDirection="vertical"
                  />
                </div>
              );
            })}
          </div>
        </section>

        <section className="flex flex-col border border-greyscale-400 rounded-lg p-4 gap-2">
          <div className="flex flex-col items-start gap-2">
            <h1 className="text-[18px] mb-4">
              4. Choix du jour et des horaires
            </h1>
            <div className="flex text-[14px] items-start">
              <div className="flex items-center">
                <Calendar size={18} />
                <p className="mx-2">Jours</p>
              </div>
              <div className="flex flex-wrap items-center">
                {data.opening.days.map((day, index) => {
                  return (
                    <div className="flex items-center" key={day.name}>
                      <p className="font-light">{day.name}</p>
                      {index < data.opening.days.length - 1 && (
                        <p className="text-greyscale-400 mx-2">•</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-row text-[14px]">
              <Clock size={18} />
              <p className="mx-2">Horaires</p>
              <p className="font-light">
                {data.opening.hours.opening} - {data.opening.hours.ending}
              </p>
            </div>
          </div>
        </section>
      </section>

    </CustomDrawer>
  );
};
