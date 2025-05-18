"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import type { AppointmentStatus, DeviceType } from "@/lib/mock-data";

interface FiltersProps {
  onStatusChange: (status: AppointmentStatus | null) => void;
  onDeviceChange: (device: DeviceType | null) => void;
  onSearchChange: (search: string) => void;
}

const statuses: { value: AppointmentStatus | ""; label: string }[] = [
  { value: "", label: "Barcha holatlar" },
  { value: "rejalashtirilgan", label: "Rejalashtirilgan" },
  { value: "tasdiqlangan", label: "Tasdiqlangan" },
  { value: "bekor_qilingan", label: "Bekor qilingan" },
  { value: "bajarilgan", label: "Bajarilgan" },
];

const devices: { value: DeviceType | ""; label: string }[] = [
  { value: "", label: "Barcha qurilmalar" },
  { value: "kompyuter", label: "Kompyuter" },
  { value: "noutbuk", label: "Noutbuk" },
  { value: "telefon", label: "Telefon" },
  { value: "printer", label: "Printer" },
  { value: "boshqa", label: "Boshqa" },
];

export function AppointmentFilters({
  onStatusChange,
  onDeviceChange,
  onSearchChange,
}: FiltersProps) {
  const [statusOpen, setStatusOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  
  const [deviceOpen, setDeviceOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<string>("");

  const handleStatusSelect = (currentValue: string) => {
    const value = currentValue === selectedStatus ? "" : currentValue;
    setSelectedStatus(value);
    onStatusChange(value as AppointmentStatus || null);
    setStatusOpen(false);
  };

  const handleDeviceSelect = (currentValue: string) => {
    const value = currentValue === selectedDevice ? "" : currentValue;
    setSelectedDevice(value);
    onDeviceChange(value as DeviceType || null);
    setDeviceOpen(false);
  };

  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
      <div className="relative w-full sm:max-w-xs">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Mijoz nomini qidirish..."
          className="w-full pl-8"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <Popover open={statusOpen} onOpenChange={setStatusOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={statusOpen}
            className="w-full justify-between sm:w-[200px]"
          >
            {selectedStatus
              ? statuses.find((status) => status.value === selectedStatus)?.label ?? "Holat"
              : "Holat"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Holat qidirish..." />
            <CommandEmpty>Holat topilmadi</CommandEmpty>
            <CommandGroup>
              {(statuses || []).map((status) => (
                <CommandItem
                  key={status.value || 'all'}
                  value={status.value}
                  onSelect={handleStatusSelect}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedStatus === status.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {status.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      <Popover open={deviceOpen} onOpenChange={setDeviceOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={deviceOpen}
            className="w-full justify-between sm:w-[200px]"
          >
            {selectedDevice
              ? devices.find((device) => device.value === selectedDevice)?.label ?? "Qurilma"
              : "Qurilma"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Qurilma qidirish..." />
            <CommandEmpty>Qurilma topilmadi</CommandEmpty>
            <CommandGroup>
              {(devices || []).map((device) => (
                <CommandItem
                  key={device.value || 'all'}
                  value={device.value}
                  onSelect={handleDeviceSelect}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedDevice === device.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {device.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}