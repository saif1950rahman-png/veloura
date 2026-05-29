/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'beverages' | 'patisserie' | 'delicacies';
  tags: string[];
  image: string;
  isSignature: boolean;
  stats?: {
    notes: string;
    roast?: string;
    origin?: string;
  };
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  zone: 'velvet-atelier' | 'walnut-bar' | 'sunken-garden';
  specialRequests?: string;
  status: 'confirmed' | 'pending' | 'seated' | 'completed';
  tableNumber: string;
  createdAt: string;
}

export interface Feedback {
  id: string;
  name: string;
  rating: number;
  comment: string;
  role: string;
  avatarLetter: string;
  date: string;
}

export interface Soundscape {
  id: string;
  title: string;
  subtitle: string;
  tempo: string;
  genre: string;
  bpm: number;
  isActive: boolean;
}

export type ActiveTab = 'home' | 'menu' | 'reservation' | 'dashboard' | 'atelier';
