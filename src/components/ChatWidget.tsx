"use client";

import { useEffect } from "react";

const ChatWidget = () => {
  useEffect(() => {
    // Tawk.to Integration
    // Replace YOUR_PROPERTY_ID and YOUR_WIDGET_ID with your actual IDs from Tawk.to dashboard
    const propertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID || "";
    const widgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID || "default";

    if (!propertyId) return;

    var Tawk_API: any = Tawk_API || {}, Tawk_LoadStart = new Date();
    (function(){
      var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode?.insertBefore(s1, s0);
    })();
  }, []);

  return null; // Tawk.to handles the UI injection
};

export default ChatWidget;
