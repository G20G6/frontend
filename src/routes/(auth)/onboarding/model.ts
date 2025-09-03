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
                name: 'Language', 
                value: '',
                type: 'select', 
                options: [
                    {name: 'Tour Guide 12 Month Program', value: "Tour Guide 12 Month Program"},
                    {name: 'Data Collector 12 Month Program', value: "Data Collector 12 Month Program"}
                ]
            },
            { 
                name: 'Interests', 
                value: '', 
                type: 'multi-select', 
                options: [
                    {name: 'Tour Guide 12 Month Program', value: "Tour Guide 12 Month Program"},
                    {name: 'Data Collector 12 Month Program', value: "Data Collector 12 Month Program"}
                ]
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
                name: 'Company type',
                value: '',
                type: 'text'
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
                    {name: 'Tour Guide 12 Month Program', value: "Tour Guide 12 Month Program"},
                    {name: 'Data Collector 12 Month Program', value: "Data Collector 12 Month Program"}
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
                name: 'Interests',
                value: '',
                type: 'multi-select',
                options: [
                    {name: 'Tour Guide 12 Month Program', value: "Tour Guide 12 Month Program"},
                    {name: 'Data Collector 12 Month Program', value: "Data Collector 12 Month Program"}
                ]
            },
            {
                name: 'Province',
                value: '',
                type: 'select',
                options: [
                    {name: 'Tour Guide 12 Month Program', value: "Tour Guide 12 Month Program"},
                    {name: 'Data Collector 12 Month Program', value: "Data Collector 12 Month Program"}
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