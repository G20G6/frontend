<script>
	import {
		Card,
		Button,
		Badge,
		Heading,
		P,
		TabItem,
		Tabs,
		Modal,
		Input,
		Label,
		Select,
		Listgroup,
		ListgroupItem
	} from 'flowbite-svelte';
	import { Calendar, Building, PlusCircle, Trash2 } from '@lucide/svelte';
	import { dashboardState } from '../../data/controller.svelte';

	let userRole = dashboardState.user_type || 'tour_guide'; // 'tour_guide' or 'data_collector'

	let tourTasks = $state([
		{ id: 1, title: 'Soweto Tour', date: '2024-01-20', status: 'pending' },
		{ id: 2, title: 'Alexandra Heritage Walk', date: '2024-01-22', status: 'completed' }
	]);

	let dataCollectionTasks = $state([
		{ id: 1, business: "Mama's Kitchen", type: 'Restaurant', status: 'pending' },
		{ id: 2, business: 'Local Craft Shop', type: 'Retail', status: 'completed' }
	]);

	let showTourModal = $state(false);
	let showDataModal = $state(false);

	let newTour = $state({
		title: '',
		date: new Date().toISOString().split('T')[0],
		status: 'pending'
	});

	let newData = $state({
		business: '',
		type: 'Restaurant',
		status: 'pending'
	});

	function addTour() {
		if (newTour.title) {
			tourTasks = [...tourTasks, { ...newTour, id: Date.now() }];
			newTour = { title: '', date: new Date().toISOString().split('T')[0], status: 'pending' };
			showTourModal = false;
		}
	}

	function addData() {
		if (newData.business) {
			dataCollectionTasks = [...dataCollectionTasks, { ...newData, id: Date.now() }];
			newData = { business: '', type: 'Restaurant', status: 'pending' };
			showDataModal = false;
		}
	}

	function deleteTour(id) {
		tourTasks = tourTasks.filter((task) => task.id !== id);
	}

	function deleteData(id) {
		dataCollectionTasks = dataCollectionTasks.filter((task) => task.id !== id);
	}

	function toggleTaskStatus(id, type) {
		if (type === 'tour') {
			tourTasks = tourTasks.map((task) =>
				task.id === id
					? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
					: task
			);
		} else {
			dataCollectionTasks = dataCollectionTasks.map((task) =>
				task.id === id
					? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
					: task
			);
		}
	}
</script>

