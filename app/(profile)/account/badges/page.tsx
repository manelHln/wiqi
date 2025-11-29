"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Lock, Loader2, Trophy } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useBadges, useUserTier } from "@/hooks/use-badges";

export default function BadgesPage() {
  const { badges, isLoading: badgesLoading } = useBadges();
  const { tier, isLoading: tierLoading } = useUserTier();

  // Group badges by type
  const badgesByType = badges?.reduce((acc, badge) => {
    if (!acc[badge.badge_type]) {
      acc[badge.badge_type] = [];
    }
    acc[badge.badge_type].push(badge);
    return acc;
  }, {} as Record<string, typeof badges>);

  const tiers = [
    { name: "Beginner", minPoints: 0, color: "bg-gray-400" },
    { name: "Bronze", minPoints: 100, color: "bg-orange-600" },
    { name: "Silver", minPoints: 500, color: "bg-gray-300" },
    { name: "Gold", minPoints: 1000, color: "bg-yellow-500" },
    { name: "Platinum", minPoints: 5000, color: "bg-blue-400" },
  ];

  const currentTierIndex =
    tiers.findIndex((t) => t.name === tier?.current_tier) || 0;

  const nextTier = tiers[currentTierIndex + 1];

  const progressToNext = nextTier
    ? (tier?.points || 0) / nextTier.minPoints || 0 * 100
    : 100;

  if (badgesLoading || tierLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8 max-w-5xl">
        <h1 className="text-3xl font-bold mb-6">Badges & Status</h1>

        {/* Tier Progress Card */}
        <Card className="mb-8 bg-linear-to-r from-primary/10 to-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-primary" />
                  {tier?.current_tier || "Beginner"}
                </h2>
                <p className="text-sm text-secondary/70">
                  {tier?.points || 0} points earned
                </p>
              </div>
              {nextTier && (
                <div className="text-right">
                  <p className="text-sm font-medium">Next: {nextTier.name}</p>
                  <p className="text-xs text-secondary/70">
                    {nextTier.minPoints - (tier?.points || 0)} points to go
                  </p>
                </div>
              )}
            </div>
            {nextTier && (
              <div>
                <Progress value={progressToNext} className="h-3" />
                <p className="text-xs text-secondary/70 mt-2">
                  {Math.round(progressToNext)}% to {nextTier.name}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tier Levels */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Status Levels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {tiers.map((tierLevel, index) => (
                <div
                  key={tierLevel.name}
                  className={`p-4 rounded-lg text-center transition-all ${
                    index <= currentTierIndex
                      ? "bg-primary/10 border-2 border-primary"
                      : "bg-muted border-2 border-transparent"
                  }`}
                >
                  <div
                    className={`w-12 h-12 ${tierLevel.color} rounded-full mx-auto mb-2 flex items-center justify-center`}
                  >
                    {index <= currentTierIndex ? (
                      <Award className="h-6 w-6 text-white" />
                    ) : (
                      <Lock className="h-6 w-6 text-white" />
                    )}
                  </div>
                  <p className="font-semibold text-sm">{tierLevel.name}</p>
                  <p className="text-xs text-secondary/70">
                    {tierLevel.minPoints}+ pts
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Badges by Category */}
        <div className="space-y-6">
          {badgesByType && Object.keys(badgesByType).length > 0 ? (
            Object.entries(badgesByType).map(([type, typeBadges]) => (
              <Card key={type}>
                <CardHeader>
                  <CardTitle className="capitalize">
                    {type.replace("_", " ")} Badges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {typeBadges.map((badge) => (
                      <div
                        key={badge.id}
                        className="p-4 rounded-lg border-2 bg-card hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col items-center text-center gap-2">
                          <div
                            className={`w-16 h-16 rounded-full flex items-center justify-center ${
                              badge.earned_at
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            <Award className="h-8 w-8" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">
                              {badge.badge_name}
                            </p>
                            <p className="text-xs text-secondary/70 mt-1">
                              {badge.badge_description}
                            </p>
                            {badge.earned_at && (
                              <Badge variant="outline" className="mt-2 text-xs">
                                Earned{" "}
                                {new Date(badge.earned_at).toLocaleDateString()}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-12">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4">
                    <Award className="h-10 w-10 text-secondary/70" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    No badges earned yet
                  </h3>
                  <p className="text-secondary/70 text-sm max-w-md mx-auto">
                    Start making purchases, referring friends, and writing
                    reviews to earn badges!
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* How to Earn Points */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>How to Earn Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">10</span>
                </div>
                <div>
                  <p className="font-medium">Per Purchase</p>
                  <p className="text-sm text-secondary/70">
                    Each validated purchase
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">50</span>
                </div>
                <div>
                  <p className="font-medium">Per Badge</p>
                  <p className="text-sm text-secondary/70">Each badge earned</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">100</span>
                </div>
                <div>
                  <p className="font-medium">Per Referral</p>
                  <p className="text-sm text-secondary/70">
                    Each completed referral
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">20</span>
                </div>
                <div>
                  <p className="font-medium">Per Review</p>
                  <p className="text-sm text-secondary/70">
                    Each approved review
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
