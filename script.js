window.addEventListener("DOMContentLoaded", () => {
  console.log("[Genesys Chat] DOM loaded");

  Genesys("subscribe", "MessagingService.messagesReceived", function (event) {
    console.log("[Genesys Chat] messagesReceived triggered");
    console.log("Full event object:", event);

    const rawMessages = event?.data?.messages || [];
    const msgs = Array.isArray(rawMessages) ? rawMessages : [rawMessages];
    console.log(`[Genesys Chat] Message count: ${msgs.length}`);

    msgs.forEach((message, index) => {
      console.log(`Message #${index + 1}:`, message);

      if (message.direction === "Outbound") {
        console.log("[Genesys Chat] Inbound message detected — playing sound");

        const sound = document.getElementById("msgSound");
        if (sound) {
          sound.play()
            .then(() => {
              console.log("[Genesys Chat] ✅ Sound played successfully");
            })
            .catch((err) => {
              console.warn("[Genesys Chat] ⚠️ Sound playback failed:", err);
            });
        } else {
          console.error("[Genesys Chat] ❌ Audio element not found in DOM");
        }
      } else {
        console.log(`[Genesys Chat] Skipping ${message.direction} message`);
      }
    });
  });

  console.log("[Genesys Chat] Subscribed to messagesReceived");
});
