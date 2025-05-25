// Placeholder for future enhancements (like bell sound logic)
console.log("Site loaded");
window.addEventListener("DOMContentLoaded", () => {
  // Subscribe to incoming messages using the Genesys SDK
  Genesys("subscribe", "MessagingService.messagesReceived", function (messages) {
    messages.forEach((message) => {
      if (message.direction === "Inbound") {
        const sound = document.getElementById("msgSound");
        if (sound) {
          sound.play().catch((err) => {
            console.warn("Sound playback failed (likely due to autoplay policy):", err);
          });
        }
      }
    });
  });
});
