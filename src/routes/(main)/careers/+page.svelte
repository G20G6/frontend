<script lang="ts">
	import { Accordion, AccordionItem, Button } from 'flowbite-svelte';
	import { ChevronDown } from '@lucide/svelte';
	import { goto } from '$app/navigation';
	import Seo from '$lib/ui/SEO.svelte';

	const programs = [
		{
			title: '12-Month Tour Guide Training Program',
			id: 'tour-guide',
			overview:
				'Embark on a transformative 12-month journey to become a tour guide with Kasi Khaya! This program is for those with no experience, focusing on South Africa’s township and rural cultures. No qualifications needed—just a love for storytelling.',
			learning: [
				'South African history and culture',
				'Communication skills',
				'Safety protocols',
				'Route planning',
				'Customer service'
			],
			requirements: [
				'Enthusiasm for travel',
				'Good interpersonal skills',
				'Basic literacy',
				'Flexible hours',
				'Valid South African ID'
			],
			careerPath: 'Lead tours, work with operators, or start your own business.'
		},
		{
			title: '12-Month Data Collectors Program',
			id: 'data-collector',
			overview:
				'Join our 12-month program to map registered places and businesses in South Africa. For semi-skilled individuals with some experience, this trains you in data management for tourism.',
			learning: [
				'Data collection techniques',
				'Business operations',
				'Data analysis',
				'Collaboration',
				'Mapping software'
			],
			requirements: [
				'1-2 years experience',
				'Basic computer skills',
				'Attention to detail',
				'Driver’s license (preferred)',
				'Valid South African ID'
			],
			responsibilities: [
				'Collect data on places/businesses',
				'Verify details on-site',
				'Update database',
				'Collaborate with stakeholders',
				'Report inconsistencies'
			],
			careerPath: 'Advance to data analyst or tourism coordinator roles.'
		}
	];

	const handleRegister = (career: string) => {
		localStorage.setItem('career', career);
		goto('/signup');
	};
</script>

<Seo title="Careers" desc="Careers at Kasi Khaya" langs={['en-ZA', 'en-US']} />

<section class="flex flex-col items-center justify-center py-8">
	<div class="container mx-auto px-4 lg:w-2/3">
		<h1 class="mb-8 text-center text-4xl font-bold text-primary-800">Careers at Kasi Khaya</h1>
		<p class="mb-12 text-center text-neutral-600">
			Join us to turn your passion for travel and community into a career in South Africa’s tourism
			sector!
		</p>
		<h2>Available careers</h2>
		<Accordion flush>
			{#each programs as program, index}
				<AccordionItem class=" bg-neutral-50 p-2">
					{#snippet header()}
						<div class="flex items-center gap-2">
							{program.title}
						</div>
					{/snippet}
					<div>
						<h3 class="mb-2 text-lg font-medium text-secondary-600">Overview</h3>
						<p class="mb-4 text-neutral-600">{program.overview}</p>

						<h3 class="mb-2 text-lg font-medium text-secondary-600">What You’ll Learn</h3>
						<ul class="mb-4 list-inside list-disc text-neutral-600">
							{#each program.learning as item}
								<li>{item}</li>
							{/each}
						</ul>

						<h3 class="mb-2 text-lg font-medium text-secondary-600">Requirements</h3>
						<ul class="mb-4 list-inside list-disc text-neutral-600">
							{#each program.requirements as item}
								<li>{item}</li>
							{/each}
						</ul>

						{#if program.responsibilities}
							<h3 class="mb-2 text-lg font-medium text-secondary-600">Responsibilities</h3>
							<ul class="mb-4 list-inside list-disc text-neutral-600">
								{#each program.responsibilities as item}
									<li>{item}</li>
								{/each}
							</ul>
						{/if}

						<h3 class="mb-2 text-lg font-medium text-secondary-600">Career Path</h3>
						<p class="mb-4 text-neutral-600">{program.careerPath}</p>

						<Button
							onclick={() => handleRegister(program.id)}
							color="primary"
							class="bg-primary-500 hover:bg-primary-600"
						>
							Register Now
						</Button>
					</div>
				</AccordionItem>
			{/each}
		</Accordion>

		<div class="mt-8 text-center">
			<p class="text-neutral-600">
				Apply at <a href="mailto:careers@kasikhaya.com" class="text-primary-500"
					>careers@kasikhaya.com</a
				> with your resume. Starts January and July.
			</p>
			<p class="mt-2 text-neutral-600">
				Why Kasi Khaya? Dynamic work, skill growth, and cultural celebration!
			</p>
		</div>
	</div>
</section>
