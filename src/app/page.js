"use client"
import { useState } from "react"

function HomePage() {
  const [file, setFile] = useState()

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!file) return

    try {
      const form = new FormData()
      form.set("file", file)

      //sending file to server
      const response = await fetch("/api/upload", {
        method: "POST",
        body: form,
      })

      if (response.ok) {
        console.log("Archivo cargado correctamente")
      }

      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="bg-zinc-950 p-5">
        <h1 className="text-4xl text-center my-4">Cargar Archivos</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            onChange={handleFileChange}
            className="bg-zinc-900 text-zinc-100 p-2 rounded block mb-2"
          />
          <button
            className="bg-green-500 text-zinc-100 p-2 rounded block w-full disabled:opacity-50"
            disabled={!file}>
            Cargar
          </button>
        </form>
      </div>
    </div>
  )
}

export default HomePage
