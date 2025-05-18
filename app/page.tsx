import { MainLayout } from '@/components/layout/main-layout';
import { StatsCard } from '@/components/analytics/stats-card';
import { PieChart } from '@/components/analytics/pie-chart';
import { BarChart } from '@/components/analytics/bar-chart';
import { LineChart } from '@/components/analytics/line-chart';
import { 
  ArrowDownIcon, 
  ArrowUpIcon, 
  Clock,
  BarChart2,
  Ticket,
  Calendar,
  FileText
} from 'lucide-react';
import { mockAnalytics } from '@/lib/mock-data';

export default function Home() {
  // Process data for charts
  const weeklyData = [
    { name: 'Du', value: mockAnalytics.kunlik_sorovlar[0] },
    { name: 'Se', value: mockAnalytics.kunlik_sorovlar[1] },
    { name: 'Ch', value: mockAnalytics.kunlik_sorovlar[2] },
    { name: 'Pa', value: mockAnalytics.kunlik_sorovlar[3] },
    { name: 'Ju', value: mockAnalytics.kunlik_sorovlar[4] },
    { name: 'Sh', value: mockAnalytics.kunlik_sorovlar[5] },
    { name: 'Ya', value: mockAnalytics.kunlik_sorovlar[6] },
  ];
  
  return (
    <MainLayout>
      <div className="flex flex-col space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Boshqaruv paneli</h1>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Kunlik so'rovlar"
            value="28"
            icon={<Ticket className="h-4 w-4 text-muted-foreground" />}
            description="Bugun qabul qilingan so'rovlar"
            change={{ value: 12, positive: true }}
          />
          <StatsCard
            title="Uchrashuvlar"
            value="8"
            icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
            description="Bugun rejalashtirilgan uchrashuvlar"
            change={{ value: 7, positive: false }}
          />
          <StatsCard
            title="Narx takliflari"
            value="12"
            icon={<FileText className="h-4 w-4 text-muted-foreground" />}
            description="Kutilayotgan takliflar"
            change={{ value: 4, positive: true }}
          />
          <StatsCard
            title="O'rtacha javob vaqti"
            value={`${mockAnalytics.ortacha_javob_vaqti} soat`}
            icon={<Clock className="h-4 w-4 text-muted-foreground" />}
            description="Birinchi javob vaqti"
            change={{ value: 12, positive: true }}
          />
        </div>

        {/* <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-7">
          <LineChart 
            data={weeklyData}
            title="Kunlik so'rovlar"
            className="sm:col-span-2 lg:col-span-4"
            xAxisLabel="Hafta kunlari"
            yAxisLabel="So'rovlar soni"
          />
          
          <PieChart 
            data={mockAnalytics.holat_boyicha}
            title="Holat bo'yicha"
            className="sm:col-span-2 lg:col-span-3"
            description="Joriy oyda so'rovlar holati"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-7">
          <BarChart 
            data={mockAnalytics.eng_kop_muammo}
            title="Eng ko'p muammolar"
            className="sm:col-span-2 lg:col-span-4"
            xAxisLabel="Muammo turi"
            yAxisLabel="Miqdori"
          />
          
          <PieChart 
            data={mockAnalytics.qurilma_boyicha}
            title="Qurilma bo'yicha"
            className="sm:col-span-2 lg:col-span-3"
            description="Qurilmalar bo'yicha taqsimlash"
          />
        </div> */}
      </div>
    </MainLayout>
  );
}