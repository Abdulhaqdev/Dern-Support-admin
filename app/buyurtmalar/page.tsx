"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { TicketFilters } from "@/components/tickets/ticket-filters";
import { TicketTable } from "@/components/tickets/ticket-table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { mockTickets } from "@/lib/mock-data";
import type { TicketStatus, TicketPriority, DeviceType } from "@/lib/mock-data";

export default function TicketsPage() {
  const [filteredTickets, setFilteredTickets] = useState(mockTickets);
  const [statusFilter, setStatusFilter] = useState<TicketStatus | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<TicketPriority | null>(null);
  const [deviceFilter, setDeviceFilter] = useState<DeviceType | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const applyFilters = () => {
    let result = [...mockTickets];

    if (statusFilter) {
      result = result.filter((ticket) => ticket.holat === statusFilter);
    }

    if (priorityFilter) {
      result = result.filter((ticket) => ticket.ustuvorlik === priorityFilter);
    }

    if (deviceFilter) {
      result = result.filter((ticket) => ticket.qurilma === deviceFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (ticket) =>
          ticket.id.toLowerCase().includes(query) ||
          ticket.mijoz.toLowerCase().includes(query) ||
          ticket.muammo.toLowerCase().includes(query)
      );
    }

    setFilteredTickets(result);
  };

  // Apply filters when any filter changes
  const handleStatusChange = (status: TicketStatus | null) => {
    setStatusFilter(status);
    setTimeout(applyFilters, 0);
  };

  const handlePriorityChange = (priority: TicketPriority | null) => {
    setPriorityFilter(priority);
    setTimeout(applyFilters, 0);
  };

  const handleDeviceChange = (device: DeviceType | null) => {
    setDeviceFilter(device);
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
            <h1 className="text-2xl font-bold tracking-tight">Buyurtmalar</h1>
            <p className="text-muted-foreground">
              Barcha mijozlar buyurtmalarini boshqaring
            </p>
          </div>
          <Button className="w-full sm:w-auto">
            <PlusCircle className="mr-2 h-4 w-4" />
            Yangi buyurtma
          </Button>
        </div>

        {/* <TicketFilters
          onStatusChange={handleStatusChange}
          onPriorityChange={handlePriorityChange}
          onDeviceChange={handleDeviceChange}
          onSearchChange={handleSearchChange}
        /> */}

        <TicketTable tickets={filteredTickets} />
      </div>
    </MainLayout>
  );
}