import { TrendUpIcon } from "@phosphor-icons/react/dist/ssr";
import { ArrowRight } from "lucide-react";
import { Button } from "src/stories/Atoms/Buttons/Button/Button";
import Tag from "src/stories/Atoms/Informations/Tag/Tag";

export interface Customer {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
}

export interface Appointment {
  date: string;
  time: string;
  duration: number;
  price: number;
  services: string[];
  rooms: string[];
  options?: string[];
  status: "pending" | "confirmed" | "cancelled" | "completed";
}

export interface AppointmentData {
  id: string;
  customer: Customer;
  appointment: Appointment;
}

type AppointmentCardPropsType =
  | {
      variant: "compact";
      size: "small" | "medium";
      data: AppointmentData;
    }
  | {
      variant: "detailed";
      size?: "small" | "medium";
      data: AppointmentData;
    };

export const AppointmentCard = ({
  variant,
  size,
  data,
}: AppointmentCardPropsType) => {
  const { customer, appointment } = data;
  const {
    date,
    time,
    duration,
    price,
    services,
    rooms,
    options = [],
    status,
  } = appointment;

  const displayServiceSummary = (
    services: string[],
    rooms: string[],
    options: string[]
  ) => {
    return (
      <div
        className={`flex flex-col ${
          size === "small" ? "text-[10px]" : "text-[12px]"
        }`}
      >
        <div className="flex flex-row flex-wrap gap-x-3">
          <span className="shrink-0">Prestations</span>
          {services.map((service, index) => (
            <span key={`service-${index}`} className="font-light">
              {service}
              {index < services.length - 1 && (
                <span className="text-greyscale-500 ml-2">•</span>
              )}
            </span>
          ))}
        </div>
        
        <div className="flex flex-row flex-wrap gap-x-3">
          <span className="shrink-0">Salles</span>
          {rooms.map((room, index) => (
            <span key={`room-${index}`} className="font-light">
              {room}
              {index < rooms.length - 1 && (
                <span className="text-greyscale-500 ml-2">•</span>
              )}
            </span>
          ))}
        </div>
        
        <div className="flex flex-row flex-wrap gap-x-3">
          <span className="shrink-0">Options</span>
          {options.length > 0 ? (
            options.map((option, index) => (
              <span key={`option-${index}`} className="font-light">
                {option}
                {index < options.length - 1 && (
                  <span className="text-greyscale-500 ml-2">•</span>
                )}
              </span>
            ))
          ) : (
            <span className="font-light">Aucune option</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`w-full flex flex-row border border-greyscale-400 rounded-lg ${variant === "detailed" ? 'min-w-[650px]' : ''}`}>
      <div className="bg-greyscale-200 px-8 flex flex-col items-center justify-center rounded-l-lg">
        <p className={`${size === "small" ? "text-[16px]" : "text-[18px]"}`}>
          {date}
        </p>
        <p className="text-[24px]">{time}</p>
      </div>
      {variant === "compact" ? (
        <div className="w-full flex flex-col p-4 gap-2">
          <h1 className={`${size === "small" ? "text-[16px]" : "text-[18px]"}`}>
            {customer.firstname} {customer.lastname}
          </h1>
          <div
            className={`flex flex-row ${
              size === "small" ? "text-[12px]" : "text-[16px]"
            }`}
          >
            <p>{duration} min</p>
            <span className="text-greyscale-500 mx-2">•</span>
            <p className="flex flex-row items-center gap-1">
              {price} € <TrendUpIcon color="#4EC06D" />
            </p>
          </div>
          {displayServiceSummary(services, rooms, options)}
        </div>
      ) : (
        <div className="p-4 w-full">
          <div className="w-full flex flex-row justify-between items-center">
            <div className="flex flex-row items-center gap-4">
              <p className="text-[24px]">{customer.firstname} {customer.lastname}</p>
              <Tag status={status} />
            </div>

            <div className="flex flex-row items-center text-[20px]">
              <p>{duration}min</p>
              <span className="text-greyscale-500 mx-2">•</span>
              <p>{price} €</p>
            </div>
          </div>
          <div className="text-[14px] mb-2 text-greyscale-700">
            <p>{customer.email}</p>
            <p>{customer.phone}</p>
          </div>
          <div className="flex flex-row justify-between items-center gap-6">
            {displayServiceSummary(services, rooms, options)}
            <div>
              <Button
                label="Afficher le détail"
                variant="tertiary"
                icon={ArrowRight}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};