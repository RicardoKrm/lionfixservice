
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Wrench, Cpu, Car, Users, BadgeCheck, Clock, MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-sm border-b border-border">
        <Link href="/" className="flex items-center gap-2">
           <div className="bg-primary text-primary-foreground p-2 rounded-lg">
             <ShieldCheck className="h-6 w-6" />
           </div>
           <span className="text-xl font-bold text-primary">LionFix Service</span>
        </Link>
        <nav className="flex items-center gap-2">
            <Button variant="ghost" asChild>
                <Link href="#services">Servicios</Link>
            </Button>
            <Button variant="ghost" asChild>
                <Link href="#about">Nosotros</Link>
            </Button>
             <Button variant="ghost" asChild>
                <Link href="#contact">Contacto</Link>
            </Button>
            <Button asChild>
                <Link href="/login">Acceso Clientes</Link>
            </Button>
        </nav>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center text-center h-[70vh] min-h-[500px] py-20 px-4 text-white overflow-hidden">
             <div className="absolute inset-0 bg-black/70 z-10"/>
             <Image 
                src="/hero-background.jpg" 
                alt="Taller mecánico moderno" 
                layout="fill" 
                objectFit="cover" 
                className="z-0"
                data-ai-hint="mechanic garage dark"
              />
            <div className="z-20 flex flex-col items-center">
                 <Image src="/logo.png" alt="LionFix Logo" width={200} height={200} className="mb-6 drop-shadow-lg" />
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-primary drop-shadow-md">
                    Mecánica de Precisión, Confianza de León
                </h1>
                <p className="mt-4 max-w-2xl text-lg md:text-xl text-neutral-200">
                    Soluciones avanzadas para el cuidado de tu vehículo. Tecnología de punta y un equipo experto a tu servicio.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <Button size="lg" asChild>
                        <Link href="/login">Agendar una Cita</Link>
                    </Button>
                    <Button size="lg" variant="secondary" asChild>
                        <Link href="#services">Ver Servicios</Link>
                    </Button>
                </div>
            </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 sm:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-primary">Nuestros Servicios</h2>
              <p className="mt-2 text-lg text-muted-foreground">Expertos en el cuidado integral de tu vehículo.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Service Card 1 */}
              <Card>
                <CardHeader icon={Wrench} title="Mecánica General" />
                <CardContent>Mantenciones preventivas y correctivas, ajuste de motor, cambio de correas y más.</CardContent>
              </Card>
              {/* Service Card 2 */}
              <Card>
                <CardHeader icon={Cpu} title="Diagnóstico Electrónico" />
                <CardContent>Scanner de última generación para todas las marcas. Detección precisa de fallas.</CardContent>
              </Card>
              {/* Service Card 3 */}
              <Card>
                <CardHeader icon={Car} title="Frenos y Suspensión" />
                <CardContent>Revisión y cambio de pastillas, discos, amortiguadores y componentes de suspensión.</CardContent>
              </Card>
               {/* Service Card 4 */}
              <Card>
                <CardHeader icon={ShieldCheck} title="Alineación y Balanceo" />
                <CardContent>Aumenta la vida útil de tus neumáticos y mejora la seguridad en la conducción.</CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Why Choose Us Section */}
        <section id="about" className="py-16 sm:py-24">
            <div className="container mx-auto px-4">
                 <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-primary">¿Por Qué Elegir LionFix?</h2>
                  <p className="mt-2 text-lg text-muted-foreground">Tu tranquilidad es nuestra prioridad.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <Feature icon={Users} title="Técnicos Certificados" description="Nuestro equipo está en constante capacitación para atender las últimas tecnologías del mercado." />
                    <Feature icon={BadgeCheck} title="Repuestos de Calidad" description="Trabajamos con repuestos originales y alternativos de alta gama para garantizar cada reparación." />
                    <Feature icon={Clock} title="Transparencia y Garantía" description="Presupuestos claros y sin sorpresas. Todos nuestros trabajos están garantizados." />
                </div>
            </div>
        </section>

      </main>

      {/* Footer */}
      <footer id="contact" className="bg-card border-t border-border">
         <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                <div>
                    <h3 className="text-lg font-semibold text-primary">LionFix Service</h3>
                    <p className="mt-2 text-muted-foreground">Tu taller de confianza para el cuidado integral de tu vehículo.</p>
                </div>
                <div>
                     <h3 className="text-lg font-semibold text-primary">Contacto</h3>
                     <ul className="mt-2 space-y-2 text-muted-foreground">
                        <li className="flex items-center justify-center md:justify-start gap-2"><MapPin size={16}/> Av. Siempreviva 742, Santiago</li>
                        <li className="flex items-center justify-center md:justify-start gap-2"><Phone size={16}/> +56 2 2123 4567</li>
                        <li className="flex items-center justify-center md:justify-start gap-2"><Mail size={16}/> contacto@lionfix.cl</li>
                     </ul>
                </div>
                 <div>
                     <h3 className="text-lg font-semibold text-primary">Horario de Atención</h3>
                     <ul className="mt-2 space-y-2 text-muted-foreground">
                        <li>Lunes a Viernes: 09:00 - 18:00</li>
                        <li>Sábado: 09:00 - 14:00</li>
                     </ul>
                </div>
            </div>
            <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} LionFix Service. Todos los derechos reservados.</p>
            </div>
         </div>
      </footer>
    </div>
  );
}

// Helper components for the landing page
function Card({ children }: { children: React.ReactNode }) {
    return <div className="bg-card p-8 rounded-lg shadow-lg border border-border/50 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-primary/20">{children}</div>;
}

function CardHeader({ icon: Icon, title }: { icon: React.ElementType, title: string }) {
    return (
        <div className="flex flex-col items-center text-center mb-4">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                <Icon className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold">{title}</h3>
        </div>
    );
}

function CardContent({ children }: { children: React.ReactNode }) {
    return <p className="text-muted-foreground text-center">{children}</p>;
}

function Feature({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) {
    return (
        <div>
            <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="mt-2 text-muted-foreground">{description}</p>
        </div>
    );
}
