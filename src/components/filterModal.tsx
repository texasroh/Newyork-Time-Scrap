import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Container = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.label`
  font-weight: 600;
  font-size: 1.1rem;
  user-select: none;
`;

const Input = styled.input`
  width: 100%;
  border-radius: 5px;
  border: 1px solid #b1b1b1;
  padding: 10px 15px;
  position: relative;
`;

const DateIcon = styled.div`
  position: absolute;
  right: 15px;
  top: 10px;
  color: #b1b1b1;
  opacity: 0.5;
`;

const Button = styled.button`
  border-radius: 15px;
  background-color: #4a7aff;
  color: white;
  border: 0;
  padding: 15px 0;
  font-size: 1.1rem;
`;

const FilterModal = () => {
  return (
    <Wrapper>
      <Container>
        <Section>
          <Title>헤드라인</Title>
          <Input placeholder="검색하실 헤드라인을 입력해주세요" />
        </Section>
        <Section>
          <Title>날짜</Title>
          <div style={{ position: "relative" }}>
            <Input placeholder="날짜를 선택해주세요" />
            <DateIcon>
              <svg
                height="18"
                viewBox="0 0 24 24"
                width="18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 4h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm.002 16H5V8h14l.002 12z" />
                <path d="m11 17.414 5.707-5.707-1.414-1.414L11 14.586l-2.293-2.293-1.414 1.414z" />
              </svg>
            </DateIcon>
          </div>
        </Section>
        <Section>
          <Title>국가</Title>
        </Section>
        <Section>
          <Button>필터 적용하기</Button>
        </Section>
      </Container>
    </Wrapper>
  );
};

export default FilterModal;
