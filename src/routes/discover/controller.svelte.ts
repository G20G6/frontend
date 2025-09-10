import moment from "moment";

const addToItinerary = (experience: any) => {
		//check if experience is already in itinerary
		if(itinerary.data.find((item: any) => item.id === experience.id)) return;
		//experience is not in the itinerary
		itinerary.data = [...itinerary.data, experience];
		//sort itinerary
		itinerary.sort();
		localStorage.setItem('itinerary', JSON.stringify(itinerary.get()));
	}


const removeFromItinerary = (index: number) => {
		itinerary.data = itinerary.data.filter((_, i) => i !== index);
		if(itinerary.size() === 0) {
			localStorage.removeItem('itinerary');
			return;
		}
		localStorage.setItem('itinerary', JSON.stringify(itinerary.get()));

	};
    

export let itinerary = $state({
    data: [],//cannot reassign, so i use this
	add: addToItinerary,
	remove: removeFromItinerary,
	get: function() {
		if (this.size() === 0) {
			itinerary.data = JSON.parse(localStorage.getItem('itinerary') || '[]');
		}
		return this.data;
	},
	size: function() {
		return this.data.length;
	},
	sort: function() {
		return this.data.sort((a, b) => {
			const dateA = new Date(a.date);
			const dateB = new Date(b.date);
			return dateA - dateB;
		});
	},
	clear: function() {
		this.data = [];
	},
	totalAmount: function() {
		return this.data.reduce((total, experience) => total + experience.price, 0);
	},
	totalDays: function() {
		const startDate = moment(this.data[0].date);
		const endDate = moment(this.data[this.size() - 1].date);
		const days = moment.duration(endDate.diff(startDate)).asDays() + 1;
		return days;
	}
	
});