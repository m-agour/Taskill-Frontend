import Toastify from "toastify-js";

const getToast = (message, error = false) => {
  let background = !error
    ? "linear-gradient(to right, #00b09b, #96c93d)"
    : "linear-gradient(to right, #ff5f9d, #ff8379)";
  return Toastify({
    text: `${message}`,
    duration: 3000,
    gravity: "bottom",
    position: "right",
    gravity: "bottom",
    stopOnFocus: true,
    style: {
      background: background,
    },
  });
};

const formatTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const formattedTime = [
    hours.toString().padStart(2, "0"),
    minutes.toString().padStart(2, "0"),
    seconds.toString().padStart(2, "0"),
  ].join(":");

  return formattedTime;
};

export { getToast, formatTime };
