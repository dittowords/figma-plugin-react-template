import React, { useState, useEffect, useRef } from "react";
import App from "./App.tsx";

function PreviewApp() {
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef(null);

  const PREVIEW_ENV = undefined
  
  const onWindowMsg = msg => {
    if (msg.data.pluginMessage && msg.data.src !== "socketServer") {
      const message = JSON.stringify(msg.data.pluginMessage);
      if (ws.current.readyState === 1) {
        ws.current.send(message);
      } else {
        setTimeout(() => {
          onWindowMsg(msg);
        }, 1000);
      }
    }
  };

  const startWebSocket = () => {
    ws.current = new WebSocket("ws://localhost:9001/ws");
    ws.current.onopen = () => {
      console.log("ws opened");
      setIsConnected(true);
    };
    ws.current.onclose = () => {
      console.log("ws closed");
      setIsConnected(false);

      setTimeout(() => {
        startWebSocket();
      }, 3000);
    };

    ws.current.onmessage = event => {
      try {
        let msg = JSON.parse(event.data);
        if (msg.src === "server") {
          let temp = JSON.parse(msg.message);
          io.send(temp.event, temp.data);
        }
      } catch (err) {
        console.log("not a valid message");
      }
    };

    window.addEventListener("message", onWindowMsg);

    return () => {
      ws.current.close();
      window.removeEventListener("message", onWindowMsg);
    };
  };

  useEffect(() => {
    startWebSocket();
  }, []);

  return (
    <div className="preview-app">
      <h3>Preview App</h3>
      <div className="preview-connection-info">
        <strong>Connection Status:</strong>
        <div
          className={classNames({
            "preview-connection-status": true,
            "status-green": isConnected
          })}
        />
      </div>

      {PREVIEW_ENV === "desktop" && setIsConnected && (
        <div className="preview-plugin-wrapper">
          <App />
        </div>
      )}
    </div>
  );
}

export default PreviewApp;
