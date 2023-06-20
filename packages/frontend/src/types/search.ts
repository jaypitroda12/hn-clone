export interface SearchResponse {
  hits: Hit[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  exhaustiveNbHits: boolean;
  exhaustiveTypo: boolean;
  exhaustive: Exhaustive;
  query: string;
  params: string;
  processingTimeMS: number;
  processingTimingsMS: ProcessingTimingsMS;
  serverTimeMS: number;
}

interface Exhaustive {
  nbHits: boolean;
  typo: boolean;
}

export interface Hit {
  created_at: string;
  title: string;
  url: string | null;
  author: string;
  points: number;
  story_text: null | string;
  comment_text: null;
  num_comments: number;
  story_id: null;
  story_title: null;
  story_url: null;
  parent_id: null;
  created_at_i: number;
  _tags: string[];
  objectID: string;
  _highlightResult: HighlightResult;
}

interface HighlightResult {
  title: Author;
  url: Author;
  author: Author;
  story_text?: Author;
}

interface Author {
  value: string;
  matchLevel: MatchLevel;
  matchedWords: string[];
}

export enum MatchLevel {
  None = 'none',
}

interface ProcessingTimingsMS {
  afterFetch: AfterFetch;
  request: Request;
  total: number;
}

interface AfterFetch {
  total: number;
}

interface Request {
  roundTrip: number;
}
