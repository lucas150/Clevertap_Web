// import React, { useState, useEffect } from "react";
// import "./App.css";

// function App() {
//   const [isButtonClicked, setIsButtonClicked] = useState(false);

//   useEffect(() => {
//     // Check if the CleverTap SDK is loaded and initialized
//     if (window.clevertap) {
//       console.log("CleverTap SDK loaded successfully");
//     } else {
//       console.error("CleverTap SDK is not loaded");
//     }
//   }, []);

//   // Function to request notification permission
//   const requestNotificationPermission = () => {
//     if ("Notification" in window) {
//       Notification.requestPermission().then((permission) => {
//         if (permission === "granted") {
//           // If permission is granted, show the CleverTap notification prompt
//           showNotificationPrompt();
//         } else {
//           console.log("Notification permission denied");
//         }
//       });
//     }
//   };

//   // Function to trigger native display event
//   const HI = () => {
//     if (window.my_webview) {
//       window.my_webview.pushEvent("Web Event");
//     } else if (
//       window.webkit &&
//       window.webkit.messageHandlers &&
//       window.webkit.messageHandlers.iOS
//     ) {
//       window.webkit.messageHandlers.iOS.postMessage({
//         action: "recordEventWithProps",
//         event: "Web Event",
//       });
//     } else {
//       // For standard web app, send the event to CleverTap
//       window.clevertap.event.push("Web Event", {
//         content: "This is a web display event triggered from the web.",
//       });
//     }
//   };

//   // Function to show the CleverTap notification prompt
//   const showNotificationPrompt = () => {
//     if (window.clevertap) {
//       window.clevertap.notifications.push({
//         titleText: "Would you like to receive Push Notifications?",
//         bodyText:
//           "We promise to only send you relevant content and give you updates on your transactions.",
//         okButtonText: "Sign me up!",
//         rejectButtonText: "No thanks",
//         okButtonColor: "#f28046",
//       });

//       // Trigger a Web Event for testing
//       window.clevertap.event.push("Web Event", {
//         name: "Henil",
//       });

//       alert("Event pushed");
//     } else {
//       console.error("CleverTap SDK is not available");
//     }
//   };

//   // Function to handle button click
//   const handleClick = () => {
//     setIsButtonClicked(true); // Update state to show message
//     requestNotificationPermission(); // Request permission and show notification prompt
//   };

//   // Function to handle the second button click
//   const handleClick2 = () => {
//     setIsButtonClicked(true);
//     HI(); // Trigger the native event
//   };

//   return (
//     <div className="App">
//       <h1 id="HI">My React App</h1>
//       <button onClick={handleClick}>Click Me!</button>
//       <button id="HI" onClick={handleClick2}>
//         Hi
//       </button>
//       <div id="HI ">Native</div>

//       {isButtonClicked && <p>Push notification setup initiated!</p>}
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [eventTriggered, setEventTriggered] = useState(false);

  // Function to handle triggering the native display event
  const handleNativeDisplay = () => {
    if (window.my_webview) {
      // For Android or WebView, trigger the native display event
      window.my_webview.pushEvent("Native Display");
    } else if (
      window.webkit &&
      window.webkit.messageHandlers &&
      window.webkit.messageHandlers.iOS
    ) {
      // For iOS, trigger the native display event using the native bridge
      window.webkit.messageHandlers.iOS.postMessage({
        action: "recordEventWithProps",
        event: "Native Display",
      });
    } else {
      // For standard web environments, push a Web Event to CleverTap
      if (window.clevertap) {
        window.clevertap.event.push("Web Event", {
          content: "This is a web display event triggered from the web.",
        });
        setEventTriggered(true); // Update state to indicate event was triggered
      } else {
        console.error("CleverTap SDK is not available.");
      }
    }
  };

  useEffect(() => {
    if (eventTriggered) {
      // Display the event result in the element with ID "HI"
      const element = document.querySelector("#HI"); // Using #HI to target by ID
      if (element) {
        element.innerHTML =
          "Native Display event has been triggered and the Web Event is logged.";
      }
    }
  }, [eventTriggered]);
  // popup

  const [BoxPopupMessage, setBoxPopupMessage] = useState("");
  const boxpopup = () => {
    if (window.clevertap) {
      window.clevertap.event.push("BoxPopup", {
        content: "Box Popup is triggered",
      });
      setBoxPopupMessage("Box Popup Triggered");
    } else {
      console.error("Clevertap sdk not available");
    }
  };

  const [BannerPopupMessage, setBannerPopupMessage] = useState("");
  const bannerPopup = () => {
    if (window.clevertap) {
      window.clevertap.event.push("Banner Popup", {
        content: "Banner is triggered",
      });
      setBannerPopupMessage("Banner Popup");
    } else {
      console.error("sdk not defined");
    }
  };

  const [InterstitialPopupMessage, setInterstitialPopupMessage] = useState("");
  const InterstitialPopup = () => {
    if (window.clevertap) {
      window.clevertap.event.push("Interstitial Popup", {
        content: "Interstitial is triggered",
      });
      setInterstitialPopupMessage("Interstitial Popup");
    } else {
      console.error("sdk not defined");
    }
  };

  const [WebExitIntent, setWebExitIntent] = useState("");
  const webexitintent = () => {
    if (window.clevertap) {
      window.clevertap.event.push("Web Exit Intent", {
        content: "Web Exit Intent is triggered",
      });
      setWebExitIntent("Web Exit Intent Triggered");
    } else {
      console.error("sdk not defined");
    }
  };
  // in order to load popups more than 2 times
  // if (window.clevertap) {
  //   window.clevertap.setConfig({
  //     dismissSpamControl: true,
  //   });
  //   console.log("dismissSpamControl flag is set false");
  // }

  return (
    <div className="App">
      <h1>My React App</h1>
      <button onClick={handleNativeDisplay}>Trigger Native Display</button>
      {/* Box */}
      <button onClick={boxpopup}>Popup</button>
      {BoxPopupMessage && <p>{BoxPopupMessage}</p>}
      {/* banner */}
      <button onClick={bannerPopup}>Banner</button>
      {BannerPopupMessage && <p>{BannerPopupMessage}</p>}
      {/* Interstitial */}
      <button onClick={InterstitialPopup}>Interstitial</button>
      {InterstitialPopupMessage && <p>{InterstitialPopupMessage}</p>}
      <button onClick={webexitintent}>Web Exit Intent</button>
      {WebExitIntent && <p>{WebExitIntent}</p>} 

      <div id="HI"></div>
    </div>
  );
}

export default App;
