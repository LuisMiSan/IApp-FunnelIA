import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FunnelStage } from "@/types/funnel";
import { ArrowDown } from "lucide-react";

interface FunnelStagesCardProps {
  nombre: string;
  tipo: string;
  etapas: FunnelStage[];
}

export function FunnelStagesCard({ nombre, tipo, etapas }: FunnelStagesCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🎯 Tu Nuevo Funnel: {nombre}
        </CardTitle>
        <p className="text-sm text-gray-600">Tipo: {tipo}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {etapas.map((etapa, index) => (
          <div key={index}>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">
                      {etapa.orden}
                    </span>
                    <h3 className="text-xl font-semibold text-gray-900">{etapa.nombre}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{etapa.objetivo}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">
                    {etapa.tasaConversionEsperada}%
                  </div>
                  <div className="text-xs text-gray-500">Conversión esperada</div>
                </div>
              </div>

              {/* Tácticas */}
              {etapa.tacticas.length > 0 && (
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">Tácticas:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {etapa.tacticas.map((tactica, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex gap-2">
                        <span className="text-blue-500">→</span>
                        <span>{tactica}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Contenido */}
              {etapa.contenido.length > 0 && (
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">Contenido Clave:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {etapa.contenido.map((content, idx) => (
                      <div key={idx} className="bg-white rounded p-3 border border-gray-200">
                        <div className="flex items-start gap-2">
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            {content.tipo}
                          </span>
                        </div>
                        <div className="mt-2">
                          <div className="font-medium text-sm">{content.titulo}</div>
                          <div className="text-xs text-gray-600 mt-1">{content.descripcion}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Métricas Clave */}
              {etapa.metricasClave.length > 0 && (
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">Métricas Clave:</h4>
                  <div className="flex flex-wrap gap-2">
                    {etapa.metricasClave.map((metrica, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full"
                      >
                        {metrica}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Automatizaciones */}
              {etapa.automatizaciones.length > 0 && (
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">
                    Automatizaciones:
                  </h4>
                  <ul className="space-y-1">
                    {etapa.automatizaciones.map((auto, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex gap-2">
                        <span className="text-purple-500">⚙</span>
                        <span>{auto}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Arrow between stages */}
            {index < etapas.length - 1 && (
              <div className="flex justify-center my-2">
                <ArrowDown className="w-6 h-6 text-gray-400" />
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
