import type { PlayableGroup } from '$lib/types/PlayableGroup';

export const getTestPlayableGroupData = (): PlayableGroup[] => {
	const imageUrl =
		'https://upload.wikimedia.org/wikipedia/en/a/a2/Interpol_-_El_Pintor_cover_art.jpg';

	// Examples
	const examples: PlayableGroup[] = [
		{
			name: 'Album 1',
			type: { name: 'Album', value: 'album' },
			imageUrl,
			creator: 'Artist A',
			lastPlayed: '2022-03-15',
			dateAdded: '2023-01-20'
		},
		{
			name: 'Playlist 1',
			type: { name: 'Playlist', value: 'playlist' },
			imageUrl,
			creator: 'Curator X',
			lastPlayed: '',
			dateAdded: '2023-02-10'
		},
		{
			name: 'Podcast Series 1',
			type:{ name: 'Podcasts & shows', value: 'podcast' },
			imageUrl,
			creator: 'Podcaster Y',
			lastPlayed: '2021-07-20',
			dateAdded: '2023-03-05'
		},
		{
			name: 'Album 2',
			type: { name: 'Album', value: 'album' },
			imageUrl,
			creator: 'Artist B',
			lastPlayed: '2022-09-21',
			dateAdded: '2023-04-12'
		},
		{
			name: 'Playlist 2',
			type: { name: 'Playlist', value: 'playlist' },
			imageUrl,
			creator: 'Curator Z',
			lastPlayed: '',
			dateAdded: '2023-05-30'
		},
		{
			name: 'Podcast Series 2',
			type:{ name: 'Podcasts & shows', value: 'podcast' },
			imageUrl,
			creator: 'Podcaster Q',
			lastPlayed: '2020-12-10',
			dateAdded: '2023-06-17'
		},
		{
			name: 'Album 3',
			type: { name: 'Album', value: 'album' },
			imageUrl,
			creator: 'Artist C',
			lastPlayed: '2021-11-12',
			dateAdded: '2023-07-08'
		},
		{
			name: 'Playlist 3',
			type: { name: 'Playlist', value: 'playlist' },
			imageUrl,
			creator: 'Curator M',
			lastPlayed: '',
			dateAdded: '2023-08-25'
		},
		{
			name: 'Podcast Series 3',
			type:{ name: 'Podcasts & shows', value: 'podcast' },
			imageUrl,
			creator: 'Podcaster R',
			lastPlayed: '2019-05-02',
			dateAdded: '2023-09-03'
		},
		{
			name: 'Album 4',
			type: { name: 'Album', value: 'album' },
			imageUrl,
			creator: 'Artist D',
			lastPlayed: '2020-07-05',
			dateAdded: '2023-10-19'
		},
        {
			name: 'Album 1',
			type: { name: 'Album', value: 'album' },
			imageUrl,
			creator: 'Artist A',
			lastPlayed: '2022-03-15',
			dateAdded: '2023-01-20'
		},
		{
			name: 'Playlist 1',
			type: { name: 'Playlist', value: 'playlist' },
			imageUrl,
			creator: 'Curator X',
			lastPlayed: '',
			dateAdded: '2023-02-10'
		},
	];

	return examples;
};
