export type PlayerState = {
	playing: boolean;
	shuffle: boolean;
	repeat: boolean;
	volume: number;
	positionMs: number;
	track?: {
		imageUrl: string;
		title: string;
        creator: string;
        durationMs: number;
	};
};
