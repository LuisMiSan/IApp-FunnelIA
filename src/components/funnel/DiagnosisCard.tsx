import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DiagnosisData } from "@/types/funnel";
import { TrendingUp, TrendingDown, AlertCircle, Lightbulb } from "lucide-react";

interface DiagnosisCardProps {
  diagnosis: DiagnosisData;
}

export function DiagnosisCard({ diagnosis }: DiagnosisCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-600";
    if (score >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBg = (score: number) => {
    if (score >= 70) return "bg-green-100";
    if (score >= 40) return "bg-yellow-100";
    return "bg-red-100";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          📊 Diagnóstico Estratégico
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Score */}
        <div className="flex justify-center">
          <div className={`${getScoreBg(diagnosis.scoreActual)} rounded-full p-8`}>
            <div className="text-center">
              <div className={`text-5xl font-bold ${getScoreColor(diagnosis.scoreActual)}`}>
                {diagnosis.scoreActual}
              </div>
              <div className="text-sm text-gray-600 mt-2">Puntuación Actual</div>
            </div>
          </div>
        </div>

        {/* DAFO Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Fortalezas */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-semibold text-green-700">
              <TrendingUp className="w-5 h-5" />
              Fortalezas
            </div>
            <ul className="space-y-1">
              {diagnosis.fortalezas.map((item, index) => (
                <li key={index} className="text-sm text-gray-700 flex gap-2">
                  <span className="text-green-500">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Debilidades */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-semibold text-red-700">
              <TrendingDown className="w-5 h-5" />
              Debilidades
            </div>
            <ul className="space-y-1">
              {diagnosis.debilidades.map((item, index) => (
                <li key={index} className="text-sm text-gray-700 flex gap-2">
                  <span className="text-red-500">✗</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Oportunidades */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-semibold text-blue-700">
              <Lightbulb className="w-5 h-5" />
              Oportunidades
            </div>
            <ul className="space-y-1">
              {diagnosis.oportunidades.map((item, index) => (
                <li key={index} className="text-sm text-gray-700 flex gap-2">
                  <span className="text-blue-500">⚡</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Amenazas */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-semibold text-orange-700">
              <AlertCircle className="w-5 h-5" />
              Amenazas
            </div>
            <ul className="space-y-1">
              {diagnosis.amenazas.map((item, index) => (
                <li key={index} className="text-sm text-gray-700 flex gap-2">
                  <span className="text-orange-500">⚠</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
