"use client"

import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from 'framer-motion'
import { User, LogOut, Settings, HelpCircle, UserCog } from 'lucide-react'
import Link from 'next/link'

interface ProfileDropdownProps {
  profileImage?: string
  name?: string
  email?: string
}

export function ProfileDropdown({
  profileImage = "/avatars/01.png",
  name = "Sarah Johnson",
  email = "sarah.johnson@example.com"
}: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <motion.button
          className="focus:outline-none"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Avatar className="transition-colors border-2 border-transparent cursor-pointer w-9 h-9 hover:border-primary">
            <AvatarImage className="object-cover" src={profileImage} alt={name} />
            <AvatarFallback>
              {name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </motion.button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mt-1" align="end">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center p-2">
            <Avatar className="mr-2 h-9 w-9">
              <AvatarImage className="object-cover" src={profileImage} alt={name} />
              <AvatarFallback>
                {name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-0.5">
              <p className="text-sm font-medium">{name}</p>
              <p className="text-xs text-muted-foreground">{email}</p>
            </div>
          </div>
        </motion.div>

        <DropdownMenuSeparator />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
            <User className="w-4 h-4" />
            <span>My Profile</span>
          </DropdownMenuItem>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.15 }}
        >
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
            <UserCog className="w-4 h-4" />
            <span>Account Settings</span>
          </DropdownMenuItem>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.2 }}
        >
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
            <Settings className="w-4 h-4" />
            <span>Preferences</span>
          </DropdownMenuItem>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.25 }}
        >
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
            <HelpCircle className="w-4 h-4" />
            <span>Help & Support</span>
          </DropdownMenuItem>
        </motion.div>

        <DropdownMenuSeparator />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.3 }}
        >
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive">
            <LogOut className="w-4 h-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 