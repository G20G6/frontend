export const experiences = [
		{
			id: 1,
			title: 'Eco-Friendly Tours in Western Cape',
			category: 'Sustainability',
			province: 'Western Cape',
			date: '2025-06-01',
			price: 250
		},
		{
			id: 2,
			title: 'Green Accommodations in Eastern Cape',
			category: 'Sustainability',
			province: 'Eastern Cape',
			date: '2025-07-15',
			price: 300
		},
		{ 
			id: 3,
			title: 'Community Projects in Limpopo', 
			category: 'Sustainability', 
			province: 'Limpopo',
			date: '2025-08-01',
			price: 200 
		},
		{ 
			id: 4,
			title: 'Langa Cultural Festival', 
			category: 'Food & Drinks', 
			province: 'Western Cape',
			date: '2025-06-15',
			price: 150	 
		},
		{ 
			id: 5,
			title: 'Khayelitsha Dance Show', 
			category: 'Food & Drinks', 
			province: 'Western Cape',
			date: '2025-07-01',
			price: 200 
		},
		{ 
			id: 6,
			title: 'Gauteng Art Market', 
			category: 'Food & Drinks', 
			province: 'Gauteng',
			date: '2025-07-15',
			price: 250 
		},
		{ 
			id: 7,
			title: 'Langa Cultural Festival', 
			category: 'History & Culture', 
			province: 'Western Cape',
			date: '2025-08-01',
			price: 550 
		},
		{ 
			id: 8,
			title: 'Khayelitsha Dance Show', 
			category: 'History & Culture', 
			province: 'Western Cape',
			date: '2025-08-15',
			price: 800
		 },
		{ 
			id: 9,
			title: 'Gauteng Art Market', 
			category: 'History & Culture', 
			province: 'Gauteng',
			date: '2025-09-01',
			price: 2500 
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