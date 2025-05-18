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
import type { QuoteStatus } from "@/lib/mock-data";

interface FiltersProps {
  onStatusChange: (status: QuoteStatus | null) => void;
  onSearchChange: (search: string) => void;
}

const statuses: { value: QuoteStatus | ""; label: string }[] = [
  { value: "", label: "Barcha holatlar" },
  { value: "yangi", label: "Yangi" },
  { value: "kutilmoqda", label: "Kutilmoqda" },
  { value: "tasdiqlangan", label: "Tasdiqlangan" },
  { value: "rad_etilgan", label: "Rad etilgan" },
];

export function QuoteFilters({
  onStatusChange,
  onSearchChange,
}: FiltersProps) {
  const [statusOpen, setStatusOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
      <div className="relative w-full sm:max-w-xs">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Mijoz yoki Buyurtma ID qidirish..."
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
              ? statuses.find((status) => status.value === selectedStatus)?.label
              : "Holat"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Holat qidirish..." />
            <CommandEmpty>Holat topilmadi</CommandEmpty>
            <CommandGroup>
              {statuses.map((status) => (
                <CommandItem
                  key={status.value}
                  value={status.value}
                  onSelect={(currentValue) => {
                    const value = currentValue === selectedStatus ? "" : currentValue;
                    setSelectedStatus(value);
                    onStatusChange(value as QuoteStatus || null);
                    setStatusOpen(false);
                  }}
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
    </div>
  );
}