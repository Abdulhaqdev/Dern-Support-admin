"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { QuoteFilters } from "@/components/quotes/quote-filters";
import { QuoteTable } from "@/components/quotes/quote-table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { mockQuotes } from "@/lib/mock-data";
import type { QuoteStatus } from "@/lib/mock-data";

export default function QuotesPage() {
  const [filteredQuotes, setFilteredQuotes] = useState(mockQuotes);
  const [statusFilter, setStatusFilter] = useState<QuoteStatus | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const applyFilters = () => {
    let result = [...mockQuotes];

    if (statusFilter) {
      result = result.filter((quote) => quote.holat === statusFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (quote) =>
          quote.id.toLowerCase().includes(query) ||
          quote.ticket_id.toLowerCase().includes(query) ||
          quote.mijoz.toLowerCase().includes(query)
      );
    }

    setFilteredQuotes(result);
  };

  // Apply filters when any filter changes
  const handleStatusChange = (status: QuoteStatus | null) => {
    setStatusFilter(status);
    setTimeout(applyFilters, 0);
  };

  const handleSearchChange = (search: string) => {
    setSearchQuery(search);
    setTimeout(applyFilters, 0);
  };

  return (
    <MainLayout>
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Narx takliflari</h1>
            <p className="text-muted-foreground">
              Mijozlarga yuborilgan barcha takliflarni boshqaring
            </p>
          </div>
          <Button className="w-full sm:w-auto">
            <PlusCircle className="mr-2 h-4 w-4" />
            Yangi taklif
          </Button>
        </div>

        <QuoteFilters
          onStatusChange={handleStatusChange}
          onSearchChange={handleSearchChange}
        />

        <QuoteTable quotes={filteredQuotes} />
      </div>
    </MainLayout>
  );
}