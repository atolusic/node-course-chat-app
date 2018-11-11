var socket = io();
socket.on("connect", function() {
  console.log("Connected to server");

  socket.emit("createMessage", {
    from: "tole",
    text: "sve radi"
  });

  socket.on("newMessage", function(newMessage) {
    console.log("New message: ", newMessage);
  });
});
socket.on("disconnect", function() {
  console.log("Disconnected from server");
});

socket.on("newMessage", function(message) {
  console.log("newMessage", message);
});
