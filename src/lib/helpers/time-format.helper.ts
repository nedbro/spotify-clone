export function getFormattedLength(seconds: number) {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const secondsLeft = Math.round(seconds % 60);

	return `${hours ? hours + ':' : ''}${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
}
