import { DashboardHeader } from "@/components/dashboard-header";
import { WorkshopCalendar } from "@/components/workshop-calendar";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function CalendarPage() {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader title="Calendario Digital del Taller">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nueva Cita
        </Button>
      </DashboardHeader>
      <main className="flex-1 p-6">
        <WorkshopCalendar />
      </main>
    </div>
  );
}
