<script lang="ts">
	import { format, isToday, parseISO } from 'date-fns';
	import type { Game } from '../types';

	export let games: Map<string, Game[]>;
</script>

<section>
	<h1 class="heading text-3xl text-center">Games</h1>

	{#each Array.from(games.entries()) as [date, gamesForDate]}
		<h2 class="text-gray-600 mb-2">
			{isToday(parseISO(date)) ? 'Today' : format(parseISO(date), 'EEE, MMMM d')}
		</h2>

		<ol class="mb-8 flex gap-4">
			{#each gamesForDate as game}
				<li class="game">
					<div class="header">
						{#if game.awayTeam}
							<div class="team-logo high-seed bg-{game.awayTeam}-bg">
								<img alt="{game.awayTeam} logo" src="/teams/{game.awayTeam}-bw.svg" />
							</div>
						{:else}
							<div class="team-logo high-seed bg-black/10" />
						{/if}
						{#if game.homeTeam}
							<div class="team-logo low-seed bg-{game.homeTeam}-bg">
								{#if game.homeTeam}
									<img alt="{game.awayTeam} logo" src="/teams/{game.homeTeam}-bw.svg" />
								{/if}
							</div>
						{:else}
							<div class="team-logo low-seed bg-black/10" />
						{/if}
					</div>
					<div class="details">
						<p>
							<span class="font-medium">{game.awayTeam || '???'}</span> @
							<span class="font-medium">{game.homeTeam || '???'}</span>
							— {game.numberText}
						</p>
						<p class="text-gray-600 text-sm mt-1">
							{#if game.statusText === 'TBD'}
								TBD
							{:else if game.broadcaster}
								{format(parseISO(game.dateTimeUtc), 'h:mm a')} on {game.broadcaster}
							{:else}
								{format(parseISO(game.dateTimeUtc), 'h:mm a')}
							{/if}
						</p>
					</div>
				</li>
			{/each}
		</ol>
	{/each}
</section>

<style>
	.heading {
		font-size: 2rem;
		line-height: 2rem;
		font-weight: 300;
		margin-bottom: 2rem;
	}

	.header {
		--overlap: 0.625rem;
		display: flex;
		height: 4rem;
		padding: var(--overlap);
		border-radius: 0.5rem 0.5rem 0 0;
		overflow: hidden;
	}

	.details {
		padding: 1rem;
		border: 2px solid rgb(209 213 219);
		border-top: 0;
		border-radius: 0 0 0.5rem 0.5rem;
	}

	.team-logo {
		flex: 1;
		margin: calc(var(--overlap) * -1);
	}

	.team-logo img {
		height: 100%;
		mix-blend-mode: lighten;
		opacity: 0.6;
		margin: 0 auto;
	}

	.high-seed {
		padding-right: var(--overlap);
		clip-path: polygon(0% 0%, 100% 0%, 75% 100%, 0% 100%);
	}

	.low-seed {
		padding-left: var(--overlap);
		clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%);
	}
</style>
