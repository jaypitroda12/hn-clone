export interface ItemResponse {
  id: number;
  created_at: string;
  created_at_i: number;
  type: 'comment' | 'story';
  author: string;
  title: null | string;
  url: null;
  text: string;
  points: number | null;
  parent_id: number | null;
  story_id: number | null;
  children: ItemResponse[];
  options: unknown[];
}
