import { useEffect, useState } from "react";

const formatDate = (dateString) => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

const getTimeAgo = (date) => {
  const secondsAgo = Math.floor((Date.now() - date.getTime()) / 1000);
  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const i of intervals) {
    const count = Math.floor(secondsAgo / i.seconds);
    if (count >= 1) {
      return `${count} ${i.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
};

const useFormattedDate = (dateString, thresholdDays = 2) => {
  const postedDate = dateString ? new Date(dateString) : null;

  const [display, setDisplay] = useState(() => {
    if (!postedDate) return "—";
    const msInDay = 1000 * 60 * 60 * 24;
    const daysAgo = (Date.now() - postedDate) / msInDay;
    return daysAgo > thresholdDays
      ? formatDate(dateString)
      : getTimeAgo(postedDate);
  });

  useEffect(() => {
    if (!postedDate) return;

    const msInDay = 1000 * 60 * 60 * 24;
    const daysAgo = (Date.now() - postedDate) / msInDay;

    if (daysAgo <= thresholdDays) {
      const interval = setInterval(() => {
        setDisplay(getTimeAgo(new Date(dateString)));
      }, 60000);

      return () => clearInterval(interval);
    }
  }, [dateString, thresholdDays, postedDate]);

  return display;
};

export default useFormattedDate;