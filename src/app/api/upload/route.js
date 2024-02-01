import { writeFile, readFile } from "fs/promises"
import { NextResponse } from "next/server"
import path from "path"

export async function POST(request) {
  try {
    const data = await request.formData()
    const file = data.get("file")

    if (file.type !== "text/plain") {
      return NextResponse.json(
        JSON.stringify({
          message: "Solo se permiten archivos planos txt",
        }),
        {
          status: 400,
        }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const filePath = path.join(process.cwd(), "public", file.name)
    writeFile(filePath, buffer)
    console.log("Archivo cargado en: ", filePath)

    readThisFile(filePath)

    // readThisFile
    async function readThisFile(filePath) {
      try {
        const data = await readFile(filePath, "UTF-8")
        const textDivide = data.toString().split(" ")
        const numberWords = textDivide.length
        console.log(`El archivo contiene: ${numberWords} palabras.`)
      } catch (error) {
        console.error(
          `Se ha producido un error al intentar leer el archivo: ${error.message}`
        )
      }
    }

    return new Response(JSON.stringify({ message: "Archivo Procesado" }))
  } catch (error) {
    return NextResponse.json(
      JSON.stringify({
        message: `Hubo un error ${error}`,
      }),
      {
        status: 400,
      }
    )
  }
}
