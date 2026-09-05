import { useState } from "react";
import { notifications } from "../../data/demoData";
import NotificationPanel from "../../components/notifications/NotificationPanel";
import Button from "../../components/common/Button";

function Notifications() {
  const [items, setItems] = useState(notifications);

  const toggleRead = (id) =>
    setItems((list) =>
      list.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );

  const markAllRead = () =>
    setItems((list) => list.map((n) => ({ ...n, read: true })));

  const unreadCount = items.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Notifications</h2>
          <p className="text-sm mt-1 text-[#434655]">
            {unreadCount > 0 ? `${unreadCount} unread alerts` : "You are all caught up."}
          </p>
        </div>

        {unreadCount > 0 && (
          <Button variant="secondary" onClick={markAllRead}>
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
              mark_email_read
            </span>
            Mark all read
          </Button>
        )}
      </div>

      <NotificationPanel notifications={items} onToggleRead={toggleRead} />
    </div>
  );
}

export default Notifications;