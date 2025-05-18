// Ticket Status Types
export type TicketStatus = 'yangi' | 'jarayonda' | 'kutilmoqda' | 'hal_qilingan' | 'yopilgan';

// Priority Types
export type TicketPriority = 'past' | 'o\'rta' | 'yuqori' | 'kritik';

// Device Types
export type DeviceType = 'kompyuter' | 'noutbuk' | 'telefon' | 'printer' | 'boshqa';

// Appointment Status
export type AppointmentStatus = 'rejalashtirilgan' | 'tasdiqlangan' | 'bekor_qilingan' | 'bajarilgan';

// Quote Status
export type QuoteStatus = 'yangi' | 'kutilmoqda' | 'tasdiqlangan' | 'rad_etilgan';

// Ticket Type
export type Ticket = {
  id: string;
  mijoz: string;
  qurilma: DeviceType;
  muammo: string;
  ustuvorlik: TicketPriority;
  holat: TicketStatus;
  yaratilgan_vaqt: string;
  telefon: string;
  email: string;
  tavsif: string;
};

// Appointment Type
export type Appointment = {
  id: string;
  mijoz: string;
  sana: string;
  soat: string;
  qurilma: DeviceType;
  status: AppointmentStatus;
  telefon: string;
  manzil: string;
  izoh: string;
};

// Quote Type
export type Quote = {
  id: string;
  ticket_id: string;
  mijoz: string;
  diagnostika: number;
  ehtiyot_qismlar: number;
  mehnat: number;
  umumiy: number;
  holat: QuoteStatus;
  yaratilgan_vaqt: string;
  amal_qilish_muddati: string;
  izoh: string;
};

// Analytics Type
export type Analytics = {
  kunlik_sorovlar: number[];
  haftalik_sorovlar: number[];
  eng_kop_muammo: { name: string; value: number }[];
  ortacha_javob_vaqti: number;
  holat_boyicha: { name: string; value: number }[];
  qurilma_boyicha: { name: string; value: number }[];
};

// Generate Mock Tickets
export const mockTickets: Ticket[] = Array.from({ length: 20 }).map((_, index) => {
  const priorities: TicketPriority[] = ['past', 'o\'rta', 'yuqori', 'kritik'];
  const statuses: TicketStatus[] = ['yangi', 'jarayonda', 'kutilmoqda', 'hal_qilingan', 'yopilgan'];
  const devices: DeviceType[] = ['kompyuter', 'noutbuk', 'telefon', 'printer', 'boshqa'];
  const problems = [
    'Ekran ishlamayapti',
    'Internet ulanmayapti',
    'Qurilma yonmayapti',
    'Ovoz chiqmayapti',
    'Dastur ochilmayapti',
    'Ma\'lumotlar yo\'qolgan',
    'Tizim sekin ishlayapti',
  ];

  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 30));

  return {
    id: `T${1000 + index}`,
    mijoz: `Mijoz ${index + 1}`,
    qurilma: devices[Math.floor(Math.random() * devices.length)],
    muammo: problems[Math.floor(Math.random() * problems.length)],
    ustuvorlik: priorities[Math.floor(Math.random() * priorities.length)],
    holat: statuses[Math.floor(Math.random() * statuses.length)],
    yaratilgan_vaqt: date.toISOString(),
    telefon: `+998 9${Math.floor(Math.random() * 10)} ${Math.floor(100 + Math.random() * 900)} ${Math.floor(10 + Math.random() * 90)} ${Math.floor(10 + Math.random() * 90)}`,
    email: `mijoz${index + 1}@example.com`,
    tavsif: 'Mijoz tomonidan bildirilgan muammo tavsifi. Bu yerda muammo haqida batafsil ma\'lumot beriladi.',
  };
});

