"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertCircle, Loader2 } from "lucide-react";
import { useUser } from "@/hooks/use-user";
import { useUserProfile } from "@/hooks/use-profile";
import { useUserSettings } from "@/hooks/use-profile";
import toast from "react-hot-toast";

export default function ProfilPage() {
  const { user } = useUser();
  const {
    profile,
    isLoading: profileLoading,
    updateProfile,
  } = useUserProfile();
  const {
    settings,
    isLoading: settingsLoading,
    updateSettings,
  } = useUserSettings();

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editField, setEditField] = useState<
    "name" | "address" | "birthdate" | "phone_number"
  >("name");
  const [editValue, setEditValue] = useState({
    first_name: "",
    last_name: "",
    address: "",
    birthdate: "",
    phone_number: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  const openEditDialog = (
    field: "name" | "address" | "birthdate" | "phone_number",
    currentValue: string = ""
  ) => {
    setEditField(field);
    setEditValue({
      first_name: "",
      last_name: "",
      address: "",
      birthdate: "",
      phone_number: "",
    });
    setEditDialogOpen(true);
  };

  const handleSave = async () => {
    if (!editField) return;

    setIsSaving(true);
    try {
      const updates: any = {};

      switch (editField) {
        case "name":
          updates.first_name = editValue.first_name;
          updates.last_name = editValue.last_name;
          break;
        case "address":
          updates.address = editValue.address;
          break;
        case "birthdate":
          updates.birthdate = editValue.birthdate;
          break;
        case "phone_number":
          updates.phone_number = editValue.phone_number;
          break;
      }

      const result = await updateProfile(updates);

      if (result.success) {
        toast.success("Profile updated successfully");
        setEditDialogOpen(false);
      } else {
        toast.error(result.error || "Failed to update profile");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSettingChange = async (key: string, value: boolean) => {
    try {
      const result = await updateSettings({ [key]: value });
      if (result.success) {
        toast.success("Settings updated");
      } else {
        toast.error("Failed to update settings");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const getFieldLabel = () => {
    switch (editField) {
      case "name":
        return "Full Name";
      case "address":
        return "Address";
      case "birthdate":
        return "Birthdate";
      case "phone_number":
        return "Phone Number";
      default:
        return "";
    }
  };

  return (
    <div className="bg-background">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">My profile</h1>

        <Tabs defaultValue="infos" className="mb-8">
          <TabsList className="mb-6 bg-transparent border-b w-full justify-start rounded-none h-auto p-0">
            <TabsTrigger
              value="infos"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-0 cursor-pointer border-0 rounded-none bg-transparent px-4 pb-3"
            >
              My informations
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary cursor-pointer border-0 rounded-none bg-transparent px-4 pb-3"
            >
              My notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="infos">
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">My informations</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      openEditDialog("name", profile?.first_name || "")
                    }
                  >
                    Edit
                  </Button>
                </div>

                <div className="flex items-start gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="bg-secondary text-white text-2xl font-semibold">
                      {profile?.first_name?.charAt(0).toUpperCase() ||
                        user?.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm font-medium text-secondary/70 mb-1">
                          Name
                        </p>
                        <p className="font-medium">
                          {profile?.first_name && profile?.last_name
                            ? `${profile.first_name} ${profile.last_name}`
                            : "Not set"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-secondary/70 mb-1">
                          Address
                        </p>
                        {profile?.address ? (
                          <p className="font-medium text-sm">
                            {profile.address}
                          </p>
                        ) : (
                          <button
                            onClick={() => openEditDialog("address")}
                            className="text-sm text-primary underline flex items-center gap-1 hover:text-primary/80"
                          >
                            Add my address
                            <AlertCircle className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm font-medium text-secondary/70 mb-1">
                          Birthdate
                        </p>
                        {profile?.birthdate ? (
                          <p className="font-medium">
                            {new Date(profile.birthdate).toLocaleDateString()}
                          </p>
                        ) : (
                          <button
                            onClick={() => openEditDialog("birthdate")}
                            className="text-sm text-primary underline flex items-center gap-1 hover:text-primary/80"
                          >
                            Add birthdate
                            <AlertCircle className="h-3 w-3 text-primary" />
                          </button>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-secondary/70 mb-1">
                          Phone number
                        </p>
                        {profile?.phone_number ? (
                          <p className="font-medium">{profile.phone_number}</p>
                        ) : (
                          <button
                            onClick={() => openEditDialog("phone_number")}
                            className="text-sm text-primary underline hover:text-primary/80"
                          >
                            Add phone number
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-6">Email and password</h2>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-secondary/70 mb-1">Email</p>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                  <Button variant="outline" size="sm" disabled>
                    Edit email
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-6">
                  Notification Preferences
                </h2>

                {settingsLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="notifications-enabled">
                          Enable Notifications
                        </Label>
                        <p className="text-sm text-secondary/70">
                          Receive all types of notifications
                        </p>
                      </div>
                      <Switch
                        id="notifications-enabled"
                        checked={settings?.notifications_enabled ?? true}
                        onCheckedChange={(checked) =>
                          handleSettingChange("notifications_enabled", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">
                          Email Notifications
                        </Label>
                        <p className="text-sm text-secondary/70">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={settings?.email_notifications ?? true}
                        onCheckedChange={(checked) =>
                          handleSettingChange("email_notifications", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="price-drop-alerts">
                          Price Drop Alerts
                        </Label>
                        <p className="text-sm text-secondary/70">
                          Get notified when prices drop on tracked items
                        </p>
                      </div>
                      <Switch
                        id="price-drop-alerts"
                        checked={settings?.price_drop_alerts ?? true}
                        onCheckedChange={(checked) =>
                          handleSettingChange("price_drop_alerts", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="quota-warnings">
                          Quota Warning Alerts
                        </Label>
                        <p className="text-sm text-secondary/70">
                          Get notified when approaching search quota limits
                        </p>
                      </div>
                      <Switch
                        id="quota-warnings"
                        checked={settings?.quota_warning_alerts ?? true}
                        onCheckedChange={(checked) =>
                          handleSettingChange("quota_warning_alerts", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="auto-apply">Auto-apply Coupons</Label>
                        <p className="text-sm text-secondary/70">
                          Automatically apply best coupons at checkout
                        </p>
                      </div>
                      <Switch
                        id="auto-apply"
                        checked={settings?.auto_apply_coupons ?? true}
                        onCheckedChange={(checked) =>
                          handleSettingChange("auto_apply_coupons", checked)
                        }
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Edit {getFieldLabel()}</DialogTitle>
            <DialogDescription>
              Update your {getFieldLabel().toLowerCase()}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {editField === "name" ? (
              <div className="flex gap-2">
                <Input
                  id="first-name"
                  type="text"
                  value={editValue.first_name}
                  onChange={(e) =>
                    setEditValue({ ...editValue, first_name: e.target.value })
                  }
                  className="mt-2"
                  placeholder="First Name"
                />
                <Input
                  id="last-name"
                  type="text"
                  value={editValue.last_name}
                  onChange={(e) =>
                    setEditValue({ ...editValue, last_name: e.target.value })
                  }
                  className="mt-2"
                  placeholder="Last Name"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="edit-value">{getFieldLabel()}</Label>
                <Input
                  id="edit-value"
                  type={
                    editField === "birthdate"
                      ? "date"
                      : editField === "phone_number"
                      ? "tel"
                      : "text"
                  }
                  value={editValue[editField]}
                  onChange={(e) =>
                    setEditValue({ ...editValue, [editField]: e.target.value })
                  }
                  className="mt-2"
                  placeholder={`Enter your ${getFieldLabel().toLowerCase()}`}
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditDialogOpen(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <span className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </span>
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
