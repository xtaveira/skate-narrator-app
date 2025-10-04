import { VideoSubmissionForm } from "@/components/video-submission-form"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function SendVideoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Image src="/narrador-do-skate-logo.png" alt="Logo Narrador do Skate" width={40} height={40} />
          </Link>
          <div className="w-20" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Page Title */}
            <div className="space-y-3 text-center">
              <h2 className="text-4xl font-bold tracking-tight">Envie Seu Vídeo</h2>
              <p className="text-lg text-muted-foreground text-pretty">
                Preencha o formulário abaixo para enviar seu vídeo de skate e receber uma narração profissional
              </p>
            </div>

            {/* Form */}
            <VideoSubmissionForm />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 Narrador do Skate. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
