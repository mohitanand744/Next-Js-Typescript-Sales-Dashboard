"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { cn } from "@/lib/utils"
import { Bell, Check, X } from "lucide-react"
import { Button } from "./button"
import { motion, AnimatePresence } from "framer-motion"

const NotificationPopover = PopoverPrimitive.Root

const NotificationPopoverTrigger = PopoverPrimitive.Trigger

const NotificationPopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "end", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-80 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
NotificationPopoverContent.displayName = PopoverPrimitive.Content.displayName

export interface NotificationItem {
  id: string
  title: string
  message: string
  time: string
  read: boolean
}

export interface NotificationsProps {
  notifications: NotificationItem[]
  onMarkAsRead: (id: string) => void
  onDismiss: (id: string) => void
  onViewAll: () => void
}

const bellAnimation = {
  initial: { scale: 1 },
  hover: { scale: 1.1, rotate: [0, -10, 10, -5, 5, 0], transition: { duration: 0.6 } }
}

const notificationItemVariants = {
  hidden: { opacity: 0, y: 10, height: 0 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    height: "auto",
    transition: {
      delay: index * 0.1,
      duration: 0.3
    }
  }),
  exit: { opacity: 0, height: 0, transition: { duration: 0.2 } }
}

export function Notifications({ notifications, onMarkAsRead, onDismiss, onViewAll }: NotificationsProps) {
  const unreadCount = notifications.filter(n => !n.read).length;
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <NotificationPopover onOpenChange={setIsOpen}>
      <NotificationPopoverTrigger asChild>
        <motion.div
          initial="initial"
          whileHover="hover"
          animate={unreadCount > 0 ? "hover" : "initial"}
          variants={bellAnimation}
          className="relative"
        >
          <Button variant="ghost" size="icon" className="relative rounded-full">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
                className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-white"
              >
                {unreadCount}
              </motion.span>
            )}
            <span className="sr-only">Notifications</span>
          </Button>
        </motion.div>
      </NotificationPopoverTrigger>
      <NotificationPopoverContent className="w-80 p-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between border-b p-4"
        >
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="rounded-full bg-muted px-2 py-0.5 text-xs"
            >
              {unreadCount} new
            </motion.span>
          )}
        </motion.div>
        <div className="max-h-[60vh] overflow-y-auto">
          {notifications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="p-4 text-center text-sm text-muted-foreground"
            >
              No notifications
            </motion.div>
          ) : (
            <AnimatePresence>
              <div className="space-y-1">
                {notifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={notificationItemVariants}
                    className={cn(
                      "flex items-start justify-between p-4 hover:bg-muted/50 transition-colors",
                      !notification.read && "bg-muted/30"
                    )}
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {notification.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {notification.time}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      {!notification.read && (
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => onMarkAsRead(notification.id)}
                          >
                            <Check className="h-4 w-4" />
                            <span className="sr-only">Mark as read</span>
                          </Button>
                        </motion.div>
                      )}
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => onDismiss(notification.id)}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Dismiss</span>
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          )}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="border-t p-2"
        >
          <Button
            variant="ghost"
            className="w-full justify-center text-sm hover:bg-muted transition-colors"
            onClick={onViewAll}
          >
            View all notifications
          </Button>
        </motion.div>
      </NotificationPopoverContent>
    </NotificationPopover>
  )
} 