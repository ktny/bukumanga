export const formatDate = (dt: Date): string => {
  const year = dt.getFullYear();
  const month = (dt.getMonth() + 1).toString().padStart(2, "0");
  const day = dt.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};