<div class="container mx-auto w-full p-6">
	<Heading tag="h1" class="mb-6 text-3xl">Youth Dashboard</Heading>

	<div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
		<Card class="p-4 text-center">
			<Heading tag="h3" class="text-lg">Role</Heading>
			<P class="text-xl font-bold text-primary-600"
				>{userRole === 'tour_guide' ? 'Tour Guide' : 'Data Collector'}</P
			>
		</Card>
		<Card class="p-4 text-center">
			<Heading tag="h3" class="text-lg">Active Tasks</Heading>
			<P class="text-xl font-bold text-primary-600">
				{userRole === 'tour_guide'
					? tourTasks.filter((t) => t.status === 'pending').length
					: dataCollectionTasks.filter((t) => t.status === 'pending').length}
			</P>
		</Card>
		<Card class="p-4 text-center">
			<Heading tag="h3" class="text-lg">Completed Tasks</Heading>
			<P class="text-xl font-bold text-primary-600">
				{userRole === 'tour_guide'
					? tourTasks.filter((t) => t.status === 'completed').length
					: dataCollectionTasks.filter((t) => t.status === 'completed').length}
			</P>
		</Card>
	</div>

	<Tabs style="pill" contentClass="mt-4">
		<TabItem open title="Overview">
			<Card padding="xl" class="p-4">
				{#if userRole === 'tour_guide'}
					<div class="space-y-6 p-4">
						<div class="flex items-center justify-between">
							<Heading tag="h2" class="text-2xl">Your Tour Assignments</Heading>
							<Button color="green" onclick={() => (showTourModal = true)}>
								<PlusCircle class="mr-2 h-5 w-5" />
								New Tour
							</Button>
						</div>
						<Modal title="Create New Tour" bind:open={showTourModal} size="sm">
							<form onsubmit={addTour} class="space-y-4">
								<div>
									<Label for="tour-title" class="mb-2">Tour Title</Label>
									<Input
										id="tour-title"
										placeholder="Tour Title"
										bind:value={newTour.title}
										required
									/>
								</div>
								<div>
									<Label for="tour-date" class="mb-2">Date</Label>
									<Input id="tour-date" type="date" bind:value={newTour.date} />
								</div>
								<Button type="submit" color="green" class="w-full">Create Tour</Button>
							</form>
						</Modal>
						{#if tourTasks.length === 0}
							<P class="text-gray-500">No tours assigned yet.</P>
						{:else}
							<Listgroup active class="w-full">
								{#each tourTasks as task}
									<ListgroupItem
										class="flex items-center justify-between"
										onclick={() => toggleTaskStatus(task.id, 'tour')}
									>
										<div class="flex items-center gap-2">
											<Calendar class="h-5 w-5" />
											<div>
												<P class="font-medium">{task.title}</P>
												<P class="text-sm text-gray-500">{task.date}</P>
											</div>
										</div>
										<div class="flex items-center gap-2">
											<Badge color={task.status === 'completed' ? 'green' : 'yellow'}>
												{task.status}
											</Badge>
											<Button color="red" size="xs" onclick={() => deleteTour(task.id)}>
												<Trash2 class="h-4 w-4" />
											</Button>
										</div>
									</ListgroupItem>
								{/each}
							</Listgroup>
						{/if}
					</div>
				{:else}
					<div class="w-full space-y-6">
						<div class="flex w-full items-center justify-between">
							<Heading tag="h2" class="text-2xl">Business Data Collection Tasks</Heading>
							<Button color="green" size="xs" onclick={() => (showDataModal = true)}>
								<PlusCircle class="mr-2 h-5 w-5" />
								New Task
							</Button>
						</div>
						<Modal title="Add Business Data" bind:open={showDataModal} size="sm">
							<form onsubmit={addData} class="space-y-4">
								<div>
									<Label for="business-name" class="mb-2">Business Name</Label>
									<Input
										id="business-name"
										placeholder="Business Name"
										bind:value={newData.business}
										required
									/>
								</div>
								<div>
									<Label for="business-type" class="mb-2">Type</Label>
									<Select id="business-type" bind:value={newData.type}>
										<option value="Restaurant">Restaurant</option>
										<option value="Retail">Retail</option>
										<option value="Service">Service</option>
										<option value="Other">Other</option>
									</Select>
								</div>
								<Button type="submit" color="green" class="w-full">Add Data</Button>
							</form>
						</Modal>
						{#if dataCollectionTasks.length === 0}
							<P class="text-gray-500">No data collection tasks assigned yet.</P>
						{:else}
							<Listgroup active class="w-full">
								{#each dataCollectionTasks as task}
									<ListgroupItem
										class="flex items-center justify-between"
										onclick={() => toggleTaskStatus(task.id, 'data')}
									>
										<div class="flex items-center gap-2">
											<Building class="h-5 w-5" />
											<div>
												<P class="font-medium">{task.business}</P>
												<P class="text-sm text-gray-500">{task.type}</P>
											</div>
										</div>
										<div class="flex items-center gap-2">
											<Badge color={task.status === 'completed' ? 'green' : 'yellow'}>
												{task.status}
											</Badge>
											<Button color="red" size="xs" onclick={() => deleteData(task.id)}>
												<Trash2 class="h-4 w-4" />
											</Button>
										</div>
									</ListgroupItem>
								{/each}
							</Listgroup>
						{/if}
					</div>
				{/if}
			</Card>
		</TabItem>

		<TabItem title="Profile">
			<Card padding="xl" class="p-4">
				<Heading tag="h2" class="mb-4">Your Profile</Heading>
				<div class="space-y-4">
					<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
						<div>
							<Label for="name" class="mb-2">Name</Label>
							<Input id="name" placeholder="Your Name" />
						</div>
						<div>
							<Label for="email" class="mb-2">Email</Label>
							<Input id="email" type="email" placeholder="Your Email" />
						</div>
					</div>
					<Button color="green">Update Profile</Button>
				</div>
			</Card>
		</TabItem>

		<TabItem title="Training">
			<Card padding="xl" class="p-4">
				<Heading tag="h2" class="mb-4">Training Resources</Heading>
				<Listgroup active class="w-full">
					<ListgroupItem class="flex items-center justify-between">
						<P class="font-medium">Tour Guide Certification</P>
						<Badge color="blue">In Progress</Badge>
					</ListgroupItem>
					<ListgroupItem class="flex items-center justify-between">
						<P class="font-medium">Data Collection Basics</P>
						<Badge color="green">Completed</Badge>
					</ListgroupItem>
				</Listgroup>
				<Button color="light" class="mt-4">View All Training Materials</Button>
			</Card>
		</TabItem>
	</Tabs>
</div>
