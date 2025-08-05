import { User } from "lucide-react";
import CustomAccordion from "src/stories/Atoms/Buttons/CustomAccordion/CustomAccordion";
import { ClassicInput } from "src/stories/Atoms/Inputs/ClassicInput/ClassicInput";
import PhotoCell from "src/stories/Atoms/Cells/PhotoCell/PhotoCell";
import { Dropdown } from "src/stories/Atoms/Inputs/Dropdown/Dropdown";

export interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
}

export interface Service {
  name: string;
  type: string;
  duration: number;
  price: number;
}

export interface Provider {
  preference: string;
  avatar?: string;
}

export interface Option {
  name: string;
  price: number;
}

export interface AppointmentBlocProps {
  customers: Customer[];
  service: Service;
  providers: Provider[];
  room: string;
  options?: Option[];
  editMode?: boolean;
}

export const AppointmentBloc: React.FC<AppointmentBlocProps> = ({
  customers,
  service,
  providers,
  room,
  options = [],
  editMode = false,
}) => {
  const roomsOptions = [
    { id: "1", label: "Salle 1" },
    { id: "2", label: "Salle 2" },
    { id: "3", label: "Salle 3" },
  ];
  const providerOptions = [
    { id: "1", label: "Homme" },
    { id: "2", label: "Femme" },
    { id: "3", label: "Sans préférence" },
  ];
  const servicesOptions = [
    { id: "1", label: "Huile hydratante" },
    { id: "2", label: "Peeling" },
  ];

  const displayTitle = () => {
    return (
      <div>
        <h1 className="text-[16px]">{service.name}</h1>
        <div className="flex flex-row items-center text-[14px] text-greyscale-800 font-light">
          <p>{service.type}</p>
          <span className="text-greyscale-500 mx-2">•</span>
          <p>{service.duration}min</p>
          <span className="text-greyscale-500 mx-2">•</span>
          <p>{service.price} €</p>
        </div>
      </div>
    );
  };

  const totalOptionsPrice = options.reduce(
    (total, option) => total + option.price,
    0
  );
  const isDuo = customers.length > 1;

  const renderCustomerSection = (
    customer: Customer,
    provider: Provider,
    index: number
  ) => {
    const label = isDuo ? `Bénéficiaire ${index + 1}` : "Bénéficiaire";
    const providerLabel = isDuo
      ? `Prestataire privilégié ${index + 1}`
      : "Prestataire privilégié";

    if (editMode) {
      return (
        <div className="space-y-4">
          {isDuo && (
            <h3 className="text-[14px] font-medium text-greyscale-900 pb-2">
              Bénéficiaire #{index + 1}
            </h3>
          )}
          <div className="grid grid-cols-2 gap-4">
            <ClassicInput label="Prénom" required />
            <ClassicInput label="Nom" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <ClassicInput required label="Adresse email" type="email" />
            <Dropdown
              label="Prestataire privilégié"
              required
              options={providerOptions}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-row items-center gap-x-[32px]">
        <div className="flex flex-col">
          <p className="text-[14px] mb-1">{label}</p>
          <div className="flex flex-row gap-x-2 my-2 w-[162px]">
            <div className="h-8 w-10 rounded-md flex justify-center items-center bg-greyscale-200">
              {customer.avatar ? (
                <img
                  src={customer.avatar}
                  alt={`${customer.firstName} ${customer.lastName}`}
                  className="h-8 w-8 rounded-md object-cover"
                />
              ) : (
                <User size={18} color="#A29D98" />
              )}
            </div>
            <div className="flex flex-col min-w-0 text-[12px]">
              <p>
                {customer.firstName} {customer.lastName}
              </p>
              <p className="text-greyscale-800 truncate font-light">
                {customer.email}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-[14px] mb-1">{providerLabel}</p>
          <div className="flex flex-row items-center gap-x-2 my-2 w-[162px]">
            <div className="h-8 w-8 rounded-md flex justify-center items-center bg-greyscale-200">
              {provider.avatar ? (
                <img
                  src={provider.avatar}
                  alt={provider.preference}
                  className="h-8 w-8 rounded-md object-cover"
                />
              ) : (
                <User size={18} color="#A29D98" />
              )}
            </div>
            <div className="flex flex-col text-[12px]">
              <p>{provider.preference}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-row border border-greyscale-400 rounded-lg">
      <CustomAccordion title={displayTitle()} showIconBorder={false}>
        <div className="space-y-4">
          {customers.map((customer, index) => {
            const provider = providers[index];
            return (
              <div key={index}>
                {renderCustomerSection(customer, provider, index)}
              </div>
            );
          })}
        </div>
        <div className="flex flex-col my-4">
          {editMode === false && (
            <p className="text-[14px] mb-1">Salle de prestation</p>
          )}
          {editMode ? (
            <Dropdown
              label="Salle de prestation"
              required
              options={roomsOptions}
            />
          ) : (
            <p className="text-greyscale-800 text-[12px] font-light">{room}</p>
          )}
        </div>
        <div className="flex flex-col">
          {!editMode && <p className="text-[14px] mb-1">Option(s)</p>}
          {editMode ? (
            <Dropdown label="Options" required options={servicesOptions} />
          ) : (
            <>
              {options.length === 0 ? (
                <div className="flex flex-row justify-between items-center text-greyscale-600 text-[12px] font-light">
                  <p>Aucune option</p>
                  <p>0€</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {options.map((option, index) => (
                    <div
                      key={index}
                      className="flex flex-row justify-between items-center text-greyscale-600 text-[12px] font-light"
                    >
                      <p>{option.name}</p>
                      <p>{option.price}€</p>
                    </div>
                  ))}
                  <div className="flex flex-row justify-between items-center text-[12px] font-medium pt-1 border-t border-greyscale-300">
                    <p>Total options</p>
                    <p>{totalOptionsPrice}€</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </CustomAccordion>
    </div>
  );
};