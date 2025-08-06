import { ArrowLeft } from "lucide-react";
import { IconButton } from "src/stories/Atoms/Buttons/IconButton/IconButton";
import { NavItem } from "src/stories/Atoms/Buttons/NavItem/NavItem";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}

interface MenuGroup {
  subtitle?: string;
  items: MenuItem[];
}

interface SideNavProps {
  title?: string;
  activeItem?: string;
  onItemClick?: (item: string) => void;
  menuGroups: MenuGroup[];
  selectedItem: string;
  showBackButton?: boolean;
}
//INSERER IMAGE RELAX PRO EN BAS

export const SideNav: React.FC<SideNavProps> = ({
  title,
  menuGroups,
  selectedItem,
  showBackButton = true,
  onItemClick,
}) => {
  return (
    <div className="bg-primary-700 h-full w-[241px] px-4 py-8 flex flex-col">
      <div className="flex flex-row items-center mb-6 gap-3">
        {showBackButton && <IconButton icon={ArrowLeft} variant="quaternary" />}
        <h1
          className={`text-white text-[18px] font-light ${
            showBackButton ? "" : "px-4"
          } `}
        >
          {title}
        </h1>
      </div>

      <nav className="flex-1">
        <div className="flex flex-col gap-2">
          {menuGroups.map((items) => (
            <div className="flex flex-col gap-y-4">
              {items.subtitle && <p className="text-primary-300 text-[14px] mt-6">{items.subtitle}</p>}
              {items.items.map((item) => (
                <NavItem
                  key={item.id}
                  setting={item.label}
                  icon={item.icon}
                  isActive={selectedItem === item.id}
                  onClick={() => onItemClick?.(item.id)}
                />
              ))}
            </div>
          ))}
        </div>
      </nav>

      <div className="mt-6">
        <div className="flex flex-col items-center gap-1">
          <div className="text-white text-[24px] font-bold tracking-wider">
            RELAX<span className="text-[12px] align-top">PRO</span>
          </div>
          <div className="text-gray-400 text-[12px]">Version 1.0</div>
        </div>
      </div>
    </div>
  );
};
