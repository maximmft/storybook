export const timeAgo = (timestamp: number | string) => {
    const date = new Date(timestamp);
    const now = new Date();
  
    const diff = (now.getTime() - date.getTime()) / 1000;
  
    const minutes = Math.floor(diff / 60);
    const hours = Math.floor(diff / 3600);
    const days = Math.floor(diff / (3600 * 24));
  
    let timeUnit = "";
    let timeToDisplay = 0;
  
    if (minutes < 1) return "À l'instant";
    
    if (minutes > 1 && minutes < 60) {
      timeUnit = "min";
      timeToDisplay = minutes;
    } else if (hours >= 1 && hours < 24) {
      timeUnit = "h";
      timeToDisplay = hours;
    } else if (days >= 1) {
      timeUnit = "j";
      timeToDisplay = days;
    }

    return `Il y a ${timeToDisplay} ${timeUnit}`;
  };
  