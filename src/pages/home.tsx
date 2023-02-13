import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/header";

const url = `https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=${process.env.REACT_APP_NYT_API_KEY}`;

const perPage = 20;

const Wrapper = styled.div`
  padding: 10px;
`;

const Articles = styled.ul``;

const Article = styled.li``;

const Home = () => {
  const [offsetPage, setOffsetPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
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
