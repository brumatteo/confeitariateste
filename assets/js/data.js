// Fallback content for offline preview. This object mirrors the files in /content.
window.defaultContent = {
  // Theme defines the colours, brand and section order used for offline preview.
  theme: {
    brandText: "Vanilla Cake Studio",
    // A soft, sophisticated palette inspired by American confectionery sites
    primary: "#d8a79c",      // blush rose used for accents and buttons
    secondary: "#7a5c4b",    // warm brown for highlights
    bg: "#fdf7f1",            // light nude background
    card: "#ffffff",          // card backgrounds remain white
    text: "#5a4b42",          // softened dark taupe for headings and body copy
    headerCta: {
      label: "Pedir no WhatsApp",
      href: "https://wa.me/xx?text=Ol%C3%A1%20quero%20fazer%20um%20pedido"
    },
    // The order in which sections appear on the homepage. Includes the new 'decorations' section.
    sectionsOrder: [
      "hero",
      "about",
      "menu",
      "decorations",
      "custom",
      "policies",
      "faq"
    ],
    sectionsEnabled: {
      hero: true,
      about: true,
      menu: true,
      decorations: true,
      custom: true,
      policies: true,
      faq: true
    }
  },
  // Hero section with image, overlay and call to action. Uses the provided cake photo by default.
  hero: {
    title: "Sua Celebração, Nossa Assinatura",
    subtitle: "Bolos decorados sob medida para momentos que merecem ser lembrados.",
    image: "images/hero.jpg",
    // Darker gradient overlay to ensure text legibility over the photo
    overlay: "linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.15))",
    opacity: 0.6,
    cta: {
      label: "Ver Cardápio",
      href: "#menu"
    }
  },
  // About section introduces the confectioner and highlights the studio's values.
  about: {
    title: "Sobre",
    text: "Olá, eu sou Bruna Matteo, responsável por dar vida à Vanilla Cake Studio. Somos especializados em bolos decorados com buttercream e por trás de cada bolo, há uma paixão verdadeira por celebrar a vida com sabor, beleza e afeto.\n\nTudo é feito à mão com ingredientes selecionados e cuidado em cada detalhe. Um bolo só sai das minhas mãos quando alcança o nível de qualidade que acredito que cada cliente merece. A sua satisfação é o que me move, e eu não descanso até ter certeza de que ele foi entregue.",
    image: "images/about.jpg",
    features: [
      {
        icon: "images/icon-quality-transparent.png",
        title: "Alta Qualidade",
        text: "Ingredientes selecionados"
      },
      {
        icon: "images/icon-premium-transparent.png",
        title: "Atendimento Premium",
        text: "Atenção dedicada"
      },
      {
        icon: "images/icon-delivery-transparent.png",
        title: "Entrega Pontual",
        text: "Atendimento sob medida"
      }
    ]
  },
  categories: {
    items: ["Especiais", "Tradicionais"]
  },
  products: {
    items: [
      {
        "active": true,
        "name": "Velvet Cream",
        "price": "R$ 250,00",
        "description": "Massa red velvet com três camadas de brigadeiro cremoso de cream cheese.",
        "category": "Especiais",
        "categoryDescription": "Sabores finos, marcantes e únicos",
        "sizeTable": [
          { "size": "P 15cm", "serves": "20 fatias", "price": "R$ 250,00" },
          { "size": "M 17cm", "serves": "25 fatias", "price": "R$ 300,00" },
          { "size": "G 20cm", "serves": "35 fatias", "price": "R$ 380,00" }
        ],
        "tags": ["red velvet", "cream cheese"],
        "serves": "20 fatias",
        "image": "images/gallery1.png",
        "bestseller": true,
        "new": false,
        "cta": {
          "label": "Escolher decoração",
          "href": "#decorations"
        }
      },
        {
          "active": true,
          "name": "Morango dos Sonhos",
          "price": "R$ 260,00",
          "description": "Massa de baunilha com três camadas de brigadeiro 4 leites com geleia de morango artesanal.",
          "category": "Especiais",
          "categoryDescription": "Sabores finos, marcantes e únicos",
          "sizeTable": [
            { "size": "P 15cm", "serves": "20 fatias", "price": "R$ 250,00" },
            { "size": "M 17cm", "serves": "25 fatias", "price": "R$ 300,00" },
            { "size": "G 20cm", "serves": "35 fatias", "price": "R$ 380,00" }
          ],
          "tags": ["baunilha", "morango"],
          "serves": "25 fatias",
          "image": "images/gallery2.png",
          "bestseller": false,
          "new": true,
          "cta": {
            "label": "Escolher decoração",
            "href": "#decorations"
          }
        },
        {
          "active": true,
          "name": "Pistache & Morango",
          "price": "R$ 300,00",
          "description": "Massa de pistache com duas camadas de brigadeiro branco com geleia de morango e uma camada central de creme de pistache.",
          "category": "Especiais",
          "categoryDescription": "Sabores finos, marcantes e únicos",
          "sizeTable": [
            { "size": "P 15cm", "serves": "20 fatias", "price": "R$ 250,00" },
            { "size": "M 17cm", "serves": "25 fatias", "price": "R$ 300,00" },
            { "size": "G 20cm", "serves": "35 fatias", "price": "R$ 380,00" }
          ],
          "tags": ["pistache", "morango"],
          "serves": "25 fatias",
          "image": "images/gallery3.png",
          "bestseller": false,
          "new": false,
          "cta": {
            "label": "Escolher decoração",
            "href": "#decorations"
          }
        },
        {
          "active": true,
          "name": "Dulce Limão",
          "price": "R$ 380,00",
          "description": "Massa de limão com três camadas de brigadeiro de doce de leite cremoso e curd de limão siciliano artesanal.",
          "category": "Especiais",
          "categoryDescription": "Sabores finos, marcantes e únicos",
          "sizeTable": [
            { "size": "P 15cm", "serves": "20 fatias", "price": "R$ 250,00" },
            { "size": "M 17cm", "serves": "25 fatias", "price": "R$ 300,00" },
            { "size": "G 20cm", "serves": "35 fatias", "price": "R$ 380,00" }
          ],
          "tags": ["limão", "doce de leite"],
          "serves": "35 fatias",
          "image": "images/gallery1.png",
          "bestseller": false,
          "new": false,
          "cta": {
            "label": "Escolher decoração",
            "href": "#decorations"
          }
        },
        {
          "active": true,
          "name": "Clássico Duplo",
          "price": "R$ 210,00",
          "description": "Massa de baunilha com duas camadas de brigadeiro de chocolate e uma camada de brigadeiro branco.",
          "category": "Tradicionais",
          "categoryDescription": "Perfeitos para qualquer ocasião.",
          "sizeTable": [
            { "size": "P 15cm", "serves": "20 fatias", "price": "R$ 210,00" },
            { "size": "M 17cm", "serves": "25 fatias", "price": "R$ 260,00" },
            { "size": "G 20cm", "serves": "35 fatias", "price": "R$ 350,00" }
          ],
          "tags": ["baunilha", "chocolate"],
          "serves": "20 fatias",
          "image": "images/gallery2.png",
          "bestseller": false,
          "new": false,
          "cta": {
            "label": "Escolher decoração",
            "href": "#decorations"
          }
        },
        {
          "active": true,
          "name": "Prestígio Artesanal",
          "price": "R$ 260,00",
          "description": "Massa de chocolate com duas camadas de brigadeiro de coco e uma camada de brigadeiro de chocolate trufado cremoso.",
          "category": "Tradicionais",
          "categoryDescription": "Perfeitos para qualquer ocasião.",
          "sizeTable": [
            { "size": "P 15cm", "serves": "20 fatias", "price": "R$ 210,00" },
            { "size": "M 17cm", "serves": "25 fatias", "price": "R$ 260,00" },
            { "size": "G 20cm", "serves": "35 fatias", "price": "R$ 350,00" }
          ],
          "tags": ["coco", "chocolate"],
          "serves": "25 fatias",
          "image": "images/gallery3.png",
          "bestseller": true,
          "new": false,
          "cta": {
            "label": "Escolher decoração",
            "href": "#decorations"
          }
        },
        {
          "active": true,
          "name": "Clássico Chocolate",
          "price": "R$ 350,00",
          "description": "Massa de chocolate com três camadas de brigadeiro de chocolate trufado cremoso.",
          "category": "Tradicionais",
          "categoryDescription": "Perfeitos para qualquer ocasião.",
          "sizeTable": [
            { "size": "P 15cm", "serves": "20 fatias", "price": "R$ 210,00" },
            { "size": "M 17cm", "serves": "25 fatias", "price": "R$ 260,00" },
            { "size": "G 20cm", "serves": "35 fatias", "price": "R$ 350,00" }
          ],
          "tags": ["chocolate"],
          "serves": "35 fatias",
          "image": "images/gallery1.png",
          "bestseller": false,
          "new": false,
          "cta": {
            "label": "Escolher decoração",
            "href": "#decorations"
          }
        },
        {
          "active": true,
          "name": "Latte (Ninho & Nutella)",
          "price": "R$ 260,00",
          "description": "Massa de café suave com três camadas de brigadeiro de ninho Nutella.",
          "category": "Tradicionais",
          "categoryDescription": "Perfeitos para qualquer ocasião.",
          "sizeTable": [
            { "size": "P 15cm", "serves": "20 fatias", "price": "R$ 210,00" },
            { "size": "M 17cm", "serves": "25 fatias", "price": "R$ 260,00" },
            { "size": "G 20cm", "serves": "35 fatias", "price": "R$ 350,00" }
          ],
          "tags": ["café", "ninho", "nutella"],
          "serves": "25 fatias",
          "image": "images/gallery2.png",
          "bestseller": false,
          "new": true,
          "cta": {
            "label": "Escolher decoração",
            "href": "#decorations"
          }
        }
      ]
  },
  gallery: {
    items: ["images/gallery1.png", "images/gallery2.png", "images/gallery3.png"]
  },
  // Decorations section mirrors the examples: minimal cost guidance and placeholder images.
  decorations: {
    title: "Escolha sua Decoração",
    subtitle: "Os bolos minimalistas e sem elementos extras não têm custo adicional. Fique à vontade para escolher o de sua preferência.",
    items: ["images/gallery1.png", "images/gallery2.png", "images/gallery3.png"]
  },
  // Custom section for bespoke cakes and personalised decorations.
  custom: {
    title: "Pensando em algo ainda mais especial?",
    text: "Para ocasiões especiais e decorações personalizadas, sinta-se à vontade para enviar suas ideias no pedido. Teremos o maior prazer em planejar esse momento com você.\n\nCada bolo personalizado é único, por isso os valores podem variar conforme as escolhas.",
    cta: {
      label: "Fazer Pedido",
      href: "https://wa.me/xx?text=Ol%C3%A1%2C%20quero%20fazer%20um%20pedido"
    }
  },
  // Policies section with introductory guidance and detailed bullets for orders, decoration, payment, and cancellation.
  policies: {
    introTitle: "Informações Importantes",
    introText: "Confira abaixo informações importantes sobre pedidos, decorações, pagamentos e cancelamentos.",
    items: [
      {
        title: "Pedidos",
        items: [
          "Faça seu pedido com mínimo de 5 dias de antecedência.",
          "Para datas com alta demanda, antecipe o quanto antes.",
          "Após o início da produção, não serão aceitas alterações.",
          "Ajustes devem ser feitos até 5 dias antes e podem ter custo extra."
        ]
      },
      {
        title: "Decoração",
        items: [
          "Você pode enviar referências, mas não copiamos bolos.",
          "As imagens servem de inspiração para uma criação única.",
          "Cores podem variar levemente.",
          "Não trabalhamos com cobertura total em pasta americana, apenas detalhes decorativos."
        ]
      },
      {
        title: "Pagamento e Retirada",
        items: [
          "Aceitamos pix ou dinheiro.",
          "Pagamento em duas partes: 50% no pedido e 50% na retirada.",
          "O pedido só é confirmado após o pagamento da entrada.",
          "Retirada no ateliê em horário agendado.",
          "Domingo não abrimos.",
          "Entregas com taxa adicional, consultar disponibilidade."
        ]
      },
      {
        title: "Política de Cancelamento",
        items: [
          "Cancelamentos até 5 dias úteis antes: reembolso de 50%.",
          "Após esse prazo: sem reembolso.",
          "O valor pode ser usado como crédito para outro pedido."
        ]
      }
    ]
  },
  faq:     {
      "items": [
        {
          "q": "Com quanto tempo de antecedência devo fazer meu pedido?",
          "a": "O ideal é que o pedido seja feito com no mínimo 5 dias de antecedência para garantir disponibilidade."
        },
        {
          "q": "Posso personalizar meu bolo?",
          "a": "Sim! Você pode enviar referências e ideias, e criamos um bolo exclusivo para você."
        },
        {
          "q": "Quais formas de pagamento são aceitas?",
          "a": "Aceitamos pix e dinheiro. Pagamento em duas partes: 50% no pedido e 50% na retirada."
        },
        {
          "q": "Vocês entregam?",
          "a": "Fazemos entregas com taxa adicional dentro da região, mediante disponibilidade."
        }
      ]
    }
};
