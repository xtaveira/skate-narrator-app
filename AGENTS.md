# skate-narrator-app: instruções para agentes

Narrador do Skate: landing page e formulário para skatistas enviarem vídeos e receberem narração. Cada envio vira uma linha no Google Sheets e um aviso no Telegram. Repositório **público**: nada de caminhos pessoais, dados de pessoas ou valores de credenciais em arquivos versionados.

Harness de executor: uma tarefa por vez, só neste repositório, com relatório no fim.

## Stack
Next.js 15 (App Router, `app/`), React 19, TypeScript, Tailwind 4 + shadcn/ui, Sonner, `googleapis` (Sheets por service account). npm (`package-lock.json`). Deploy na Vercel.

## Rodar
```bash
npm ci
cp .env.example .env.local   # preencha com as próprias credenciais (ver README)
npm run dev                  # http://localhost:3000
```

## Verificar
- Preferido: `npm run lint && npm run build`. Não executado nesta sessão (sem `node_modules` na máquina).
- Não há testes automatizados; teste manual de envio só com uma planilha de teste.

## Estrutura
- `app/page.tsx` (landing), `app/send-video/page.tsx` (envio), `app/terms/page.tsx` (termos).
- `app/api/submit/route.ts`: valida o formulário (responsável obrigatório para menores de 18) e grava no Sheets.
- `components/video-submission-form.tsx` (estados e cidades pela API do IBGE), `components/ui/` (shadcn), `lib/telegram.ts` (log).

## Convenções observadas
- Commits curtos `feat:`/`fix:` em português; textos da UI em português.
- Colunas da planilha descritas no `README.md`: ao mudar campos, atualize rota, formulário e README juntos.

## Não mexer / cuidado
- Dados enviados são pessoais (nome, idade, contato de responsável de menor): nunca os copie para logs, issues ou commits.
- Envio real grava na planilha e manda mensagem no Telegram: use credenciais de teste.
- O `.gitignore` só ignora `.env.local`: não crie `.env` nem arquivo de chave JSON da service account na raiz.

## Segredos (só nomes)
`SPREADSHEET_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`. Valores só em `.env.local` (ignorado) ou nas variáveis da Vercel; nunca no Git, em log ou no relatório.

## Ao terminar
1. Rode a verificação preferida e cole a saída real no relatório.
2. `git status`; adicione só os seus arquivos; um commit em português.
3. Push só quando o pedido incluir. Deploy ou mudança na planilha/bot de produção: só com ok do dono do repositório.
4. Relatório: feito, verificação, SHA, pendências.
