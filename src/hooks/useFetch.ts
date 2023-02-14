import { useState } from "react";

export const ny_times_all_articles_url = `https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=${process.env.REACT_APP_NYT_API_KEY}`;

interface IRelatedUrls {
  suggested_link_text: string;
  url: string;
}

interface IMultimedia {
  url: string;
  format: string;
  height: number;
  width: number;
  type: string;
  subtype: string;
  caption: string;
  copyright: string;
}

interface IArticle {
  section: string;
  subsection: string;
  title: string;
  abstract: string;
  uri: string;
  url: string;
  short_url: string;
  byline: string;
  thumbnail_standard: string;
  item_type: string;
  source: string;
  updated_date: string;
  created_date: string;
  published_date: string;
  material_type_facet: string;
  kicker: string;
  headline: string;
  des_facet: string;
  org_facet: string;
  per_facet: string[];
  geo_facet: string[];
  blog_name: string;
  related_urls: IRelatedUrls[];
  multimedia: IMultimedia[];
}

export interface IAllArticles {
  status: string;
  copyright: string;
  num_results: number;
  results: IArticle[];
}

export const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchPage = (page: number) => {};

  return { data, isLoading, fetchPage };
};
