"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FunnelRequestForm as FunnelRequestFormType } from "@/types/funnel";

// Zod schema para validación
const funnelRequestSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  empresa: z.string().min(2, "El nombre de la empresa es requerido"),

  numeroEmpleados: z.enum(['1-10', '11-50', '51-200', '201-500', '500+']),
  industria: z.string().min(2, "La industria es requerida"),
  modeloNegocio: z.enum(['B2B', 'B2C', 'B2B2C', 'Marketplace']),

  funnelActual: z.object({
    descripcion: z.string().min(10, "Describe tu funnel actual (mínimo 10 caracteres)"),
    etapas: z.string().min(3, "Lista las etapas separadas por comas"),
    herramientasUsadas: z.string().min(2, "Lista las herramientas separadas por comas"),
    problemasActuales: z.string().min(10, "Describe los problemas actuales"),
    tasaConversionActual: z.string().optional(),
  }),

  objetivoPrincipal: z.enum(['captacion', 'conversion', 'retencion', 'escalado']),
  presupuestoMensual: z.enum(['0-1000', '1000-5000', '5000-15000', '15000+']),
  tiempoImplementacion: z.enum(['1-mes', '2-3-meses', '3-6-meses', '6-12-meses']),
  kpisAPriorizar: z.string().min(3, "Lista los KPIs separados por comas"),

  clienteIdeal: z.object({
    perfil: z.string().min(10, "Describe el perfil de tu cliente ideal"),
    puntosDolor: z.string().min(10, "Lista los puntos de dolor separados por comas"),
    canalesPreferidos: z.string().min(3, "Lista los canales preferidos separados por comas"),
  }),
});

type FormData = z.infer<typeof funnelRequestSchema>;

interface FunnelRequestFormProps {
  onSubmit: (data: FunnelRequestFormType) => void;
  isLoading?: boolean;
}

