export interface UrlItem {
  path: string;
  withWsConnection?: boolean;
  children: UrlData;
}

export type UrlData = Record<string, UrlItem>;
