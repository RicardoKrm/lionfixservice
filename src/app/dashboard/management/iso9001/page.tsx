import { DashboardHeader } from "@/components/dashboard-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle } from "lucide-react";

export default function Iso9001Page() {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader title="Relación Software - Norma ISO 9001" />
      <main className="flex-1 p-6">
        <Card>
          <CardHeader>
            <CardTitle>Cómo LionFix ERP apoya la certificación ISO 9001</CardTitle>
            <CardDescription>
              Este software está diseñado para facilitar la gestión de calidad y el cumplimiento de la norma.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>1. Gestión de procesos y trazabilidad (Cláusula 4 y 8)</AccordionTrigger>
                <AccordionContent className="space-y-2">
                  <p className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500" /> Registro digital de órdenes de trabajo (OT).</p>
                  <p className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500" /> Historial completo de reparaciones por cliente y vehículo.</p>
                  <p className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500" /> Control de repuestos y consumibles por cada OT.</p>
                  <p className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500" /> Evidencia digital para el cumplimiento de procedimientos.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>2. Gestión documental (Cláusula 7.5)</AccordionTrigger>
                <AccordionContent className="space-y-2">
                  <p className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500" /> Centralización de documentos: informes, certificados, manuales.</p>
                  <p className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500" /> Control de versiones y acceso controlado a la información.</p>
                  <p className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500" /> Digitalización de registros para evitar pérdida de documentos físicos.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>3. Gestión de clientes y satisfacción (Cláusula 9.1.2)</AccordionTrigger>
                <AccordionContent className="space-y-2">
                  <p className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500" /> Módulo para registrar reclamos y no conformidades.</p>
                  <p className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500" /> Historial de comunicaciones con clientes (CRM).</p>
                  <p className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500" /> Capacidad para integrar encuestas de satisfacción.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>4. Control de recursos (Cláusula 7)</AccordionTrigger>
                <AccordionContent className="space-y-2">
                  <p className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500" /> Planificación y registro de mantenimiento de equipos.</p>
                  <p className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500" /> Registro de calibraciones y verificaciones periódicas.</p>
                  <p className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500" /> Fichas de personal para registrar capacitaciones y competencias.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>5. Mejora continua (Cláusula 10)</AccordionTrigger>
                <AccordionContent className="space-y-2">
                  <p className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500" /> Reportes de indicadores (KPIs) de eficiencia y calidad.</p>
                  <p className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500" /> Trazabilidad para el control de acciones correctivas y preventivas.</p>
                  <p className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500" /> Análisis de datos para identificar oportunidades de mejora.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
