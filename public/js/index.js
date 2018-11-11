var socket = io();
socket.on("connect", function() {
  console.log("Connected to server");
});
socket.on("disconnect", function() {
  console.log("Disconnected from server");
});

socket.on("newMessage", function(newMessage) {
  const formattedTime = moment(newMessage.createdAt).format("h:mm a");
  var li = jQuery("<li></li>");
  li.text(`${newMessage.from} ${formattedTime}: ${newMessage.text}`);

  jQuery("#messages").append(li);
});

jQuery("#message-form").on("submit", function(e) {
  e.preventDefault();

  var messageTextbox = jQuery("[name=message]");

  socket.emit(
    "createMessage",
    {
      from: "User",
      text: messageTextbox.val()
    },
    function() {
      messageTextbox.val("");
    }
  );
});

socket.on("newLocationMessage", function(message) {
  const formattedTime = moment(message.createdAt).format("h:mm a");
  var li = jQuery("<li></li>");
  var a = jQuery('<a target="_blank">My current location</a>');

  li.text(`${message.from} ${formattedTime}: `);
  a.attr("href", message.url);
  li.append(a);
  jQuery("#messages").append(li);
});

var locationButton = jQuery("#send-location");
locationButton.on("click", function() {
  if (!navigator.geolocation) {
    return alert("Geolocation not supported by your browser.");
  }

  locationButton.attr("disabled", "disabled").text("Sending location...");

  navigator.geolocation.getCurrentPosition(
    function(position) {
      locationButton.attr("disabled", "disabled").text("Send location");
      locationButton.removeAttr("disabled");
      socket.emit("createLocationMessage", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    function() {
      locationButton.attr("disabled", "disabled").text("Send location");
      alert("Unable to fetch location");
    }
  );
});
