<div><slot /></div>

<style>
	div {
		--team-line-width: 5rem;
		--conf-gap: 1rem;

		display: grid;
		grid-template-columns:
			repeat(3, var(--team-line-width)) calc(var(--team-line-width) + var(--conf-gap))
			repeat(3, var(--team-line-width));
		grid-template-rows: repeat(4, 6rem);
		grid-template-areas:
			'r1-0  csf-0 .      .      .      csf-2 r1-4'
			'r1-1  csf-0 cf-0   finals cf-1   csf-2 r1-5'
			'r1-2  csf-1 cf-0   finals cf-1   csf-3 r1-6'
			'r1-3  csf-1 .      .      .      csf-3 r1-7';
		gap: 2rem 0;
	}

	@media (min-width: 45rem) {
		div {
			--team-line-width: 6rem;
		}
	}

	@media (min-width: 52rem) {
		div {
			--team-line-width: 7rem;
		}
	}

	@media (min-width: 56rem) {
		div {
			--team-line-width: 7rem;
			--conf-gap: 3rem;
		}
	}

	@media (min-width: 64rem) {
		div {
			--team-line-width: 8rem;
			--conf-gap: 4rem;
		}
	}
</style>
