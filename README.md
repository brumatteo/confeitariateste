# Cardápio Bolo à Vista

Um template responsivo de cardápio de bolos com painel de edição via Decap CMS (ex‑Netlify CMS). Todas as seções do site são 100% editáveis sem tocar em código: cores, tipografia, textos, imagens, cardápio, galerias, políticas e FAQ. O projeto foi pensado para iniciantes, com um painel amigável acessível em `/admin`.

## Funcionalidades

* **Mobile‑first**: layout bonito em telas pequenas e grandes.
* **Hero com overlay editável**: se você não enviar imagem, o fundo vira um gradiente.
* **Sobre**: texto e lista de características com emojis.
* **Cardápio filtrável**: categorias e busca instantânea por nome, descrição ou tags.
* **Galeria**: mostre suas fotos favoritas; sem fotos, a seção some.
* **Especial sob medida**: bloco de CTA para ideias personalizadas.
* **Informações/Políticas**: blocos de listas editáveis (pedidos, decoração, pagamento etc.).
* **FAQ**: perguntas frequentes com acordeões.
* **Tema**: personalize cores, logo (texto), ordem das seções e quais aparecem.
* **Acessibilidade**: foco visível, contraste adequado e labels nos botões.

## Estrutura do projeto

```
/ (raiz)
  index.html              ← página principal
  /assets
    /css/styles.css       ← estilos do site
    /js/app.js            ← lógica para carregar o conteúdo
  /images/                ← imagens do tema (placeholders)
  /content/               ← arquivos editáveis via CMS (JSON)
  /admin/
    index.html            ← loader do Decap CMS
    config.yml            ← definição das coleções/campos do painel
  netlify.toml            ← configuração para deploy no Netlify
  README.md               ← este guia
  mini_guide.md           ← guia curto com prints
```

### Conteúdo editável

O painel `/admin` permite editar tudo isso:

| Coleção        | Conteúdo editável                          |
|----------------|--------------------------------------------|
| Tema           | Marca (texto), cores, CTA do topo, ordem e visibilidade das seções |
| Hero           | Título, subtítulo, imagem, overlay/gradiente, opacidade e CTA |
| Sobre          | Título, texto, lista de características (emoji, título, texto) |
| Categorias     | Lista de categorias para filtrar produtos |
| Produtos       | Lista de bolos com nome, preço, descrição, categoria, descrição da categoria, tabela de tamanhos (P/M/G), tags, rendimento, imagem, badges (mais vendido, novo) e CTA |
| Galeria        | Lista de imagens (opcional) |
| Sob medida     | Título, texto e CTA |
| Informações    | Blocos com título e lista de itens |
| FAQ            | Lista de perguntas e respostas |

## Como publicar seu próprio site

1. **Crie um repositório no GitHub**: faça um fork ou clone deste projeto para sua conta.
2. **Configure o Netlify**:
   - Acesse [Netlify](https://www.netlify.com/) e crie uma conta gratuita ou faça login.
   - Clique em **“Add new site” → “Import an existing project”**.
   - Conecte sua conta GitHub, escolha o repositório do projeto e selecione o branch `main`.
   - Mantenha o campo **build command** vazio e **publish directory** como `/` (padrão). Clique em **Deploy**.
3. **Ative o Identity e o Git Gateway**:
   - No painel do seu site no Netlify, vá em **Site Settings → Identity** e clique em **Enable Identity**.
   - Ainda em Identity, habilite **Registration** para “Invite only”.
   - Em seguida, clique em **Git Gateway → Enable Git Gateway** (use padrão). Isso permitirá que o CMS grave no repositório.
4. **Convide seu usuário administrador**:
   - Em **Identity → Users**, clique em **Invite users**.
   - Envie um convite para o e‑mail da aluna. Defina a senha inicial como `admin123` (ela poderá trocar no primeiro login).
   - O e‑mail chegará com um link para criar a conta; após o primeiro acesso, solicite que troque a senha.
5. **Acesse o painel**:
   - Visite `https://SEU-SITE.netlify.app/admin/` e faça login com o e‑mail cadastrado e a senha inicial. 
   - O painel permite editar todo o conteúdo em português. Após cada alteração, clique em **Publicar** para atualizar o site.
6. **Deploy com 1 clique para as alunas**:
   - No `README.md` do seu repositório, insira o botão abaixo substituindo `REPO_URL` pela URL do seu repositório público (ex.: `https://github.com/usuario/cake-menu-site`). 
     ```markdown
     [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=REPO_URL)
     ```
   - As alunas poderão clicar neste botão e gerar uma cópia própria do site e do painel em minutos.

## Como editar os conteúdos

1. **Tema**: no painel, abra “Tema” e mude as cores (clica no seletor), altere o texto da marca ou reordene as seções. Para ocultar uma seção, desmarque seu toggle.
2. **Hero**: edite título, subtítulo, imagem (upload opcional) e o texto/URL da CTA. Se você remover a imagem, um gradiente agradável será usado.
3. **Sobre**: escreva um texto sobre você ou seu negócio e defina de 3 a 6 características com emoji, título e descrição.
4. **Categorias**: adicione ou remova categorias conforme suas linhas de produtos.
5. **Produtos**: cada item recebe nome, preço, descrição, categoria (escolha na lista), tags (palavras-chave), rendimento, imagem (opcional), badges de “mais vendido” ou “novo” e link de CTA. As imagens são opcionais: se não houver, um placeholder neutro será exibido.
   - Para os links de WhatsApp, substitua `xx` no começo da URL pelo seu DDI/DDD/número (somente dígitos). Ex.: `https://wa.me/5511999999999?text=Olá%20quero%20fazer%20um%20pedido`. O painel exibe uma dica ao lado do campo.
6. **Galeria**: faça upload das suas melhores fotos. A seção não aparece se não houver imagens.
7. **Sob medida**: use este bloco para ofertar encomendas especiais com um botão de contato.
8. **Informações/Políticas**: crie blocos com título (ex.: Pagamento) e listas de pontos importantes.
9. **FAQ**: liste dúvidas frequentes e respostas claras.

Sempre que fizer alterações, clique em **Publicar** no CMS. Em alguns segundos o seu site será atualizado.

## Como trocar a senha (Netlify Identity)

1. Acesse o painel `/admin` e clique no canto superior direito (perfil).
2. Escolha **User Settings**.
3. Em **Password**, clique em **Change password**.
4. Digite a senha atual (`admin123` no primeiro acesso) e a nova senha desejada.
5. Salve e use a nova senha a partir do próximo login.

## Mini‑guia para as alunas

Veja o arquivo [`mini_guide.md`](mini_guide.md) incluído neste repositório. Ele traz 7 prints com passo‑a‑passo visual:

1. Trocar cores e “Sua Logo”
2. Editar o CTA do WhatsApp
3. Editar o banner e o overlay
4. Criar categoria
5. Cadastrar produto (imagem, badges e CTA)
6. Ocultar/reordenar seções
7. Publicar alterações

## Créditos e licenças

Este projeto usa [Decap CMS](https://decapcms.org/) (ex‑Netlify CMS) sob licença MIT. As imagens utilizadas como placeholders foram geradas artificialmente para fins decorativos e podem ser substituídas livremente no painel.
