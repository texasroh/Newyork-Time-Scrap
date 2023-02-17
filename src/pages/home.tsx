import { useEffect, useRef, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";
import styled, { keyframes } from "styled-components";
import Header from "../components/header";
import {
  IAllArticles,
  IArticle,
  ny_times_all_articles_url,
  useFetch,
} from "../hooks/useFetch";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import { add, remove, RootState } from "../store";

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Articles = styled.ul`
  flex-grow: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
`;

export const Article = styled.li`
  background-color: white;
  padding: 10px 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ArticleSection = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
`;

export const ArticleTitle = styled.h2`
  font-weight: 600;
  font-size: 1.2rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const ArticleBookMark = styled.span`
  flex-shrink: 0;
  user-select: none;
  cursor: pointer;
`;

export const ArticleSource = styled.span`
  font-size: 0.9rem;
  color: #727272;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const ArticleDate = styled.span`
  font-size: 0.9rem;
  color: #727272;
  flex-shrink: 0;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const LoadingSpinner = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  border: 4px solid #e7e7e7;
  border-top-color: gray;
  animation: ${rotate} 0.8s infinite linear;
  user-select: none;
`;

const mapStateToProps = (state: RootState) => {
  return { scrapUris: state.scrapReducer.map((article) => article.uri) };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addScrap: (article: IArticle) => dispatch(add(article)),
    removeScrap: (article: IArticle) => dispatch(remove(article)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const Home = ({ scrapUris, addScrap, removeScrap }: Props) => {
  const [page, setPage] = useState(1);
  const targetRef = useRef<HTMLDivElement>(null);
  const [articles, setArticles] = useState<IArticle[]>([]);
  const isLoading = useRef(false);

  const { data, fetchPage } = useFetch<IAllArticles>(
    ny_times_all_articles_url,
    {
      onSuccess: (data) => {
        setArticles((prev) => [...prev, ...data.results]);
        isLoading.current = false;
      },
    }
  );

  const toogleScrap = (article: IArticle) => {
    if (scrapUris.includes(article.uri)) {
      removeScrap(article);
    } else {
      addScrap(article);
    }
  };

  useIntersectionObserver({
    target: targetRef.current!,
    onIntersect: ([{ isIntersecting }]) => {
      if (isIntersecting && !isLoading.current) {
        setPage((prev) => prev + 1);
      }
    },
  });

  useEffect(() => {
    if (isLoading.current) return;
    isLoading.current = true;
    fetchPage(page);
  }, [page]);

  return (
    <Wrapper>
      <Header />
      <Articles>
        {articles.map((article, idx) => (
          <Article key={idx}>
            <ArticleSection>
              <Link to={article.url} target="_blank">
                <ArticleTitle>{article.title}</ArticleTitle>
              </Link>
              <ArticleBookMark onClick={() => toogleScrap(article)}>
                {scrapUris.includes(article.uri) ? "💛" : "🤍"}
              </ArticleBookMark>
            </ArticleSection>
            <ArticleSection>
              <ArticleSource>{article.byline}</ArticleSource>
              <ArticleDate>{article.created_date.split("T")[0]}</ArticleDate>
            </ArticleSection>
          </Article>
        ))}
        <LoadingWrapper ref={targetRef}>
          <LoadingSpinner />
        </LoadingWrapper>
      </Articles>
    </Wrapper>
  );
};

export default connector(Home);
