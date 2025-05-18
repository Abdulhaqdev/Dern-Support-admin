"use client";

import { useState } from "react";
import { 
  Eye, 
  Pencil, 
  X,
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
import { getDeviceTranslation } from "@/lib/mock-data";
import type { Appointment, AppointmentStatus, DeviceType } from "@/lib/mock-data";

interface AppointmentTableProps {
  appointments: Appointment[];
}

type SortField = 'id' | 'mijoz' | 'sana' | 'status';
type SortDirection = 'asc' | 'desc' | null;

export function AppointmentTable({ appointments }: AppointmentTableProps) {
  const [viewAppointment, setViewAppointment] = useState<Appointment | null>(null);
  const [sortField, setSortField] = useState<SortField>('sana');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

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

  const sortedAppointments = [...appointments].sort((a, b) => {
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
      case 'sana':
        // Compare by date first, then by time
        const dateA = a.sana + 'T' + a.soat;
        const dateB = b.sana + 'T' + b.soat;
        compareA = new Date(dateA).getTime();
        compareB = new Date(dateB).getTime();
        break;
      case 'status':
        const statusOrder = { 'rejalashtirilgan': 0, 'tasdiqlangan': 1, 'bajarilgan': 2, 'bekor_qilingan': 3 };
        compareA = statusOrder[a.status] || 0;
        compareB = statusOrder[b.status] || 0;
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
        <CardTitle>{"Uchrashuvlar ro'yxati"}</CardTitle>
        <CardDescription>
          Barcha rejalashtirilgan uchrashuvlar
        </CardDescription>
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
              <TableHead className="cursor-pointer" onClick={() => handleSort('sana')}>
                <div className="flex items-center">
                  Sana {getSortIcon('sana')}
                </div>
              </TableHead>
              <TableHead>Soat</TableHead>
              <TableHead>Qurilma</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('status')}>
                <div className="flex items-center">
                  Status {getSortIcon('status')}
                </div>
              </TableHead>
              <TableHead className="text-right">Amallar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedAppointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell className="font-medium">{appointment.id}</TableCell>
                <TableCell>{appointment.mijoz}</TableCell>
                <TableCell>{appointment.sana}</TableCell>
                <TableCell>{appointment.soat}</TableCell>
                <TableCell>{getDeviceTranslation(appointment.qurilma)}</TableCell>
                <TableCell>
                  <StatusBadge status={appointment.status} />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setViewAppointment(appointment)}
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
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <Dialog open={!!viewAppointment} onOpenChange={(open) => !open && setViewAppointment(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Uchrashuv #{viewAppointment?.id}</DialogTitle>
            <DialogDescription>
              Uchrashuv tafsilotlari
            </DialogDescription>
          </DialogHeader>
          
          {viewAppointment && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-medium">Mijoz:</div>
                <div className="col-span-3">{viewAppointment.mijoz}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-medium">Telefon:</div>
                <div className="col-span-3">{viewAppointment.telefon}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-medium">Sana:</div>
                <div className="col-span-3">{viewAppointment.sana}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-medium">Soat:</div>
                <div className="col-span-3">{viewAppointment.soat}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-medium">Qurilma:</div>
                <div className="col-span-3">{getDeviceTranslation(viewAppointment.qurilma)}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-medium">Status:</div>
                <div className="col-span-3">
                  <StatusBadge status={viewAppointment.status} />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-medium">Manzil:</div>
                <div className="col-span-3">{viewAppointment.manzil}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-medium">Izoh:</div>
                <div className="col-span-3">{viewAppointment.izoh}</div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}