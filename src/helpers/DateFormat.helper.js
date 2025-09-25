import dayjs from "dayjs";

export const FormatDate = (rawDate) => {
  return dayjs(rawDate).format("YYYY-MM-DD");
};
