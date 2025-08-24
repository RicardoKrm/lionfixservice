
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Wrench, Cpu, Users, BadgeCheck, Clock, MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import Image from "next/image";

// Custom icons for heavy vehicles
const BusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 16.5V18a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1.5"/>
    <path d="M15 16.5V18a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1.5"/>
    <path d="M3 11V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5"/>
    <path d="M3 11v2.5a1.5 1.5 0 0 0 3 0V11"/>
    <path d="M21 11v2.5a1.5 1.5 0 0 1-3 0V11"/>
    <path d="M5 16.5h14"/>
    <path d="M2 11h20"/>
  </svg>
);

const TruckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 17h4V5H2v12h3"/>
    <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h6Z"/>
    <path d="M14 17.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5Z"/>
    <path d="M5 17.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5Z"/>
  </svg>
);

const SprinterIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 17h2v-3.34a4 4 0 0 0-1.17-2.83L18 9h-4.26a1 1 0 0 0-.8.4L11.2 12H3V5h12v4"/>
        <path d="M3 17V5h12v4h4.43a2 2 0 0 1 1.76 1.05L22 13.5V17h-2"/>
        <path d="M7 17.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5Z"/>
        <path d="M17 17.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5Z"/>
    </svg>
);


export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 bg-background/80 backdrop-blur-sm border-b border-border">
        <Link href="/" className="flex items-center gap-3">
           <Image src="/logo.png" alt="LionFix Logo" width={48} height={48} />
           <span className="text-xl font-bold text-primary tracking-tight">LionFix Service</span>
        </Link>
        <nav className="hidden md:flex items-center gap-2">
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
        <Button className="md:hidden" variant="outline" asChild>
            <Link href="/login">Acceso</Link>
        </Button>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center text-center h-[80vh] min-h-[600px] py-20 px-4 text-white overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent z-10"/>
             <Image 
                src="https://placehold.co/1920x1080.png" 
                alt="Taller mecánico profesional para camiones en Iquique" 
                fill
                priority
                className="object-cover z-0"
                data-ai-hint="mechanic garage truck dark"
              />
            <div className="z-20 flex flex-col items-center">
                 <Image src="/logo.png" alt="LionFix Logo" width={180} height={180} className="mb-6 drop-shadow-lg" />
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-primary drop-shadow-md max-w-4xl">
                    Servicio Técnico Profesional para Camiones, Buses y Sprinter en Iquique
                </h1>
                <p className="mt-4 max-w-3xl text-lg md:text-xl text-neutral-200">
                    Soluciones integrales de mecánica y diagnóstico electrónico para el motor de su negocio. Maximizamos la operatividad de su flota con tecnología de punta y un equipo experto.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <Button size="lg" asChild>
                        <Link href="/login">Agendar Mantención <ArrowRight className="ml-2"/></Link>
                    </Button>
                    <Button size="lg" variant="secondary" asChild>
                        <Link href="#contact">Contactar un Asesor</Link>
                    </Button>
                </div>
            </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 sm:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-primary">Nuestros Servicios Especializados</h2>
              <p className="mt-2 text-lg text-muted-foreground">Enfocados en la productividad de su flota en Iquique y la región.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card>
                <CardHeader icon={TruckIcon} title="Mantenimiento de Flotas" />
                <CardContent>Planes de mantenimiento preventivo y correctivo para flotas de camiones y buses, garantizando su operatividad.</CardContent>
              </Card>
              <Card>
                <CardHeader icon={Cpu} title="Diagnóstico Electrónico" />
                <CardContent>Scanner multimarca de última generación para un diagnóstico preciso de fallas en motores, ABS, y más.</CardContent>
              </Card>
              <Card>
                <CardHeader icon={Wrench} title="Mecánica de Motores Diesel" />
                <CardContent>Reparación y ajuste de motores Cummins, Scania, Volvo, y otros. Experiencia en sistemas de inyección Common Rail.</CardContent>
              </Card>
              <Card>
                <CardHeader icon={SprinterIcon} title="Servicio MB Sprinter" />
                <CardContent>Somos especialistas en el mantenimiento y reparación de la línea Mercedes-Benz Sprinter para empresas y transporte.</CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Why Choose Us Section */}
        <section id="about" className="py-16 sm:py-24">
            <div className="container mx-auto px-4">
                 <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-primary">La Confianza que Mueve su Negocio</h2>
                  <p className="mt-2 text-lg text-muted-foreground">Nuestra prioridad es su tranquilidad y la continuidad de su operación.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <Feature icon={Users} title="Técnicos Expertos" description="Nuestro personal está certificado y en constante capacitación para atender las últimas tecnologías en vehículos pesados." />
                    <Feature icon={BadgeCheck} title="Repuestos de Calidad" description="Utilizamos repuestos originales y alternativos de alta gama para garantizar la durabilidad y rendimiento de cada reparación." />
                    <Feature icon={Clock} title="Transparencia y Garantía" description="Presupuestos detallados y sin sorpresas. Todos nuestros trabajos están garantizados para su total confianza." />
                </div>
            </div>
        </section>

      </main>

      {/* Footer */}
      <footer id="contact" className="bg-card border-t border-border">
         <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                <div>
                    <h3 className="text-lg font-semibold text-primary">LionFix Service Iquique</h3>
                    <p className="mt-2 text-muted-foreground">Su socio estratégico en el mantenimiento y reparación de flotas de vehículos pesados.</p>
                </div>
                <div>
                     <h3 className="text-lg font-semibold text-primary">Contacto Directo</h3>
                     <ul className="mt-2 space-y-2 text-muted-foreground">
                        <li className="flex items-center justify-center md:justify-start gap-2"><MapPin size={16}/> Zona Franca, Manzana 5, Iquique, Chile</li>
                        <li className="flex items-center justify-center md:justify-start gap-2"><Phone size={16}/> +56 57 212 3456</li>
                        <li className="flex items-center justify-center md:justify-start gap-2"><Mail size={16}/> contacto@lionfix-iquique.cl</li>
                     </ul>
                </div>
                 <div>
                     <h3 className="text-lg font-semibold text-primary">Horario de Atención</h3>
                     <ul className="mt-2 space-y-2 text-muted-foreground">
                        <li>Lunes a Viernes: 08:30 - 18:30</li>
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
    return <div className="bg-card p-8 rounded-lg shadow-lg border border-border/50 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-primary/20 flex flex-col">{children}</div>;
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
    return <p className="text-muted-foreground text-center flex-grow">{children}</p>;
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
