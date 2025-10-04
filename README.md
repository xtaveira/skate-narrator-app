# Narrador do Skate

Aplicação web para envio de vídeos de skate e recebimento de narrações profissionais.

## Tecnologias

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn/ui
- Google Sheets API
- Sonner (Toast notifications)

## Configuração

### 1. Instalar dependências

\`\`\`bash
npm install
\`\`\`

### 2. Configurar Google Sheets API

1. Acesse o [Google Cloud Console](https://console.cloud.google.com)
2. Crie um novo projeto
3. Ative a Google Sheets API
4. Crie uma Service Account:
   - Vá em "IAM & Admin" > "Service Accounts"
   - Clique em "Create Service Account"
   - Dê um nome e clique em "Create"
   - Não precisa adicionar roles, clique em "Continue" e depois "Done"
5. Crie uma chave JSON:
   - Clique na service account criada
   - Vá na aba "Keys"
   - Clique em "Add Key" > "Create new key"
   - Escolha JSON e clique em "Create"
   - O arquivo será baixado automaticamente

### 3. Configurar a Planilha Google Sheets

1. Crie uma nova planilha no Google Sheets
2. Renomeie a primeira aba para "Sheet1" (ou ajuste no código)
3. Adicione os cabeçalhos na primeira linha:
   - A1: timestamp
   - B1: name
   - C1: address
   - D1: instagram
   - E1: link
4. Compartilhe a planilha com o email da service account (encontrado no arquivo JSON baixado)
   - Clique em "Compartilhar"
   - Cole o email da service account (ex: nome@projeto.iam.gserviceaccount.com)
   - Dê permissão de "Editor"
5. Copie o ID da planilha da URL:
   - URL: https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
   - Copie apenas o SPREADSHEET_ID

### 4. Configurar variáveis de ambiente

Crie um arquivo \`.env.local\` na raiz do projeto:

\`\`\`env
SPREADSHEET_ID=seu_spreadsheet_id_aqui
GOOGLE_SERVICE_ACCOUNT_EMAIL=seu-email@projeto.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nSua chave privada aqui\n-----END PRIVATE KEY-----\n"
\`\`\`

**Importante:** A chave privada deve estar entre aspas duplas e manter os \n para quebras de linha.

### 5. Executar o projeto

\`\`\`bash
npm run dev
\`\`\`

Acesse [http://localhost:3000](http://localhost:3000)

## Estrutura do Projeto

- \`/app\` - Páginas e rotas da aplicação
  - \`/page.tsx\` - Landing page
  - \`/send-video/page.tsx\` - Página de envio de vídeo
  - \`/terms/page.tsx\` - Página de termos de uso
  - \`/api/submit/route.ts\` - API para envio ao Google Sheets
- \`/components\` - Componentes React
  - \`/video-submission-form.tsx\` - Formulário de envio
  - \`/ui\` - Componentes UI do Shadcn

## Funcionalidades

- Landing page com informações do projeto
- Formulário de envio com validação
- Integração com API do IBGE para estados e cidades brasileiras
- Opção de localização internacional
- Envio de dados para Google Sheets
- Notificações toast para feedback do usuário
- Design responsivo e moderno

## Deploy

Para fazer deploy na Vercel:

1. Faça push do código para o GitHub
2. Importe o projeto na Vercel
3. Adicione as variáveis de ambiente no painel da Vercel
4. Deploy!
\`\`\`
