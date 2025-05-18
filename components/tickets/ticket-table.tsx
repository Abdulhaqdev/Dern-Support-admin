"use client";

import { useState } from "react";
import { 
  Eye, 
  Pencil, 
  Check,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StatusBadge } from "@/components/tickets/status-badge";
import { PriorityBadge } from "@/components/tickets/priority-badge";
import { getDeviceTranslation, formatDate } from "@/lib/mock-data";
import type { Ticket, TicketStatus, TicketPriority, DeviceType } from "@/lib/mock-data";

interface TicketTableProps {
  tickets: Ticket[];
}

type SortField = 'id' | 'mijoz' | 'yaratilgan_vaqt' | 'ustuvorlik' | 'holat';
type SortDirection = 'asc' | 'desc' | null;

export function TicketTable({ tickets }: TicketTableProps) {
  const [viewTicket, setViewTicket] = useState<Ticket | null>(null);
  const [sortField, setSortField] = useState<SortField>('yaratilgan_vaqt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction
      if (sortDirection === 'asc') setSortDirection('desc');
      else if (sortDirection === 'desc') setSortDirection(null);
      else setSortDirection('asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ChevronsUpDown className="ml-1 h-4 w-4" />;
    if (sortDirection === 'asc') return <ChevronUp className="ml-1 h-4 w-4" />;
    if (sortDirection === 'desc') return <ChevronDown className="ml-1 h-4 w-4" />;
    return <ChevronsUpDown className="ml-1 h-4 w-4" />;
  };

  const sortedTickets = [...tickets].sort((a, b) => {
    if (sortDirection === null) return 0;
    
    let compareA, compareB;
    
    switch (sortField) {
      case 'id':
        compareA = a.id;
        compareB = b.id;
        break;
      case 'mijoz':
        compareA = a.mijoz;
        compareB = b.mijoz;
        break;
      case 'yaratilgan_vaqt':
        compareA = new Date(a.yaratilgan_vaqt).getTime();
        compareB = new Date(b.yaratilgan_vaqt).getTime();
        break;
      case 'ustuvorlik':
        const priorityOrder = { 'past': 0, 'o\'rta': 1, 'yuqori': 2, 'kritik': 3 };
        compareA = priorityOrder[a.ustuvorlik] || 0;
        compareB = priorityOrder[b.ustuvorlik] || 0;
        break;
      case 'holat':
        const statusOrder = { 'yangi': 0, 'jarayonda': 1, 'kutilmoqda': 2, 'hal_qilingan': 3, 'yopilgan': 4 };
        compareA = statusOrder[a.holat] || 0;
        compareB = statusOrder[b.holat] || 0;
        break;
      default:
        compareA = a.id;
        compareB = b.id;
    }
    
    if (compareA < compareB) return sortDirection === 'asc' ? -1 : 1;
    if (compareA > compareB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{"Buyurtmalar ro'yxati"}</CardTitle>
        <CardDescription>
{"          Barcha mijozlar buyurtmalarining ro'yxati"}        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] cursor-pointer" onClick={() => handleSort('id')}>
                <div className="flex items-center">
                  ID {getSortIcon('id')}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('mijoz')}>
                <div className="flex items-center">
                  Mijoz {getSortIcon('mijoz')}
                </div>
              </TableHead>
              <TableHead>Qurilma</TableHead>
              <TableHead>Muammo</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('ustuvorlik')}>
                <div className="flex items-center">
                  Ustuvorlik {getSortIcon('ustuvorlik')}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('holat')}>
                <div className="flex items-center">
                  Holat {getSortIcon('holat')}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('yaratilgan_vaqt')}>
                <div className="flex items-center">
                  Yaratilgan vaqt {getSortIcon('yaratilgan_vaqt')}
                </div>
              </TableHead>
              <TableHead className="text-right">Amallar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell className="font-medium">{ticket.id}</TableCell>
                <TableCell>{ticket.mijoz}</TableCell>
                <TableCell>{getDeviceTranslation(ticket.qurilma)}</TableCell>
                <TableCell className="max-w-[200px] truncate">{ticket.muammo}</TableCell>
                <TableCell>
                  <PriorityBadge priority={ticket.ustuvorlik} />
                </TableCell>
                <TableCell>
                  <StatusBadge status={ticket.holat} />
                </TableCell>
                <TableCell>{formatDate(ticket.yaratilgan_vaqt)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setViewTicket(ticket)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <Dialog open={!!viewTicket} onOpenChange={(open) => !open && setViewTicket(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Buyurtma #{viewTicket?.id}</DialogTitle>
            <DialogDescription>
              Buyurtma tafsilotlari
            </DialogDescription>
          </DialogHeader>
          
          {viewTicket && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-medium">Mijoz:</div>
                <div className="col-span-3">{viewTicket.mijoz}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-medium">Telefon:</div>
                <div className="col-span-3">{viewTicket.telefon}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-medium">Email:</div>
                <div className="col-span-3">{viewTicket.email}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-medium">Qurilma:</div>
                <div className="col-span-3">{getDeviceTranslation(viewTicket.qurilma)}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-medium">Muammo:</div>
                <div className="col-span-3">{viewTicket.muammo}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-medium">Ustuvorlik:</div>
                <div className="col-span-3">
                  <PriorityBadge priority={viewTicket.ustuvorlik} />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-medium">Holat:</div>
                <div className="col-span-3">
                  <StatusBadge status={viewTicket.holat} />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-medium">Yaratilgan:</div>
                <div className="col-span-3">{formatDate(viewTicket.yaratilgan_vaqt)}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-medium">Tavsif:</div>
                <div className="col-span-3">{viewTicket.tavsif}</div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}