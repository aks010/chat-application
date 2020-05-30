const socket = io();

const sendMessage = document.getElementById("sendMessage");
const messageField = document.getElementById("messageField");
const errorMessage = document.getElementById("errorMessage");
const messageBox = document.getElementById("messageBox");
const messageForm = document.getElementById("message-form");
const sendLocation = document.getElementById("send-location");

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let message = messageField.value;
  if (message === "") {
  } else {
    socket.emit("sendMessage", message);
    messageField.value = "";
  }
});

socket.on("sendMessage", (message) => {
  //   messageBox.textContent = message;
  console.log(message);
});

sendLocation.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser.");
  }

  navigator.geolocation.getCurrentPosition((position) => {
    // console.log(position);
    const { longitude, latitude } = position.coords;
    socket.emit("sendLocation", { latitude, longitude });
  });
});
