import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
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
            <Image
              src="/LOGO-SEM-FUNDO.png"
              alt="Logo Narrador do Skate"
              width={40}
              height={40}
            />
          </Link>
          <div className="w-20" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Page Title */}
            <div className="space-y-3">
              <h2 className="text-4xl font-bold tracking-tight">
                Termos de Uso e Direitos de Imagem
              </h2>
              <p className="text-lg text-muted-foreground">
                Última atualização: 10 de abril de 2025
              </p>
            </div>

            {/* Terms Content */}
            <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
              <section className="space-y-4">
                <h3 className="text-2xl font-semibold">
                  1. Aceitação dos Termos
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Ao enviar seu vídeo através do formulário do Narrador do
                  Skate, você concorda com os termos e condições descritos neste
                  documento. Se você não concordar com qualquer parte destes
                  termos, por favor, não envie seu vídeo.
                </p>
              </section>

              <section className="space-y-4">
                <h3 className="text-2xl font-semibold">
                  2. Autorização de Uso de Imagem
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Ao enviar seu vídeo, você autoriza o Narrador do Skate a
                  utilizar, reproduzir, editar, publicar e distribuir o conteúdo
                  enviado, incluindo sua imagem, voz e performance, em qualquer
                  mídia ou plataforma, para fins de entretenimento e divulgação
                  do projeto.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Esta autorização é concedida de forma gratuita, por prazo
                  indeterminado e em território nacional e internacional.
                </p>
              </section>

              <section className="space-y-4">
                <h3 className="text-2xl font-semibold">
                  3. Propriedade do Conteúdo
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Você declara ser o proprietário ou ter os direitos necessários
                  sobre o vídeo enviado, incluindo direitos autorais, direitos
                  de imagem de terceiros que possam aparecer no vídeo, e
                  direitos sobre qualquer música ou conteúdo de terceiros
                  utilizado.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  O Narrador do Skate não se responsabiliza por violações de
                  direitos autorais ou de imagem de terceiros presentes no
                  material enviado.
                </p>
              </section>

              <section className="space-y-4">
                <h3 className="text-2xl font-semibold">
                  4. Uso do Conteúdo Narrado
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  O vídeo com a narração adicionada poderá ser publicado nas
                  redes sociais do Narrador do Skate, incluindo mas não se
                  limitando a Instagram, YouTube, TikTok e outras plataformas
                  digitais.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Você terá o direito de compartilhar e utilizar o vídeo narrado
                  em suas próprias redes sociais, sempre creditando o Narrador
                  do Skate.
                </p>
              </section>

              <section className="space-y-4">
                <h3 className="text-2xl font-semibold">
                  5. Conteúdo Apropriado
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Você concorda em não enviar vídeos que contenham conteúdo
                  ofensivo, discriminatório, violento, pornográfico ou que viole
                  leis aplicáveis. O Narrador do Skate se reserva o direito de
                  recusar ou remover qualquer conteúdo que viole estas
                  diretrizes.
                </p>
              </section>

              <section className="space-y-4">
                <h3 className="text-2xl font-semibold">
                  6. Privacidade e Dados Pessoais
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  As informações coletadas através do formulário (nome,
                  localização, Instagram) serão utilizadas exclusivamente para
                  fins de identificação e contato relacionados ao projeto. Não
                  compartilharemos seus dados pessoais com terceiros sem seu
                  consentimento.
                </p>
              </section>

              <section className="space-y-4">
                <h3 className="text-2xl font-semibold">
                  7. Isenção de Responsabilidade
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  O Narrador do Skate não garante que todos os vídeos enviados
                  serão narrados ou publicados. A seleção dos vídeos é feita a
                  critério da equipe do projeto.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Não nos responsabilizamos por danos, perdas ou prejuízos
                  decorrentes do uso ou impossibilidade de uso do serviço.
                </p>
              </section>

              <section className="space-y-4">
                <h3 className="text-2xl font-semibold">
                  8. Modificações dos Termos
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  O Narrador do Skate se reserva o direito de modificar estes
                  termos a qualquer momento. As alterações entrarão em vigor
                  imediatamente após sua publicação nesta página.
                </p>
              </section>

              <section className="space-y-4">
                <h3 className="text-2xl font-semibold">9. Contato</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Para dúvidas ou questões relacionadas a estes termos, entre em
                  contato através do Instagram do projeto.
                </p>
              </section>

              <div className="pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Ao clicar em &quot;Enviar Vídeo&quot; no formulário, você
                  confirma que leu, compreendeu e concorda com todos os termos e
                  condições acima descritos.
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
  );
}
