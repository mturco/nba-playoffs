import { formatISO, parseISO } from 'date-fns';
import type { PageLoad } from './$types';
import type { Game, PlayoffBracketData, PlayoffBracketSeries } from '../types';

const SEASON_YEAR = new Date().getFullYear() - 1;

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch(
		`https://stats.nba.com/stats/playoffbracket?LeagueID=00&SeasonYear=${SEASON_YEAR}&State=2`,
	);
	const data = (await res.json()) as PlayoffBracketData;
	const { seasonYear, playoffBracketSeries } = data.bracket;

	return {
		seasonYear,
		series: playoffBracketSeries,
		nextGames: getNextGames(playoffBracketSeries),
	};
};

function getNextGames(allSeries: PlayoffBracketSeries[]) {
	const nextGames: Game[] = [];
	for (const series of allSeries) {
		if (series.nextGameStatus) {
			const gameNumber = parseInt((series.nextGameNumber.match(/Game (\d)/) ?? [])[1] ?? '', 10);
			const highIsHome = [1, 2, 5, 7].includes(gameNumber);

			nextGames.push({
				id: series.nextGameId,
				number: gameNumber,
				numberText: series.nextGameNumber,
				statusText: series.nextGameStatusText,
				dateTimeUtc: series.nextGameDateTimeUTC,
				broadcaster: series.nextGameBroadcasterDisplay,
				highSeedTricode: series.highSeedTricode,
				lowSeedTricode: series.lowSeedTricode,
				homeTeam: highIsHome ? series.highSeedTricode : series.lowSeedTricode,
				awayTeam: highIsHome ? series.lowSeedTricode : series.highSeedTricode,
			});
		}
	}
	nextGames.sort((a, b) => parseISO(a.dateTimeUtc).getTime() - parseISO(b.dateTimeUtc).getTime());

	const gamesMap = new Map<string, Game[]>();
	for (const game of nextGames) {
		const iso = formatISO(parseISO(game.dateTimeUtc), { representation: 'date' });
		gamesMap.set(iso, [...(gamesMap.get(iso) ?? []), game]);
	}

	return gamesMap;
}
