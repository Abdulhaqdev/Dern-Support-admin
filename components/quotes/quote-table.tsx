"use client";

import { useState } from "react";
import { 
  Eye, 
  Pencil, 
  Check, 
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
import { formatDate, formatCurrency } from "@/lib/mock-data";
import type { Quote, QuoteStatus } from "@/lib/mock-data";

interface QuoteTableProps {
  quotes: Quote[];
}

type SortField = 'id' | 'mijoz' | 'umumiy' | 'yaratilgan_vaqt' | 'holat';
type SortDirection = 'asc' | 'desc' | null;

export function QuoteTable({ quotes }: QuoteTableProps) {
  const [viewQuote, setViewQuote] = useState<Quote | null>(null);
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

  const sortedQuotes = [...quotes].sort((a, b) => {
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
      case 'umumiy':
        compareA = a.umumiy;
        compareB = b.umumiy;
        break;
      case 'yaratilgan_vaqt':
        compareA = new Date(a.yaratilgan_vaqt).getTime();
        compareB = new Date(b.yaratilgan_vaqt).getTime();
        break;
      case 'holat':
        const statusOrder = { 'yangi': 0, 'kutilmoqda': 1, 'tasdiqlangan': 2, 'rad_etilgan': 3 };
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
        <CardTitle>Narx takliflari</CardTitle>
        <CardDescription>
          Mijozlarga yuborilgan barcha takliflar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px] cursor-pointer" onClick={() => handleSort('id')}>
                <div className="flex items-center">
                  ID {getSortIcon('id')}
                </div>
              </TableHead>
              <TableHead className="w-[120px]">Buyurtma</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('mijoz')}>
                <div className="flex items-center">
                  Mijoz {getSortIcon('mijoz')}
                </div>
              </TableHead>
              <TableHead>Diagnostika</TableHead>
              <TableHead>Ehtiyot qismlar</TableHead>
              <TableHead>Mehnat</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('umumiy')}>
                <div className="flex items-center">
                  Umumiy {getSortIcon('umumiy')}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('holat')}>
                <div className="flex items-center">
                  Holat {getSortIcon('holat')}
                </div>
              </TableHead>
              <TableHead className="text-right">Amallar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedQuotes.map((quote) => (
              <TableRow key={quote.id}>
                <TableCell className="font-medium">{quote.id}</TableCell>
                <TableCell>{quote.ticket_id}</TableCell>
                <TableCell>{quote.mijoz}</TableCell>
                <TableCell>{formatCurrency(quote.diagnostika)}</TableCell>
                <TableCell>{formatCurrency(quote.ehtiyot_qismlar)}</TableCell>
                <TableCell>{formatCurrency(quote.mehnat)}</TableCell>
                <TableCell className="font-medium">{formatCurrency(quote.umumiy)}</TableCell>
                <TableCell>
                  <StatusBadge status={quote.holat} />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setViewQuote(quote)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    {quote.holat === 'yangi' || quote.holat === 'kutilmoqda' ? (
                      <>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-green-500 hover:text-green-700"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : null}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <Dialog open={!!viewQuote} onOpenChange={(open) => !open && setViewQuote(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Narx taklifi #{viewQuote?.id}</DialogTitle>
            <DialogDescription>
              Taklif tafsilotlari
            </DialogDescription>
          </DialogHeader>
          
          {viewQuote && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-medium">Buyurtma ID:</div>
                <div className="col-span-3">{viewQuote.ticket_id}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-medium">Mijoz:</div>
                <div className="col-span-3">{viewQuote.mijoz}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-medium">Yaratilgan:</div>
                <div className="col-span-3">{formatDate(viewQuote.yaratilgan_vaqt)}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-medium">Amal qilish:</div>
                <div className="col-span-3">{formatDate(viewQuote.amal_qilish_muddati)}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-medium">Diagnostika:</div>
                <div className="col-span-3">{formatCurrency(viewQuote.diagnostika)}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-medium">Ehtiyot qismlar:</div>
                <div className="col-span-3">{formatCurrency(viewQuote.ehtiyot_qismlar)}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-medium">Mehnat:</div>
                <div className="col-span-3">{formatCurrency(viewQuote.mehnat)}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-medium">Umumiy summa:</div>
                <div className="col-span-3 font-bold">{formatCurrency(viewQuote.umumiy)}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-medium">Holat:</div>
                <div className="col-span-3">
                  <StatusBadge status={viewQuote.holat} />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-medium">Izoh:</div>
                <div className="col-span-3">{viewQuote.izoh}</div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}