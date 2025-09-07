<script>
	import { page } from '$app/state';
	import { derived } from 'svelte/store';

	let {
		title,
		desc,
		img = 'https://kasikhaya.vercel.app/images/logo.jpg',
		langs = ['en-ZA', 'en-US']
	} = $props();

	const iso15924to31661 = (lang) => {
		if (lang === 'zh_hans') return 'zh-cn';
		if (lang === 'zh_hant') return 'zh-tw';
		return lang;
	};
</script>

<svelte:head>
	<title>{title} | KasiKhaya</title>
	<meta name="description" content={desc} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={desc} />
	<meta name="twitter:image" content={img} />
	<meta name="twitter:image:alt" content={title} />

	<meta property="og:title" content={title} />
	<meta property="og:description" content={desc} />
	<meta property="og:image" content={img} />

	<link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
	<link rel="canonical" href={page.url.pathname} />
</svelte:head>
