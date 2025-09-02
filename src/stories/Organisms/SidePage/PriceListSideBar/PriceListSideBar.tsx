import { ArrowLeft, Calendar, CircleAlert, Pencil, Clock } from "lucide-react";
import { useState } from "react";
import { Button } from "src/stories/Atoms/Buttons/Button/Button";
import { IconButton } from "src/stories/Atoms/Buttons/IconButton/IconButton";
import Tag from "src/stories/Atoms/Informations/Tag/Tag";
import { CardSelect } from "src/stories/Molecules/Filters/CardSelect/CardSelect";
import { formatDateShort } from "src/utils/formatDate";

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

export type PriceListDataType = {
  title: string;
  startDate: string;
  endDate: string;
  markupTypology: {
    id: string,
    label: string,
  };
  applyAllYear: boolean;
  annualRecurrence: boolean;
  markupRate: number;
  opening: {
    days: string[];
    hours: {
      opening: string;
      ending: string;
    };
  };
  categories: CategoryType[];
};

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

  const handleMainToggle = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleServicesToggle = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-200 ${
          isOpen ? "opacity-15" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />
      <main
        className={`fixed left-0 top-0 p-8 bg-white w-[483px] flex flex-col h-screen transition-transform duration-200 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-row items-center mb-6">
          <IconButton
            icon={ArrowLeft}
            variant="tertiary"
            onClick={() => setIsOpen(false)}
          />
          <p className="text-[20px] font-light mr-3">{data.title}</p>
          <Tag status={"pending"} />
        </div>

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
                  {formatDateShort(data.startDate)} -{" "}
                  {formatDateShort(data.endDate)}
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
                      onServiceToggle={handleServicesToggle}
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
              <div className="flex flex-row text-[14px]">
                <Calendar size={18} />
                <p className="mx-2">Jours</p>
                {data.opening.days.map((day, index) => {
                  return (
                    <div className="flex flex-row">
                      <p className="font-light">{day}</p>
                      {index < data.opening.days.length - 1 && (
                        <p className="text-greyscale-400 mx-2">•</p>
                      )}
                    </div>
                  );
                })}
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

        <div className="pt-8 px-8 flex flex-col items-center gap-4 shadow-[0_-16px_28px_-20px_rgba(0,0,0,0.1)]">
          <Button label="Modifier les informations" icon={Pencil} />
          <Button label="Annuler" variant="secondary" />

          <div className="w-fit">
            <Button
              label="Supprimer la grille tarifaire"
              variant="tertiary"
              error
            />
          </div>
        </div>
      </main>
    </>
  );
};
