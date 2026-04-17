export interface MenuItem {
  name: string
  description: string
  price: string
  image: string
  featured?: boolean
}

export interface MenuCategory {
  id: string
  label: string
  note?: string
  minPrice?: string
  items: MenuItem[]
}

export const categories: MenuCategory[] = [
  {
    id: 'hamburguesas',
    label: 'HAMBURGUESAS',
    minPrice: '16.000',
    items: [
      {
        name: 'Burger Lismaotica Criolla',
        description: 'Reconocimiento BOB Premium Burger Prime 2025 — la más original y creativa. Consultar disponibilidad.',
        price: '—',
        image: '/landing-page-lismaot/images/burgers/burger-lismaotica-criolla.png',
        featured: true,
      },
      {
        name: 'Doble Carne',
        description: 'Pan artesanal, doble carne, doble jamón, doble queso, tocineta, salsa de la casa y vegetales frescos',
        price: '27.000',
        image: '/landing-page-lismaot/images/burgers/burger-doble-carne.png',
      },
      {
        name: 'Lismaot',
        description: 'Pan artesanal, 160g de carne, jamón, queso doble crema, chorizo, salsa de la casa y vegetales frescos',
        price: '17.000',
        image: '/landing-page-lismaot/images/burgers/burger-lismaot.png',
      },
      {
        name: 'Ranchera',
        description: 'Pan artesanal, 160g de carne, jamón, queso, chorizo, tocineta, maicitos, salsa de la casa y vegetales',
        price: '19.000',
        image: '/landing-page-lismaot/images/burgers/burger-ranchera.png',
      },
      {
        name: 'Campesina',
        description: 'Pan artesanal, 160g de carne, jamón, queso doble crema, huevo frito, salsa de la casa y vegetales',
        price: '17.000',
        image: '/landing-page-lismaot/images/burgers/burger-campesina.png',
      },
      {
        name: 'Pollo Tocineta',
        description: 'Pan artesanal, 160g de pollo, jamón, queso doble crema, tocineta, salsa de la casa y vegetales',
        price: '16.000',
        image: '/landing-page-lismaot/images/burgers/burger-pollo-tocineta.png',
      },
      {
        name: 'Mixta',
        description: 'Pan artesanal, 160g de carne + 160g de pollo, jamón, queso, huevo frito, salsa y vegetales',
        price: '19.000',
        image: '/landing-page-lismaot/images/burgers/burger-mixta.png',
      },
      {
        name: 'Lisma Pork',
        description: 'Pan artesanal, 160g de carne, jamón, queso, tocineta, chicharrones, salsa y vegetales',
        price: '18.000',
        image: '/landing-page-lismaot/images/burgers/burger-lisma-pork.png',
      },
      {
        name: 'Lismaot Onion',
        description: 'Pan artesanal, 160g de carne, jamón, queso, aros de cebolla crujientes, salsa y vegetales',
        price: '17.000',
        image: '/landing-page-lismaot/images/burgers/burger-lismaot-onion.png',
      },
      {
        name: 'Piña Royale',
        description: 'Pan artesanal, 160g de carne, jamón, queso, piña caramelizada, tocineta, salsa y vegetales',
        price: '18.000',
        image: '/landing-page-lismaot/images/burgers/burger-pina-royale.png',
      },
    ],
  },
  {
    id: 'carnes',
    label: 'CARNES',
    minPrice: '23.000',
    items: [
      {
        name: 'Costillitas de Cerdo',
        description: 'Costillas en salsa BBQ, ensalada, chorizo y papa a la francesa',
        price: '27.000',
        image: '/landing-page-lismaot/images/carnes/costillitas-cerdo.png',
      },
      {
        name: 'Chuleta de Cerdo',
        description: 'Chuleta de cerdo, ensalada, chorizo y papa a la francesa',
        price: '26.000',
        image: '/landing-page-lismaot/images/carnes/chuleta-cerdo.png',
      },
      {
        name: 'Pechuga de Pollo',
        description: 'Asada o gratinada. Ensalada, chorizo y papa a la francesa',
        price: '23.000',
        image: '/landing-page-lismaot/images/carnes/pechuga-pollo-gratinada.png',
      },
      {
        name: 'Pechuga Marinera',
        description: 'Pollo en salsa marinera con mariscos, ensalada, chorizo y papa a la francesa',
        price: '26.000',
        image: '/landing-page-lismaot/images/carnes/pechuga-marinera.png',
      },
      {
        name: 'Pechuga Rellena',
        description: 'Pollo relleno de jamón y queso, ensalada, chorizo y papa a la francesa',
        price: '26.000',
        image: '/landing-page-lismaot/images/carnes/pechuga-rellena.png',
      },
    ],
  },
  {
    id: 'alitas',
    label: 'ALITAS',
    minPrice: '18.000',
    note: 'Sabores: BBQ · Miel Mostaza · Picantes · Teriyaki · Salsa de Queso',
    items: [
      {
        name: '5 Alitas',
        description: 'Elige tu sabor favorito',
        price: '18.000',
        image: '/landing-page-lismaot/images/alitas/alitas-bbq.png',
      },
      {
        name: '10 Alitas',
        description: 'Elige tu sabor favorito',
        price: '29.000',
        image: '/landing-page-lismaot/images/alitas/alitas-miel-mostaza.png',
      },
      {
        name: '15 Alitas',
        description: 'Elige tu sabor favorito',
        price: '38.000',
        image: '/landing-page-lismaot/images/alitas/alitas-picantes.png',
      },
      {
        name: '20 Alitas',
        description: 'Elige tu sabor favorito',
        price: '54.000',
        image: '/landing-page-lismaot/images/alitas/alitas-teriyaki.png',
      },
    ],
  },
  {
    id: 'perros',
    label: 'PERROS CALIENTES',
    minPrice: '12.000',
    items: [
      {
        name: 'Lismaot',
        description: 'Pan artesanal, salchicha americana, maíz, chorizo, pollo en salsa, tocineta, queso, papas chips, cebolla caramelizada',
        price: '16.000',
        image: '/landing-page-lismaot/images/perros/perro-lismaot.png',
      },
      {
        name: 'Mister Beicon',
        description: 'Salchicha envuelta en tocineta, maíz, pollo en salsa, queso, papas chips, cebolla caramelizada',
        price: '16.000',
        image: '/landing-page-lismaot/images/perros/perro-mister-beicon.png',
      },
      {
        name: 'Mixto',
        description: 'Salchicha, carne molida, pollo en salsa, jamón, queso, papas chips, cebolla caramelizada',
        price: '15.000',
        image: '/landing-page-lismaot/images/perros/perro-mixto.png',
      },
      {
        name: 'Sencillo',
        description: 'Salchicha americana, jamón, queso, papas chips, cebolla caramelizada',
        price: '12.000',
        image: '/landing-page-lismaot/images/perros/perro-sencillo.png',
      },
    ],
  },
  {
    id: 'pinchos',
    label: 'PINCHOS',
    minPrice: '13.000',
    items: [
      {
        name: 'Lismapincho',
        description: 'Carne de res, pollo, chorizo y chicharrones. Con papas a la francesa y salsa',
        price: '15.000',
        image: '/landing-page-lismaot/images/pinchos/lismapincho.png',
      },
      {
        name: 'Lisma Pig',
        description: 'Carne de cerdo, costillita y chicharrones. Con papas a la francesa y salsa',
        price: '16.000',
        image: '/landing-page-lismaot/images/pinchos/lisma-pig.png',
      },
      {
        name: 'Sencillo',
        description: 'Trozos de pollo y chorizo. Con papas a la francesa y salsa',
        price: '13.000',
        image: '/landing-page-lismaot/images/pinchos/pincho-sencillo.png',
      },
      {
        name: 'Salchipapa',
        description: 'Papas, salchicha, pollo desmechado, queso fundido, maicitos, tocineta y salsa',
        price: '17.000',
        image: '/landing-page-lismaot/images/pinchos/salchipapa.png',
      },
    ],
  },
  {
    id: 'picadas',
    label: 'PICADAS',
    minPrice: '17.000',
    note: 'Costillas · Carne de res · Pollo · Alitas · Chorizo · Papas · Maicitos · Tocineta · Salsa de queso',
    items: [
      {
        name: 'Familiar',
        description: 'Porción familiar abundante',
        price: '60.000',
        image: '/landing-page-lismaot/images/picadas/picada-familiar.png',
      },
      {
        name: 'Desgranadito',
        description: 'Maíz tierno, pollo, carne molida, tocineta, chorizo, jamón, queso fundido y papa a la francesa',
        price: '17.000',
        image: '/landing-page-lismaot/images/picadas/desgranadito.png',
      },
      {
        name: 'Lasaña Personal',
        description: 'Lasaña mixta de pollo, carne, jamón y queso',
        price: '13.000',
        image: '/landing-page-lismaot/images/picadas/lasana-mediana.png',
      },
      {
        name: 'Lasaña Mediana',
        description: 'Lasaña mixta de pollo, carne, jamón y queso. Con tajada de pan',
        price: '23.000',
        image: '/landing-page-lismaot/images/picadas/lasana-mediana.png',
      },
    ],
  },
  {
    id: 'pescados',
    label: 'PESCADOS',
    minPrice: '32.000',
    items: [
      {
        name: 'Cazuela de Mariscos',
        description: 'Mariscos, leche de coco y fondo de pescado. Con ensalada y papa a la francesa',
        price: '32.000',
        image: '/landing-page-lismaot/images/pescados/cazuela-mariscos.png',
      },
      {
        name: 'Robalo Marinero',
        description: 'Robalo en salsa marinera con mariscos. Con ensalada y papa a la francesa',
        price: '35.000',
        image: '/landing-page-lismaot/images/pescados/robalo-marinero.png',
      },
    ],
  },
  {
    id: 'mas',
    label: 'BURRITOS & MÁS',
    minPrice: '2.000',
    items: [
      {
        name: 'Standar',
        description: 'Pollo, tocineta, queso doble crema y salsa de la casa',
        price: '13.000',
        image: '/landing-page-lismaot/images/mas/tacos-standar.png',
      },
      {
        name: 'Papas a la Francesa',
        description: 'Adición',
        price: '4.000',
        image: '/landing-page-lismaot/images/mas/papas-francesa.png',
      },
      {
        name: 'Tocineta',
        description: 'Adición',
        price: '2.000',
        image: '/landing-page-lismaot/images/mas/tocineta.png',
      },
      {
        name: 'Queso Doble Crema',
        description: 'Adición',
        price: '2.000',
        image: '/landing-page-lismaot/images/mas/queso-doble-crema.png',
      },
      {
        name: 'Chorizo',
        description: 'Adición',
        price: '4.000',
        image: '/landing-page-lismaot/images/mas/chorizo-colombiano.png',
      },
      {
        name: 'Huevos de Codorniz',
        description: 'Adición',
        price: '3.000',
        image: '/landing-page-lismaot/images/mas/huevos-codorniz.png',
      },
      {
        name: 'Huevo Frito',
        description: 'Adición',
        price: '2.500',
        image: '/landing-page-lismaot/images/mas/huevo-frito.png',
      },
    ],
  },
  {
    id: 'bebidas',
    label: 'BEBIDAS',
    minPrice: '4.500',
    items: [
      {
        name: 'Jarra de Limonada',
        description: '',
        price: '13.000',
        image: '/landing-page-lismaot/images/bebidas/jarra-limonada.png',
      },
      {
        name: 'Naranjada',
        description: '',
        price: '5.000',
        image: '/landing-page-lismaot/images/bebidas/naranjada.png',
      },
      {
        name: 'Jugo de Mora',
        description: '',
        price: '4.500',
        image: '/landing-page-lismaot/images/bebidas/jugo-mora.png',
      },
      {
        name: 'Jugo de Mango',
        description: '',
        price: '4.500',
        image: '/landing-page-lismaot/images/bebidas/jugo-mango.png',
      },
      {
        name: 'Jugo de Lulo',
        description: '',
        price: '4.500',
        image: '/landing-page-lismaot/images/bebidas/jugo-lulo.png',
      },
      {
        name: 'Jugo de Maracuyá',
        description: '',
        price: '4.500',
        image: '/landing-page-lismaot/images/bebidas/jugo-maracuya.png',
      },
      {
        name: 'Frutos Rojos',
        description: '',
        price: '6.000',
        image: '/landing-page-lismaot/images/bebidas/jugo-frutos-rojos.png',
      },
      {
        name: 'Frutos Verdes',
        description: '',
        price: '6.500',
        image: '/landing-page-lismaot/images/bebidas/jugo-frutos-verdes.png',
      },
      {
        name: 'Jugo de Fresa',
        description: '',
        price: '4.500',
        image: '/landing-page-lismaot/images/bebidas/jugo-fresa.png',
      },
      {
        name: 'Mojito',
        description: '',
        price: '12.000',
        image: '/landing-page-lismaot/images/bebidas/mojito.png',
      },
      {
        name: 'Tequila Sunrice',
        description: '',
        price: '12.000',
        image: '/landing-page-lismaot/images/bebidas/tequila-sunrice.png',
      },
      {
        name: 'Piña Colada',
        description: '',
        price: '12.000',
        image: '/landing-page-lismaot/images/bebidas/pina-colada.png',
      },
      {
        name: 'Daikiri',
        description: '',
        price: '12.000',
        image: '/landing-page-lismaot/images/bebidas/daikiri.png',
      },
      {
        name: 'Moscow Mule',
        description: '',
        price: '12.000',
        image: '/landing-page-lismaot/images/bebidas/moscow-mule.png',
      },
    ],
  },
]
