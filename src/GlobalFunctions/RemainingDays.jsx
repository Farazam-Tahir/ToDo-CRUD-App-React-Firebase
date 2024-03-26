import dayjs from "dayjs";



export const getRemainingDays = (date) => {
    const today = dayjs();
    const targetDate = dayjs(date);
    const diffInDays = targetDate.diff(today, "day");
    return diffInDays;
  };