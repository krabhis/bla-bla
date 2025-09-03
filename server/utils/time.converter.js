  const formatCreatedAt = (createdAt) => {
  const date = new Date(createdAt);
  const options = { month: "long", day: "numeric", year: "numeric" };
  const dateString = date.toLocaleDateString("en-US", options);
  const day = date.getDate();
  let suffix;
  if (day % 10 === 1 && day !== 11) {
    suffix = "st";
  } else if (day % 10 === 2 && day !== 12) {
    suffix = "nd";
  } else if (day % 10 === 3 && day !== 13) {
    suffix = "rd";
  } else {
    suffix = "th";
  }
  const timeString = date.toLocaleTimeString("en-US", { 
    hour: "numeric",
    minute: "numeric",
  });
  return (
    dateString.split(",")[0] +
    suffix +
    ", " +
    date.getFullYear() +
    " " +
    timeString
  );
};

export default formatCreatedAt;