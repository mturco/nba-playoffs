<script lang="ts">
	import type { PlayoffBracketSeries } from '../types';
	import TeamCard from '../lib/TeamCard.svelte';

	export let series: PlayoffBracketSeries;

	const conf = series.seriesConference.toLowerCase().replace(/\s/g, '-');
	const match = { conf, round: series.roundNumber };
	const highTeam = {
		...match,
		team: series.highSeedTricode,
		rank: series.highSeedRank,
		wins: series.highSeedSeriesWins,
	};
	const lowTeam = {
		...match,
		team: series.lowSeedTricode,
		rank: series.lowSeedRank,
		wins: series.lowSeedSeriesWins,
	};

	function getGridArea() {
		return {
			1: `r1-${series.displayOrderNumber}`,
			2: `csf-${series.displayOrderNumber}`,
			3: `cf-${series.displayOrderNumber}`,
			4: 'finals',
		}[series.roundNumber];
	}
</script>

<div style={`grid-area: ${getGridArea()}`} class="relative self-center">
	<div class="inline-flex flex-col w-full">
		{#if series.displayTopTeam === series.highSeedId}
			<TeamCard {...highTeam} isTop />
			<TeamCard {...lowTeam} />
		{:else}
			<TeamCard {...lowTeam} isTop />
			<TeamCard {...highTeam} />
		{/if}
	</div>
</div>

<style>
</style>
