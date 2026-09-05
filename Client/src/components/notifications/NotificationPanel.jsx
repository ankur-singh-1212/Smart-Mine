import NotificationItem from "./NotificationItem";
import EmptyState from "../common/EmptyState";

export default function NotificationPanel({ notifications, onToggleRead }) {
  const unread = notifications.filter((n) => !n.read);
  const read = notifications.filter((n) => n.read);

  const renderList = (items) =>
    items.map((notification) => (
      <NotificationItem
        key={notification.id}
        notification={notification}
        onToggleRead={onToggleRead}
      />
    ));

  if (notifications.length === 0) {
    return (
      <div className="card p-6">
        <EmptyState icon="notifications_off" title="No notifications" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {unread.length > 0 && (
        <section>
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#434655] mb-3">
            Unread ({unread.length})
          </h3>
          <div className="space-y-3">{renderList(unread)}</div>
        </section>
      )}

      {read.length > 0 && (
        <section>
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#434655] mb-3">
            Read ({read.length})
          </h3>
          <div className="space-y-3">{renderList(read)}</div>
        </section>
      )}
    </div>
  );
}