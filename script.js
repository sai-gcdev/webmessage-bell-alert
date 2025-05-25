window.addEventListener("DOMContentLoaded", () => {
  console.log("[Genesys Chat] Page DOM fully loaded");

  // Subscribe to Genesys message events
  Genesys("subscribe", "MessagingService.messagesReceived", function (messages) {
    console.log("[Genesys Chat] messagesReceived event triggered");
    console.log("Raw event data:", messages);

    const msgs = Array.isArray(messages) ? messages : [messages];
    console.log(`Normalized messages array. Count: ${msgs.length}`);

    msgs.forEach((message, index) => {
      console.log(`Message #${index + 1} - Direction: ${message.direction}`);

      if (message.direction === "Inbound") {
        const sound = document.getElementById("msgSound");

        if (sound) {
          console.log("[Genesys Chat] Attempting to play sound...");
          sound.play().then(() => {
            console.log("[Genesys Chat] ✅ Sound played successfully");
          }).catch((err) => {
            console.warn("[Genesys Chat] ⚠️ Sound playback failed:", err);
            console.warn(
              "Note: This is usually due to lack of user interaction with the page. Try clicking anywhere first."
            );
          });
        } else {
          console.error("[Genesys Chat] ❌ Audio element not found in DOM");
        }
      } else {
        console.log("[Genesys Chat] Message direction is not Inbound. Ignored.");
      }
    });
  });

  console.log("[Genesys Chat] Subscribed to messagesReceived event");
});
