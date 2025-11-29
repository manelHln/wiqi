"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Wallet, CircleDollarSign, CreditCard, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiPaypal } from "react-icons/si";
import { usePaymentRequests } from "@/hooks/use-payments";
import { useEarnings } from "@/hooks/use-earnings";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function MesPaiementsPage() {
  const { requests, isLoading: requestsLoading } = usePaymentRequests();
  const { earnings, isLoading: earningsLoading } = useEarnings();
  const [activeTab, setActiveTab] = useState("all");

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string }> = {
      pending: { variant: "secondary", label: "Pending" },
      processing: { variant: "default", label: "Processing" },
      completed: { variant: "outline", label: "Completed" },
      rejected: { variant: "destructive", label: "Rejected" },
    };

    const config = variants[status] || variants.pending;
    return <Badge variant={config.variant as any}>{config.label}</Badge>;
  };

  const filteredRequests =
    activeTab === "all"
      ? requests
      : requests?.filter((r) => {
          if (activeTab === "bank-transfers")
            return r.payment_method === "bank_transfer";
          if (activeTab === "paypal") return r.payment_method === "paypal";
          if (activeTab === "gift-vouchers")
            return r.payment_method === "gift_voucher";
          return false;
        });

  if (requestsLoading || earningsLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8 max-w-5xl">
        <h1 className="text-3xl font-bold mb-6">My payments</h1>

        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4 text-secondary">
              Withdraw cashback
            </h2>
            <p className="text-sm mb-6 text-secondary">
              You can withdraw the "available" cashback on your bank account,
              via PayPal, Amazon or gift voucher. The minimum cashback
              withdrawal is 20$.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Wallet className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-green-600">
                    ${earnings?.available?.toFixed(2) || "0.00"}
                  </p>
                  <p className="text-sm text-secondary/70">Available</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <CircleDollarSign className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-orange-600">
                    ${earnings?.pending?.toFixed(2) || "0.00"}
                  </p>
                  <p className="text-sm text-secondary/70">Pending</p>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary/70 mb-1">
                  You don't have a payment badge
                </p>
                <a
                  href="/account/badges"
                  className="text-sm text-primary underline"
                >
                  + More info here
                </a>
              </div>
            </div>

            <h3 className="font-semibold mb-4">Payment types</h3>

            <div className="space-y-3">
              <button
                className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-primary hover:text-white w-full transition-colors"
                disabled={(earnings?.available || 0) < 20}
              >
                <div className="w-12 h-12 bg-primary/20 rounded flex items-center justify-center">
                  <CreditCard />
                </div>
                <div className="flex flex-col text-left flex-1">
                  <p className="font-medium">
                    Withdraw my cashback Wiqi by bank transfer
                  </p>
                  <div className="flex items-center gap-2">
                    {(earnings?.available || 0) < 20 ? (
                      <>
                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded font-medium">
                          Not available
                        </span>
                        <span className="text-sm">
                          Collect a minimum of 20 $
                        </span>
                      </>
                    ) : (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded font-medium">
                        Available
                      </span>
                    )}
                  </div>
                </div>
              </button>

              <button
                className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-primary hover:text-white w-full transition-colors"
                disabled={(earnings?.available || 0) < 20}
              >
                <div className="w-12 h-12 bg-blue-100 rounded flex items-center justify-center">
                  <SiPaypal />
                </div>
                <div className="flex flex-col text-left flex-1">
                  <p className="font-medium">
                    Withdraw my cashback Wiqi by Paypal
                  </p>
                  <div className="flex items-center gap-2">
                    {(earnings?.available || 0) < 20 ? (
                      <>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded font-medium">
                          Not available
                        </span>
                        <span className="text-sm">
                          Collect a minimum of 20 $
                        </span>
                      </>
                    ) : (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded font-medium">
                        Available
                      </span>
                    )}
                  </div>
                </div>
              </button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Withdraw history</h3>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full gap-8"
            >
              <TabsList className="flex items-center gap-2 bg-white flex-wrap">
                <TabsTrigger value="all" asChild>
                  <Button
                    variant="outline"
                    className="text-primary rounded-full shadow-none border border-primary px-5 py-4 hover:bg-primary/20 hover:text-primary data-[state=active]:bg-primary/20 data-[state=active]:text-primary transition-all"
                  >
                    All
                  </Button>
                </TabsTrigger>
                <TabsTrigger value="bank-transfers" asChild>
                  <Button
                    variant="outline"
                    className="text-primary rounded-full shadow-none border border-primary px-5 py-4 hover:bg-primary/20 hover:text-primary data-[state=active]:bg-primary/20 data-[state=active]:text-primary transition-all"
                  >
                    Bank transfers
                  </Button>
                </TabsTrigger>
                <TabsTrigger value="gift-vouchers" asChild>
                  <Button
                    variant="outline"
                    className="text-primary rounded-full shadow-none border border-primary px-5 py-4 hover:bg-primary/20 hover:text-primary data-[state=active]:bg-primary/20 data-[state=active]:text-primary transition-all"
                  >
                    Gift vouchers
                  </Button>
                </TabsTrigger>
                <TabsTrigger value="paypal" asChild>
                  <Button
                    variant="outline"
                    className="text-primary rounded-full shadow-none border border-primary px-5 py-4 hover:bg-primary/20 hover:text-primary data-[state=active]:bg-primary/20 data-[state=active]:text-primary transition-all"
                  >
                    PayPal
                  </Button>
                </TabsTrigger>
              </TabsList>

              <div className="mt-6">
                {filteredRequests && filteredRequests.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Amount</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Requested</TableHead>
                        <TableHead>Processed</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-semibold">
                            ${request.amount.toFixed(2)}
                          </TableCell>
                          <TableCell className="capitalize">
                            {request.payment_method.replace("_", " ")}
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(request.status)}
                          </TableCell>
                          <TableCell className="text-sm text-secondary/70">
                            {new Date(
                              request.requested_at
                            ).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-sm text-secondary/70">
                            {request.processed_at
                              ? new Date(
                                  request.processed_at
                                ).toLocaleDateString()
                              : "-"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-12">
                    <Wallet className="h-12 w-12 text-secondary/70 mx-auto mb-4" />
                    <p className="text-lg font-semibold">
                      {activeTab === "all"
                        ? "You don't have any payment request"
                        : `You don't have any ${activeTab.replace(
                            "-",
                            " "
                          )} request`}
                    </p>
                  </div>
                )}
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
