import { ArrowLeft, CircleAlert } from "lucide-react";
import { useState } from "react";
import { Button } from "src/stories/Atoms/Buttons/Button/Button";
import DayPicker from "src/stories/Atoms/Buttons/DayPicker/DayPicker";
import { IconButton } from "src/stories/Atoms/Buttons/IconButton/IconButton";
import { ClassicInput } from "src/stories/Atoms/Inputs/ClassicInput/ClassicInput";
import { Dropdown } from "src/stories/Atoms/Inputs/Dropdown/Dropdown";
import ToggleSwitch from "src/stories/Atoms/Inputs/ToggleSwitch/ToggleSwitch";
import { CardSelect } from "src/stories/Molecules/Filters/CardSelect/CardSelect";
import { TimeSlotsList } from "src/stories/Molecules/TimeSlotsList/TimeSlotsList";
import { PriceListDataType } from "../PriceListSideBar/PriceListSideBar";
import { useForm } from "react-hook-form";
import { DropdownTag } from "src/stories/Atoms/Inputs/DropdownTag/DropdownTag";

export interface PriceListSideBarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  data: PriceListDataType;
}

const typologyOptions = [
  {
    id: "1",
    label: "En pourcentage (%)",
  },
  {
    id: "2",
    label: "Typologie2",
  },
  {
    id: "3",
    label: "Typologie3",
  },
];

const morningsSlots = [
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
];

const eveningSlots = [
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
  "00:00",
];

const dateOptions = [
  {
    id: "1",
    label: "Janvier",
  },
  {
    id: "2",
    label: "Février",
  },
  {
    id: "3",
    label: "Mars",
  },
  {
    id: "4",
    label: "Avril",
  },
  {
    id: "5",
    label: "Mai",
  },
  {
    id: "6",
    label: "Juin",
  },
  {
    id: "7",
    label: "Juillet",
  },
  {
    id: "8",
    label: "Août",
  },
  {
    id: "9",
    label: "Septembre",
  },
  {
    id: "10",
    label: "Octobre",
  },
  {
    id: "11",
    label: "Novembre",
  },
  {
    id: "12",
    label: "Décembre",
  },
];

