# Teste Front-End Econverse — Vitrine de Tecnologia (com modal)

Página em **React + TypeScript + Sass (SCSS)**, fiel ao layout de referência recebido (Home), com vitrine consumindo o JSON remoto e **modal de produto**. **Sem bibliotecas de UI.** HTML semântico + SEO básico.

## Demo das referências

- Layout de referência: Home completa (topo, hero Black Friday, categorias, 3x vitrine, parceiros Apple Store, marcas, newsletter, footer)
- Vitrine de referência: https://app.econverse.com.br/teste-front-end/junior/tecnologia/layout/vitrine-produtos.png
- JSON: https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json
- Figma: https://www.figma.com/design/rWnzPeoxgynuNPsJjV0VmV/Teste-Front-End-Jr?node-id=0-1&p=f&t=QIJKt42s676TYyge-0

## Pré-requisitos

- **Node.js 20+** (testado com Node v24) — baixe em https://nodejs.org
- **npm 10+** (já vem com o Node)
- Um terminal (PowerShell, CMD, Terminal ou VS Code) e o Git (só para clonar)

Confira as versões:

```bash
node -v
npm -v
```

## Passo a passo para rodar

**1. Clonar o repositório:**

```bash
git clone https://github.com/Joao-Paulo-Bortolocce/teste-front-end.git
cd teste-front-end
```

**2. Instalar as dependências** (baixa `react`, `vite`, `sass`, `lucide-react` e as ferramentas de teste para a pasta `node_modules/`):

```bash
npm install
```

> A pasta `node_modules/` é ignorada pelo Git (está no `.gitignore`) — ela é recriada por esse comando em qualquer máquina, não precisa commitar.

**3. Rodar o projeto em modo desenvolvimento:**

```bash
npm run dev
```

