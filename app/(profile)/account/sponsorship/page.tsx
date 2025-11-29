"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Copy, Gift, Search, Loader2, Users, TrendingUp } from "lucide-react";
import { SiFacebook, SiWhatsapp, SiX } from "react-icons/si";
import { useReferrals } from "@/hooks/use-referrals";
import toast from "react-hot-toast";

type Social = "facebook" | "whatsapp" | "twitter";

const shareOnSocial = (social: Social, referralLink: string) => {
  const referralText =
    "Every time I order online with Wiqi, I earn money! Sign up and enjoy a sign-up bonus.";
  switch (social) {
    case "facebook":
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${referralLink}`,
        "_blank"
      );
      break;
    case "whatsapp":
      window.open(
        `https://wa.me/?text=${referralText} ${referralLink}`,
        "_blank"
      );
      break;
    case "twitter":
      window.open(
        `https://twitter.com/intent/tweet?text=${referralText}&url=${referralLink}`,
        "_blank"
      );
      break;
  }
};

export default function SponsorshipPage() {
  const { referralData, isLoading } = useReferrals();

  const referralLink = referralData?.referral_code
    ? `https://wiqi-landing.vercel.app/?ref=${referralData.referral_code}`
    : "https://wiqi-landing.vercel.app/";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Your sponsorship link has been copied to your clipboard");
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string }> = {
      pending: { variant: "secondary", label: "Pending" },
      completed: { variant: "default", label: "Completed" },
      expired: { variant: "destructive", label: "Expired" },
    };

    const config = variants[status] || variants.pending;
    return <Badge variant={config.variant as any}>{config.label}</Badge>;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <h1
          className="text-3xl font-bold mb-8 cursor-pointer"
          data-testid="text-page-title"
        >
          Referrals
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-secondary/70 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Total Referrals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {referralData?.total_referrals || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-secondary/70 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Successful Referrals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {referralData?.successful_referrals || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-secondary/70 flex items-center gap-2">
                <Gift className="h-4 w-4" />
                Bonus Earned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {referralData?.bonus_earned || 0}
              </div>
              <p className="text-xs text-secondary/70 mt-1">Bonus searches</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8 overflow-hidden bg-white p-0">
          <CardContent className="p-0">
            <div className="flex items-center gap-6 p-8">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-3 text-secondary">
                  Share Wiqi with your friends and receive a part of their
                  cashback for life
                </h2>
                <p className="text-secondary/70 mb-4">
                  If one of your friends buys something from a partner and gets
                  10$ of cashback?
                  <br />
                  You get 1$ for free, without him losing anything!
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-secondary rounded-lg flex items-center justify-center">
                  <Gift className="h-12 w-12 text-secondary-foreground" />
                </div>
              </div>
            </div>

            <div className="bg-primary text-white border-0 p-8 rounded-t-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-2xl font-bold">5$</span>
                  </div>
                  <span className="text-sm">+</span>
                  <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-2xl font-bold">10%</span>
                  </div>
                </div>
                <p className="text-sm flex-1">
                  on their first purchase with Wiqi
                  <br />+ 10% of their future cashback for life
                </p>
              </div>

              <div className="bg-white/10 rounded-lg p-4 mb-4">
                <p className="text-xs mb-2">
                  Share your referral link is the best way!
                </p>
                <div className="flex gap-2">
                  <Input
                    value={referralLink}
                    readOnly
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    data-testid="input-referral-link"
                  />
                  <Button
                    onClick={copyToClipboard}
                    className="bg-white text-teal-600 hover:bg-white/90"
                    data-testid="button-copy-link"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy my link
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Share on social networks</h3>
            <div className="flex gap-3">
              <Button
                onClick={() => shareOnSocial("facebook", referralLink)}
                className="flex-1 bg-[#1877F2] hover:bg-[#1877F2]/90 text-white"
                data-testid="button-share-facebook"
              >
                <SiFacebook className="h-5 w-5 mr-2" />
                Facebook
              </Button>
              <Button
                onClick={() => shareOnSocial("whatsapp", referralLink)}
                className="flex-1 bg-[#25D366] hover:bg-[#25D366]/90 text-white"
                data-testid="button-share-whatsapp"
              >
                <SiWhatsapp className="h-5 w-5 mr-2" />
                WhatsApp
              </Button>
              <Button
                onClick={() => shareOnSocial("twitter", referralLink)}
                className="flex-1 bg-black hover:bg-black/90 text-white"
                data-testid="button-share-twitter"
              >
                <SiX className="h-5 w-5 mr-2" />X (Twitter)
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>My referrals</span>
              <Badge variant="secondary">
                {referralData?.referrals?.length || 0} total
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {referralData?.referrals && referralData.referrals.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Reward</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {referralData.referrals.map((referral) => (
                    <TableRow key={referral.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {referral.user_name || "Anonymous"}
                          </p>
                          <p className="text-sm text-secondary/70">
                            {referral.user_email}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(referral.status)}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-semibold">
                            {referral.reward_amount} searches
                          </p>
                          {referral.reward_claimed && (
                            <p className="text-xs text-green-600">Claimed</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-secondary/70">
                        {new Date(referral.created_at).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4">
                  <Search className="h-10 w-10 text-secondary/70" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No referrals yet</h3>
                <p className="text-secondary/70 text-sm max-w-md mx-auto">
                  Share your referral link with friends to start earning bonuses
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
