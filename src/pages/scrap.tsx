import { connect, ConnectedProps } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Dispatch } from "redux";
import styled from "styled-components";
import Header from "../components/header";
import { IArticle } from "../hooks/useFetch";
import { remove, RootState } from "../store";
import {
  Article,
  ArticleBookMark,
  ArticleDate,
  Articles,
  ArticleSection,
  ArticleSource,
  ArticleTitle,
  Wrapper,
} from "./home";

const Container = styled.div`
  height: 100%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const Button = styled.button`
  width: 100%;
  border-radius: 15px;
  color: white;
  background-color: #0984e3;
  border: none;
  padding: 20px;
  margin-top: 10px;
  cursor: pointer;
`;

const mapStateToProps = (state: RootState) => {
  return {
    scrapedArticles: state.scrapReducer,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return { removeScrap: (article: IArticle) => dispatch(remove(article)) };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const Scrap = ({ scrapedArticles, removeScrap }: Props) => {
  const navigate = useNavigate();

  return scrapedArticles.length ? (
    <Wrapper>
      <Header />
      <Articles>
        {scrapedArticles.map((article) => (
          <Article key={article.uri}>
            <ArticleSection>
              <Link to={article.url} target="_blank">
                <ArticleTitle>{article.title}</ArticleTitle>
              </Link>
              <ArticleBookMark onClick={() => removeScrap(article)}>
                💛
              </ArticleBookMark>
            </ArticleSection>
            <ArticleSection>
              <ArticleSource>{article.byline}</ArticleSource>
              <ArticleDate>{article.created_date.split("T")[0]}</ArticleDate>
            </ArticleSection>
          </Article>
        ))}
      </Articles>
    </Wrapper>
  ) : (
    <Container>
      <svg
        enableBackground="new 0 0 48 48"
        height="30"
        id="Layer_1"
        version="1.1"
        viewBox="0 0 48 48"
        width="30"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <path
          clipRule="evenodd"
          d="M37,47H11c-2.209,0-4-1.791-4-4V5c0-2.209,1.791-4,4-4h18.973  c0.002,0,0.005,0,0.007,0h0.02H30c0.32,0,0.593,0.161,0.776,0.395l9.829,9.829C40.84,11.407,41,11.68,41,12l0,0v0.021  c0,0.002,0,0.003,0,0.005V43C41,45.209,39.209,47,37,47z M31,4.381V11h6.619L31,4.381z M39,13h-9c-0.553,0-1-0.448-1-1V3H11  C9.896,3,9,3.896,9,5v38c0,1.104,0.896,2,2,2h26c1.104,0,2-0.896,2-2V13z M33,39H15c-0.553,0-1-0.447-1-1c0-0.552,0.447-1,1-1h18  c0.553,0,1,0.448,1,1C34,38.553,33.553,39,33,39z M33,31H15c-0.553,0-1-0.447-1-1c0-0.552,0.447-1,1-1h18c0.553,0,1,0.448,1,1  C34,30.553,33.553,31,33,31z M33,23H15c-0.553,0-1-0.447-1-1c0-0.552,0.447-1,1-1h18c0.553,0,1,0.448,1,1C34,22.553,33.553,23,33,23  z"
          fillRule="evenodd"
          fill="#555555"
        />
      </svg>
      <span>저장된 스크랩이 없습니다.</span>
      <Button onClick={() => navigate("/")}>스크랩 하러 가기</Button>
    </Container>
  );
};

export default connector(Scrap);
