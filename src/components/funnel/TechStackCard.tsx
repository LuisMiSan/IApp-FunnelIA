import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TechStackItem } from "@/types/funnel";

interface TechStackCardProps {
  stack: TechStackItem[];
}

export function TechStackCard({ stack }: TechStackCardProps) {
  // Agrupar por categoría
  const groupedStack = stack.reduce((acc, item) => {
    if (!acc[item.categoria]) {
      acc[item.categoria] = [];
    }
    acc[item.categoria].push(item);
    return acc;
  }, {} as Record<string, TechStackItem[]>);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🛠️ Stack Tecnológico Recomendado
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {Object.entries(groupedStack).map(([categoria, items]) => (
          <div key={categoria}>
            <h3 className="font-semibold text-lg text-gray-800 mb-3 capitalize">
              {categoria}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-blue-600">{item.herramienta}</h4>
                    <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      {item.costo}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{item.proposito}</p>
                  {item.alternativas.length > 0 && (
                    <div className="text-xs text-gray-600">
                      <span className="font-medium">Alternativas: </span>
                      {item.alternativas.join(", ")}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
