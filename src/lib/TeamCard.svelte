<script lang="ts">
	export let team: string | null;
	export let rank: number;
	export let wins: number;
	export let round: number;
	export let conf: string;
	export let isTop = false;

	const seed = isTop ? 'high' : 'low';
</script>

<div
	class="container seed-{seed} wins-{wins} conf-{conf} round-{round} shadow-{team}-bg relative"
	style="--round: {round}"
>
	<div class="team flex-1 flex items-center h-full relative z-10">
		<span class="text-black/60 text-xs mr-2">{rank > 0 ? rank : ''}</span>
		<span class="team-name">{team ?? ''}</span>
		<span class="wins-dots">
			{#each new Array(wins) as win}•{/each}
		</span>
		<span class="wins-count">{wins > 0 ? wins : ''}</span>
	</div>
</div>

<style>
	.container {
		--line-color: rgb(209 213 219);
		--line-width: 2px;
		--dot-color: rgb(123, 126, 131);
	}

	.wins-4 {
		--line-width: 4px;
		--line-color: var(--tw-shadow-color);
		--dot-color: var(--tw-shadow-color);
	}

	.round-1.seed-high {
		padding-bottom: 3rem;
	}

	.round-2.seed-high {
		padding-bottom: 6rem;
	}

	.round-3.seed-high {
		padding-bottom: 14rem;
	}

	.round-4.seed-high {
		padding-bottom: 3rem;
	}

	.round-4 {
		width: var(--team-line-width);
	}

	.round-4.seed-low {
		margin-left: auto;
	}

	.team {
		height: 2rem;
		border: 0 solid var(--line-color);
		border-bottom-width: var(--line-width);
		padding: 0 0.625rem 0 0.625rem;
	}

	.team::before {
		content: '';
		display: block;
		position: absolute;
		height: calc((3rem * var(--round) + 2rem) / 2 + var(--line-width) / 2);
		border: 0 solid var(--line-color);
	}

	.seed-high .team::before {
		top: 100%;
	}

	.seed-low .team::before {
		bottom: 0;
		margin-bottom: calc(-1 * var(--line-width));
	}

	.conf-west .team::before {
		left: 100%;
		border-left-width: var(--line-width);
	}

	.conf-east .team::before {
		right: 100%;
		border-right-width: var(--line-width);
	}

	.conf-west.seed-low.round-3 .team::before {
		box-sizing: content-box;
		padding-top: 5rem;
	}

	.conf-east.seed-high.round-3 .team::before {
		box-sizing: content-box;
		padding-bottom: 5rem;
	}

	.round-4 .team::before {
		display: none;
	}

	.team-name {
		font-size: 0.875rem;
	}

	.wins-4 .team-name {
		font-weight: bold;
	}

	.wins-dots,
	.wins-count {
		color: var(--dot-color);
		margin-left: auto;
	}

	.wins-dots {
		display: none;
		font-size: 1.375rem;
		letter-spacing: -0.1em;
	}

	.wins-count {
		font-weight: bold;
		font-size: 0.8125rem;
	}

	@media (min-width: 45rem) {
		.team-name {
			font-size: 1rem;
		}

		.wins-count {
			font-size: 0.875rem;
		}
	}

	@media (min-width: 52rem) {
		.wins-count {
			display: none;
		}

		.wins-dots {
			display: block;
		}
	}

	@media (min-width: 64rem) {
		.team {
			padding: 0 1rem 0 0.75rem;
		}
	}
</style>
