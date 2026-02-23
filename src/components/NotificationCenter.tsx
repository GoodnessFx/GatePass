import React, { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
import { Badge } from './ui/badge';
import { formatDistanceToNow } from 'date-fns';

type Notification = {
  id: string;
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
  read: boolean;
  createdAt: string;
};

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const loadLocalNotifications = () => {
    try {
      const raw = localStorage.getItem('gp_notifications');
      const parsed = raw ? JSON.parse(raw) : [];
      const list: Notification[] = Array.isArray(parsed) ? parsed : [];
      setNotifications(list);
      setUnreadCount(list.filter((n) => !n.read).length);
    } catch {
      setNotifications([]);
      setUnreadCount(0);
    }
  };

  useEffect(() => {
    loadLocalNotifications();
    const interval = setInterval(loadLocalNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  const markAllRead = () => {
    setNotifications((prev) => {
      const updated = prev.map((n) => ({ ...n, read: true }));
      try {
        localStorage.setItem('gp_notifications', JSON.stringify(updated));
      } catch {}
      return updated;
    });
    setUnreadCount(0);
  };

  const markRead = (id: string) => {
    setNotifications((prev) => {
      const updated = prev.map((n) =>
        n.id === id ? { ...n, read: true } : n
      );
      try {
        localStorage.setItem('gp_notifications', JSON.stringify(updated));
      } catch {}
      setUnreadCount(updated.filter((n) => !n.read).length);
      return updated;
    });
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 px-1.5 py-0.5 min-w-[18px] h-[18px] flex items-center justify-center text-[10px]" 
              variant="destructive"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h4 className="font-semibold text-sm">Notifications</h4>
          {unreadCount > 0 && (
            <Button variant="ghost" size="xs" onClick={markAllRead} className="text-xs h-auto py-1">
              Mark all read
            </Button>
          )}
        </div>
        <ScrollArea className="h-[300px]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-8 text-muted-foreground">
              <Bell className="h-8 w-8 mb-2 opacity-20" />
              <p className="text-sm">No notifications yet</p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 hover:bg-muted/50 transition-colors ${!notification.read ? 'bg-muted/20' : ''}`}
                  onClick={() => !notification.read && markRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${!notification.read ? 'bg-primary' : 'bg-transparent'}`} />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{notification.title}</p>
                      <p className="text-xs text-muted-foreground">{notification.message}</p>
                      <p className="text-[10px] text-muted-foreground pt-1">
                        {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
