<script>
	let {
		title,
		keywords = 'kasi khaya, tourism, discover places, experiences',
		desc,
		img = 'https://kasikhaya.vercel.app/images/logo.jpg',
		langs = ['en-ZA', 'en-US']
	} = $props();
</script>

<svelte:head>
	<title>{title} | KasiKhaya</title>
	<meta name="description" content={desc} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={desc} />
	<meta name="twitter:image" content={img} />
	<meta name="twitter:image:alt" content={title} />

	<meta name="keywords" content="{keywords}, township, kasi" />
	<meta name="language" content={langs.join(',')} />

	<meta property="og:title" content={title} />
	<meta property="og:description" content={desc} />
	<meta property="og:image" content={img} />

	<link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
</svelte:head>
