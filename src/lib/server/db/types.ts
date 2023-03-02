export type Track = {
  trackId: number;
  trackName: string;
  albumId: number;
  albumTitle: string;
  artistId: number;
  artistName: string;
  genre: string;
};

export type Album = {
  id: number;
  title: string;
  name: string;
};

export type AlbumTrack = {
  id: number;
  name: string;
  ms: number;
};

export type User = {
  username: string;
  password: string;
  roles: string;
};
