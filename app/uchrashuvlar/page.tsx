"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { AppointmentFilters } from "@/components/appointments/appointment-filters";
import { AppointmentTable } from "@/components/appointments/appointment-table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { mockAppointments } from "@/lib/mock-data";
import type { AppointmentStatus, DeviceType } from "@/lib/mock-data";

export default function AppointmentsPage() {
  const [filteredAppointments, setFilteredAppointments] = useState(mockAppointments);
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | null>(null);
  const [deviceFilter, setDeviceFilter] = useState<DeviceType | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const applyFilters = () => {
    let result = [...mockAppointments];

    if (statusFilter) {
      result = result.filter((appointment) => appointment.status === statusFilter);
    }

    if (deviceFilter) {
      result = result.filter((appointment) => appointment.qurilma === deviceFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (appointment) =>
          appointment.id.toLowerCase().includes(query) ||
          appointment.mijoz.toLowerCase().includes(query)
      );
    }

    setFilteredAppointments(result);
  };

  // Apply filters when any filter changes
  const handleStatusChange = (status: AppointmentStatus | null) => {
    setStatusFilter(status);
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
            <h1 className="text-2xl font-bold tracking-tight">Uchrashuvlar</h1>
            <p className="text-muted-foreground">
              Rejalashtirilgan uchrashuvlarni boshqaring
            </p>
          </div>
          <Button className="w-full sm:w-auto">
            <PlusCircle className="mr-2 h-4 w-4" />
            Yangi uchrashuv
          </Button>
        </div>

        <AppointmentFilters
          onStatusChange={handleStatusChange}
          onDeviceChange={handleDeviceChange}
          onSearchChange={handleSearchChange}
        />

        <AppointmentTable appointments={filteredAppointments} />
      </div>
    </MainLayout>
  );
}