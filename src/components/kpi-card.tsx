
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

type KpiCardProps = {
  icon: LucideIcon;
  title: string;
  value: string;
  description?: string;
  href?: string;
};

export function KpiCard({ icon: Icon, title, value, description, href }: KpiCardProps) {
  const cardContent = (
    <Card className={cn("transition-colors group", href && "hover:border-accent")}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-muted-foreground">{title}</CardTitle>
            <Icon className="h-6 w-6 text-accent" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-primary">{value}</div>
        {description && <p className="text-sm text-muted-foreground pt-1">{description}</p>}
      </CardContent>
       {href && (
            <CardFooter className="p-0">
                <Link href={href} className="w-full">
                    <div className="flex items-center justify-between w-full px-6 py-3 bg-muted/20 border-t group-hover:bg-accent/10 transition-colors duration-300">
                        <span className="text-sm font-semibold">Ver detalle</span>
                        <ArrowRight className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                </Link>
            </CardFooter>
        )}
    </Card>
  );

  if (href) {
    return <div className="flex flex-col h-full">{cardContent}</div>;
  }

  return cardContent;
}
