
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useRef, useEffect } from "react";
import { Camera, Upload, X, Video } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { Checklist } from "@/types";

const checklistItems = {
  exterior: [
    "Luces Delanteras",
    "Luces Traseras",
    "Neumáticos (Desgaste/Presión)",
    "Parabrisas y Vidrios",
    "Espejos Laterales",
    "Carrocería (Rayones/Abolladuras)",
  ],
  interior: [
    "Nivel de Combustible",
    "Kilometraje",
    "Radio y Panel",
    "Asientos y Tapicería",
    "Alfombras",
    "Objetos Personales",
  ],
  mecanica: [
    "Nivel de Aceite",
    "Nivel de Refrigerante",
    "Batería (Estado Bornes)",
    "Fugas Visibles (Motor/Transmisión)",
  ],
};

type ChecklistDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  checklist: Checklist | null;
  onSave: (checklist: Checklist) => void;
};

export function ChecklistDialog({ open, onOpenChange, checklist, onSave }: ChecklistDialogProps) {
  const [formData, setFormData] = useState<Checklist | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      if (checklist) {
        setFormData(checklist);
      } else {
        setFormData({
            id: '',
            type: 'Recepción',
            vehiclePlate: '',
            date: new Date().toISOString().split('T')[0],
            completed: false,
            notes: '',
            images: [],
        })
      }
    } else {
        // Reset state when dialog closes
        stopCamera();
        setFormData(null);
    }
  }, [open, checklist]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && formData) {
      const files = Array.from(e.target.files);
      const newImages = files.map((file) => URL.createObjectURL(file));
      setFormData({ ...formData, images: [...formData.images, ...newImages]});
    }
  };
  
  const removeImage = (index: number) => {
    if(formData) {
        const updatedImages = formData.images.filter((_, i) => i !== index);
        setFormData({...formData, images: updatedImages});
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraOn(false);
  }
  
  const handleCameraToggle = async () => {
    if (isCameraOn) {
      stopCamera();
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setHasCameraPermission(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraOn(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
      setHasCameraPermission(false);
      toast({
        variant: "destructive",
        title: "Acceso a Cámara Denegado",
        description: "Por favor, habilita los permisos de cámara en tu navegador.",
      });
      setIsCameraOn(false);
    }
  }

  const takePicture = () => {
    if (videoRef.current && canvasRef.current && formData) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUrl = canvas.toDataURL('image/png');
        setFormData({ ...formData, images: [...formData.images, dataUrl]});
        stopCamera();
      }
    }
  };

  const handleSaveClick = () => {
    if (formData) {
        onSave(formData);
    }
  };
  
  if (!open || !formData) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{checklist ? "Editar" : "Crear"} Checklist</DialogTitle>
          <DialogDescription>
            {checklist
              ? `Editando checklist para el vehículo ${checklist.vehiclePlate}`
              : "Complete los detalles para un nuevo checklist de vehículo."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 py-4">
          {/* Columna Izquierda: Datos e Imágenes */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vehicle-plate">Patente Vehículo</Label>
                <Input id="vehicle-plate" value={formData.vehiclePlate} onChange={(e) => setFormData({...formData, vehiclePlate: e.target.value})} placeholder="ABCD-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="checklist-type">Tipo de Checklist</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                  <SelectTrigger id="checklist-type">
                    <SelectValue placeholder="Seleccionar tipo..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Recepción">Recepción</SelectItem>
                    <SelectItem value="Entrega">Entrega</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
                <Label>Registro Fotográfico</Label>
                
                {isCameraOn && (
                  <div className="space-y-2">
                    <video ref={videoRef} className="w-full aspect-video rounded-md bg-muted" autoPlay playsInline muted />
                    <Button onClick={takePicture} className="w-full">
                      <Camera className="mr-2 h-4 w-4" /> Capturar Foto
                    </Button>
                  </div>
                )}
                
                {!isCameraOn && hasCameraPermission === false && (
                    <Alert variant="destructive">
                        <Video className="h-4 w-4" />
                        <AlertTitle>Cámara no disponible</AlertTitle>
                        <AlertDescription>
                        No se pudo acceder a la cámara. Por favor, revisa los permisos en tu navegador.
                        </AlertDescription>
                    </Alert>
                )}
                
                <canvas ref={canvasRef} className="hidden"></canvas>

                <div className="grid grid-cols-3 gap-2">
                    {formData.images.map((src, index) => (
                        <div key={index} className="relative group">
                            <Image src={src} alt={`evidencia ${index + 1}`} width={150} height={100} className="rounded-md object-cover w-full aspect-video"/>
                            <Button variant="destructive" size="icon" className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100" onClick={() => removeImage(index)}>
                                <X className="h-4 w-4"/>
                            </Button>
                        </div>
                    ))}
                </div>
                <div className="flex gap-2 mt-2">
                    <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                        <Upload className="mr-2 h-4 w-4" /> Subir Archivos
                    </Button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleImageUpload}
                        accept="image/*"
                        multiple
                    />
                    <Button variant="secondary" onClick={handleCameraToggle}>
                        <Camera className="mr-2 h-4 w-4" /> {isCameraOn ? "Cerrar Cámara" : "Tomar Foto"}
                    </Button>
                </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Observaciones Adicionales</Label>
              <Textarea
                id="notes"
                placeholder="Anotar cualquier detalle relevante no cubierto en el checklist, como objetos de valor dejados por el cliente."
                rows={4}
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
              />
            </div>
          </div>

          {/* Columna Derecha: Checklist */}
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-primary mb-2">Revisión Exterior</h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {checklistItems.exterior.map((item) => (
                  <div key={item} className="flex items-center space-x-2">
                    <Checkbox id={item} />
                    <Label htmlFor={item} className="font-normal text-sm">
                      {item}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-2">Revisión Interior</h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {checklistItems.interior.map((item) => (
                  <div key={item} className="flex items-center space-x-2">
                    <Checkbox id={item} />
                    <Label htmlFor={item} className="font-normal text-sm">
                      {item}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-2">Revisión Mecánica Básica</h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {checklistItems.mecanica.map((item) => (
                  <div key={item} className="flex items-center space-x-2">
                    <Checkbox id={item} />
                    <Label htmlFor={item} className="font-normal text-sm">
                      {item}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
             <div className="flex items-center space-x-2 pt-4">
                <Checkbox id="completed-checkbox" checked={formData.completed} onCheckedChange={(checked) => setFormData({...formData, completed: !!checked})} />
                <Label htmlFor="completed-checkbox" className="font-semibold">
                    Marcar Checklist como Completado
                </Label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button type="submit" onClick={handleSaveClick}>Guardar Checklist</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
