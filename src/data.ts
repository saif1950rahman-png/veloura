/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MenuItem, Feedback, Soundscape, Reservation } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'bev-1',
    name: 'The Velvet Gold Drip',
    description: 'Bespoke hand-pour of rare Panama Geisha, infused with slow-distilled Madagascan vanilla pod oil, cold aeration, and finished with shimmering edible 24k gold leaf.',
    price: 24,
    category: 'beverages',
    tags: ['Signature', 'Single Origin', 'Rare'],
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    isSignature: true,
    stats: {
      notes: 'Bergamot, Jasmine, White Peach',
      roast: 'Light-Medium',
      origin: 'Panama Estate (Jaramillo)'
    }
  },
  {
    id: 'bev-2',
    name: 'Smoked Rosemary Walnut Latte',
    description: 'Double shot of our house espresso, combined with roasted walnut milk, cold-pressed raw honeycomb, and smoked live at your table with a French oak and rosemary torch.',
    price: 18,
    category: 'beverages',
    tags: ['Interactive', 'Smoked', 'House Blend'],
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80',
    isSignature: true,
    stats: {
      notes: 'Caramelized Walnut, Honey, Cedarwood Smoke',
      roast: 'Medium',
      origin: 'Honduras & Ethiopia'
    }
  },
  {
    id: 'bev-3',
    name: 'Cognac-Casked Cold Brew',
    description: 'Single-origin Ethiopian cold brew, aged for 21 days inside charred French cognac casks, served over a crystal sphere with orange peel oils.',
    price: 21,
    category: 'beverages',
    tags: ['Aged', 'Cold Drip'],
    image: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?auto=format&fit=crop&w=800&q=80',
    isSignature: false,
    stats: {
      notes: 'Plum, Dark Chocolate, Brandy Warmth',
      roast: 'Dark',
      origin: 'Ethiopia Yirgacheffe'
    }
  },
  {
    id: 'bev-4',
    name: 'Kyoto Matcha Pistachio Atelier',
    description: 'Hand-whisked Kyoto Uji ceremonial grade matcha, organic macadamia nectar, crowned with a dense cold froth of roasted Sicilian pistachio distillate.',
    price: 19,
    category: 'beverages',
    tags: ['Ceremonial', 'Plant-Based'],
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
    isSignature: true,
    stats: {
      notes: 'Floral Umami, Rich Pistachio Cream',
      roast: 'Shade Grown',
      origin: 'Kyoto, Japan'
    }
  },
  {
    id: 'pat-1',
    name: 'Truffled Black Diamond Croissant',
    description: 'An 81-layer laminated French butter croissant, infused with organic charcoal cacao, filled with 72% dark Valrhona ganache and shaved Umbrian black winter truffles.',
    price: 28,
    category: 'patisserie',
    tags: ['Limited Craft', 'Luxury Savory-Sweet'],
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
    isSignature: true
  },
  {
    id: 'pat-2',
    name: 'Piedmont Nocciola Tartlet',
    description: 'Toasted Piedmont hazelnut praline, salted organic butter caramel, embedded inside a crisp chocolate sable frame and finished with gold dust swirls.',
    price: 18,
    category: 'patisserie',
    tags: ['Chef Special', 'Nutty'],
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    isSignature: false
  },
  {
    id: 'pat-3',
    name: 'Pistachio Rose Ispahan',
    description: 'Delicate Ispahan-style almond macaron, layered with fresh wild raspberries, organic Persian lychee gelée, and hand-whipped rose petal white chocolate cream.',
    price: 22,
    category: 'patisserie',
    tags: ['Gluten Free', 'Floral'],
    image: 'https://images.unsplash.com/photo-1558961309-fa0f154421c5?auto=format&fit=crop&w=800&q=80',
    isSignature: false
  },
  {
    id: 'del-1',
    name: 'Imperial Osetra Brioche Toast',
    description: 'Butter-toasted Japanese milk bread, layered with creamed quail egg yolk butter, organic micro-parsley, and crowned with 10g of chilled Caspian Sea Imperial Osetra Caviar.',
    price: 48,
    category: 'delicacies',
    tags: ['Prestige', 'Savory Premium'],
    image: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=800&q=80',
    isSignature: true
  },
  {
    id: 'del-2',
    name: 'Bespoke Wagyu Truffle Carpaccio Bar',
    description: 'Paper-thin slices of cold wood-smoked A5 Miyazaki Wagyu beef on artisanal spent-grain sourdough flatbread, paired with fresh shaved white truffle and aged parmesan foam.',
    price: 38,
    category: 'delicacies',
    tags: ['Savory Premium', 'Rare Origin'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    isSignature: false
  }
];

