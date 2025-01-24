  import React, { useState, useEffect } from "react";
  import "./App.css";

  function App() {
    const [eventTriggered, setEventTriggered] = useState(false);
    const [notificationPermission, setNotificationPermission] = useState(
      Notification.permission
    );

    const requestNotificationPermission = () => {
      if ("Notification" in window) {
        Notification.requestPermission().then((permission) => {
          setNotificationPermission(permission);
          if (permission === "granted") {
            new Notification("Thank you!", {
              body: "You will now receive notifications.",
            });
          } else if (permission === "denied") {
            alert("You have denied notifications. Enable them in browser settings.");
          }
        });
      } else {
        console.error("This browser does not support notifications.");
      }
    };
    // const triggerNotification = () => {
    //   if (notificationPermission === "granted") {
    //     new Notification("Hello from React!", {
    //       body: "This is a test notification from your app.",
    //       icon: "https://via.placeholder.com/128", // Add an optional icon
    //     });
    //   } else {
    //     alert("Please enable notifications first.");
    //   }
    // };
      

    // Function to handle triggering the native display event
    const handleNativeDisplay = () => {
      if (window.my_webview) {
        // For Android or WebView, trigger the native display event
        window.my_webview.pushEvent("Web Event");
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
    
    const [WebEvent, setWebEvent] = useState("");
    const webEvent = () => {
      if (window.clevertap) {
        window.clevertap.event.push("Push Notification Triggered", {
          content: "Push Notification Triggered is triggered",
        });
        setWebEvent("Push Notification Triggered Triggered");
      } else {
        console.error("sdk not defined");
      }
    };

    return (
      <div className="App">
        <h1>My React App</h1>
        <button onClick={requestNotificationPermission}>
        Ask Notification Permission
      </button>
      <p>Notification Status: {notificationPermission}</p>
      {/* <button onClick={triggerNotification} disabled={notificationPermission !== "granted"}>
        Trigger Notification
      </button> */}

        <button onClick={webEvent}>Push Notification</button>
        {WebEvent && <p>{WebEvent}</p>}
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
        {/* exit Intent */}
        <button onClick={webexitintent}>Web Exit Intent</button>
        {WebExitIntent && <p>{WebExitIntent}</p>} 
      </div>
    );
  }

  export default App;
