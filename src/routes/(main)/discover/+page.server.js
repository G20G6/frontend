import { pexels } from "$lib/utils/pexels";

const getVideos = async () => {
		const req = await pexels.videos.search({ query: 'township', per_page: 40 });
		return req;
	};

