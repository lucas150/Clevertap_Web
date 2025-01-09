import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  useEffect(() => {
    // Check if the CleverTap SDK is loaded and initialized
    if (window.clevertap) {
      console.log("CleverTap SDK loaded successfully");
    } else {
      console.error("CleverTap SDK is not loaded");
    }
  }, []);

  // Function to request notification permission
  const requestNotificationPermission = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          // If permission is granted, show the CleverTap notification prompt
          showNotificationPrompt();
        } else {
          console.log("Notification permission denied");
        }
      });
    }
  };

  // Function to show the CleverTap notification prompt
  const showNotificationPrompt = () => {
    if (window.clevertap) {
      window.clevertap.notifications.push({
        titleText: "Would you like to receive Push Notifications?",
        bodyText:
          "We promise to only send you relevant content and give you updates on your transactions.",
        okButtonText: "Sign me up!",
        rejectButtonText: "No thanks",
        okButtonColor: "#f28046",
      });

      // Trigger a Web Event for testing
      window.clevertap.event.push("Web Event", {
        name: "Henil",
      });

      alert("Event pushed");
    } else {
      console.error("CleverTap SDK is not available");
    }
  };

  const handleClick = () => {
    setIsButtonClicked(true); // Update state to show message

    // Request permission and show notification prompt
    requestNotificationPermission();
  };

  return (
    <div className="App">
      <h1>My React App</h1>
      <button onClick={handleClick}>Click Me!</button>
      {isButtonClicked && <p>Push notification setup initiated!</p>}
    </div>
  );
}

export default App;
