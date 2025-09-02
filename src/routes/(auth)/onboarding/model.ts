export type OnboardingUser = {
		type: string;
		inputs: {
			name: string;
			value: string;
			type: string;
		}[];
	};

export const user_types = ['tourist', 'business', 'youth'];

export const onboardingUsers : OnboardingUser[] = [
    {
        type: 'tourist',
        inputs: [
            { name: 'Language', value: '', type: 'select' },
            { name: 'Interests', value: '', type: 'multi-select' }
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
                type: 'select'
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
                name: 'Interests',
                value: '',
                type: 'multi-select'
            },
            {
                name: 'Province',
                value: '',
                type: 'select'
            },
            {
                name: 'Suburb',
                value: '',
                type: 'text'
            }
        ]
    }
];