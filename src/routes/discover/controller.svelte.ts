export const addToItinerary = (title: string, province: string) => {
		itinerary.data = [...itinerary.data, { title, province }];
	}


export const removeFromItinerary = (index: number) => {
		itinerary.data = itinerary.data.filter((_, i) => i !== index);
	};
    

export let itinerary = $state({
    data: [],//cannot reassign, so i use this
});