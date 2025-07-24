import { ArrowRight, Check, Pencil, X } from "lucide-react";
import { Button } from "src/stories/Atoms/Buttons/Button/Button";

type NotificationPropsType = {
  bookingId: string;
  statut: "CANCELLED" | "NEW" | "MODIFIED";
  name: string;
};

type NotificationComponentProps = {
  notifications: NotificationPropsType[];
};

const NOTIFICATION_CONFIG = {
  CANCELLED: {
    title: "Attention, nouveau statut de réservation",
    message: (name: string) => `${name} a annulé sa réservation`,
    textColor: "text-[#F03538]",
    bgColor: "bg-[#FCE6E6]",
    iconColor: "text-[#F03538]",
    icon: X,
    iconSize: 14,
  },
  NEW: {
    title: "Vous avez une nouvelle réservation",
    message: (name: string) => `${name} a effectué une nouvelle réservation`,
    textColor: "text-[#4EC06D]",
    bgColor: "bg-[#E8F8EC]",
    iconColor: "text-[#4EC06D]",
    icon: Check,
    iconSize: 14,
  },
  MODIFIED: {
    title: "Attention, réservation mise à jour",
    message: (name: string) => `${name} a modifié sa réservation`,
    textColor: "text-[#F08037]",
    bgColor: "bg-[#FEF3EB]",
    iconColor: "text-[#F08037]",
    icon: Pencil,
    iconSize: 12,
  },
};

export const Notification = ({ notifications }: NotificationComponentProps) => {

  const handleNavigate = (bookingId: string) => {
    //router.push(`/booking/${bookingId}`);
  };

  const renderNotification = (notification: NotificationPropsType) => {
    const config = NOTIFICATION_CONFIG[notification.statut];
    const Icon = config.icon;

    return (
      <div className="flex flex-row items-center mb-4">
        <div
          className={`${config.bgColor} flex items-center justify-center ${config.iconColor} w-6 h-6 mr-2 rounded-full`}
        >
          <Icon size={config.iconSize} />
        </div>
        <p className="text-[14px]">{config.message(notification.name)}</p>
      </div>
    );
  };

  return (
    <div className="w-full min-w-[437px] p-4 space-y-[48px]">
      {notifications.map((notification: NotificationPropsType) => {
        const config = NOTIFICATION_CONFIG[notification.statut];

        return (
          <div key={notification.bookingId}>
            <p className="text-greyscale-800 mb-2 text-[16px]">
              {config.title}
            </p>
            <div className={config.textColor}>
              {renderNotification(notification)}
            </div>
            <div className="flex justify-between items-center">
              <p className="text-greyscale-600 text-[12px] items-center flex-1">
                n° ID09847693
              </p>
              <div>
                <Button
                  label="Voir la réservation"
                  iconPosition="right"
                  icon={ArrowRight}
                  variant="tertiary"
                  size="small"
                  onClick={() => handleNavigate(notification.bookingId)}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
