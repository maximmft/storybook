import { CaretDownIcon } from "@phosphor-icons/react";
import { ArrowRight, Mail, Pencil, Phone, User2, Users, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "src/stories/Atoms/Buttons/Button/Button";
import { IconButton } from "src/stories/Atoms/Buttons/IconButton/IconButton";
import Tag from "src/stories/Atoms/Informations/Tag/Tag";
import { ClassicInput } from "src/stories/Atoms/Inputs/ClassicInput/ClassicInput";
import { TextArea } from "src/stories/Atoms/Inputs/TextArea/TextArea";
import ToggleSwitch from "src/stories/Atoms/Inputs/ToggleSwitch/ToggleSwitch";
import Separator from "src/stories/Atoms/Separator/Separator";
import { AppointmentBloc } from "src/stories/Molecules/AppointmentBloc/AppointmentBloc";
import { formatDateShort, formatTime } from "src/utils/formatDate";

export interface Customer {
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
}

export interface Beneficiary {
  firstname: string;
  lastname: string;
  email: string;
}

export interface Service {
  serviceName: string;
  format: string;
  price: number;
  duration: number;
  beneficiary: Beneficiary;
  preference: string;
  room: string;
  options: {
    name: string;
    price: number;
  }[];
}

export interface Appointment {
  totalDuration: number;
  totalPrice: number;
  id: string;
  comment: string;
  datetime: string;
  format: string;
  services: Service[];
}

export interface Information {
  createdAt: string;
  canal: string;
  paiment: string;
}

export interface BookingData {
  status: string;
  customer: Customer;
  appointment: Appointment;
  information: Information;
  notes: string;
}

export interface BookingDetailsSideBarProps {
  booking: BookingData;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const BookingDetails = ({
  booking,
  setIsOpen,
  isOpen,
}: BookingDetailsSideBarProps) => {
  const [editMode, setEditMode] = useState(false);
  const { register, watch } = useForm({
    defaultValues: {
      date: formatDateShort(booking.appointment.datetime),
      time: formatTime(booking.appointment.datetime),
    },
  });

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
        <div className="flex flex-row items-center justify-between mb-1">
          <div className="flex flex-col">
            <div className="flex flex-row text-[20px] capitalize items-center gap-x-2">
              {booking.customer.firstname} {booking.customer.lastname}
              <Tag status={booking.status} />
            </div>
            <p className="text-greyscale-700 font-light my-0.5">
              {booking.appointment.id}
            </p>
          </div>
          <IconButton
            icon={X}
            variant="secondary"
            onClick={() => setIsOpen(false)}
          />
        </div>

        <div className="p-4 bg-greyscale-100 space-y-1 rounded-lg mb-6">
          <div className="flex flex-row items-center justify-between">
            <p className="text-[14px]">Date et heure</p>
            <div className="flex flex-row text-[16px]">
              {formatDateShort(booking.appointment.datetime)}
              <span className="text-greyscale-500 mx-2">•</span>

              {formatTime(booking.appointment.datetime)}
            </div>
          </div>

          <div className="flex flex-row justify-between  gap-x-2 text-greyscale-800">
            <p className="font-medium text-[12px]">Type</p>
            <div className="flex flex-row items-center gap-x-1">
              {booking.appointment.format !== "solo" ? (
                <Users size={12} />
              ) : (
                <User2 size={12} />
              )}

              <p className="font-light capitalize  text-[14px]">
                {booking.appointment.format}
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between gap-x-2 text-greyscale-800">
            <p className="font-medium text-[12px]">Durée totale</p>
            <p className="font-light text-[14px]">
              {booking.appointment.totalDuration} min
            </p>
          </div>

          <div className="flex justify-between flex-row gap-x-2 text-greyscale-800">
            <p className="font-medium text-[12px]">Prix total</p>
            <p className="font-light  text-[14px]">
              {booking.appointment.totalPrice} €
            </p>
          </div>
        </div>

        <section className="flex flex-col gap-4 overflow-scroll pr-6 mb-8 ">
          {!editMode && (
            <section className="flex flex-col border border-greyscale-400 rounded-lg p-4 gap-2">
              <h1 className="text-[16px]"> Informations clients</h1>
              <div className="flex flex-row items-center gap-2">
                <Mail size={14} color="#3c3a37" strokeWidth={1.5} />
                <p className="text-[14px] text-greyscale-800 font-light">
                  {booking.customer.email}
                </p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <Phone size={14} color="#3c3a37" strokeWidth={1.5} />
                <p className="text-[14px] text-greyscale-800 font-light">
                  {booking.customer.phoneNumber}
                </p>
              </div>
              <div className="w-fit">
                <Button
                  label="Voir le profil"
                  icon={ArrowRight}
                  iconPosition="right"
                  variant="tertiary"
                />
              </div>
            </section>
          )}

          {!editMode && (
            <section className="flex flex-col border border-greyscale-400 rounded-lg p-4 gap-2">
              <h1 className="text-[16px]"> Commentaires clients</h1>
              <p className="text-[12px] font-light text-greyscale-800">
                {booking.appointment.comment}
              </p>
              <div className="w-fit">
                <Button
                  label="Afficher plus"
                  icon={CaretDownIcon}
                  iconPosition="right"
                  variant="tertiary"
                />
              </div>
            </section>
          )}

          {editMode && (
            <div className="flex flex-col gap-2">
              <ClassicInput
                label="Date"
                required
                register={register("date")}
                fieldName="date"
                watch={watch}
              />
              <ClassicInput
                label="Heure"
                required
                register={register("time")}
                fieldName="time"
                watch={watch}
              />
              <ToggleSwitch
                label="Appliquer les majorations tarifaires aux prestations"
                direction="left"
                value={false}
              />
            </div>
          )}
          <div>
            {booking.appointment.services.map((service, index) => {
              const servicesLength = booking.appointment.services.length;
              return (
                <div key={index}>
                  <AppointmentBloc service={service} editMode={editMode} />
                  {servicesLength > 1 && index < servicesLength - 1 && (
                    <div className="my-4">
                      <Separator />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {!editMode && (
            <section className="flex flex-col border border-greyscale-400 rounded-lg p-4 gap-2">
              <h1 className="text-[16px]"> Informations complémentaires</h1>
              <div className="flex flex-row gap-x-2 text-[12px] text-greyscale-800">
                <p className="font-medium">Commande passé le </p>
                <p className="font-light">{booking.information.createdAt}</p>
              </div>
              <div className="flex flex-row gap-x-2 text-[12px] text-greyscale-800">
                <p className="font-medium">Canal :</p>
                <p className="font-light">{booking.information.canal}</p>
              </div>
              <div className="flex flex-row gap-x-2 text-[12px] text-greyscale-800">
                <p className="font-medium">Moyen de paiement</p>
                <p className="font-light">{booking.information.paiment}</p>
              </div>
            </section>
          )}

          {!editMode ? (
            <section className="flex flex-col border border-greyscale-400 rounded-lg p-4 gap-2">
              <h1 className="text-[16px]"> Notes</h1>
              <p className="font-light text-[12px] text-greyscale-800">
                {booking.notes ? booking.notes : "Aucune note pour le moment"}
              </p>
            </section>
          ) : (
            <TextArea
              label="Notes sur la prestation"
              placeholder="Aucune note pour le moment"
            />
          )}
        </section>
        {editMode ? (
          <div className="pt-8 px-8 flex flex-row-reverse gap-4 shadow-[0_-16px_28px_-20px_rgba(0,0,0,0.1)]">
            <Button label="Enregistrer" />
            <Button
              onClick={() => setEditMode(false)}
              label="Annuler"
              variant="secondary"
            />
          </div>
        ) : (
          <div className="pt-8 px-8 flex flex-col items-center gap-4 shadow-[0_-16px_28px_-20px_rgba(0,0,0,0.1)]">
            <Button label="Confirmer la réservation" />
            <Button
              onClick={() => setEditMode(true)}
              label={"Modifier les informations"}
              variant="secondary"
              icon={Pencil}
            />

            <div className="w-fit">
              <Button label="Annuler la réservation" variant="tertiary" error />
            </div>
          </div>
        )}
      </main>
    </>
  );
};
