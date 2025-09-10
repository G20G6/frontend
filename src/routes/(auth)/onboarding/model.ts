export type OnboardingUser = {
		type: string;
		inputs: {
			name: string;
			value: string;
			type: string;
            options?: {
                name: string;
                value: string;
                id?: string
            }[]
		}[];
	};

export const user_types = ['tourist', 'business', 'youth'];

export const onboardingUsers : OnboardingUser[] = [
    {
        type: 'tourist',
        inputs: [
            { 
                name: 'Interests', 
                value: '', 
                type: 'multi-select', 
                options: [
                    { name: "Guided Walking Tour", value: "walking_tour" },
                    { name: "Cultural & Heritage Experience", value: "cultural_heritage" },
                    { name: "Local Food & Culinary Tour", value: "culinary" },
                    { name: "Music & Dance Experience", value: "music_dance" },
                    { name: "Art & Craft Market Visit", value: "art_craft" },
                    { name: "Community Project Visit", value: "community_project" },
                    { name: "Home Visit & Storytelling", value: "home_visit" },
                    { name: "Shebeen (Local Tavern) Experience", value: "shebeen" },
                    { name: "Cycling Tour", value: "cycling_tour" },
                    { name: "Photography Tour", value: "photography" }
                ],

            }
        ]
    },
    {
        type: 'business',
        inputs: [
            {
                name: 'Company name',
                value: '',
                type: 'text'
            },
            {
                name: 'Company Type',
                value: '',
                type: 'select',
                options: [
                    { name: 'Sole Proprietorship', value: 'sole_proprietorship' },
                    { name: 'Close Corporation', value: 'close_corporation' },
                    { name: 'Pty Ltd', value: 'pty_ltd' },
                    { name: 'Co-Operative', value: 'cooperative' }
                ]
            },
            {
                name: 'Company description',
                value: '',
                type: 'text'
            },
            {
                name: 'Province',
                value: '',
                type: 'select',
                options: [
                    { name: 'Eastern Cape', value: 'eastern_cape' },
                    { name: 'Free State', value: 'free_state' },
                    { name: 'Gauteng', value: 'gauteng' },
                    { name: 'KwaZulu-Natal', value: 'kwazulu_natal' },
                    { name: 'Limpopo', value: 'limpopo' },
                    { name: 'Mpumalanga', value: 'mpumalanga' },
                    { name: 'Northern Cape', value: 'northern_cape' },
                    { name: 'North West', value: 'north_west' },
                    { name: 'Western Cape', value: 'western_cape' }
                ]
        },
            {
                name: 'Suburb',
                value: '',
                type: 'text'
            }
        ]
    },
    {
        type: 'youth',
        inputs: [
            {
                name: 'Program',
                value: '',
                type: 'select',
                options: [
                    {name: 'Tour Guide 12 Month Program', id: "tour-guide", value: "Tour Guide 12 Month Program"},
                    {name: 'Data Collector 12 Month Program',id: "data-collector", value: "Data Collector 12 Month Program"}
                ]
            },
            {
                name: 'Province',
                value: '',
                type: 'select',
                options: [
                    { name: 'Eastern Cape', value: 'eastern_cape' },
                    { name: 'Free State', value: 'free_state' },
                    { name: 'Gauteng', value: 'gauteng' },
                    { name: 'KwaZulu-Natal', value: 'kwazulu_natal' },
                    { name: 'Limpopo', value: 'limpopo' },
                    { name: 'Mpumalanga', value: 'mpumalanga' },
                    { name: 'Northern Cape', value: 'northern_cape' },
                    { name: 'North West', value: 'north_west' },
                    { name: 'Western Cape', value: 'western_cape' }
                ]
            },
            {
                name: 'Suburb',
                value: '',
                type: 'text'
            }
        ]
    }
];