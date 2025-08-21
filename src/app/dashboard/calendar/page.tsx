
"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { WorkshopCalendar } from "@/components/workshop-calendar";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { AppointmentFormDialog } from "@/components/appointment-form-dialog";
import { calendarEvents as initialEvents } from "@/lib/data";
import type { CalendarEvent } from "@/types";
import { useToast } from "@/hooks/use-toast";

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();

  const handleFormSubmit = (data: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = {
        id: `E${(events.length + 1).toString().padStart(3, '0')}`,
        ...data,
    };
    setEvents([...events, newEvent]);
    toast({
        title: "Cita Creada",
        description: `Se ha agendado la cita para el vehículo ${data.vehicle}.`,
    });
    setIsFormOpen(false);
  };

  return (
    <div className="flex flex-col h-full">
      <DashboardHeader title="Calendario Digital del Taller">
        <Button onClick={() => setIsFormOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nueva Cita
        </Button>
      </DashboardHeader>
      <main className="flex-1 p-6 overflow-x-auto">
        <WorkshopCalendar events={events} />
      </main>
      <AppointmentFormDialog 
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
