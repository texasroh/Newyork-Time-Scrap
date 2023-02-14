import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/header";
import {
  IAllArticles,
  ny_times_all_articles_url,
  useFetch,
} from "../hooks/useFetch";

const perPage = 20;

const Wrapper = styled.div`
  padding: 10px;
`;

const Articles = styled.ul``;

const Article = styled.li``;

const Home = () => {
  const [offsetPage, setOffsetPage] = useState(0);

  const { data, isLoading, fetchPage } = useFetch<IAllArticles>(
    ny_times_all_articles_url
  );
  useEffect(() => {}, [isLoading]);
  return (
    <div>
      <Header />
      <Wrapper>
        <Articles>
          <Article></Article>
        </Articles>
      </Wrapper>
    </div>
  );
};

export default Home;
