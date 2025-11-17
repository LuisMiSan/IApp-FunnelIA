"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FunnelRequestForm } from "@/components/forms/FunnelRequestForm";
import { FunnelRequestForm as FunnelRequestFormType, FunnelStrategy } from "@/types/funnel";
import { Sparkles, TrendingUp, Zap, Target } from "lucide-react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (formData: FunnelRequestFormType) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-funnel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });

      if (!response.ok) {
        throw new Error("Error al generar el funnel");
      }

      const data = await response.json();

      // SEGURIDAD: Usar sessionStorage en lugar de localStorage
      // sessionStorage se elimina automáticamente al cerrar el navegador,
      // reduciendo el riesgo de exposición de datos sensibles del negocio
      if (data.strategy) {
        sessionStorage.setItem("funnelStrategy", JSON.stringify(data.strategy));
        router.push("/results");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              FunnelIA
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-600 mb-4">
            Generador Automático de Funnels de Ventas con IA
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Genera estrategias de funnels personalizadas basadas en metodologías expertas:
            LeadMadness, HubSpot Loop Marketing, Alex Hormozi y estrategias B2B comprobadas.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
            <TrendingUp className="w-12 h-12 text-blue-600 mb-3" />
            <h3 className="font-semibold text-lg mb-2">Análisis Completo</h3>
            <p className="text-sm text-gray-600">
              Diagnóstico DAFO, stack tecnológico y plan de implementación personalizado
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
            <Zap className="w-12 h-12 text-blue-600 mb-3" />
            <h3 className="font-semibold text-lg mb-2">Quick Wins</h3>
            <p className="text-sm text-gray-600">
              Resultados rápidos en 30 días con automatizaciones clave priorizadas
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
            <Target className="w-12 h-12 text-blue-600 mb-3" />
            <h3 className="font-semibold text-lg mb-2">ROI Medible</h3>
            <p className="text-sm text-gray-600">
              KPIs específicos, presupuesto detallado y proyecciones realistas
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-4xl mx-auto mb-6">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          </div>
        )}

        {/* Form */}
        <FunnelRequestForm onSubmit={handleSubmit} isLoading={isLoading} />

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>
            Powered by OpenAI GPT-4 | Basado en metodologías comprobadas de expertos en marketing
          </p>
        </div>
      </div>
    </div>
  );
}
