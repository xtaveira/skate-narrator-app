import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Video, Mic2, Sparkles } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/narrador-do-skate-logo.png" alt="Logo Narrador do Skate" width={40} height={40} />
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/send-video" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Enviar Vídeo
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Termos
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Narração profissional para seus vídeos</span>
            </div>

            {/* Main Title */}
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">Narrador do Skate</h2>

            {/* Description */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              Quer mostrar sua linha para o mundo e ainda por cima ter uma narração bem divertida estilo campeonato?
              Seja bem vindo!
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button asChild size="lg" className="text-lg px-8 py-6 group">
                <Link href="/send-video">
                  Enviar Meu Vídeo
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 pt-16">
              <div className="p-6 rounded-lg bg-card border border-border space-y-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Video className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Envie seu vídeo</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Faça upload do seu melhor vídeo de skate no Google Drive e compartilhe o link
                </p>
              </div>

              <div className="p-6 rounded-lg bg-card border border-border space-y-3">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Mic2 className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold">Receba narração</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Nossa equipe cria uma narração divertida e profissional para suas manobras
                </p>
              </div>

              <div className="p-6 rounded-lg bg-card border border-border space-y-3">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold">Compartilhe</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Mostre para o mundo suas manobras com narração estilo campeonato
                </p>
              </div>
            </div>
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