// Generate Mock Appointments
export const mockAppointments: Appointment[] = Array.from({ length: 15 }).map((_, index) => {
  const statuses: AppointmentStatus[] = ['rejalashtirilgan', 'tasdiqlangan', 'bekor_qilingan', 'bajarilgan'];
  const devices: DeviceType[] = ['kompyuter', 'noutbuk', 'telefon', 'printer', 'boshqa'];
  
  const date = new Date();
  date.setDate(date.getDate() + Math.floor(Math.random() * 14));
  
  const hour = Math.floor(9 + Math.random() * 8);
  const minute = Math.floor(Math.random() * 4) * 15;
  
  return {
    id: `A${2000 + index}`,
    mijoz: `Mijoz ${index + 1}`,
    sana: date.toISOString().split('T')[0],
    soat: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
    qurilma: devices[Math.floor(Math.random() * devices.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    telefon: `+998 9${Math.floor(Math.random() * 10)} ${Math.floor(100 + Math.random() * 900)} ${Math.floor(10 + Math.random() * 90)} ${Math.floor(10 + Math.random() * 90)}`,
    manzil: 'Toshkent sh., Yunusobod tumani, 4-mavze, 12-uy',
    izoh: 'Mijoz uchun qo\'shimcha izohlar',
  };
});

// Generate Mock Quotes
export const mockQuotes: Quote[] = Array.from({ length: 12 }).map((_, index) => {
  const statuses: QuoteStatus[] = ['yangi', 'kutilmoqda', 'tasdiqlangan', 'rad_etilgan'];
  
  const diagnostics = Math.floor(50000 + Math.random() * 150000);
  const parts = Math.floor(100000 + Math.random() * 500000);
  const labor = Math.floor(100000 + Math.random() * 300000);
  const total = diagnostics + parts + labor;
  
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 10));
  
  const expiry = new Date();
  expiry.setDate(date.getDate() + 10);

  return {
    id: `Q${3000 + index}`,
    ticket_id: `T${1000 + Math.floor(Math.random() * 20)}`,
    mijoz: `Mijoz ${index + 1}`,
    diagnostika: diagnostics,
    ehtiyot_qismlar: parts,
    mehnat: labor,
    umumiy: total,
    holat: statuses[Math.floor(Math.random() * statuses.length)],
    yaratilgan_vaqt: date.toISOString(),
    amal_qilish_muddati: expiry.toISOString(),
    izoh: 'Ta\'mirlash ishlari va ehtiyot qismlar haqida batafsil ma\'lumot.',
  };
});

// Mock Analytics Data
export const mockAnalytics: Analytics = {
  kunlik_sorovlar: [12, 19, 15, 23, 28, 17, 22],
  haftalik_sorovlar: [75, 88, 92, 110, 85, 98, 120],
  eng_kop_muammo: [
    { name: 'Ekran', value: 35 },
    { name: 'Internet', value: 27 },
    { name: 'O\'chib qolish', value: 18 },
    { name: 'Dastur xatosi', value: 15 },
    { name: 'Boshqa', value: 5 },
  ],
  ortacha_javob_vaqti: 3.5,
  holat_boyicha: [
    { name: 'Yangi', value: 25 },
    { name: 'Jarayonda', value: 30 },
    { name: 'Kutilmoqda', value: 15 },
    { name: 'Hal qilingan', value: 20 },
    { name: 'Yopilgan', value: 10 },
  ],
  qurilma_boyicha: [
    { name: 'Noutbuk', value: 40 },
    { name: 'Telefon', value: 30 },
    { name: 'Kompyuter', value: 20 },
    { name: 'Printer', value: 5 },
    { name: 'Boshqa', value: 5 },
  ],
};

// Helper Functions
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('uz-UZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('uz-UZ', {
    style: 'currency',
    currency: 'UZS',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getStatusColor(status: TicketStatus | AppointmentStatus | QuoteStatus): string {
  // For Tickets
  if (['yangi', 'rejalashtirilgan'].includes(status)) return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
  if (['jarayonda', 'tasdiqlangan'].includes(status)) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
  if (['kutilmoqda'].includes(status)) return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
  if (['hal_qilingan', 'bajarilgan'].includes(status)) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
  if (['yopilgan', 'bekor_qilingan', 'rad_etilgan'].includes(status)) return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
  
  return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
}

export function getPriorityColor(priority: TicketPriority): string {
  if (priority === 'past') return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
  if (priority === 'o\'rta') return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
  if (priority === 'yuqori') return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
  if (priority === 'kritik') return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
  
  return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
}

export function getStatusTranslation(status: TicketStatus | AppointmentStatus | QuoteStatus): string {
  const translations: Record<string, string> = {
    'yangi': 'Yangi',
    'jarayonda': 'Jarayonda',
    'kutilmoqda': 'Kutilmoqda',
    'hal_qilingan': 'Hal qilingan',
    'yopilgan': 'Yopilgan',
    'rejalashtirilgan': 'Rejalashtirilgan',
    'tasdiqlangan': 'Tasdiqlangan',
    'bekor_qilingan': 'Bekor qilingan',
    'bajarilgan': 'Bajarilgan',
    'rad_etilgan': 'Rad etilgan',
  };
  
  return translations[status] || status;
}

export function getPriorityTranslation(priority: TicketPriority): string {
  const translations: Record<string, string> = {
    'past': 'Past',
    'o\'rta': 'O\'rta',
    'yuqori': 'Yuqori',
    'kritik': 'Kritik',
  };
  
  return translations[priority] || priority;
}

export function getDeviceTranslation(device: DeviceType): string {
  const translations: Record<string, string> = {
    'kompyuter': 'Kompyuter',
    'noutbuk': 'Noutbuk',
    'telefon': 'Telefon',
    'printer': 'Printer',
    'boshqa': 'Boshqa',
  };
  
  return translations[device] || device;
}