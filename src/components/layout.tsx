import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Footer from "./footer";

const Wrapper = styled.div`
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Body = styled.div`
  background-color: #d6d6d6;
  flex-grow: 1;
  overflow-y: auto;
`;

const Layout = () => {
  return (
    <Wrapper>
      <Body>
        <Outlet />
      </Body>
      <Footer />
    </Wrapper>
  );
};

export default Layout;
