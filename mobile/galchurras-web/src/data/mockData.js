import estanciaPrime from '../assets/images/acogues/estancia-prime.jpg';
import casaDoCorte from '../assets/images/acogues/casa-do-corte.jpg';
import boiNobre from '../assets/images/acogues/boi-nobre.jpg';

// Fotos do Pexels (uso gratuito) — https://www.pexels.com
const pexels = (id, w = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const KIT_IMAGES = {
  1: pexels(36782564), // grelha cheia de cortes simples
  2: pexels(28893439), // espeto de picanha brasileira
  3: pexels(37199360), // linguiças e carnes variadas
  4: pexels(36936380), // costela na grelha com fogo
};

export const SHOP_IMAGES = {
  1: estanciaPrime, // fachada preto/dourado "carnes nobres" — combina com o badge PREMIUM
  2: casaDoCorte,
  3: boiNobre,
};

export const currentUser = {
  id: 1,
  name: 'Teste',
  email: 'teste@galchurras.com',
  avatar: 'T',
  phone: '',
  cpf: '',
  rg: '',
  gender: '',
  location: { city: 'Vila Madalena', state: 'SP' },
};

export const categories = [
  { id: 'all', label: 'Todos' },
  { id: 'bovino', label: 'Bovino' },
  { id: 'misto', label: 'Misto' },
  { id: 'frango', label: 'Frango' },
  { id: 'suino', label: 'Suíno' },
];

export const kits = [
  {
    id: 1,
    name: 'Kit Churrasco Básico',
    category: 'misto',
    badge: 'O ESSENCIAL PARA COMEÇAR',
    serves: '4 a 6 pessoas',
    description: 'Cortes simples e saborosos para um churrasco descomplicado entre amigos.',
    image: KIT_IMAGES[1],
  },
  {
    id: 2,
    name: 'Kit Premium',
    category: 'bovino',
    badge: 'CORTES NOBRES MATURADOS',
    serves: '6 a 8 pessoas',
    description: 'Os melhores cortes bovinos maturados para um churrasco de primeira.',
    image: KIT_IMAGES[2],
  },
  {
    id: 3,
    name: 'Kit Família',
    category: 'misto',
    badge: 'PRA TODO MUNDO GOSTAR',
    serves: '6 a 10 pessoas',
    description: 'Variedade para agradar toda a família, do churrasco ao espeto.',
    image: KIT_IMAGES[3],
  },
  {
    id: 4,
    name: 'Costela no Fogo',
    category: 'bovino',
    badge: 'LENTO E PERFEITO',
    serves: '4 a 6 pessoas',
    description: 'Costela de chão com tempero artesanal, pronta para o fogo lento.',
    image: KIT_IMAGES[4],
  },
];

export const butcherShops = [
  {
    id: 1,
    name: 'Estância Prime',
    badge: 'PREMIUM',
    address: 'Rua das Brasas, 142 — Vila Madalena',
    rating: 4.9,
    reviews: 312,
    distance: '1.2 km',
    deliveryTime: '40 min',
    image: SHOP_IMAGES[1],
  },
  {
    id: 2,
    name: 'Casa do Corte',
    badge: null,
    address: 'Rua do Carvão, 56 — Perdizes',
    rating: 4.7,
    reviews: 198,
    distance: '2.5 km',
    deliveryTime: '60 min',
    image: SHOP_IMAGES[2],
  },
  {
    id: 3,
    name: 'Boi Nobre',
    badge: null,
    address: 'Av. das Carnes, 310 — Pinheiros',
    rating: 4.8,
    reviews: 245,
    distance: '3.1 km',
    deliveryTime: '50 min',
    image: SHOP_IMAGES[3],
  },
];

export const shopKits = {
  1: [
    {
      id: 'sk1',
      kitId: 2,
      shopId: 1,
      image: KIT_IMAGES[2],
      name: 'Kit Premium',
      badge: 'CORTES NOBRES MATURADOS',
      serves: '6 a 8 pessoas',
      price: 219.90,
      items: [
        { name: 'Picanha bovina maturada', qty: '1,5 kg' },
        { name: 'Linguiça toscana', qty: '500 g' },
        { name: 'Pão de alho artesanal', qty: '400 g' },
      ],
    },
    {
      id: 'sk2',
      kitId: 3,
      shopId: 1,
      image: KIT_IMAGES[3],
      name: 'Kit Família',
      badge: 'PRA TODO MUNDO GOSTAR',
      serves: '6 a 10 pessoas',
      price: 229.00,
      items: [
        { name: 'Fraldinha', qty: '1 kg' },
        { name: 'Coxa e sobrecoxa', qty: '1 kg' },
        { name: 'Linguiça mista', qty: '500 g' },
      ],
    },
    {
      id: 'sk3',
      kitId: 1,
      shopId: 1,
      image: KIT_IMAGES[1],
      name: 'Kit Churrasco Básico',
      badge: 'O ESSENCIAL',
      serves: '4 a 6 pessoas',
      price: 119.90,
      items: [
        { name: 'Fraldinha', qty: '1 kg' },
        { name: 'Linguiça toscana', qty: '500 g' },
      ],
    },
  ],
  2: [
    {
      id: 'sk4',
      kitId: 1,
      shopId: 2,
      image: KIT_IMAGES[1],
      name: 'Kit Churrasco Básico',
      badge: 'O ESSENCIAL',
      serves: '4 a 6 pessoas',
      price: 99.00,
      items: [
        { name: 'Patinho', qty: '1 kg' },
        { name: 'Linguiça toscana', qty: '500 g' },
      ],
    },
    {
      id: 'sk5',
      kitId: 4,
      shopId: 2,
      image: KIT_IMAGES[4],
      name: 'Costela no Fogo',
      badge: 'LENTO E PERFEITO',
      serves: '4 a 6 pessoas',
      price: 319.50,
      items: [
        { name: 'Costela bovina', qty: '2 kg' },
        { name: 'Tempero artesanal', qty: '200 g' },
      ],
    },
  ],
  3: [
    {
      id: 'sk6',
      kitId: 4,
      shopId: 3,
      image: KIT_IMAGES[4],
      name: 'Costela no Fogo',
      badge: 'LENTO E PERFEITO',
      serves: '4 a 6 pessoas',
      price: 319.50,
      items: [
        { name: 'Costela bovina', qty: '2 kg' },
        { name: 'Carvão premium', qty: '5 kg' },
      ],
    },
  ],
};

export const kitShopOffers = {
  1: [
    { shopId: 1, price: 119.90, deliveryTime: '40 min', distance: '1.2 km', items: [{ name: 'Fraldinha', qty: '1 kg' }, { name: 'Linguiça toscana', qty: '500 g' }] },
    { shopId: 2, price: 99.00, deliveryTime: '60 min', distance: '2.5 km', items: [{ name: 'Patinho', qty: '1 kg' }, { name: 'Linguiça toscana', qty: '500 g' }] },
  ],
  2: [
    { shopId: 1, price: 219.90, deliveryTime: '40 min', distance: '1.2 km', items: [{ name: 'Picanha bovina maturada', qty: '1,5 kg' }, { name: 'Linguiça toscana', qty: '500 g' }, { name: 'Pão de alho artesanal', qty: '400 g' }] },
  ],
  3: [
    { shopId: 1, price: 229.00, deliveryTime: '40 min', distance: '1.2 km', items: [{ name: 'Fraldinha', qty: '1 kg' }, { name: 'Coxa e sobrecoxa', qty: '1 kg' }, { name: 'Linguiça mista', qty: '500 g' }] },
  ],
  4: [
    { shopId: 2, price: 319.50, deliveryTime: '60 min', distance: '2.5 km', items: [{ name: 'Costela bovina', qty: '2 kg' }, { name: 'Tempero artesanal', qty: '200 g' }] },
    { shopId: 3, price: 319.50, deliveryTime: '50 min', distance: '3.1 km', items: [{ name: 'Costela bovina', qty: '2 kg' }, { name: 'Carvão premium', qty: '5 kg' }] },
  ],
};

export const shopItems = {
  1: [
    { id: 'i1-1', name: 'Fraldinha',           unit: '500 g',  price: 14.95 },
    { id: 'i1-2', name: 'Picanha extra',        unit: '500 g',  price: 39.90 },
    { id: 'i1-3', name: 'Linguiça artesanal',   unit: '500 g',  price: 13.90 },
    { id: 'i1-4', name: 'Pão de alho',          unit: '400 g',  price: 8.90  },
    { id: 'i1-5', name: 'Costela bovina',       unit: '1 kg',   price: 32.90 },
    { id: 'i1-6', name: 'Carvão premium',       unit: '5 kg',   price: 29.90 },
  ],
  2: [
    { id: 'i2-1', name: 'Patinho',              unit: '500 g',  price: 12.90 },
    { id: 'i2-2', name: 'Frango inteiro',       unit: '1 kg',   price: 18.90 },
    { id: 'i2-3', name: 'Linguiça caipira',     unit: '500 g',  price: 11.90 },
    { id: 'i2-4', name: 'Carvão',               unit: '3 kg',   price: 19.90 },
    { id: 'i2-5', name: 'Chimichurri',          unit: '200 g',  price: 15.90 },
  ],
  3: [
    { id: 'i3-1', name: 'Costela janela',       unit: '1 kg',   price: 35.90 },
    { id: 'i3-2', name: 'Maminha',              unit: '500 g',  price: 22.90 },
    { id: 'i3-3', name: 'Sal grosso',           unit: '1 kg',   price: 6.90  },
    { id: 'i3-4', name: 'Carvão vegetal',       unit: '5 kg',   price: 27.90 },
    { id: 'i3-5', name: 'Vinagrete',            unit: '300 ml', price: 9.90  },
  ],
};

export const addresses = [
  { id: 1, label: 'Casa', street: 'Rua das Flores, 48', complement: 'Apto 12 — Vila Madalena', default: true },
  { id: 2, label: 'Trabalho', street: 'Av. Paulista, 1578', complement: 'Sala 304 — Bela Vista', default: false },
];

export const paymentMethods = [
  { id: 'pix',   label: 'Pix',               sub: 'Aprovação imediata',  icon: 'pix' },
  { id: 'card',  label: 'Cartão de crédito',  sub: 'Visa •••• 4231',      icon: 'card' },
  { id: 'cash',  label: 'Dinheiro',           sub: 'Troco para R$ 300',   icon: 'cash' },
];

export const DELIVERY_FEE = 8.90;

export const favorites = {
  kitIds:  [1, 2],
  shopIds: [1, 3],
  itemIds: ['i1-2', 'i2-5', 'i3-1'],
};

export const WEEKLY_PROMO = {
  shopId:          1,
  kitId:           2,
  discountPercent: 15,
  label:           '15% OFF',
  description:     'Promoção da semana',
  image:           pexels(36936383, 1200), // cortes sobre brasas, parede de tijolo
};

export const orders = [
  {
    id: '1780952069366',
    kitName: 'Kit Premium',
    shopName: 'Estância Prime',
    shopId: 1,
    qty: 1,
    date: '08 de jun., 17:54',
    placedAt: '17:54',
    eta: '18:35 – 18:50',
    price: 219.90,
    status: 'preparing',
    address: 'R. Teste 12345',
    items: [
      { name: 'Picanha bovina maturada', qty: '1,5 kg' },
      { name: 'Linguiça toscana', qty: '500 g' },
      { name: 'Pão de alho artesanal', qty: '400 g' },
    ],
    image: null,
  },
];

export const CANCEL_REASONS = [
  'Mudei de ideia',
  'Pedi por engano',
  'Tempo de entrega muito longo',
  'Encontrei um preço melhor',
  'Problema com o endereço de entrega',
  'Outro motivo',
];
