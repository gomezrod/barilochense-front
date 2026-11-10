const API_BASE = 'https://api-beta.barilochense.com';

export interface HealthResponse {
  status: 'ok' | 'error';
  db: 'ok' | 'error';
  version: string;
  time: string;
}

export interface NavigationEntry {
  kind: 'collection' | 'legacyLink';
  label: string;
  slug?: string;
  href?: string;
}

export interface NavigationResponse {
  sections: NavigationEntry[];
  quickLinks: NavigationEntry[];
  navigation: NavigationEntry[];
  capabilities: {
    articles: boolean;
    events: boolean;
    pharmacies: boolean;
    venues: boolean;
    search: boolean;
  };
}

export interface ArticleImage {
  url: string;
  thumbUrl: string;
  alt: string | null;
}

export interface ArticleListItem {
  id: string;
  title: string;
  summary: string | null;
  publishedAt: string;
  image: ArticleImage;
  legacyUrl: string;
  url: string;
}

export interface ArticleListResponse {
  items: ArticleListItem[];
  nextCursor: string | null;
  collection: {
    slug: string;
    title: string;
    description: string;
  };
}

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { accept: 'application/json' },
  });
  if (!response.ok) {
    throw new Error(`API request failed (${response.status})`);
  }
  return response.json() as Promise<T>;
}

export async function getHealth(): Promise<HealthResponse> {
  return getJson<HealthResponse>('/v1/health');
}

export async function getNavigation(): Promise<NavigationResponse> {
  return getJson<NavigationResponse>('/v1/navigation');
}

export async function getTourismArticles(): Promise<ArticleListResponse> {
  return getJson<ArticleListResponse>('/v1/articles?collection=informacion-turistica&limit=20');
}
