
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/auth-context";

export const metadata: Metadata = {
  title: "Servicio Técnico Profesional para Camiones y Buses en Iquique | LionFix",
  description: "Taller mecánico en Iquique, líder en mantención y reparación de flotas de camiones, buses y Mercedes-Benz Sprinter. Diagnóstico avanzado y servicio profesional garantizado.",
  keywords: "taller mecánico Iquique, servicio técnico camiones, reparación buses, mantención flotas, mecánica vehículos pesados, Mercedes-Benz Sprinter",
  creator: "LionFix Service",
  publisher: "LionFix Service",
  openGraph: {
    title: "Servicio Técnico Profesional para Camiones y Buses en Iquique | LionFix",
    description: "Confianza y tecnología para el motor de tu negocio. Especialistas en flotas en Iquique.",
    url: "https://lionfix.cl", // URL can be a placeholder for now
    siteName: "LionFix Service",
    images: [
      {
        url: "/og-image.jpg", // Placeholder for a social media image
        width: 1200,
        height: 630,
      },
    ],
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Servicio Técnico Profesional para Camiones y Buses en Iquique | LionFix",
    description: "Taller mecánico en Iquique, líder en mantención y reparación de flotas de camiones, buses y Mercedes-Benz Sprinter.",
    images: ["/og-image.jpg"], // Placeholder
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
