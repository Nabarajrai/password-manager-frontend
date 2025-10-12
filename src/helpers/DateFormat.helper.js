import dayjs from "dayjs";

export const FormatDate = (rawDate) => {
  return dayjs(rawDate).format("YYYY-MM-DD");
};

// utils/checkCredentialStatus.js
export const getCredentialStatus = (expiredAtRaw, limitDays = 90) => {
  if (!expiredAtRaw) return "active"; // or handle differently if needed

  const expiredDate = new Date(expiredAtRaw);
  const now = new Date();

  const diffMs = now - expiredDate;
  const daysPassed = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return daysPassed > limitDays ? "Expired" : "Active";
};