Abra no navegador o endereço mostrado no terminal (geralmente http://localhost:5173). A página recarrega sozinha a cada alteração no código.

**4. (Opcional) Compilar a versão final:**

```bash
npm run build
```

Valida os tipos TypeScript e gera a pasta `dist/` pronta para publicação.

**5. (Opcional) Pré-visualizar a versão compilada:**

```bash
npm run preview
```

Serve a pasta `dist/` em http://localhost:4173.

**6. (Opcional) Rodar os testes:**

```bash
npm test
```

### Resumo dos comandos

| Comando | O que faz |
|---|---|
| `npm install` | Instala as dependências (obrigatório na 1ª vez) |
| `npm run dev` | Roda o site em desenvolvimento |
| `npm run build` | Compila para produção (`dist/`) |
| `npm run preview` | Serve o build compilado |
| `npm test` | Executa os testes (Vitest) |
| `npm run lint` | Verifica o código (Oxlint) |

### Problemas comuns

- **Porta ocupada:** se a 5173 estiver em uso, o Vite pergunta se pode usar outra — confirme com `y`.
- **Página antiga no navegador:** pare o servidor (`Ctrl+C`), rode `npm run dev` de novo e atualize com `Ctrl+F5`.
- **Erro de CORS no console:** o app contorna via proxy em dev (ver seção “Dados e CORS”); se o erro persistir, confira a conexão com a internet.

Testes atuais (`src/__tests__/`): formatação BRL, `fetchProducts` (sucesso + erro HTTP + URL remota), `ProductCard` (nome, preço, botão COMPRAR).

## Dados e CORS (importante)

O servidor do JSON não envia `Access-Control-Allow-Origin`, então o `fetch`
direto do navegador é bloqueado pelo CORS. Estratégia adotada:

1. **Dev (`npm run dev`):** o app busca `/api/produtos.json`, e o Vite faz
   proxy server-side para a URL oficial (ver `vite.config.ts` → `server.proxy`).
   Comprovado: `GET /api/produtos.json` retorna 200 com os 10 produtos ao vivo.
2. **Build/preview:** tenta a URL oficial direta; se o CORS/rede falhar, usa
   automaticamente o snapshot `/data/produtos.json` (cópia idêntica, servida
   com o app) e registra `console.warn`. A vitrine nunca fica vazia por causa
   do CORS.
3. Se primário e snapshot falharem, a vitrine exibe erro com “Tentar novamente”.

## Estrutura

```
index.html                  # pt-BR, title, meta description + Open Graph
public/assets/              # logo, product-iphone, cat-*.png, black_friday.jpeg (hero), apple_store.jpeg (parceiros)
src/
  App.tsx                   # composição: TopBar/Header/Hero/Categories/3x Showcase/Partners/Brands/Newsletter/Footer
  types/product.ts          # Product, ProductsResponse (espelha o JSON)
  services/products.ts      # fetchProducts + PRODUCTS_URL + erro tipado
  hooks/useProducts.ts      # loading/success/error + retry (AbortController)
  utils/format.ts           # Intl.NumberFormat pt-BR BRL
  components/
    TopBar/ Header/ Hero/ Categories/
    Showcase/               # título, tabs visuais, carrossel com setas, skeleton, erro+retry
    ProductCard/            # foto, descrição real, preço real, placeholder visual, COMPRAR
    Partners/ Brands/ Newsletter/ Footer/
  styles/                   # _variables, _reset, _mixins, main.scss (+ scss por componente)
```

## Decisões (importante para a avaliação)

1. **Dados reais:** `productName`, `descriptionShort`, `photo` e `price` vêm do JSON. Preço formatado com `Intl pt-BR`.
2. **Placeholders visuais documentados:** o JSON não traz preço antigo, parcelamento nem frete — `R$ 30,90`, `2x de R$ 49,95` e `Frete grátis` são estáticos só para fidelidade ao `Home.png`.
3. **Tabs visuais:** `CELULAR/.../VER TODOS` sem filtro real, pois o JSON não tem categoria.
4. **Botão azul:** vale o `Home.png` local (botão azul `#2b2fa0`) em vez do rosa do `vitrine-produtos.png`.
5. **Fallback de imagem:** se a foto remota falhar, usa `/assets/product-iphone.png`.
6. **Sem UI kit:** verificado — `package.json` não contém bootstrap/foundation/mui/antd/chakra; carrossel, tabs e layout são próprios. A única lib de apresentação é `lucide-react` (apenas ícones SVG da faixa de categorias, não é framework de UI).
7. **Ícones das categorias:** `lucide-react` (estilo line, `strokeWidth 1.5`) — `MonitorSmartphone`, `Store`, `Wine`, `Hammer`, `HeartHandshake`, `Dumbbell`, `Shirt` — com divisórias pontilhadas e `Tecnologia` ativa em roxo, conforme o layout.

## SEO e semântica

- `lang="pt-BR"`, `title`, `meta description`, Open Graph
- `header/main/section/footer/nav`, `h1` no hero + `h2` por seção, `ul/li` na vitrine, imagens com `alt`, `role="search/tablist"`, labels em PT

## Modal do produto

Implementado conforme o layout recebido (`Popup`): overlay escuro, foto à
esquerda (`product.photo`), nome, preço formatado, link “Veja mais detalhes”,
seletor de quantidade (01, mínimo 1) e botão amarelo COMPRAR. Abre ao clicar
na foto ou no COMPRAR de qualquer card das 3 vitrines; fecha pelo X, pelo
clique no overlay ou pelo `Esc`, com trava de scroll, foco gerenciado
(`role="dialog"`, `aria-modal`) e retorno do foco ao elemento de origem.

## Entrega (manual, pelo candidato)

1. Revisar `git status`, commitar e dar push no fork
2. Conferir repo público com README e build verde
3. Enviar e-mail para `gustavo.cipriano@econverse.com.br`, assunto `Teste Vaga FrontEnd`, com o link do repositório
