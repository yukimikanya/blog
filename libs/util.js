import dayjs from "./../node_modules/dayjs";
import utc from "./../node_modules/dayjs/plugin/utc";
import timezone from "./../node_modules/dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

// UTC -> "2022_04" のフォーマットに変換
export const formatDate = (date) => {
  const formattedDate = dayjs.utc(date).tz("Asia/Tokyo").format("YYYY_MM");
  return formattedDate;
};

export const groupBy = function (contents) {
    return contents.reduce(function (group, x) {
      const yearMonthString = formatDate(new Date(x["publishedAt"]));
      (group[yearMonthString] = group[yearMonthString] || []).push(x);
      return group;
    }, {});
  };