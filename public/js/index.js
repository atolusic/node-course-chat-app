var socket = io();

function scrollToBottom() {
  var messages = jQuery("#messages");
  var newMessage = messages.children("li:last-child");
  var clientHeight = messages.prop("clientHeight");
  var scrollTop = messages.prop("scrollTop");
  var scrollHeight = messages.prop("scrollHeight");
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (
    clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
    scrollHeight
  ) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on("connect", function() {
  console.log("Connected to server");
});
socket.on("disconnect", function() {
  console.log("Disconnected from server");
});

socket.on("newMessage", function(newMessage) {
  const formattedTime = moment(newMessage.createdAt).format("h:mm a");
  var template = jQuery("#message-template").html();
  var html = Mustache.render(template, {
    text: newMessage.text,
    from: newMessage.from,
    createdAt: formattedTime
  });

  jQuery("#messages").append(html);
  scrollToBottom();
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
  var template = jQuery("#location-message-template").html();
  const html = Mustache.render(template, {
    from: message.from,
    createdAt: formattedTime,
    url: message.url
  });

  jQuery("#messages").append(html);
  scrollToBottom();
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
