"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { useEarnings } from "@/hooks/use-earnings";

export default function MesGainsPage() {
  const { earnings } = useEarnings();

  return (
    <div className="bg-background">
      <div className="container mx-auto px-6 py-8 max-w-5xl">
        <h1 className="text-3xl font-bold mb-8" data-testid="text-page-title">
          My earnings
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="">
              <CardTitle className="text-sm font-medium text-secondary/70">
                Available cashback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span
                  className="text-3xl font-bold text-primary"
                  data-testid="text-available-cashback"
                >
                  {((earnings?.available || 0) / 100).toFixed(2)} $
                </span>
              </div>
              <Button
                className="mt-4 w-full bg-accent hover:bg-accent/90 text-white cursor-pointer"
                data-testid="button-request-payment"
                disabled={(earnings?.available || 0) < 20}
              >
                Request payment
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="">
              <CardTitle className="text-sm font-medium text-secondary/70">
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="">
              <CardTitle className="text-sm font-medium text-secondary/70">
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
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4">
                <Wallet className="h-10 w-10 text-secondary/70" />
              </div>
              <h3
                className="text-lg font-semibold mb-2 text-secondary"
                data-testid="text-no-earnings"
              >
                No earnings yet
              </h3>
              <p className="text-secondary/70 text-sm max-w-md mx-auto">
                Start making purchases through Wiqi to accumulate cashback
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
