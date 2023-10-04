export type PlayableGroup = {
	id: string;
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

export const PlaylistType: PlayableGroupType = { name: 'Playlist', value: 'playlist' };
export const AlbumType: PlayableGroupType = { name: 'Album', value: 'album' };
export const PodcastType: PlayableGroupType = { name: 'Podcasts & Shows', value: 'podcast' };

export const types: PlayableGroupType[] = [PlaylistType, AlbumType, PodcastType];
