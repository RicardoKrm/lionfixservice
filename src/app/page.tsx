
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Wrench, Cpu, Users, BadgeCheck, Clock, MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";


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

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.75 13.96c.25.13.43.2.5.33.07.13.07.5.03.66a.87.87 0 0 1-.53.53c-1.83.6-4-.2-5.8-1.4-2.2-1.5-3.3-3.6-3.4-3.8-.2-.3-.5-.7-.5-1.1s.3-.7.5-.9c.2-.2.4-.3.6-.3s.4.1.6.3c.2.2.3.4.4.6.1.2.2.5.2.7.1.2 0 .4-.1.6-.1.1-1.3 1.5-1.3 1.5-.1.1-.1.3 0 .4s.3.2.4.2c.1 0 1.2-.5 2.1-1.3.8-.7 1.4-1.5 1.6-1.8.2-.3.3-.5.5-.5h.1c.2 0 .4.1.5.2m4.18-11.3C18.9.6 15.6.0 12 .0 5.4.0.1 5.4.1 12c0 2.1.6 4.1 1.6 5.8L0 24l6.4-1.7c1.6.9 3.5 1.4 5.6 1.4h.1c6.6 0 11.9-5.4 11.9-12 .1-3.6-.9-7-2.9-9.7z"/>
    </svg>
);

const heroImages = [
    { src: "https://placehold.co/1920x1080.png", hint: "mechanic garage truck dark" },
    { src: "https://placehold.co/1920x1080.png", hint: "bus mechanic garage" },
    { src: "https://placehold.co/1920x1080.png", hint: "engine repair" },
]


export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 py-3 bg-background/80 backdrop-blur-sm border-b border-border">
        <Link href="/" className="flex items-center gap-2">
           <Image src="/logo.png" alt="LionFix Logo" width={48} height={48} />
           <span className="text-xl font-bold text-primary tracking-tight">LionFix Service</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
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
        {/* Hero Section with Carousel */}
        <section className="relative flex flex-col items-center justify-center text-center h-[90vh] min-h-[650px] py-20 px-4 text-white overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10"/>
             <Carousel className="absolute inset-0 z-0" opts={{ loop: true }}>
                <CarouselContent>
                    {heroImages.map((img, index) => (
                         <CarouselItem key={index}>
                            <Image 
                                src={img.src}
                                alt={`Taller mecánico profesional para camiones en Iquique ${index + 1}`}
                                fill
                                priority={index === 0}
                                className="object-cover"
                                data-ai-hint={img.hint}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
             </Carousel>
            <div className="z-20 flex flex-col items-center max-w-4xl">
                 <Image src="/logo.png" alt="LionFix Logo" width={160} height={160} className="mb-6 drop-shadow-lg" />
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-primary drop-shadow-md">
                    Tu Flota No Puede Parar. Nosotros Tampoco.
                </h1>
                <p className="mt-4 text-lg md:text-xl text-neutral-200">
                    Somos el servicio técnico especialista en Iquique para <strong className="text-primary">camiones, buses y flotas Sprinter</strong>. Maximizamos la operatividad de tu negocio con diagnóstico de punta y un equipo experto.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <Button size="lg" asChild>
                        <Link href="#contact">Agendar Mantención <ArrowRight className="ml-2"/></Link>
                    </Button>
                    <Button size="lg" variant="secondary" asChild>
                        <Link href="/login">Portal Clientes</Link>
                    </Button>
                </div>
            </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 sm:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-primary">Servicios de Precisión para tu Negocio</h2>
              <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">Soluciones integrales para mantener tu operación en movimiento, desde un vehículo individual hasta flotas completas.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <ServiceCard icon={TruckIcon} title="Mantenimiento de Flotas" description="Planes preventivos y correctivos que garantizan la máxima disponibilidad y rendimiento de tus camiones y buses." />
              <ServiceCard icon={Cpu} title="Diagnóstico Electrónico Avanzado" description="Scanner multimarca y software oficial para detectar fallas con precisión en motores, ABS, transmisiones y más." />
              <ServiceCard icon={Wrench} title="Mecánica de Motores Diesel" description="Reparación y ajuste de motores Cummins, Scania, Volvo, y otros. Expertos en sistemas de inyección Common Rail." />
              <ServiceCard icon={SprinterIcon} title="Especialistas en MB Sprinter" description="Servicio técnico dedicado para la línea Mercedes-Benz Sprinter, asegurando la confiabilidad de tu herramienta de trabajo." />
            </div>
          </div>
        </section>
        
        {/* Why Choose Us Section */}
        <section id="about" className="relative py-16 sm:py-24 text-white">
            <div className="absolute inset-0 z-0">
                 <Image 
                    src="https://placehold.co/1920x1080.png" 
                    alt="Técnico trabajando en motor de camión" 
                    fill
                    className="object-cover"
                    data-ai-hint="mechanic working engine"
                />
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
            </div>
            <div className="container mx-auto px-4 relative z-10">
                 <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-primary">La Confianza que Mueve tu Negocio</h2>
                  <p className="mt-2 text-lg text-neutral-300 max-w-3xl mx-auto">Nuestra prioridad es tu tranquilidad y la continuidad de tu operación en Iquique.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    <Feature icon={Users} title="Técnicos Certificados" description="Nuestro equipo está en constante capacitación para dominar las últimas tecnologías en vehículos pesados y comerciales." />
                    <Feature icon={BadgeCheck} title="Repuestos de Calidad" description="Utilizamos repuestos originales y alternativos de alta gama para garantizar la durabilidad y rendimiento de cada reparación." />
                    <Feature icon={ShieldCheck} title="Transparencia y Garantía" description="Presupuestos detallados a través de nuestro portal de cliente. Todos nuestros trabajos están garantizados para tu total confianza." />
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
                    <p className="mt-2 text-muted-foreground">Tu socio estratégico en el mantenimiento y reparación de flotas de vehículos pesados en la Región de Tarapacá.</p>
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
                <p>&copy; {new Date().getFullYear()} LionFix Service. Todos los derechos reservados. Un servicio para Iquique, Chile.</p>
            </div>
         </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
}

// Helper components for the landing page for better structure and reusability
function ServiceCard({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) {
    return (
        <div className="bg-card p-6 rounded-lg shadow-lg border border-border/50 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-primary/20 flex flex-col items-center text-center">
             <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                <Icon className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-muted-foreground flex-grow">{description}</p>
        </div>
    );
}


function Feature({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) {
    return (
        <div>
            <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary/10 rounded-full">
                    <Icon className="h-10 w-10 text-primary" />
                </div>
            </div>
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="mt-2 text-neutral-300">{description}</p>
        </div>
    );
}

function WhatsAppButton() {
    return (
        <Link 
            href="https://wa.me/56912345678" // Replace with your actual WhatsApp number
            target="_blank" 
            rel="noopener noreferrer" 
            className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white rounded-full p-4 shadow-lg flex items-center justify-center transform transition-transform hover:scale-110 animate-pulse"
        >
            <WhatsAppIcon className="h-8 w-8" />
            <span className="sr-only">Contactar por WhatsApp</span>
        </Link>
    );
}
