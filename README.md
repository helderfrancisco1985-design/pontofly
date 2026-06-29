# Ponto Fly

Loja online de fios e acessórios para tricot e croché, construída em Next.js e alojada no cPanel via Passenger.

## Desenvolvimento local

```bash
cp .env.example .env.local   # preencher com os valores reais
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Variáveis de ambiente

### Build-time — GitHub Secrets

Estas variáveis são `NEXT_PUBLIC_*` e ficam **gravadas no bundle** durante `npm run build`. Têm de estar configuradas como GitHub Secrets antes de cada deploy.

| Secret | Descrição |
|---|---|
| `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` | Domínio da loja Shopify (ex: `minha-loja.myshopify.com`) |
| `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Storefront API token (token público, só leitura + carrinho) |
| `NEXT_PUBLIC_SITE_URL` | URL pública do site (ex: `https://pontofly.pt`) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | ID do Google Analytics 4 (ex: `G-XXXXXXXXXX`), opcional |
| `CPANEL_FTP_HOST` | Hostname FTP do cPanel |
| `CPANEL_FTP_USER` | Utilizador FTP |
| `CPANEL_FTP_PASSWORD` | Password FTP |

Onde configurar: **GitHub → Settings → Secrets and variables → Actions → New repository secret**

### Runtime — cPanel Environment Variables

Estas variáveis são lidas em runtime pelo servidor Node.js. Nunca entram no bundle do cliente. Têm de ser configuradas diretamente no cPanel.

| Variável | Descrição |
|---|---|
| `RESEND_API_KEY` | Chave da API Resend para envio de emails |
| `CONTACT_EMAIL` | Email de destino do formulário de contacto |

Onde configurar: **cPanel → Node.js App → Edit → Environment Variables**

> As variáveis `NEXT_PUBLIC_*` NÃO precisam de estar no cPanel — ficam gravadas no bundle durante o build no GitHub Actions.

## Deploy

O deploy é automático em cada push para `master` via GitHub Actions (`.github/workflows/deploy.yml`):

1. `npm ci` — instalar dependências
2. `npm run build` — compilar com todas as `NEXT_PUBLIC_*` vars injetadas
3. Upload via FTPS para o cPanel
4. Reiniciar a app no cPanel (Restart App)

## Arquitetura

- **Framework**: Next.js (App Router)
- **Servidor**: Passenger (Node.js 22) no cPanel
- **Loja**: Shopify Storefront API
- **Email**: Resend
- **CSS**: Tailwind CSS
