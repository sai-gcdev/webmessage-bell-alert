// Placeholder for future enhancements (like bell sound logic)
console.log("Site loaded");

window.addEventListener("DOMContentLoaded", () => {
  Genesys("subscribe", "MessagingService.messagesReceived", function (messages) {
    const msgs = Array.isArray(messages) ? messages : [messages]; // ✅ safe normalization

    msgs.forEach((message) => {
      if (message.direction === "Inbound") {
        const sound = document.getElementById("msgSound");
        if (sound) {
          sound.play().catch((err) => {
            console.warn("Sound playback failed:", err);
          });
        }
      }
    });
  });
});
