import { NextRequest, NextResponse } from "next/server";
import { generateFunnel } from "@/lib/openai";
import { FunnelRequestForm, GenerateFunnelRequest, GenerateFunnelResponse } from "@/types/funnel";

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: GenerateFunnelRequest = await request.json();
    const { formData } = body;

    // Validar que tenemos los datos necesarios
    if (!formData || !formData.email || !formData.nombre) {
      return NextResponse.json(
        {
          success: false,
          error: "Datos de formulario incompletos",
        } as GenerateFunnelResponse,
        { status: 400 }
      );
    }

    // Validar que OpenAI API key está configurada
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: "OpenAI API key no configurada. Por favor, configura OPENAI_API_KEY en las variables de entorno.",
        } as GenerateFunnelResponse,
        { status: 500 }
      );
    }

    // Generar el funnel usando IA
    const { strategy, generationTime } = await generateFunnel(formData);

    // En producción, aquí guardarías en la base de datos con Prisma
    // const savedStrategy = await prisma.funnelStrategy.create({
    //   data: {
    //     request: {
    //       create: {
    //         nombre: formData.nombre,
    //         email: formData.email,
    //         // ... otros campos
    //       }
    //     },
    //     diagnostico: strategy.diagnostico,
    //     funnel: strategy.funnel,
    //     // ... otros campos
    //     generationTime,
    //     model: "gpt-4-turbo-preview",
    //   }
    // });

    // Retornar la estrategia generada
    return NextResponse.json(
      {
        success: true,
        strategy,
        generationTime,
      } as GenerateFunnelResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en generate-funnel:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido al generar el funnel",
      } as GenerateFunnelResponse,
      { status: 500 }
    );
  }
}
