export type PlayableGroup = {
	name: string;
	type: PlayableGroupType;
	imageUrl: string;
	creator: string;
	lastPlayed: string;
	dateAdded: string;
};

export type PlayableGroupType = {
	name: string;
	value: 'album' | 'playlist' | 'podcast';
};

export const types: PlayableGroupType[] = [
	{ name: 'Playlist', value: 'playlist' },
	{ name: 'Album', value: 'album' },
	{ name: 'Podcasts & Shows', value: 'podcast' }
];
