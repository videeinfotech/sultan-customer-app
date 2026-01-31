
export interface Message {
  role: 'user' | 'model';
  content: string;
  image?: string;
  sources?: Array<{
    title: string;
    uri: string;
  }>;
}

export interface CollectionItem {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  price: string;
  tag?: string;
  carat?: string;
}

export type View = 'home' | 'studio' | 'concierge' | 'collection' | 'search';
