import { TrendUpIcon } from "@phosphor-icons/react/dist/ssr";
import { ArrowRight } from "lucide-react";
import { Button } from "src/stories/Atoms/Buttons/Button/Button";
import Tag from "src/stories/Atoms/Informations/Tag/Tag";
import { formatDateShort, formatTime } from "src/utils/formatDate";

export interface Customer {
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
}

export interface Service {
  serviceName: string;
  format: string;
  price: number;
  duration: number;
  beneficiary: {
    firstname: string;
    lastname: string;
    email: string;
  };
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
  services: Service[];
  status?: "pending" | "confirmed" | "cancelled" | "completed";
}

export interface AppointmentData {
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
    datetime,
    totalDuration,
    totalPrice,
    services,
    status = "pending",
  } = appointment;

  const serviceNames = services.map((service) => service.serviceName);
  const rooms = Array.from(new Set(services.map((service) => service.room)));
  const options = services.flatMap((service) =>
    service.options.map((option) => option.name)
  );
  

  const displayServiceSummary = (
    services: string[],
    options: string[],
    rooms?: string[],
  ) => {
    return (
      <div
        className={`flex flex-col ${
          size === "small" ? "text-[10px]" : "text-[12px]"
        }`}
      >
        <div className="flex flex-row flex-wrap">
          <span className="shrink-0 mr-3">Prestations</span>
          {services.map((service, index) => (
            <span key={`service-${index}`} className="font-light">
              {service}
              {index < services.length - 1 && (
                <span className="text-greyscale-500 mx-[6px]">•</span>
              )}
            </span>
          ))}
        </div>

       {rooms && <div className="flex flex-row flex-wrap">
          <span className="shrink-0 mr-3">Salles</span>
          {rooms.map((room, index) => {
            console.log("room", room);
            
            return (
            <span key={`room-${index}`} className="font-light">
              {room}
              {index < rooms.length - 1 && (
                <span className="text-greyscale-500 mx-[6px]">•</span>
              )}
            </span>
          )})}
        </div>}

        <div className="flex flex-row flex-wrap">
          <span className="shrink-0 mr-3">Options</span>
          {options.length > 0 ? (
            options.map((option, index) => (
              <span key={`option-${index}`} className="font-light">
                {option}
                {index < options.length - 1 && (
                  <span className="text-greyscale-500 mx-[6px]">•</span>
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
    <div
      className={`w-full flex flex-row border border-greyscale-400 rounded-lg ${
        variant === "detailed" ? "min-w-[650px]" : ""
      }`}
    >
      <div className="bg-greyscale-200 px-8 flex flex-col items-center justify-center rounded-l-lg">
        <p className={`${size === "small" ? "text-[16px]" : "text-[18px]"}`}>
          {formatDateShort(datetime)}
        </p>
        <p className="text-[24px]">{formatTime(datetime)}</p>
      </div>
      {variant === "compact" ? (
        <div className="w-full flex flex-col p-4 gap-2 capitalize">
          <h1 className={`${size === "small" ? "text-[16px]" : "text-[18px]"}`}>
            {customer.firstname} {customer.lastname}
          </h1>
          <div
            className={`flex flex-row ${
              size === "small" ? "text-[12px]" : "text-[16px]"
            }`}
          >
            <p>{totalDuration} min</p>
            <span className="text-greyscale-500 mx-2">•</span>
            <p className="flex flex-row items-center gap-1">
              {totalPrice} € <TrendUpIcon color="#4EC06D" />
            </p>
          </div>
          {displayServiceSummary(serviceNames, options, rooms)}
        </div>
      ) : (
        <div className="p-4 w-full">
          <div className="w-full flex flex-row justify-between items-center">
            <div className="flex flex-row items-center gap-4">
              <p className="text-[24px]">
                {customer.firstname} {customer.lastname}
              </p>
              <Tag status={status} />
            </div>

            <div className="flex flex-row items-center text-[20px]">
              <p>{totalDuration}min</p>
              <span className="text-greyscale-500 mx-2">•</span>
              <p className="flex flex-row items-center gap-1">
                {totalPrice} € <TrendUpIcon color="#4EC06D" />
              </p>
            </div>
          </div>
          <div className="text-[14px] mb-2 text-greyscale-700">
            <p>{customer.email}</p>
            <p>{customer.phoneNumber}</p>
          </div>
          <div className="flex flex-row justify-between items-center gap-6">
            {displayServiceSummary(serviceNames, options)}
            <div>
              <Button
                label="Traiter la demande"
                variant="tertiary"
                size="small"
                icon={ArrowRight}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
