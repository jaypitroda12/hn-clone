import { ItemResponse, SearchResponse } from '../types';

export type QueryType = 'tags' | 'query';
export enum Tags {
  FRONT_PAGE = 'front_page',
  SHOW_HN = 'show_hn',
  ASK_HN = 'ask_hn',
}

const HN_BASE_URL = 'https://hn.algolia.com/api/v1/';

export async function fetchPosts(
  type: QueryType = 'tags',
  value: string,
  page?: number
): Promise<SearchResponse> {
  const searchQuery = `${type}=${value}`;
  const response = await fetch(
    `${HN_BASE_URL}${
      value === 'show_hn' || value === 'ask_hn' ? 'search_by_date' : 'search'
    }?${searchQuery}${page ? `&page=${page}` : ''}`,
    { cache: 'no-store' }
  );
  if (!response.ok) throw new Error('Posts not found');
  return response.json();
}

export async function fetchItem(id: string): Promise<ItemResponse> {
  const response = await fetch(`${HN_BASE_URL}items/${id}`, {
    cache: 'no-store',
  });
  if (!response.ok) throw new Error('Post not found');
  return response.json();
}
