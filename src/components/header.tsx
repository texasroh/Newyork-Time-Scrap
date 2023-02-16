import styled from "styled-components";
import FilterModal from "./filterModal";

const Wrapper = styled.div`
  background-color: white;
  display: flex;
  padding: 15px 20px;
  gap: 10px;
  height: 70px;
  flex-shrink: 0;
`;

const Filter = styled.div`
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #a7a7a7;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Icon = styled.div`
  width: 20px;
  height: 20px;
`;

const Title = styled.div`
  flex-shrink: 0;
  color: #858585;
`;

const Header = () => {
  return (
    <Wrapper>
      <Filter>
        <Icon>
          <svg
            enableBackground="new 0 0 24 24"
            id="Layer_1"
            version="1.0"
            viewBox="0 0 24 24"
            xmlSpace="preserve"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <g>
              <g>
                <path d="M9,4c2.8,0,5,2.2,5,5s-2.2,5-5,5s-5-2.2-5-5S6.2,4,9,4 M9,2C5.1,2,2,5.1,2,9c0,3.9,3.1,7,7,7s7-3.1,7-7C16,5.1,12.9,2,9,2    L9,2z" />
              </g>
            </g>
            <g>
              <polygon points="22,20.3 20.3,22 14,15.7 14,14 15.7,14  " />
              <rect
                height="3.6"
                transform="matrix(0.7071 -0.7071 0.7071 0.7071 -5.9741 14.4227)"
                width="1.2"
                x="13.8"
                y="12.6"
              />
            </g>
          </svg>
        </Icon>
        <Title>전체 헤드라인</Title>
      </Filter>
      <Filter>
        <Icon>
          <svg
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 4h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm.002 16H5V8h14l.002 12z" />
            <path d="m11 17.414 5.707-5.707-1.414-1.414L11 14.586l-2.293-2.293-1.414 1.414z" />
          </svg>
        </Icon>
        <Title>전체 날짜</Title>
      </Filter>
      <Filter>
        <Title>전체 국가</Title>
      </Filter>
      <FilterModal />
    </Wrapper>
  );
};

export default Header;
