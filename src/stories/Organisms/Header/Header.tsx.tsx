import { Bell, CircleHelp, Settings } from "lucide-react";
import PhotoCell from "src/stories/Atoms/Cells/PhotoCell/PhotoCell";

type HeaderPropsType = {
  user: {
    picture: string;
    firstname: string;
    lastname: string;
  };
  title: string;
  pathname: string;

};

const mockData = {
  user: {
    picture: "/brochure_hotel.png",
    firstname: "Sophie",
    lastname: "Durant",
  },
  
};
export const Header = ({ user, pathname }: HeaderPropsType) => {
  //REFAIRE RECUPERATION PATHNAME AVEC NEXT

  const getCurrentPath = () => {
    if (typeof window !== "undefined") {
      return window.location.pathname;
    }
    return "/";
  };

  const getDisplayTitle = (pathName: string, firstname: string) => {
    if (pathName === "/") return <p>Bienvenue, {firstname}</p>;
    if (pathName === "/customer") return <p>Clients</p>;
    if (pathName === "/availabilities") return <p>Disponibilité</p>;
  };

  const { firstname, lastname } = mockData.user;
  const currentPath = getCurrentPath();
  
  return (
    <div className="w-full flex h-[68px] flex-row justify-between items-center py-4 px-10 bg-greyscale-100">
      <p className="text-[24px] flex flex-1">
        {getDisplayTitle(pathname, user.firstname)}
      </p>
      <div className="flex flex-row h-full">
        <div className="flex flex-row gap-2">
          <CircleHelp size={14} className="m-[10px]" />
          <Bell size={14} className="m-[10px]" />
          <Settings size={14} className="m-[10px]" />
        </div>
        <div className="bg-greyscale-400 h-full w-[1px] mx-4" />
        <PhotoCell
          imageSrc={mockData.user.picture}
          label={`${firstname} ${lastname}`}
        />
      </div>
    </div>
  );
};
