"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  MessageSquare,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSupportTickets, useTicketResponses } from "@/hooks/use-support";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ServiceClientPage() {
  const { tickets, createTicket, isLoading } = useSupportTickets();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState<
    "cashback" | "payment" | "technical" | "account" | "general"
  >("general");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseText, setResponseText] = useState("");

  const {
    responses,
    addResponse,
    isLoading: responsesLoading,
  } = useTicketResponses(selectedTicket);

  const handleCreateTicket = async () => {
    if (!subject.trim() || !message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await createTicket(subject, category, message);
      if (result.success) {
        toast.success("Support ticket created successfully!");
        setDialogOpen(false);
        setSubject("");
        setCategory("general");
        setMessage("");
      } else {
        toast.error(result.error || "Failed to create ticket");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddResponse = async () => {
    if (!responseText.trim() || !selectedTicket) return;

    const result = await addResponse(responseText);
    if (result.success) {
      toast.success("Response added");
      setResponseText("");
    } else {
      toast.error("Failed to add response");
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string; icon: any }> =
      {
        pending: {
          variant: "secondary",
          label: "Pending",
          icon: AlertTriangle,
        },
        in_progress: { variant: "default", label: "In Progress", icon: Clock },
        completed: {
          variant: "outline",
          label: "Completed",
          icon: CheckCircle2,
        },
        closed: { variant: "outline", label: "Closed", icon: CheckCircle2 },
      };

    const config = variants[status] || variants.pending;
    const Icon = config.icon;
    return (
      <Badge
        variant={config.variant as any}
        className="flex items-center gap-1"
      >
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const openTickets =
    tickets?.filter(
      (t) => t.status === "pending" || t.status === "in_progress"
    ) || [];
  const closedTickets =
    tickets?.filter((t) => t.status === "completed" || t.status === "closed") ||
    [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8 max-w-5xl">
        <h1 className="text-3xl font-bold mb-8">Customer Support</h1>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-4">
                  Summary of your requests
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-orange-100">
                      <AlertTriangle className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-orange-600">
                        {openTickets.length}
                      </p>
                      <p className="text-sm text-secondary/70">
                        Pending request(s)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-green-100">
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-green-600">
                        {closedTickets.length}
                      </p>
                      <p className="text-sm text-secondary/70">
                        Completed request(s)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg mb-6">
              <h3 className="font-semibold mb-2">Need help?</h3>
              <p className="text-sm text-secondary/70 mb-3">
                Don't hesitate to contact our customer support for any
                assistance, technical questions, or other inquiries.
              </p>
              <Button
                className="bg-primary text-white hover:bg-primary/90"
                onClick={() => setDialogOpen(true)}
              >
                Contact Customer Support
              </Button>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg flex items-start gap-3">
              <Clock className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">
                  Our Customer Support is open Monday to Friday from 9am to 5pm
                </h4>
                <p className="text-sm text-blue-800">
                  We aim to respond to all inquiries within 24 hours during
                  business days.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Support Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="open" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="open">
                  Open ({openTickets.length})
                </TabsTrigger>
                <TabsTrigger value="closed">
                  Closed ({closedTickets.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="open">
                {openTickets.length > 0 ? (
                  <div className="space-y-3">
                    {openTickets.map((ticket) => (
                      <Card
                        key={ticket.id}
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setSelectedTicket(ticket.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h4 className="font-semibold">
                                {ticket.subject}
                              </h4>
                              <p className="text-sm text-secondary/70 mt-1">
                                {ticket.message.substring(0, 100)}...
                              </p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              {getStatusBadge(ticket.status)}
                              <Badge
                                variant="outline"
                                className="text-xs capitalize"
                              >
                                {ticket.category}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-xs text-secondary/70">
                            Created:{" "}
                            {new Date(ticket.created_at).toLocaleDateString()}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <MessageSquare className="h-12 w-12 text-secondary/70 mx-auto mb-4" />
                    <p className="text-lg font-semibold">No open tickets</p>
                    <p className="text-sm text-secondary/70">
                      All your support requests have been resolved!
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="closed">
                {closedTickets.length > 0 ? (
                  <div className="space-y-3">
                    {closedTickets.map((ticket) => (
                      <Card
                        key={ticket.id}
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setSelectedTicket(ticket.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h4 className="font-semibold">
                                {ticket.subject}
                              </h4>
                              <p className="text-sm text-secondary/70 mt-1">
                                {ticket.message.substring(0, 100)}...
                              </p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              {getStatusBadge(ticket.status)}
                              <Badge
                                variant="outline"
                                className="text-xs capitalize"
                              >
                                {ticket.category}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-xs text-secondary/70">
                            Closed:{" "}
                            {ticket.closed_at
                              ? new Date(ticket.closed_at).toLocaleDateString()
                              : "N/A"}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <MessageSquare className="h-12 w-12 text-secondary/70 mx-auto mb-4" />
                    <p className="text-lg font-semibold">No closed tickets</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Create Ticket Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact Customer Support</DialogTitle>
            <DialogDescription>
              Describe your issue and we'll get back to you as soon as possible
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief description of your issue"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={category}
                onValueChange={(value: any) => setCategory(value)}
              >
                <SelectTrigger id="category" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Technical Issue</SelectItem>
                  <SelectItem value="billing">Billing Question</SelectItem>
                  <SelectItem value="general">General Inquiry</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Please provide details about your issue..."
                className="mt-2 min-h-[120px]"
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
            <Button onClick={handleCreateTicket} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Ticket"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
