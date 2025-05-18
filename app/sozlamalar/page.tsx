"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ThemeToggle from '@/components/mode-toggle'

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    browser: true,
    sms: false,
  });
  
  return (
    <MainLayout>
      <div className="flex flex-col space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Sozlamalar</h1>
        
        <Tabs defaultValue="umumiy">
          <TabsList className="grid w-full md:w-[400px] grid-cols-3">
            <TabsTrigger value="umumiy">Umumiy</TabsTrigger>
            <TabsTrigger value="bildirishnomalar">Bildirishnomalar</TabsTrigger>
            <TabsTrigger value="profil">Profil</TabsTrigger>
          </TabsList>
          
          <TabsContent value="umumiy" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Umumiy sozlamalar</CardTitle>
                <CardDescription>
                  Asosiy dastur sozlamalarini sozlang
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="appearance" className="font-medium">Rejim</Label>
                    <ThemeToggle />
                  </div>
                  <p className="text-sm text-muted-foreground">
{"                    Yorug', tungi yoki tizim sozlamasini tanlang"}                  </p>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="language" className="font-medium">Til</Label>
                  <Select defaultValue="uz">
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Tilni tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="uz">{"O'zbek"}</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Dastur interfeysining asosiy tili
                  </p>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-logout" className="font-medium">Avtomatik chiqish</Label>
                      <p className="text-sm text-muted-foreground">
{                        "2 soat harakatsizlikdan so'ng tizimdan chiqish"}                      </p>
                    </div>
                    <Switch id="auto-logout" defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="bildirishnomalar" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Bildirishnomalar</CardTitle>
                <CardDescription>
                  Bildirishnomalar sozlamalari
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications" className="font-medium">Email bildirishnomalari</Label>
                      <p className="text-sm text-muted-foreground">
                       {" Yangi so'rovlar va muhim o'zgarishlar haqida email orqali xabardor qiling"}
                      </p>
                    </div>
                    <Switch 
                      id="email-notifications"
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="browser-notifications" className="font-medium">Brauzer bildirishnomalari</Label>
                      <p className="text-sm text-muted-foreground">
{"                        Yangi so'rovlar va muhim o'zgarishlar haqida brauzerda xabardor qiling"}                      </p>
                    </div>
                    <Switch 
                      id="browser-notifications"
                      checked={notifications.browser}
                      onCheckedChange={(checked) => setNotifications({...notifications, browser: checked})}
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sms-notifications" className="font-medium">SMS bildirishnomalari</Label>
                      <p className="text-sm text-muted-foreground">
{"                        Kritik o'zgarishlar haqida SMS orqali xabardor qiling"}                      </p>
                    </div>
                    <Switch 
                      id="sms-notifications"
                      checked={notifications.sms}
                      onCheckedChange={(checked) => setNotifications({...notifications, sms: checked})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="profil" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>{"Profil ma'lumotlari"}</CardTitle>
                <CardDescription>
{"                  Shaxsiy ma'lumotlaringizni yangilang"}                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Ism
                    </Label>
                    <Input
                      id="name"
                      defaultValue="Mirza Abdullayev"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      defaultValue="mirza@example.com"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                      Telefon
                    </Label>
                    <Input
                      id="phone"
                      defaultValue="+998 90 123 45 67"
                      className="col-span-3"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>Saqlash</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}