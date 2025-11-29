"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Star, Search, Loader2 } from "lucide-react";
import { useReviews } from "@/hooks/use-reviews";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AvisPage() {
  const { reviews, submitReview, isLoading } = useReviews();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [merchantDomain, setMerchantDomain] = useState("");
  const [merchantName, setMerchantName] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!merchantDomain || !merchantName || !reviewText.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitReview(
        merchantDomain,
        merchantName,
        rating,
        reviewText
      );
      if (result.success) {
        toast.success(
          "Review submitted for moderation! You'll earn $0.20 once approved."
        );
        setDialogOpen(false);
        setMerchantDomain("");
        setMerchantName("");
        setRating(5);
        setReviewText("");
      } else {
        toast.error(result.error || "Failed to submit review");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string }> = {
      pending: { variant: "secondary", label: "Pending" },
      approved: { variant: "default", label: "Approved" },
      rejected: { variant: "destructive", label: "Rejected" },
    };

    const config = variants[status] || variants.pending;
    return <Badge variant={config.variant as any}>{config.label}</Badge>;
  };

  const approvedReviews = reviews?.filter((r) => r.status === "approved") || [];
  const pendingReviews = reviews?.filter((r) => r.status === "pending") || [];
  const totalEarned = approvedReviews.reduce(
    (sum, r) => sum + (r.reward_amount || 0),
    0
  );

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
        <h1 className="text-3xl font-bold mb-8" data-testid="text-page-title">
          My Reviews
        </h1>

        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-6">
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-3">
                  Earn money by reviewing merchants!
                </h2>
                <p className="text-secondary/70 mb-6">
                  For each purchase, leave a review on the merchant and earn
                  $0.20
                </p>
                <div className="flex items-center gap-4 mb-4">
                  <Badge className="bg-orange-100 text-orange-600 hover:bg-orange-100">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    {approvedReviews.length} reviews approved
                  </Badge>
                  <p className="text-sm text-secondary/70">
                    Total earned: ${totalEarned.toFixed(2)}
                  </p>
                </div>
                <Button onClick={() => setDialogOpen(true)}>
                  Write a Review
                </Button>
              </div>
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                  <div className="text-white text-center">
                    <Star className="h-12 w-12 mx-auto mb-2 fill-current" />
                    <p className="text-xs font-semibold">Share your opinion</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {pendingReviews.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">
                Reviews under moderation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                <p className="text-sm text-blue-900">
                  <span className="font-medium">ℹ️</span> Only the first review
                  for each merchant is rewarded.
                </p>
              </div>
              <div className="space-y-4">
                {pendingReviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">
                            {review.merchant_name}
                          </h4>
                          <div className="flex gap-1 my-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        {getStatusBadge(review.status)}
                      </div>
                      <p className="text-sm text-secondary/70">
                        {review.review_text}
                      </p>
                      <p className="text-xs text-secondary/70 mt-2">
                        Submitted:{" "}
                        {new Date(review.created_at).toLocaleDateString()}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Approved Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            {approvedReviews.length > 0 ? (
              <div className="space-y-4">
                {approvedReviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">
                            {review.merchant_name}
                          </h4>
                          <div className="flex gap-1 my-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          {getStatusBadge(review.status)}
                          <p className="text-sm font-semibold text-green-600 mt-1">
                            +${review.reward_amount?.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-secondary/70">
                        {review.review_text}
                      </p>
                      <p className="text-xs text-secondary/70 mt-2">
                        {new Date(review.created_at).toLocaleDateString()}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4">
                  <Search className="h-10 w-10 text-secondary/70" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  No approved reviews yet
                </h3>
                <p className="text-secondary/70 text-sm max-w-md mx-auto">
                  Write reviews for merchants to earn rewards!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Review Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Write a Review</DialogTitle>
            <DialogDescription>
              Share your experience with a merchant and earn $0.20
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="merchant-name">Merchant Name</Label>
              <Input
                id="merchant-name"
                value={merchantName}
                onChange={(e) => setMerchantName(e.target.value)}
                placeholder="e.g., Amazon"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="merchant-domain">Merchant Domain</Label>
              <Input
                id="merchant-domain"
                value={merchantDomain}
                onChange={(e) => setMerchantDomain(e.target.value)}
                placeholder="e.g., amazon.com"
                className="mt-2"
              />
            </div>
            <div>
              <Label>Rating</Label>
              <div className="flex gap-2 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-8 w-8 cursor-pointer transition-colors ${
                        star <= rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="review-text">Your Review</Label>
              <Textarea
                id="review-text"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your experience..."
                className="mt-2 min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Review"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
