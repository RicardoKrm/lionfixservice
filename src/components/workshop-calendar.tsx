
"use client";

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { CalendarEvent } from '@/types';

const WORKSTATIONS = [1, 2, 3];
const TIME_SLOTS = Array.from({ length: 10 }, (_, i) => `${i + 8}:00`); // 8:00 to 17:00

export function WorkshopCalendar({ events }: { events: CalendarEvent[] }) {
  const eventsByWorkstation = useMemo(() => {
    const grouped = new Map<number, typeof events>();
    events.forEach(event => {
      if (!grouped.has(event.workstation)) {
        grouped.set(event.workstation, []);
      }
      grouped.get(event.workstation)!.push(event);
    });
    return grouped;
  }, [events]);

  const getEventPositionAndDuration = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const startHour = startDate.getHours() + startDate.getMinutes() / 60;
    const endHour = endDate.getHours() + endDate.getMinutes() / 60;
    const top = (startHour - 8) * 4; // 4rem per hour
    const height = (endHour - startHour) * 4;
    return { top: `${top}rem`, height: `${height}rem` };
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm dark:bg-card">
      <CardHeader>
        <CardTitle>Agenda Taller - 26 de Julio, 2024</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative grid grid-cols-[auto,1fr,1fr,1fr] gap-x-4">
          {/* Time Gutter */}
          <div className="relative">
            {TIME_SLOTS.map(time => (
              <div key={time} className="h-16 flex items-start -mt-3">
                <span className="text-xs text-muted-foreground">{time}</span>
              </div>
            ))}
          </div>

          {/* Workstation Columns */}
          {WORKSTATIONS.map(ws => (
            <div key={ws} className="relative border-l border-dashed">
              <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm py-2 text-center font-semibold text-primary border-b">
                Puesto {ws}
              </div>
              <div className="relative h-full">
                {/* Grid Lines */}
                {TIME_SLOTS.slice(1).map(time => (
                  <div key={`${ws}-${time}`} className="h-16 border-t border-dashed"></div>
                ))}
                
                {/* Events */}
                {eventsByWorkstation.get(ws)?.map(event => {
                  const { top, height } = getEventPositionAndDuration(event.start, event.end);
                  return (
                    <div
                      key={event.id}
                      className={cn(
                        "absolute left-1 right-1 p-2 rounded-lg text-xs flex flex-col overflow-hidden cursor-pointer",
                        ws % 2 === 0 ? "bg-accent/80 text-accent-foreground" : "bg-primary/80 text-primary-foreground"
                      )}
                      style={{ top, height }}
                    >
                      <p className="font-bold truncate">{event.title}</p>
                      <p className="truncate">Patente: {event.vehicle}</p>
                      <p className="truncate">Técnico: <Badge variant="outline" className="text-xs bg-background/20 border-none">{event.technician}</Badge></p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