export const FEEDBACK_ITEMS: Feedback[] = [
  {
    id: 'feed-1',
    name: 'Lady Henrietta Cavendish',
    rating: 5,
    comment: 'An absolute masterpiece of sensory refinement. The Walnut Espresso lounge feels like a private members club in Mayfair. The Velvet Gold Drip was worth every bit of intrigue.',
    role: 'Editorial Director, Elite Travel & Living',
    avatarLetter: 'H',
    date: '2 Days ago'
  },
  {
    id: 'feed-2',
    name: 'Aron van de Berg',
    rating: 5,
    comment: 'The interior soundscape paired with the rich, deep tones of the smoked rosemary roast is unparalleled. This is high design meeting pure culinary art. Simply outstanding.',
    role: 'Principal, VDB Creative Agency Singapore',
    avatarLetter: 'A',
    date: '1 Week ago'
  },
  {
    id: 'feed-3',
    name: 'Sienna Sterling',
    rating: 5,
    comment: 'The reservation hostess system is flawless. Booking the Velvet Atelier booth feels exclusive, and walking into that bespoke jazz atmosphere made an unforgettable client dinner.',
    role: 'Private Equity General Partner',
    avatarLetter: 'S',
    date: '3 Weeks ago'
  }
];

export const SOUNDSCAPES: Soundscape[] = [
  {
    id: 'sound-1',
    title: 'Dawn in Milan',
    subtitle: 'Warm jazz vinyl, muted trumpet, slow-extraction hiss',
    tempo: 'Adagio',
    genre: 'Vintage Cafe Jazz',
    bpm: 58,
    isActive: true
  },
  {
    id: 'sound-2',
    title: 'Midnight in Mayfair',
    subtitle: 'Deep ambient resonance, warm analog synths, rain on glass',
    tempo: 'Lento',
    genre: 'Chamber Lo-Fi',
    bpm: 64,
    isActive: false
  },
  {
    id: 'sound-3',
    title: 'Tokyo Atelier Drizzle',
    subtitle: 'Bespoke acoustic piano, slow water garden drip, ambient wind',
    tempo: 'Andante',
    genre: 'Neo-Classical Minimalist',
    bpm: 50,
    isActive: false
  }
];

export const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 'res-4912',
    name: 'Lord Montgomery Davies',
    email: 'm.davies@houseoflords.uk',
    phone: '+44 7700 900077',
    guests: 4,
    date: '2026-05-29',
    time: '14:30',
    zone: 'velvet-atelier',
    specialRequests: 'Prefers table near the copper fireplace; celebrating a legacy merger.',
    status: 'confirmed',
    tableNumber: 'A1 (VIP)',
    createdAt: '2026-05-28T10:15:00Z'
  },
  {
    id: 'res-3810',
    name: 'Elena Rostova',
    email: 'elena@rostov.com',
    phone: '+1 (555) 304-4903',
    guests: 2,
    date: '2026-05-29',
    time: '16:00',
    zone: 'walnut-bar',
    specialRequests: 'Allergies: Roasted walnuts (request organic macadamia substitute).',
    status: 'seated',
    tableNumber: 'B4',
    createdAt: '2026-05-28T08:42:00Z'
  },
  {
    id: 'res-8822',
    name: 'Dr. Kenzo Tanaka',
    email: 'kenzo@tanakadesign.tokyo',
    phone: '+81 90-1234-5678',
    guests: 1,
    date: '2026-05-30',
    time: '10:00',
    zone: 'sunken-garden',
    specialRequests: 'Requires ultra-quiet corner with premium lighting for sketching.',
    status: 'confirmed',
    tableNumber: 'G2',
    createdAt: '2026-05-27T16:21:00Z'
  },
  {
    id: 'res-1033',
    name: 'Charlotte Vance',
    email: 'cv@vancepartners.com',
    phone: '+61 491 570 156',
    guests: 6,
    date: '2026-05-29',
    time: '19:30',
    zone: 'velvet-atelier',
    specialRequests: 'Vance Partners board celebratory brunch. Truffle croissants pre-ordered for 6.',
    status: 'pending',
    tableNumber: 'A3 (VIP)',
    createdAt: '2026-05-28T14:10:00Z'
  }
];
