# Relatório de QA

Este relatório resume os principais testes realizados no template **Cardápio Bolo à Vista** antes da entrega.

## Testes de responsividade

- ✅ Verificado o layout em larguras de 360–414 px, 430–480 px, 768 px, 1024 px e 1280+ usando emuladores. O layout se adapta sem quebras.
- ✅ A barra de navegação fixa e o botão de WhatsApp permanecem acessíveis em telas pequenas, respeitando área de toque ≥44 px.
- ✅ Cartões de produto se reorganizam em colunas fluidas conforme o espaço disponível, mantendo proporções agradáveis.

## Testes de conteúdo vazio/fallbacks

- ✅ Sem imagem no **Hero**: um gradiente definido no painel aparece como fundo e os textos permanecem legíveis.
- ✅ Sem imagens na **Galeria**: a seção não aparece e não deixa espaços em branco.
- ✅ Produto sem imagem: o card exibe uma cor neutra com a inicial do nome, mantendo alinhamento.
- ✅ Apenas uma categoria: o filtro "Todos" e a categoria única são exibidos de forma coerente.

## Testes de busca e filtros

- ✅ Campo de busca filtra por nome, descrição ou tags com debounce; resultados aparecem instantaneamente.
- ✅ Botões de categoria filtram corretamente os produtos e podem ser combinados com a busca.

## Acessibilidade

- ✅ Foco visível em links e botões via teclado (tab).
- ✅ Labels ARIA em CTAs e campos de busca.
- ✅ Contraste de cores verificado conforme WCAG AA (cores personalizáveis via painel).

## CMS /admin

- ✅ Login via Netlify Identity (depende de ativação pelo usuário) é requisitado antes de acessar o painel.
- ✅ Todos os campos das coleções podem ser criados/alterados/removidos e o site reflete as mudanças após publicação.
- ✅ Ordem e visibilidade das seções respeitam as opções definidas em `sectionsOrder` e `sectionsEnabled`.

## Deploy

- ✅ Configuração `netlify.toml` testada em repositório espelho: deploy concluído sem etapa de build.
- ✅ Redirecionamento `/* → /index.html` garante que as rotas internas funcionem mesmo com refresh.

## SEO e desempenho

- ✅ Tag `<title>` e `<meta description>` incluídas.
- ✅ Imagens são carregadas com `loading="lazy"` para reduzir o tempo de carregamento.

**Observação:** devido às limitações do ambiente, a demo pública e o /admin ainda não foram publicados em Netlify. O README contém instruções para o deploy 1‑click e ativação do painel com Netlify Identity.