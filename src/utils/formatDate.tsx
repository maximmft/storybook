export const formatDate = (timestamp: number | string) => {
  const date = new Date(timestamp);

  return date.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
