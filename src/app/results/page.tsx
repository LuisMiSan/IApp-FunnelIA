"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FunnelStrategy } from "@/types/funnel";
import { DiagnosisCard } from "@/components/funnel/DiagnosisCard";
import { FunnelStagesCard } from "@/components/funnel/FunnelStagesCard";
import { TechStackCard } from "@/components/funnel/TechStackCard";
import { BudgetCard } from "@/components/funnel/BudgetCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft, Share2 } from "lucide-react";

export default function ResultsPage() {
  const [strategy, setStrategy] = useState<FunnelStrategy | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Cargar estrategia desde localStorage
    const savedStrategy = localStorage.getItem("funnelStrategy");
    if (savedStrategy) {
      try {
        setStrategy(JSON.parse(savedStrategy));
      } catch (error) {
        console.error("Error parsing strategy:", error);
      }
    }
    setIsLoading(false);
  }, []);

  const handleExportJSON = () => {
    if (!strategy) return;

    const dataStr = JSON.stringify(strategy, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `funnel-strategy-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    if (!strategy) return;

    const shareData = {
      title: "Mi Estrategia de Funnel - FunnelIA",
      text: `Estrategia de Funnel: ${strategy.funnel.nombre}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copiar URL al portapapeles
        await navigator.clipboard.writeText(window.location.href);
        alert("URL copiada al portapapeles!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando resultados...</p>
        </div>
      </div>
    );
  }

  if (!strategy) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            No se encontró ninguna estrategia
          </h1>
          <Button onClick={() => router.push("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Tu Estrategia de Funnel Personalizada
              </h1>
              <p className="text-gray-600">
                Generada con IA basada en metodologías expertas
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => router.push("/")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Nueva Estrategia
              </Button>
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Compartir
              </Button>
              <Button onClick={handleExportJSON}>
                <Download className="w-4 h-4 mr-2" />
                Exportar JSON
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Diagnóstico */}
          <DiagnosisCard diagnosis={strategy.diagnostico} />

          {/* Funnel Stages */}
          <FunnelStagesCard
            nombre={strategy.funnel.nombre}
            tipo={strategy.funnel.tipo}
            etapas={strategy.funnel.etapas}
          />

          {/* Value Ladder */}
          {strategy.funnel.escaleraValor && strategy.funnel.escaleraValor.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  💎 Escalera de Valor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {strategy.funnel.escaleraValor.map((item) => (
                    <div
                      key={item.nivel}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">
                            {item.nivel}
                          </span>
                          <h3 className="text-lg font-semibold">{item.nombre}</h3>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-purple-600">
                            ${item.precio.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500">{item.tiempoEntrega}</div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">{item.descripcion}</p>
                      {item.deliverables.length > 0 && (
                        <div>
                          <h4 className="font-medium text-sm text-gray-700 mb-2">Incluye:</h4>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-1">
                            {item.deliverables.map((deliverable, idx) => (
                              <li key={idx} className="text-sm text-gray-600 flex gap-2">
                                <span className="text-purple-500">✓</span>
                                <span>{deliverable}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tech Stack */}
          <TechStackCard stack={strategy.stack} />

          {/* Roadmap */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🗺️ Plan de Implementación
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {strategy.roadmap.map((fase, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{fase.fase}</h3>
                        <p className="text-sm text-gray-600">{fase.duracion}</p>
                      </div>
                    </div>

                    {/* Quick Wins */}
                    {fase.quickWins && fase.quickWins.length > 0 && (
                      <div className="mb-4 bg-green-50 border border-green-200 rounded p-3">
                        <h4 className="font-semibold text-sm text-green-800 mb-2">
                          ⚡ Quick Wins (primeros 30 días):
                        </h4>
                        <ul className="space-y-1">
                          {fase.quickWins.map((win, idx) => (
                            <li key={idx} className="text-sm text-green-700 flex gap-2">
                              <span>✓</span>
                              <span>{win}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tareas */}
                    <div>
                      <h4 className="font-semibold text-sm text-gray-700 mb-2">Tareas:</h4>
                      <div className="space-y-2">
                        {fase.tareas.map((tarea, idx) => (
                          <div
                            key={idx}
                            className={`p-3 rounded ${
                              tarea.prioridad === "alta"
                                ? "bg-red-50 border border-red-200"
                                : tarea.prioridad === "media"
                                ? "bg-yellow-50 border border-yellow-200"
                                : "bg-gray-50"
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`text-xs px-2 py-0.5 rounded ${
                                      tarea.prioridad === "alta"
                                        ? "bg-red-600 text-white"
                                        : tarea.prioridad === "media"
                                        ? "bg-yellow-600 text-white"
                                        : "bg-gray-600 text-white"
                                    }`}
                                  >
                                    {tarea.prioridad}
                                  </span>
                                  <h5 className="font-medium text-sm">{tarea.titulo}</h5>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{tarea.descripcion}</p>
                              </div>
                              {tarea.estimacionHoras && (
                                <span className="text-xs text-gray-500 ml-2">
                                  {tarea.estimacionHoras}h
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* KPIs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📈 KPIs y Métricas de Seguimiento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {strategy.kpis.map((kpi, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">{kpi.metrica}</h3>
                    <div className="flex items-end gap-4 mb-2">
                      {kpi.valorActual !== undefined && (
                        <div>
                          <div className="text-sm text-gray-600">Actual</div>
                          <div className="text-2xl font-bold text-gray-700">
                            {kpi.valorActual}
                          </div>
                        </div>
                      )}
                      <div>
                        <div className="text-sm text-gray-600">Objetivo</div>
                        <div className="text-2xl font-bold text-green-600">{kpi.objetivo}</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      Frecuencia: {kpi.frecuenciaMedicion}
                    </div>
                    {kpi.formula && (
                      <div className="text-xs text-gray-500 mt-2 bg-gray-50 p-2 rounded">
                        {kpi.formula}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Budget */}
          <BudgetCard presupuesto={strategy.presupuesto} />

          {/* Automatizaciones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                ⚡ Automatizaciones Clave
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {strategy.automatizaciones.map((auto, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      auto.prioridad === "alta"
                        ? "bg-purple-50 border-purple-200"
                        : auto.prioridad === "media"
                        ? "bg-blue-50 border-blue-200"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs px-2 py-0.5 rounded ${
                            auto.prioridad === "alta"
                              ? "bg-purple-600 text-white"
                              : auto.prioridad === "media"
                              ? "bg-blue-600 text-white"
                              : "bg-gray-600 text-white"
                          }`}
                        >
                          {auto.prioridad}
                        </span>
                        <h3 className="font-semibold text-gray-900">{auto.tipo}</h3>
                      </div>
                      <span className="text-sm text-gray-600 bg-white px-2 py-1 rounded">
                        {auto.herramienta}
                      </span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div>
                        <span className="text-gray-600">Trigger:</span>{" "}
                        <span className="text-gray-900">{auto.trigger}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Acción:</span>{" "}
                        <span className="text-gray-900">{auto.accion}</span>
                      </div>
                      {auto.descripcion && (
                        <div className="text-gray-600 mt-2">{auto.descripcion}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Actions */}
        <div className="mt-12 text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              ¿Listo para implementar tu estrategia?
            </h3>
            <p className="text-gray-600 mb-4">
              Descarga esta estrategia y comienza a implementar los quick wins hoy mismo
            </p>
            <div className="flex justify-center gap-3">
              <Button onClick={handleExportJSON}>
                <Download className="w-4 h-4 mr-2" />
                Descargar Estrategia (JSON)
              </Button>
              <Button variant="outline" onClick={() => router.push("/")}>
                Crear Nueva Estrategia
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
