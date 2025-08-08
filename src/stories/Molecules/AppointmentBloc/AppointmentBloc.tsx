import { User } from "lucide-react";
import { useForm } from "react-hook-form";
import CustomAccordion from "src/stories/Atoms/Buttons/CustomAccordion/CustomAccordion";
import { ClassicInput } from "src/stories/Atoms/Inputs/ClassicInput/ClassicInput";
import { Dropdown } from "src/stories/Atoms/Inputs/Dropdown/Dropdown";

export interface Beneficiary {
  firstname: string;
  lastname: string;
  email: string;
  avatar?: string;
}

export interface Service {
  serviceName: string;
  format: string;
  price: number;
  duration: number;
  beneficiary: Beneficiary;
  preference: string;
  room: string;
  options: { name: string; price: number }[];
}

export interface Option {
  name: string;
  price: number;
}

export interface AppointmentBlocProps {
  service: Service;
  editMode?: boolean;
}

export const AppointmentBloc: React.FC<AppointmentBlocProps> = ({
  service,
  editMode = false,
}) => {
  const roomsOptions = [
    { id: "Salle de beauté", label: "Salle de beauté" }, 
    { id: "Salle 1", label: "Salle 1" },
    { id: "Salle 2", label: "Salle 2" },
    { id: "Salle 3", label: "Salle 3" },
  ];

  const providerOptions = [
    { id: "man", label: "Homme" },
    { id: "woman", label: "Femme" },    
    { id: "no-preference", label: "Sans préférence" },
  ];

  const servicesOptions = [
    { id: "1", label: "Huile hydratante" },
    { id: "2", label: "Peeling" },
  ];

  const displayTitle = () => {
    return (
      <div>
        <h1 className="text-[16px]">{service.serviceName}</h1>
        <div className="flex flex-row items-center text-[14px] text-greyscale-800 font-light">
          <p className="capitalize">{service.format}</p>
          <span className="text-greyscale-500 mx-2">•</span>
          <p>{service.duration}min</p>
          <span className="text-greyscale-500 mx-2">•</span>
          <p>{service.price} €</p>
        </div>
      </div>
    );
  };
  const beneficiary = service.beneficiary;

  const { register, watch } = useForm({
    defaultValues: {
      firstname: beneficiary.firstname,
      lastname: beneficiary.lastname,
      email: beneficiary.email,
      preference: service.preference,
      room: service.room,
      options: service.options,
    },
  });

  const renderBeneficiarySection = () => {
    if (editMode) {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <ClassicInput
              label="Prénom"
              required
              register={register("firstname")}
              fieldName="firstname"
              watch={watch}
            />
            <ClassicInput
              label="Nom"
              required
              register={register("lastname")}
              fieldName="lastname"
              watch={watch}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <ClassicInput
              required
              label="Adresse email"
              type="email"
              register={register("email")}
              fieldName="email"
              watch={watch}
            />
            <Dropdown
              label="Prestataire privilégié"
              required
              options={providerOptions}
              register={register("preference")}
              fieldName="preference"
              watch={watch}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-row items-center gap-x-[32px]">
        <div className="flex flex-col">
          <p className="text-[14px] mb-1">Bénéficiaire</p>
          <div className="flex flex-row gap-x-2 my-2 w-[162px]">
            <div className="h-8 w-10 rounded-md flex justify-center items-center bg-greyscale-200">
              {beneficiary.avatar ? (
                <img
                  src={beneficiary.avatar}
                  alt={`${beneficiary.firstname} ${beneficiary.lastname}`}
                  className="h-8 w-8 rounded-md object-cover"
                />
              ) : (
                <User size={18} color="#A29D98" />
              )}
            </div>
            <div className="flex flex-col min-w-0 text-[12px]">
              <p className="capitalize">
                {beneficiary.firstname} {beneficiary.lastname}
              </p>
              <p className="text-greyscale-800 truncate font-light">
                {beneficiary.email}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-[14px] mb-1">Prestataire privilégié</p>
          <div className="flex flex-row items-center gap-x-2 my-2 w-[162px]">
            <div className="h-8 w-8 rounded-md flex justify-center items-center bg-greyscale-200">
              <User size={18} color="#A29D98" />
            </div>
            <div className="flex flex-col text-[12px] capitalize">
              <p>{service.preference}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-row border border-greyscale-400 rounded-lg">
      <CustomAccordion title={displayTitle()} showIconBorder={false}>
        <div className="space-y-4">{renderBeneficiarySection()}</div>

        <div className="flex flex-col my-4">
          {editMode === false && (
            <p className="text-[14px] mb-1">Salle de prestation</p>
          )}
          {editMode ? (
            <Dropdown
              label="Salle de prestation"
              required
              options={roomsOptions}
              register={register("room")}
              fieldName="room"
              watch={watch}
            />
          ) : (
            <p className="text-greyscale-800 text-[12px] font-light">
              {service.room}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          {!editMode && <p className="text-[14px] mb-1">Option(s)</p>}
          {editMode ? (
            <Dropdown
              label="Options"
              required
              options={servicesOptions}
              multiSelect
              register={register("options")}
              fieldName="options"
              watch={watch}
              
            />
          ) : (
            <>
              {service.options.length === 0 ? (
                <div className="flex flex-row justify-between items-center text-greyscale-600 text-[12px] font-light">
                  <p>Aucune option</p>
                  <p>0€</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {service.options.map((option, index) => (
                    <div
                      key={index}
                      className="flex flex-row justify-between items-center text-greyscale-600 text-[12px] font-light"
                    >
                      <p>{option.name}</p>
                      <p>{option.price}€</p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </CustomAccordion>
    </div>
  );
};