export function FunnelRequestForm({ onSubmit, isLoading = false }: FunnelRequestFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(funnelRequestSchema),
  });

  const processFormData = (data: FormData): FunnelRequestFormType => {
    return {
      ...data,
      funnelActual: {
        descripcion: data.funnelActual.descripcion,
        etapas: data.funnelActual.etapas.split(',').map(s => s.trim()),
        herramientasUsadas: data.funnelActual.herramientasUsadas.split(',').map(s => s.trim()),
        problemasActuales: data.funnelActual.problemasActuales.split(',').map(s => s.trim()),
        tasaConversionActual: data.funnelActual.tasaConversionActual
          ? parseFloat(data.funnelActual.tasaConversionActual)
          : undefined,
      },
      kpisAPriorizar: data.kpisAPriorizar.split(',').map(s => s.trim()),
      clienteIdeal: {
        perfil: data.clienteIdeal.perfil,
        puntosDolor: data.clienteIdeal.puntosDolor.split(',').map(s => s.trim()),
        canalesPreferidos: data.clienteIdeal.canalesPreferidos.split(',').map(s => s.trim()),
      },
    };
  };

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(processFormData(data)))}
      className="space-y-6 max-w-4xl mx-auto"
    >
      {/* Información Básica */}
      <Card>
        <CardHeader>
          <CardTitle>Información Básica</CardTitle>
          <CardDescription>Cuéntanos sobre ti y tu empresa</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre *</Label>
              <Input id="nombre" {...register("nombre")} placeholder="Tu nombre" />
              {errors.nombre && (
                <p className="text-sm text-red-500">{errors.nombre.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" {...register("email")} placeholder="tu@email.com" />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="empresa">Empresa *</Label>
            <Input id="empresa" {...register("empresa")} placeholder="Nombre de tu empresa" />
            {errors.empresa && (
              <p className="text-sm text-red-500">{errors.empresa.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Contexto del Negocio */}
      <Card>
        <CardHeader>
          <CardTitle>Contexto del Negocio</CardTitle>
          <CardDescription>Información sobre tu empresa y modelo de negocio</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="numeroEmpleados">Número de Empleados *</Label>
              <Select id="numeroEmpleados" {...register("numeroEmpleados")}>
                <option value="">Selecciona...</option>
                <option value="1-10">1-10</option>
                <option value="11-50">11-50</option>
                <option value="51-200">51-200</option>
                <option value="201-500">201-500</option>
                <option value="500+">500+</option>
              </Select>
              {errors.numeroEmpleados && (
                <p className="text-sm text-red-500">{errors.numeroEmpleados.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="modeloNegocio">Modelo de Negocio *</Label>
              <Select id="modeloNegocio" {...register("modeloNegocio")}>
                <option value="">Selecciona...</option>
                <option value="B2B">B2B</option>
                <option value="B2C">B2C</option>
                <option value="B2B2C">B2B2C</option>
                <option value="Marketplace">Marketplace</option>
              </Select>
              {errors.modeloNegocio && (
                <p className="text-sm text-red-500">{errors.modeloNegocio.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="industria">Industria *</Label>
            <Input
              id="industria"
              {...register("industria")}
              placeholder="Ej: SaaS, E-commerce, Consultoría, Educación"
            />
            {errors.industria && (
              <p className="text-sm text-red-500">{errors.industria.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Funnel Actual */}
      <Card>
        <CardHeader>
          <CardTitle>Tu Funnel Actual</CardTitle>
          <CardDescription>Describe tu situación actual</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="funnelActual.descripcion">Descripción del Funnel Actual *</Label>
            <Textarea
              id="funnelActual.descripcion"
              {...register("funnelActual.descripcion")}
              placeholder="Describe cómo funciona tu funnel actualmente..."
              rows={3}
            />
            {errors.funnelActual?.descripcion && (
              <p className="text-sm text-red-500">{errors.funnelActual.descripcion.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="funnelActual.etapas">Etapas Actuales *</Label>
            <Input
              id="funnelActual.etapas"
              {...register("funnelActual.etapas")}
              placeholder="Awareness, Consideration, Decision (separadas por comas)"
            />
            {errors.funnelActual?.etapas && (
              <p className="text-sm text-red-500">{errors.funnelActual.etapas.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="funnelActual.herramientasUsadas">Herramientas Usadas *</Label>
            <Input
              id="funnelActual.herramientasUsadas"
              {...register("funnelActual.herramientasUsadas")}
              placeholder="HubSpot, Mailchimp, Google Ads (separadas por comas)"
            />
            {errors.funnelActual?.herramientasUsadas && (
              <p className="text-sm text-red-500">{errors.funnelActual.herramientasUsadas.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="funnelActual.problemasActuales">Problemas Actuales *</Label>
            <Textarea
              id="funnelActual.problemasActuales"
              {...register("funnelActual.problemasActuales")}
              placeholder="Lista los principales problemas o desafíos (separados por comas)"
              rows={2}
            />
            {errors.funnelActual?.problemasActuales && (
              <p className="text-sm text-red-500">{errors.funnelActual.problemasActuales.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="funnelActual.tasaConversionActual">
              Tasa de Conversión Actual (%) - Opcional
            </Label>
            <Input
              id="funnelActual.tasaConversionActual"
              type="number"
              step="0.01"
              {...register("funnelActual.tasaConversionActual")}
              placeholder="Ej: 2.5"
            />
          </div>
        </CardContent>
      </Card>

      {/* Objetivos y Recursos */}
      <Card>
        <CardHeader>
          <CardTitle>Objetivos y Recursos</CardTitle>
          <CardDescription>Qué quieres lograr y con qué recursos cuentas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="objetivoPrincipal">Objetivo Principal *</Label>
              <Select id="objetivoPrincipal" {...register("objetivoPrincipal")}>
                <option value="">Selecciona...</option>
                <option value="captacion">Captación de Leads</option>
                <option value="conversion">Conversión de Ventas</option>
                <option value="retencion">Retención de Clientes</option>
                <option value="escalado">Escalado de Negocio</option>
              </Select>
              {errors.objetivoPrincipal && (
                <p className="text-sm text-red-500">{errors.objetivoPrincipal.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="presupuestoMensual">Presupuesto Mensual (USD) *</Label>
              <Select id="presupuestoMensual" {...register("presupuestoMensual")}>
                <option value="">Selecciona...</option>
                <option value="0-1000">$0 - $1,000</option>
                <option value="1000-5000">$1,000 - $5,000</option>
                <option value="5000-15000">$5,000 - $15,000</option>
                <option value="15000+">$15,000+</option>
              </Select>
              {errors.presupuestoMensual && (
                <p className="text-sm text-red-500">{errors.presupuestoMensual.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tiempoImplementacion">Tiempo para Implementación *</Label>
            <Select id="tiempoImplementacion" {...register("tiempoImplementacion")}>
              <option value="">Selecciona...</option>
              <option value="1-mes">1 mes</option>
              <option value="2-3-meses">2-3 meses</option>
              <option value="3-6-meses">3-6 meses</option>
              <option value="6-12-meses">6-12 meses</option>
            </Select>
            {errors.tiempoImplementacion && (
              <p className="text-sm text-red-500">{errors.tiempoImplementacion.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="kpisAPriorizar">KPIs a Priorizar *</Label>
            <Input
              id="kpisAPriorizar"
              {...register("kpisAPriorizar")}
              placeholder="CAC, LTV, Conversion Rate, MRR (separados por comas)"
            />
            {errors.kpisAPriorizar && (
              <p className="text-sm text-red-500">{errors.kpisAPriorizar.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Cliente Ideal */}
      <Card>
        <CardHeader>
          <CardTitle>Tu Cliente Ideal</CardTitle>
          <CardDescription>Describe a quién quieres atraer</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="clienteIdeal.perfil">Perfil del Cliente Ideal *</Label>
            <Textarea
              id="clienteIdeal.perfil"
              {...register("clienteIdeal.perfil")}
              placeholder="Describe el perfil demográfico, psicográfico y profesional de tu cliente ideal..."
              rows={3}
            />
            {errors.clienteIdeal?.perfil && (
              <p className="text-sm text-red-500">{errors.clienteIdeal.perfil.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="clienteIdeal.puntosDolor">Puntos de Dolor *</Label>
            <Textarea
              id="clienteIdeal.puntosDolor"
              {...register("clienteIdeal.puntosDolor")}
              placeholder="Lista los principales problemas o frustraciones (separados por comas)"
              rows={2}
            />
            {errors.clienteIdeal?.puntosDolor && (
              <p className="text-sm text-red-500">{errors.clienteIdeal.puntosDolor.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="clienteIdeal.canalesPreferidos">Canales Preferidos *</Label>
            <Input
              id="clienteIdeal.canalesPreferidos"
              {...register("clienteIdeal.canalesPreferidos")}
              placeholder="LinkedIn, Email, YouTube, Instagram (separados por comas)"
            />
            {errors.clienteIdeal?.canalesPreferidos && (
              <p className="text-sm text-red-500">{errors.clienteIdeal.canalesPreferidos.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-center">
        <Button
          type="submit"
          size="lg"
          disabled={isLoading}
          className="min-w-[200px]"
        >
          {isLoading ? "Generando Estrategia..." : "Generar Mi Funnel con IA"}
        </Button>
      </div>
    </form>
  );
}
