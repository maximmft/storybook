import React from "react";

interface NavItemProps {
  setting: React.ReactNode;
  icon?: React.ComponentType<any>;
  isActive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export const NavItem: React.FC<NavItemProps> = ({
  setting = "Dashboard",
  icon,
  isActive = false,
  disabled = false,
  onClick
}) => {

  const IconComponent = icon
  
  const getStateClasses = () => {
    if (disabled) {
      return 'text-primary-700 cursor-not-allowed';
    }
    
    if (isActive) {
      return 'text-white bg-primary-500 border border-primary-300';
    }
    
    return 'text-white hover:bg-primary-400 border border-transparent transition-color duration-100';
  };
  
  return (
    <div className="bg-primary-700">
      <div
        className={`
          inline-flex w-[180px] text-[14px] items-center px-4 py-3 rounded-lg
          font-normal cursor-pointer gap-3
          ${getStateClasses()}
        `}
        onClick={disabled ? undefined : onClick}
      >
        {IconComponent && <IconComponent size={16} />}
        <p className="m-0">{setting}</p>
      </div>
    </div>
  );
};
