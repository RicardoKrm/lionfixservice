import { DashboardHeader } from "@/components/dashboard-header";
import { MaintenanceReminderForm } from "@/components/maintenance-reminder-form";

export default function RemindersPage() {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader title="Generador de Recordatorios con IA" />
      <main className="flex-1 p-6 flex items-center justify-center">
        <MaintenanceReminderForm />
      </main>
    </div>
  );
}
