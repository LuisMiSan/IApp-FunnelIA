import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BudgetItem } from "@/types/funnel";

interface BudgetCardProps {
  presupuesto: {
    total: number;
    desglose: BudgetItem[];
    roi_esperado: string;
  };
}

export function BudgetCard({ presupuesto }: BudgetCardProps) {
  const categoriaIcons: Record<string, string> = {
    herramientas: "🔧",
    publicidad: "📢",
    contenido: "✍️",
    personal: "👥",
    otros: "📦",
  };

  const totalEsencial = presupuesto.desglose
    .filter((item) => item.esencial)
    .reduce((sum, item) => sum + item.costoMensual, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          💰 Inversión y ROI Esperado
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-blue-600">
              ${presupuesto.total.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 mt-1">Total Mensual</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-green-600">
              ${totalEsencial.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 mt-1">Inversión Esencial</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-purple-600">
              {presupuesto.roi_esperado}
            </div>
            <div className="text-sm text-gray-600 mt-1">ROI Esperado</div>
          </div>
        </div>

        {/* Budget Breakdown */}
        <div>
          <h3 className="font-semibold text-lg text-gray-800 mb-3">Desglose Detallado</h3>
          <div className="space-y-3">
            {presupuesto.desglose.map((item, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-lg ${
                  item.esencial ? "bg-green-50 border border-green-200" : "bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-2xl">
                    {categoriaIcons[item.categoria] || "📦"}
                  </span>
                  <div>
                    <div className="font-medium text-gray-900">{item.concepto}</div>
                    <div className="text-sm text-gray-600 capitalize">
                      {item.categoria}
                      {item.esencial && (
                        <span className="ml-2 text-xs bg-green-600 text-white px-2 py-0.5 rounded">
                          Esencial
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">
                    ${item.costoMensual.toLocaleString()}/mes
                  </div>
                  {item.costoAnual && (
                    <div className="text-sm text-gray-600">
                      ${item.costoAnual.toLocaleString()}/año
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            💡 <strong>Nota:</strong> Los costos marcados como "Esenciales" son necesarios
            para la implementación inicial. Los demás pueden agregarse gradualmente según
            resultados y presupuesto disponible.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
