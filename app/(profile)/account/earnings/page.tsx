"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Wallet,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  ShoppingBag,
  Gift,
  Sparkles,
} from "lucide-react";
import { useEarnings } from "@/hooks/use-earnings";

export default function MesGainsPage() {
  const { earnings } = useEarnings();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8 max-w-5xl">
        <h1 className="text-3xl font-bold mb-8" data-testid="text-page-title">
          My earnings
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
            <CardHeader>
              <CardTitle className="text-sm font-medium text-secondary/70 flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-primary" />
                Available cashback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2 mb-4">
                <span
                  className="text-3xl font-bold text-primary"
                  data-testid="text-available-cashback"
                >
                  {((earnings?.available || 0) / 100).toFixed(2)} $
                </span>
              </div>
              <Button
                className="w-full bg-accent hover:bg-accent/90 text-white cursor-pointer"
                data-testid="button-request-payment"
                disabled={(earnings?.available || 0) < 20}
              >
                <Wallet className="h-4 w-4 mr-2" />
                Request payment
              </Button>
              {(earnings?.available || 0) < 20 && (
                <p className="text-xs text-secondary/70 mt-2 text-center">
                  Minimum $0.20 required
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full -mr-16 -mt-16" />
            <CardHeader>
              <CardTitle className="text-sm font-medium text-secondary/70 flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-500" />
                Pending cashback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span
                  className="text-3xl font-bold text-secondary"
                  data-testid="text-pending-cashback"
                >
                  {((earnings?.pending || 0) / 100).toFixed(2)} $
                </span>
              </div>
              <p className="text-xs text-secondary/70 mt-4">
                Being validated by partners
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -mr-16 -mt-16" />
            <CardHeader>
              <CardTitle className="text-sm font-medium text-secondary/70 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                Total earned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span
                  className="text-3xl font-bold text-secondary"
                  data-testid="text-total-earned"
                >
                  {((earnings?.total_earned || 0) / 100).toFixed(2)} $
                </span>
              </div>
              <p className="text-xs text-secondary/70 mt-4">
                Lifetime earnings
              </p>
            </CardContent>
          </Card>
        </div>

        {/* How Cashback Works */}
        <Card className="mb-8 overflow-hidden bg-linear-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shrink-0">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">
                  How does cashback work?
                </h2>
                <p className="text-secondary/70 text-sm">
                  Earn money back on every purchase you make through Wiqi's
                  partner stores
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-white/50">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm mb-1">1. Shop</p>
                  <p className="text-xs text-secondary/70">
                    Browse and purchase from our partner stores
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-white/50">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <p className="font-semibold text-sm mb-1">2. Wait</p>
                  <p className="text-xs text-secondary/70">
                    Partners validate your purchase (usually 30-90 days)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-white/50">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="font-semibold text-sm mb-1">3. Earn</p>
                  <p className="text-xs text-secondary/70">
                    Receive cashback and request payment anytime
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ways to Earn More */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-primary" />
              Ways to Earn More
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-xs">5%</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Partner Stores</p>
                  <p className="text-xs text-secondary/70">
                    Earn up to 5% cashback on purchases from partner stores
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-xs">10%</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Referral Bonus</p>
                  <p className="text-xs text-secondary/70">
                    Earn 10% of your friends' cashback for life
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-xs">2x</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Special Promotions</p>
                  <p className="text-xs text-secondary/70">
                    Watch for double cashback events and seasonal offers
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-xs">$5</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Sign-up Bonus</p>
                  <p className="text-xs text-secondary/70">
                    New users get $5 bonus on their first purchase
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Empty State / Payment History */}
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <CardContent className="py-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4">
                <Wallet className="h-10 w-10 text-secondary/70" />
              </div>
              <h3
                className="text-lg font-semibold mb-2 text-secondary"
                data-testid="text-no-earnings"
              >
                No payment history yet
              </h3>
              <p className="text-secondary/70 text-sm max-w-md mx-auto">
                Start making purchases through Wiqi to accumulate cashback and
                request your first payment
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
