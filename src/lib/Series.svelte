<script lang="ts">
	import type { PlayoffBracketSeries } from '../types';
	import TeamCard from '../lib/TeamCard.svelte';

	export let series: PlayoffBracketSeries;

	function getGridArea() {
		return {
			1: `r1-${series.displayOrderNumber}`,
			2: `csf-${series.displayOrderNumber}`,
			3: `cf-${series.displayOrderNumber}`,
			4: 'finals',
		}[series.roundNumber];
	}

	function getSeriesLabel() {
		return (
			{
				1: 'First Round',
				2: 'Conf. Semifinals',
				3: 'Conf. Finals',
				4: 'Finals',
			}[series.roundNumber] ?? ''
		);
	}
</script>

<div style={`grid-area: ${getGridArea()}`} class="relative self-center">
	<span class="absolute bottom-full text-xs uppercase font-medium text-gray-500 text-center w-full"
		>{getSeriesLabel()}</span
	>
	<div class="inline-flex flex-col w-full shadow-lg bg-gray-300 dark:bg-gray-700">
		{#if series.displayTopTeam === series.highSeedId}
			<TeamCard
				team={series.highSeedTricode}
				rank={series.highSeedRank}
				wins={series.highSeedSeriesWins}
				isFinals={getGridArea() === 'finals'}
				isTop
			/>
			<TeamCard
				team={series.lowSeedTricode}
				rank={series.lowSeedRank}
				wins={series.lowSeedSeriesWins}
				isFinals={getGridArea() === 'finals'}
			/>
		{:else}
			<TeamCard
				team={series.lowSeedTricode}
				rank={series.lowSeedRank}
				wins={series.lowSeedSeriesWins}
				isFinals={getGridArea() === 'finals'}
				isTop
			/>
			<TeamCard
				team={series.highSeedTricode}
				rank={series.highSeedRank}
				wins={series.highSeedSeriesWins}
				isFinals={getGridArea() === 'finals'}
			/>
		{/if}
	</div>
</div>

<style>
</style>
