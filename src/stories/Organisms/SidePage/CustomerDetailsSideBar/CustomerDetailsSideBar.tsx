import {
  ArrowLeft,
  ArrowRight,
  Cake,
  CalendarCheck,
  ChartLine,
  Home,
  Mail,
  Pencil,
  Phone,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "src/stories/Atoms/Buttons/Button/Button";
import CustomAccordion from "src/stories/Atoms/Buttons/CustomAccordion/CustomAccordion";
import CustomTabs from "src/stories/Atoms/Buttons/CustomTabs/CustomTabs";
import { IconButton } from "src/stories/Atoms/Buttons/IconButton/IconButton";
import Tag from "src/stories/Atoms/Informations/Tag/Tag";
import { Dropdown } from "src/stories/Atoms/Inputs/Dropdown/Dropdown";
import { TextArea } from "src/stories/Atoms/Inputs/TextArea/TextArea";
import { AppointmentCard } from "src/stories/Molecules/Cards/AppointmentCard/AppointmentCard";
import { CustomDrawer } from "../../CustomDrawer/CustomDrawer";

export interface Address {
  street: string;
  zipcode: string;
  city: string;
  country: string;
}

export interface Customer {
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  status: string;
  gender: string;
  birthday: string;
  address: Address;
}

export interface Stats {
  bookingsNumber: number;
  visitNumber: number;
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
  status?: "pending" | "confirmed" | "cancelled" | "completed";
  datetime: string;
  format: string;
  services: Service[];
}

export interface Information {
  createdAt: string;
  canal: string;
  paiment: string;
}

export interface CustomerDetailsData {
  customer: Customer;
  stats: Stats;
  note: string;
  appointments: Appointment[];
  information: Information;
  notes: string;
}

export interface CustomerDetailsSideBarProps {
  customerData: CustomerDetailsData;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const CustomerDetailsSideBar = ({
  customerData,
  setIsOpen,
  isOpen,
}: CustomerDetailsSideBarProps) => {
  const { customer, stats, note, appointments } = customerData;
  const [isEditing, setIsEditing] = useState(false);
  const { register, watch } = useForm({
    defaultValues: {
      typology: customer.status,
      notes: note,
    },
  });
  const containenrInfoStyle = "flex flex-row items-center gap-2";
  const textInfoStyle = "text-[14px] text-greyscale-800 font-light";

  const customerInfosArray = [
    {
      icon: Mail,
      value: customer.email,
    },
    {
      icon: Phone,
      value: customer.phoneNumber,
    },
    {
      icon: Cake,
      value: customer.birthday,
    },
  ];

  const statsArray = [
    {
      icon: CalendarCheck,
      value: stats.bookingsNumber,
      label: "Nombre de réservations",
    },
    {
      icon: ChartLine,
      value: stats.visitNumber,
      label: "Nombre de visites",
    },
  ];

  const typologyCustomer = [
    {
      id: "not_defined",
      label: "Non défini",
    },
    {
      id: "vip",
      label: "VIP",
    },
  ];
  const today = new Date();

  const upcomingAppointments = appointments.filter(
    (appointment) =>
      appointment.status?.toLowerCase() !== "cancelled" &&
      new Date(appointment.datetime) > today
  );
  const pastAppointments = appointments.filter(
    (appointment) =>
      appointment.status?.toLowerCase() !== "cancelled" &&
      new Date(appointment.datetime) < today
  );
  const cancelledAppointments = appointments.filter(
    (appointment) => appointment.status?.toLowerCase() === "cancelled"
  );

  const displayAppointmentsCard = (appointments: Appointment[]) => {
    return (
      <div className="flex flex-col gap-4">
        {appointments.map((appointment) => {
          const appointmentData = {
            customer: {
              firstname: customer.firstname,
              lastname: customer.lastname,
              email: customer.email,
              phoneNumber: customer.phoneNumber,
            },
            appointment: appointment,
          };

          return (
            <AppointmentCard
              variant="compact"
              key={appointment.id}
              size="small"
              data={appointmentData}
            />
          );
        })}
      </div>
    );
  };

  const footer = () => {
    return (
      <>
        {isEditing ? (
          <>
            <Button label="Enregistrer" onClick={() => ""} />
            <Button
              label="Annuler"
              variant="secondary"
              onClick={() => setIsEditing(false)}
            />
          </>
        ) : (
          <>
            <Button
              label="Modifier"
              icon={Pencil}
              onClick={() => setIsEditing(true)}
            />
            <Button
              label="Annuler"
              variant="secondary"
              onClick={() => setIsOpen(false)}
            />
          </>
        )}
      </>
    );
  };

  return (
    <CustomDrawer
      title={"Détail du client"}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      footer={footer()}
    >
      <div className="flex flex-col items-center justify-between mb-6">
        <div className="flex flex-row text-[24px] font-light capitalize items-center gap-x-2">
          {customer.firstname} {customer.lastname}
          <Tag status={customer.status} />
        </div>
        <p className="text-[14px] text-grayscale-800 capitalize font-light">
          {customer.gender}
        </p>
      </div>
      {isEditing ? (
        <div>
          <section className="flex flex-col gap-y-6">
            <Dropdown
              label="Typologie de client"
              required
              options={typologyCustomer}
              register={register("typology")}
              fieldName="typology"
              watch={watch}
            />
            <TextArea
              label="Notes sur le client"
              register={register("notes")}
              fieldName="notes"
              watch={watch}
            />
          </section>
        </div>
      ) : (
        <>
          <section className="flex flex-col gap-4 overflow-scroll pr-4 mb-8">
            <section className="flex flex-col border border-greyscale-400 rounded-lg p-4 gap-2">
              {customerInfosArray.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <div className={containenrInfoStyle} key={index}>
                    <IconComponent
                      size={16}
                      strokeWidth={2.5}
                      color="#3c3a37"
                    />
                    <p className={textInfoStyle}>{info.value}</p>
                  </div>
                );
              })}
              <div className="flex flex-row items-start gap-2">
                <Home
                  size={16}
                  color="#3c3a37"
                  strokeWidth={2.5}
                  className="mt-0.5"
                />
                <div className="flex flex-col">
                  <p className={textInfoStyle}>{customer.address.street}</p>
                  <p className={textInfoStyle}>
                    {customer.address.zipcode} {customer.address.city}
                  </p>
                  <p className={textInfoStyle}>{customer.address.country}</p>
                </div>
              </div>
            </section>

            <section className="flex flex-col border border-greyscale-400 rounded-lg gap-2">
              <CustomAccordion
                title="Statistiques"
                initiallyOpen
                showIconBorder={false}
              >
                <div className="flex flex-col justify-between items-center gap-2">
                  {statsArray.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                      <div
                        key={index}
                        className="p-3 w-full flex flex-row border border-greyscale-400 rounded-lg gap-x-3"
                      >
                        <div className="bg-greyscale-200 p-3 rounded-lg">
                          <IconComponent
                            size={32}
                            color="#3c3a37"
                            strokeWidth={2}
                          />
                        </div>
                        <div className="flex flex-col">
                          <p className="text-[20px]">{stat.value}</p>
                          <p className="text-[14px] font-light">{stat.label}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CustomAccordion>
            </section>

            {note && (
              <section className="flex flex-col border border-greyscale-400 rounded-lg p-4 gap-2">
                <h1 className="text-[16px] font-light">Notes sur le client</h1>
                <p className="text-[12px] text-greyscale-900 font-light">
                  {note}
                </p>
              </section>
            )}

            <section className="flex flex-col border border-greyscale-400 rounded-lg gap-2">
              <CustomAccordion
                title="Réservations"
                initiallyOpen
                showIconBorder={false}
              >
                <CustomTabs
                  defaultValue={0}
                  variant="standard"
                  tabs={[
                    {
                      content: displayAppointmentsCard(upcomingAppointments),
                      label: `À venir (${upcomingAppointments.length})`,
                    },
                    {
                      content: displayAppointmentsCard(pastAppointments),
                      label: `Passées (${pastAppointments.length})`,
                    },
                    {
                      content: displayAppointmentsCard(cancelledAppointments),
                      label: `Annulées (${cancelledAppointments.length})`,
                    },
                  ]}
                ></CustomTabs>
                <div className="flex flex-col justify-between items-center gap-2"></div>
              </CustomAccordion>
            </section>
          </section>
        </>
      )}
    </CustomDrawer>
  );
};
