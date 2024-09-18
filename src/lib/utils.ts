export const formatCurrency = (value: number | string): string => {
  const numValue = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(numValue)) {
    throw new Error("Invalid number format");
  }

  const formattedNumber = numValue.toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Add currency sign
  return `£${formattedNumber}`;
};
