export interface User {
  type: 'tourist' | 'business' | 'youth';
  page: string;
  sidebarItems: Array<{ name: string; href: string }>;
  headerItems: Array<{ name: string; href: string }>;
}

export const dashboardUsers: User[] = [
  {
    type: 'tourist',
    page: 'Welcome, Tourist! Explore your Cape Town adventure.',
    sidebarItems: [
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Profile', href: '/dashboard/profile' },
      { name: 'Itineraries', href: '/dashboard/itineraries' }
    ],
    headerItems: [
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Profile', href: '/dashboard/profile' }
    ]
  },
  {
    type: 'business',
    page: 'Welcome, Business Owner! Manage your listings.',
    sidebarItems: [
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Listings', href: '/dashboard/listings' },
      { name: 'Analytics', href: '/dashboard/analytics' }
    ],
    headerItems: [
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Listings', href: '/dashboard/listings' }
    ]
  },
  {
    type: 'youth',
    page: 'Welcome, Youth! Oversee platform operations.',
    sidebarItems: [
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Users', href: '/dashboard/users' },
      { name: 'Reports', href: '/dashboard/reports' }
    ],
    headerItems: [
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Users', href: '/dashboard/users' }
    ]
  }
];

// Mock itinerary for tourists (could be fetched from Supabase)
export const mockItinerary: Array<{
  type: 'accommodation' | 'activity';
  name: string;
  location?: string;
  price: number;
  description: string;
}> = [
  {
    type: 'accommodation',
    name: 'Langa Guesthouse',
    location: 'Cape Town, Langa',
    price: 450,
    description: 'Cozy guesthouse with cultural tours and local dining.'
  },
  {
    type: 'activity',
    name: 'Langa Cultural Tour',
    price: 200,
    description: 'Guided tour exploring Langa’s history and heritage.'
  },
  {
    type: 'activity',
    name: 'Umqombothi Cooking Class',
    price: 150,
    description: 'Learn to make traditional sorghum beer with locals.'
  }
];