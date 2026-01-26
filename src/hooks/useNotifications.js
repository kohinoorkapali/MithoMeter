import { useEffect } from "react";
import toast from "react-hot-toast";
import { apiRequest } from "../utils/api";

const useNotifications = () => {
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await apiRequest("GET", "/notifications");

        const unread = res.filter((n) => !n.isRead);

        unread.forEach((notif) => {
          toast.error(notif.message, {
            icon: "🚫",
            duration: 5000,
          });
        });

        if (unread.length > 0) {
          await apiRequest("PATCH", "/notifications/read");
        }
      } catch (err) {
        console.error("Failed to load notifications", err);
      }
    };

    fetchNotifications();
  }, []);
};

export default useNotifications;
