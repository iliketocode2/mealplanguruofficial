export type Plan = {
    name: string;
    details: string;
    price: string;
    extra: string;
    tag: string;
}

export type Post = {
    title: string;
    date: string;
    content: string[];
    author: string;
    imageUrl: string;
    tags: string[];
    viewCount: number;
}
  
export type DatabasePost = Post & {
    id: string;
}

export interface DiningLocation {
    name: string;
    url: string;
    image: string;
    rating: number;
    address: string;
    description: string;
    payment: string;
    type: 'dining-hall' | 'retail' | 'other';
  }