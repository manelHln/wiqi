"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Bell, Loader2, Trash2, CheckCheck } from "lucide-react";
import { useNotifications } from "@/hooks/use-notifications";
import toast from "react-hot-toast";

type TabType =
  | "all"
  | "price_drop"
  | "quota_limit"
  | "subscription_expiry"
  | "coupon_found"
  | "savings_milestone";

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const {
    notifications,
    isLoading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotifications();

  const handleMarkAsRead = async (id: string) => {
    const result = await markAsRead(id);
    if (!result) {
      toast.error("Failed to mark as read");
    }
  };

  const handleMarkAllAsRead = async () => {
    const result = await markAllAsRead();
    if (result) {
      toast.success("All notifications marked as read");
    } else {
      toast.error("Failed to mark all as read");
    }
  };

  const handleDelete = async (id: string) => {
    const result = await deleteNotification(id);
    if (result) {
      toast.success("Notification deleted");
    } else {
      toast.error("Failed to delete notification");
    }
  };

  const tabs = [
    { id: "all", label: "All", count: notifications?.length || 0 },
    {
      id: "price_drop",
      label: "Price Drops",
      count: notifications?.filter((n) => n.type === "price_drop").length || 0,
    },
    {
      id: "quota_limit",
      label: "Quota Alerts",
      count: notifications?.filter((n) => n.type === "quota_limit").length || 0,
    },
    {
      id: "coupon_found",
      label: "Coupons",
      count:
        notifications?.filter((n) => n.type === "coupon_found").length || 0,
    },
    {
      id: "savings_milestone",
      label: "Milestones",
      count:
        notifications?.filter((n) => n.type === "savings_milestone").length ||
        0,
    },
  ];

  const filteredNotifications =
    activeTab === "all"
      ? notifications
      : notifications?.filter((n) => n.type === activeTab);

  const unreadCount = notifications?.filter((n) => !n.is_read).length || 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8 max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">Notifications</h1>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="rounded-full">
                {unreadCount} new
              </Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" onClick={handleMarkAllAsRead}>
              <CheckCheck className="h-4 w-4 mr-2" />
              Mark all as read
            </Button>
          )}
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant="outline"
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`text-primary rounded-full border border-primary px-5 py-4 hover:bg-primary/20 hover:text-primary transition-all ${
                activeTab === tab.id
                  ? "bg-primary/20 text-primary"
                  : "bg-transparent hover:bg-primary/20"
              }`}
            >
              {tab.label} ({tab.count})
            </Button>
          ))}
        </div>

        {filteredNotifications && filteredNotifications.length > 0 ? (
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`transition-all hover:shadow-md ${
                  !notification.is_read
                    ? "border-l-4 border-l-primary bg-primary/5"
                    : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3
                          className={`font-semibold ${
                            !notification.is_read ? "text-primary" : ""
                          }`}
                        >
                          {notification.title}
                        </h3>
                        <Badge variant="secondary" className="text-xs">
                          {notification.type.replace("_", " ")}
                        </Badge>
                      </div>
                      <p className="text-sm text-secondary/70 mb-3">
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-secondary/70">
                          {new Date(notification.created_at).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </span>
                        {!notification.is_read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="text-xs"
                          >
                            Mark as read
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(notification.id)}
                          className="text-xs text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4">
                  <Bell className="h-10 w-10 text-secondary/70" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {activeTab === "all"
                    ? "No notifications"
                    : `No ${activeTab.replace("_", " ")} notifications`}
                </h3>
                <p className="text-secondary/70 text-sm max-w-md mx-auto">
                  You're all caught up! We'll notify you when there's something
                  new.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
