<script lang="ts">
	import type { PageData } from './$types';
	import Bracket from '../lib/Bracket.svelte';
	import Series from '../lib/Series.svelte';
	import Games from '$lib/Games.svelte';

	export let data: PageData;

	const year = parseInt(data.seasonYear, 10) + 1;

	if (typeof window !== 'undefined') {
		const viewport = document.querySelector('[name="viewport"]');
		const initialWidth = parseInt(viewport?.getAttribute('content')?.split('=')[1] ?? '', 10);

		function adjustViewport() {
			if (window.screen.width > initialWidth) {
				viewport?.setAttribute('content', 'width=device-width');
			} else {
				viewport?.setAttribute('content', `width=${initialWidth}`);
			}
		}

		window.visualViewport?.addEventListener('resize', adjustViewport);
	}
</script>

<svelte:head>
	<title>NBA Playoffs</title>
</svelte:head>

<main class="p-4 flex flex-col items-center">
	<h1 class="mt-8 -mb-4 font-light text-center z-10">{year}<br />NBA Playoffs</h1>

	<Bracket>
		{#each data.series as series}
			<Series {series} />
		{/each}
	</Bracket>

	<div class="games">
		<Games games={data.nextGames} />
	</div>
</main>

<style>
	h1 {
		font-family: 'Barlow Semi Condensed', sans-serif;
		font-size: 2.5rem;
		line-height: 1;
	}

	.games {
		margin-top: 5rem;
	}

	@media (min-width: 52rem) {
		h1 {
			font-size: 3.25rem;
		}

		.games {
			margin-top: 8rem;
		}
	}

	@media (min-width: 64rem) {
		h1 {
			font-size: 3.75rem;
		}

		.games {
			margin-top: 10rem;
		}
	}
</style>
