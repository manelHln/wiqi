"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Heart, Loader2, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useFavorites } from "@/hooks/use-favorites";
import { useUserSettings } from "@/hooks/use-profile";
import { useState } from "react";
import toast from "react-hot-toast";

export default function FavorisPage() {
  const { favorites, isLoading, removeFavorite } = useFavorites();
  const { settings, updateSettings } = useUserSettings();
  const [searchQuery, setSearchQuery] = useState("");

  const handleRemoveFavorite = async (
    websiteId: string,
    websiteName: string
  ) => {
    const result = await removeFavorite(websiteId);
    if (result) {
      toast.success(`Removed ${websiteName} from favorites`);
    } else {
      toast.error("Failed to remove favorite");
    }
  };

  const handleToggleNotifications = async (enabled: boolean) => {
    const result = await updateSettings({ price_drop_alerts: enabled });
    if (result.success) {
      toast.success(
        enabled ? "Notifications enabled" : "Notifications disabled"
      );
    } else {
      toast.error("Failed to update settings");
    }
  };

  const filteredFavorites = favorites?.filter((fav) =>
    fav.website_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="bg-background">
      <div className="container mx-auto px-6 py-8 max-w-5xl">
        <h1 className="text-3xl font-bold mb-6">My Favorites</h1>

        <div className="flex gap-4 mb-6 border-b">
          <button className="pb-3 px-2 border-b-2 border-primary text-primary font-medium">
            Merchants ({favorites?.length || 0})
          </button>
        </div>

        {!settings?.price_drop_alerts && (
          <Card className="mb-6 bg-red-50 border-red-200">
            <CardContent className="p-4 flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                !
              </div>
              <div>
                <h3 className="font-semibold text-red-900 mb-1">
                  Price drop alerts disabled
                </h3>
                <p className="text-sm text-red-800 mb-3">
                  You might miss cashback increases at your favorite merchants!
                </p>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={settings?.price_drop_alerts || false}
                    onCheckedChange={handleToggleNotifications}
                  />
                  <span className="text-sm text-red-900">
                    Enable notifications
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent className="p-6">
            {favorites && favorites.length > 0 ? (
              <>
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary/70" />
                  <Input
                    placeholder="Search merchants..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredFavorites?.map((favorite) => (
                    <Card
                      key={favorite.id}
                      className="relative group hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-4 flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                          {favorite.website_favicon ? (
                            <img
                              src={favorite.website_favicon}
                              alt={favorite.website_name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-2xl font-bold text-secondary/70">
                              {favorite.website_name.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>
                        <div className="text-center flex-1">
                          <p className="font-medium text-sm">
                            {favorite.website_name}
                          </p>
                          {favorite.last_searched_at && (
                            <p className="text-xs text-secondary/70 mt-1">
                              Last search:{" "}
                              {new Date(
                                favorite.last_searched_at
                              ).toLocaleDateString()}
                            </p>
                          )}
                          {favorite.coupon_count_last_search > 0 && (
                            <p className="text-xs text-primary mt-1">
                              {favorite.coupon_count_last_search} coupons found
                            </p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleRemoveFavorite(
                              favorite.id,
                              favorite.website_name
                            )
                          }
                          className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredFavorites?.length === 0 && searchQuery && (
                  <div className="text-center py-8">
                    <p className="text-secondary/70">
                      No merchants found matching "{searchQuery}"
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4">
                  <Heart className="h-10 w-10 text-secondary/70" />
                </div>
                <h2 className="text-xl font-semibold mb-2">
                  No favorite merchants yet!
                </h2>
                <p className="text-secondary/70 mb-4">
                  Search for merchants and click ❤ to add them to your favorites
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
