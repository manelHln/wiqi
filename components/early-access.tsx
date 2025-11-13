"use client"

import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type Props = {
  showTitle?: boolean;
};

export default function EarlyAccess({ showTitle = false }: Props) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    if (email) {
      supabase.functions
        .invoke("early-access", {
          body: { email, tags: ["Early Access, Wiqi"] },
        })
        .then((response) => {
          if (response.response?.ok) {
            setSubmitted(true);
          } else {
            setError("Subscription failed");
          }
        })
        .catch((error) => {
          setError("An error occurred");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  return (
    <div className="flex flex-col items-center md:items-start text-center md:text-left">
      {showTitle && (
        <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-3">
          Join Early
        </h3>
      )}
      <p className="text-gray-600 mb-6 max-w-md">
        Be among the first to discover our new features and exclusive offers.
      </p>

      <div className="flex w-full sm:w-auto flex-col sm:flex-row gap-4 justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="flex w-full mb-2 flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-6 py-3 rounded-sm border border-primary focus:outline-none focus:ring-1"
          />
          <Button
            type="submit"
            className="bg-primary hover:bg-primary text-white cursor-pointer hover:scale-105 transition-transform"
            disabled={submitted || loading}
          >
            {submitted ? "Subscribed!" : "Subscribe"}
          </Button>
        </form>
      </div>
      {submitted && (
        <p className="text-sm text-emerald-600 font-medium">
          Thanks for subscribing!
        </p>
      )}
      {error && <p className="text-sm text-red-600 font-medium">{error}</p>}
    </div>
  );
}