export const AddingPriceList = ({
  setIsOpen,
  data,
  isOpen,
}: PriceListSideBarProps) => {
  const getFirstAvailableDay = () => {
    const availableDay = data.opening.days.find((day) => !day.disabled);
    return availableDay ? availableDay.name : "lundi";
  };

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>(
    getFirstAvailableDay()
  );
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const [applyAllYear, setApplyAllYear] = useState<boolean>(data.applyAllYear);
  const [annualRecurrence, setAnnualRecurrence] = useState<boolean>(
    data.annualRecurrence
  );

  const allCategoriesId = data.categories.map((category) => category.id);
  const allServicesId = data.categories.flatMap((category) =>
    category.services
      .filter((service) => !service.service.disabled)
      .map((s) => s.id)
  );

  const getAllServicesIdByCategory = (categoryId: string) => {
    return data.categories
      .find((category) => category.id === categoryId)
      ?.services.filter((service) => !service.service.disabled)
      .map((service) => service.id);
  };

  const isAllSelected =
    allCategoriesId.every((id) => selectedCategories.includes(id)) &&
    allServicesId.every((id) => selectedServices.includes(id));

  const { watch, register } = useForm({
    defaultValues: {
      title: data.title,
      gridPeriod: data.gridPeriod,
      applyAllYear: data.applyAllYear,
      annualRecurrence: data.annualRecurrence,
      markupRate: data.markupRate,
      typology: data.markupTypology.id,
    },
  });

  const getDisabledSlotsForSelectedDay = () => {
    return data.opening.disabledSlotsByDay?.[selectedDay] || [];
  };

  const handleTimeSlotSelect = (timeSlot: string | null) => {
    if (!timeSlot) return;

    setSelectedTimeSlots((prev) => {
      if (prev.includes(timeSlot)) {
        return prev.filter((slot) => slot !== timeSlot);
      } else {
        return [...prev, timeSlot];
      }
    });
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

  const handleSelectAllMain = () => {
    if (isAllSelected) {
      setSelectedCategories([]);
      setSelectedServices([]);
    } else {
      setSelectedCategories([...allCategoriesId]);
      setSelectedServices([...allServicesId]);
    }
  };

  const handleApplyAllYear = () => {
    setApplyAllYear(!applyAllYear);
  };

  const handleAnnualReccurence = () => {
    setAnnualRecurrence(!annualRecurrence);
  };

  const handleSelectDay = (day: { name: string; disabled: boolean }) => {
    setSelectedDay(day.name);
    setSelectedTimeSlots([]);
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
        className={`fixed right-0 top-0 p-8 bg-white flex rounded-l-xl flex-col h-screen transition-transform duration-200 z-[100] ${
          isOpen ? "-translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-row items-center mb-6">
          <IconButton
            icon={ArrowLeft}
            variant="tertiary"
            onClick={() => setIsOpen(false)}
          />
          <p className="text-[20px] font-light mr-3">
            Créer une grille de majoration personnalisée
          </p>
        </div>

        <section className=" flex flex-row gap-x-8 overflow-scroll pr-6 mb-8">
          <article className="flex flex-col gap-y-6 min-w-[504px]">
            <div className="flex flex-row gap-x-4 w-full">
              <div className="flex-1">
                <ClassicInput
                  label="Nom de la grille"
                  required
                  register={register("title")}
                  fieldName="title"
                  watch={watch}
                />
              </div>
              <div className="flex-1">
                <DropdownTag
                  label="Période d'application de la grille"
                  required
                  register={register("gridPeriod")}
                  fieldName="gridPeriod"
                  watch={watch}
                  options={dateOptions}
                  placeholder="Sélectionner une période"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex flex-row items-center text-[14px] gap-x-2">
                <ToggleSwitch
                  label="Appliquer sur toute l'année"
                  value={applyAllYear}
                  direction="left"
                  register={register("applyAllYear")}
                  onChange={handleApplyAllYear}
                />
                <CircleAlert size={16} color="#A29D98" />
              </div>
              <div className="flex flex-row  items-center text-[14px] gap-x-2">
                <ToggleSwitch
                  label="Récurrence annuelle"
                  value={annualRecurrence}
                  direction="left"
                  register={register("annualRecurrence")}
                  onChange={handleAnnualReccurence}
                />
                <CircleAlert size={16} color="#A29D98" />
              </div>
            </div>
            <div className="flex flex-row gap-x-4 w-full ml-0.5">
              <div className="flex-1">
                <Dropdown
                  label="Typologie de la majoration"
                  placeholder="Sélectionner une typologie"
                  required
                  options={typologyOptions}
                  register={register("typology")}
                  fieldName="typology"
                  watch={watch}
                />
              </div>
              <div className="flex-1">
                <ClassicInput
                  label="Taux de la majoration"
                  placeholder="Ex: 10"
                  required
                  register={register("markupRate")}
                  fieldName="markupRate"
                  watch={watch}
                />
              </div>
            </div>
            <div>
              <h2>
                Choix des prestations <span className="text-[#F64C4C]">*</span>
              </h2>
              <p className="text-[12px] text-greyscale-600 font-light">
                Choisir des prestations auxquelles la majoration sera appliquée.
              </p>
            </div>
            <ToggleSwitch
              label="Tout sélectionner"
              value={isAllSelected}
              direction="left"
              onChange={handleSelectAllMain}
            />
            <div className="space-y-4">
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
                      editableChildren={true}
                    />
                  </div>
                );
              })}
            </div>
          </article>

          <article className="flex flex-col min-w-[366px]">
            <h1>
              Choix du jour et des horaires{" "}
              <span className="text-[#F64C4C]">*</span>
            </h1>
            <p className="text-[12px] text-greyscale-600 font-light">
              À quel moment la majoration sera-t-elle appliquée ?{" "}
            </p>
            <div className="flex flex-row justify-between my-4">
              {data.opening.days.map((day) => (
                <DayPicker
                  day={day.name}
                  onClick={() => handleSelectDay(day)}
                  key={day.name}
                  isSelected={selectedDay === day.name}
                  disabled={day.disabled}
                />
              ))}
            </div>
            <div className=" flex flex-row flex-1 gap-x-4">
              <TimeSlotsList
                timeSlots={morningsSlots}
                selectedTimes={selectedTimeSlots}
                onTimeSlotSelect={handleTimeSlotSelect}
                disabledTimes={getDisabledSlotsForSelectedDay()}
              />
              <TimeSlotsList
                timeSlots={eveningSlots}
                selectedTimes={selectedTimeSlots}
                onTimeSlotSelect={handleTimeSlotSelect}
                disabledTimes={getDisabledSlotsForSelectedDay()}
              />
            </div>
          </article>
        </section>

        <div className="p-4  flex flex-row-reverse items-center gap-4 shadow-[0_-16px_28px_-20px_rgba(0,0,0,0.1)]">
          <div className="w-[186px]">
            <Button label="Créer la grille" />
          </div>
          <div className="w-[186px]">
            <Button
              label="Annuler"
              variant="secondary"
              onClick={() => setIsOpen(false)}
            />
          </div>
        </div>
      </main>
    </>
  );
};
