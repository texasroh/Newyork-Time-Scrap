import { useRef, useState } from "react";

export const ny_times_all_articles_url = `https://api.nytimes.com/svc/news/v3/content/all/all.json`;

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

export interface IArticle {
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

interface IUseFetchProps {
  url: string;
}

const perPage = 20;

export const useFetch = <T>(
  url: string,
  options?: { onSuccess?: (data: T) => void }
) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isFetching = useRef(false);

  const fetchPage = (page: number) => {
    if (isFetching.current) return;
    isFetching.current = true;
    setIsLoading(true);
    fetch(
      `${url}?api-key=${
        process.env.REACT_APP_NYT_API_KEY
      }&limit=${perPage}&offset=${(page - 1) * perPage}`
    )
      .then((response) => response.json())
      .then((data: T) => {
        setData(data);
        setIsLoading(false);
        isFetching.current = false;
        if (options?.onSuccess) {
          options.onSuccess(data);
        }
      });
  };

  return { data, isLoading, fetchPage };
};
