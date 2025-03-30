"use client"

import React, { useState, useRef } from 'react'
import { Settings, User, Bell, Shield, CreditCard, Check, Upload } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from '@/components/ui/separator'
import { useUser } from '@/contexts/user-context'

export default function SettingsPage() {
  // Get user data from context
  const { userData, updateUserData } = useUser();

  // State management
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [profileForm, setProfileForm] = useState({ name: userData.name, email: userData.email })
  const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' })
  const [passwordErrors, setPasswordErrors] = useState<{ current?: string, new?: string, confirm?: string }>({})
  const [newAvatar, setNewAvatar] = useState<string | null>(null)
  const [isChangingAvatar, setIsChangingAvatar] = useState(false)
  const [selectedTab, setSelectedTab] = useState("account")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Handle profile edit
  const handleProfileEdit = (field: string, value: string) => {
    setProfileForm({ ...profileForm, [field]: value })
  }

  // Save profile changes
  const saveProfileChanges = () => {
    // Basic validation
    if (!profileForm.name.trim() || !profileForm.email.trim()) {
      toast.error("Name and email are required")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(profileForm.email)) {
      toast.error("Please enter a valid email address")
      return
    }

    // Update user context
    updateUserData({
      name: profileForm.name,
      email: profileForm.email,
      // If there's a new avatar, update it too
      ...(newAvatar && { avatar: newAvatar })
    })

    // Clear temporary avatar state
    setNewAvatar(null)
    setIsEditingProfile(false)
    toast.success("Profile updated successfully")
  }

  // Toggle notification preference
  const toggleNotification = (category: 'orderUpdates' | 'securityAlerts' | 'marketingUpdates', type: 'email' | 'push') => {
    const newPreferences = { ...userData.notificationPreferences }
    newPreferences[category][type] = !newPreferences[category][type]

    // Update user data directly with notification changes
    const updatedUser = {
      ...userData,
      notificationPreferences: newPreferences
    }
    updateUserData(updatedUser)

    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} notifications ${newPreferences[category][type] ? 'enabled' : 'disabled'} for ${category.replace(/([A-Z])/g, ' $1').toLowerCase()}`)
  }

  // Handle password change
  const handlePasswordChange = (field: string, value: string) => {
    setPasswordForm({ ...passwordForm, [field]: value })

    // Clear error for this field as user types
    if (passwordErrors[field as keyof typeof passwordErrors]) {
      setPasswordErrors({ ...passwordErrors, [field]: undefined })
    }
  }

  // Update password with validation
  const updatePassword = () => {
    const errors: { current?: string, new?: string, confirm?: string } = {}

    // Validate current password (just checking it's not empty for this example)
    if (!passwordForm.current) {
      errors.current = "Current password is required"
    }

    // Validate new password
    if (!passwordForm.new) {
      errors.new = "New password is required"
    } else if (passwordForm.new.length < 8) {
      errors.new = "Password must be at least 8 characters"
    }

    // Validate password confirmation
    if (passwordForm.new !== passwordForm.confirm) {
      errors.confirm = "Passwords do not match"
    }

    // If we have errors, show them and return
    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors)
      return
    }

    // Password updated successfully
    toast.success("Password updated successfully")
    setPasswordForm({ current: '', new: '', confirm: '' })
  }

  // Handle avatar change
  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Set changing avatar flag
    setIsChangingAvatar(true)

    // Demo implementation - we'd normally upload to a server here
    const reader = new FileReader()
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        // Store the new avatar in local state first
        setNewAvatar(reader.result)
        setIsChangingAvatar(false)
      }
    }
    reader.readAsDataURL(file)
  }

  // Save avatar changes immediately
  const saveAvatarChanges = () => {
    if (newAvatar) {
      updateUserData({ avatar: newAvatar })
      setNewAvatar(null)
      toast.success("Avatar updated successfully")
    }
  }

  // Handle plan upgrade/downgrade
  const handlePlanChange = (plan: string) => {
    const plans = {
      "Basic": "$9.99/month",
      "Professional": "$29.99/month",
      "Enterprise": "$99.99/month"
    }

    // Update user with plan changes
    updateUserData({
      currentPlan: plan,
      planPrice: plans[plan as keyof typeof plans]
    })

    toast.success(`Your plan has been updated to ${plan}`)
  }

  // Handle view receipts
  const viewReceipts = () => {
    // This would normally open a dialog with receipts or redirect to a receipts page
    toast.info("Receipts functionality would be implemented here")
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      {/* Tabs for different settings sections */}
      <Tabs defaultValue="account" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        {/* Account Tab Content */}
        <TabsContent value="account">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <User className="w-5 h-5" />
              <div>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Manage your personal information</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center py-4 space-y-4">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage
                      src={newAvatar || userData.avatar}
                      className="object-cover"
                      alt="Profile"
                    />
                    <AvatarFallback>{userData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    className="absolute bottom-0 right-0 w-8 h-8 rounded-full"
                    onClick={handleAvatarClick}
                  >
                    <Upload className="w-4 h-4" />
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
                {newAvatar && (
                  <Button
                    onClick={saveAvatarChanges}
                    className="mt-2"
                    disabled={isChangingAvatar}
                  >
                    {isChangingAvatar ? 'Uploading...' : 'Save Avatar'}
                  </Button>
                )}
                <div className="flex flex-col items-center space-y-1">
                  <h3 className="text-lg font-medium">{userData.name}</h3>
                  <p className="text-sm text-muted-foreground">{userData.email}</p>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="pt-2 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Full Name
                  </label>
                  <Input
                    value={isEditingProfile ? profileForm.name : userData.name}
                    onChange={(e) => handleProfileEdit('name', e.target.value)}
                    disabled={!isEditingProfile}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Email
                  </label>
                  <Input
                    value={isEditingProfile ? profileForm.email : userData.email}
                    onChange={(e) => handleProfileEdit('email', e.target.value)}
                    disabled={!isEditingProfile}
                  />
                </div>

                {isEditingProfile ? (
                  <div className="flex gap-2">
                    <Button onClick={saveProfileChanges}>Save Changes</Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsEditingProfile(false)
                        setProfileForm({ name: userData.name, email: userData.email })
                        setNewAvatar(null) // Clear any pending avatar changes
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button onClick={() => setIsEditingProfile(true)}>Edit Profile</Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab Content */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Bell className="w-5 h-5" />
              <div>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Configure how you receive notifications</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Order Updates</p>
                    <p className="text-sm text-muted-foreground">
                      Get notified when an order is placed, shipped, or delivered.
                    </p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="order-email"
                        checked={userData.notificationPreferences.orderUpdates.email}
                        onCheckedChange={() => toggleNotification('orderUpdates', 'email')}
                      />
                      <label htmlFor="order-email" className="text-sm font-medium">Email</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="order-push"
                        checked={userData.notificationPreferences.orderUpdates.push}
                        onCheckedChange={() => toggleNotification('orderUpdates', 'push')}
                      />
                      <label htmlFor="order-push" className="text-sm font-medium">Push</label>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between space-x-2">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Security Alerts</p>
                    <p className="text-sm text-muted-foreground">
                      Get notified about security events like password changes.
                    </p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="security-email"
                        checked={userData.notificationPreferences.securityAlerts.email}
                        onCheckedChange={() => toggleNotification('securityAlerts', 'email')}
                      />
                      <label htmlFor="security-email" className="text-sm font-medium">Email</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="security-push"
                        checked={userData.notificationPreferences.securityAlerts.push}
                        onCheckedChange={() => toggleNotification('securityAlerts', 'push')}
                      />
                      <label htmlFor="security-push" className="text-sm font-medium">Push</label>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between space-x-2">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Marketing Updates</p>
                    <p className="text-sm text-muted-foreground">
                      Receive news, announcements, and product updates.
                    </p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="marketing-email"
                        checked={userData.notificationPreferences.marketingUpdates.email}
                        onCheckedChange={() => toggleNotification('marketingUpdates', 'email')}
                      />
                      <label htmlFor="marketing-email" className="text-sm font-medium">Email</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="marketing-push"
                        checked={userData.notificationPreferences.marketingUpdates.push}
                        onCheckedChange={() => toggleNotification('marketingUpdates', 'push')}
                      />
                      <label htmlFor="marketing-push" className="text-sm font-medium">Push</label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab Content */}
        <TabsContent value="security">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Shield className="w-5 h-5" />
              <div>
                <CardTitle>Security</CardTitle>
                <CardDescription>Manage your account security settings</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Current Password
                  </label>
                  <Input
                    type="password"
                    value={passwordForm.current}
                    onChange={(e) => handlePasswordChange('current', e.target.value)}
                  />
                  {passwordErrors.current && (
                    <p className="text-sm text-red-500">{passwordErrors.current}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    New Password
                  </label>
                  <Input
                    type="password"
                    value={passwordForm.new}
                    onChange={(e) => handlePasswordChange('new', e.target.value)}
                  />
                  {passwordErrors.new && (
                    <p className="text-sm text-red-500">{passwordErrors.new}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Confirm New Password
                  </label>
                  <Input
                    type="password"
                    value={passwordForm.confirm}
                    onChange={(e) => handlePasswordChange('confirm', e.target.value)}
                  />
                  {passwordErrors.confirm && (
                    <p className="text-sm text-red-500">{passwordErrors.confirm}</p>
                  )}
                </div>
                <Button onClick={updatePassword}>Update Password</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab Content */}
        <TabsContent value="billing">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <CreditCard className="w-5 h-5" />
              <div>
                <CardTitle>Billing</CardTitle>
                <CardDescription>Manage your billing information and view receipts</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">Your current plan:</p>
                    <p className="mt-1 text-xl font-bold">{userData.currentPlan}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{userData.planPrice}</p>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Change Plan</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Choose a Plan</DialogTitle>
                        <DialogDescription>
                          Select a plan that best fits your needs.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-3 gap-4">
                          <Card className={`cursor-pointer border-2 ${userData.currentPlan === 'Basic' ? 'border-primary' : 'border-border'}`} onClick={() => handlePlanChange('Basic')}>
                            <CardHeader>
                              <CardTitle className="text-center">Basic</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center">
                              <p className="text-2xl font-bold">$9.99</p>
                              <p className="text-sm text-muted-foreground">/month</p>
                              {userData.currentPlan === 'Basic' && (
                                <div className="flex justify-center mt-2">
                                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                    <Check className="w-3 h-3 mr-1" />
                                    Current
                                  </span>
                                </div>
                              )}
                            </CardContent>
                          </Card>

                          <Card className={`cursor-pointer border-2 ${userData.currentPlan === 'Professional' ? 'border-primary' : 'border-border'}`} onClick={() => handlePlanChange('Professional')}>
                            <CardHeader>
                              <CardTitle className="text-center">Professional</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center">
                              <p className="text-2xl font-bold">$29.99</p>
                              <p className="text-sm text-muted-foreground">/month</p>
                              {userData.currentPlan === 'Professional' && (
                                <div className="flex justify-center mt-2">
                                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                    <Check className="w-3 h-3 mr-1" />
                                    Current
                                  </span>
                                </div>
                              )}
                            </CardContent>
                          </Card>

                          <Card className={`cursor-pointer border-2 ${userData.currentPlan === 'Enterprise' ? 'border-primary' : 'border-border'}`} onClick={() => handlePlanChange('Enterprise')}>
                            <CardHeader>
                              <CardTitle className="text-center">Enterprise</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center">
                              <p className="text-2xl font-bold">$99.99</p>
                              <p className="text-sm text-muted-foreground">/month</p>
                              {userData.currentPlan === 'Enterprise' && (
                                <div className="flex justify-center mt-2">
                                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                    <Check className="w-3 h-3 mr-1" />
                                    Current
                                  </span>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <Separator />

                <div className="space-y-2">
                  <p className="text-sm font-medium">Payment Information</p>
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-md bg-muted">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">•••• •••• •••• 4242</p>
                      <p className="text-xs text-muted-foreground">Expires 12/2025</p>
                    </div>
                    <Button variant="outline" size="sm">Update</Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <p className="text-sm font-medium">Billing History</p>
                  <Button variant="outline" onClick={viewReceipts}>View Receipts</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 