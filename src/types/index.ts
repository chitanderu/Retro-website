export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  content: string;
}

export interface FriendLink {
  name: string;
  url: string;
  avatar?: string;
  description: string;
}

export interface PlaylistTrack {
  title: string;
  artist: string;
  src: string;
}

export interface GalleryItem {
  src: string;
  alt: string;
  title?: string;
  date?: string;
}
