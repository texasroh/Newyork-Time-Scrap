import { FormEvent, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { useLocation } from "react-router-dom";
import { Dispatch } from "redux";
import styled from "styled-components";
import {
    IFilterState,
    RootState,
    updateHomeFilter,
    updateScrapFilter,
} from "../store";

const Wrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
`;

const Background = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
`;

const Container = styled.form`
    padding: 30px 20px;
    background-color: white;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    gap: 40px;
    width: 100%;
    z-index: 10;
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
    cursor: pointer;
`;

const CountryGroup = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;

interface ICountryButtonProps {
    selected: boolean;
}

const CountryButton = styled.div<ICountryButtonProps>`
    border: 1px solid;
    border-color: ${(props) => (props.selected ? "" : "#b1b1b1")};
    background-color: ${(props) =>
        props.selected ? "#8fadff" : "transparent"};
    border-radius: 20px;
    padding: 10px 14px;
    color: ${(props) => (props.selected ? "white" : "#b2b2b2")};
    user-select: none;
    cursor: pointer;
`;

interface IFilterModelProps {
    close: () => void;
}

const mapStateToProps = (state: RootState, ownProps: IFilterModelProps) => {
    return { filterState: state, close: ownProps.close };
};

const mapDispatchToProps = (
    dispatch: Dispatch,
    ownProps: IFilterModelProps
) => {
    return { updateFilter: dispatch };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const FilterModal = ({ close, filterState, updateFilter }: Props) => {
    const { pathname } = useLocation();

    const [headline, setHeadline] = useState(
        pathname === "/"
            ? filterState.homeFilterReducer.headline
            : filterState.scrapFilterReducer.headline
    );
    const [dateFilter, setDateFilter] = useState(
        pathname === "/"
            ? filterState.homeFilterReducer.dateFilter
            : filterState.scrapFilterReducer.dateFilter
    );
    const [countryFilter, setCountryFilter] = useState<string[]>(
        pathname === "/"
            ? filterState.homeFilterReducer.countryFilter
            : filterState.scrapFilterReducer.countryFilter
    );

    const checkCountryFilter = (country: string) => {
        return countryFilter.includes(country);
    };
    const toggleCountryFilter = (country: string) => {
        if (checkCountryFilter(country)) {
            setCountryFilter((prev) =>
                prev.filter((value) => value !== country)
            );
        } else {
            setCountryFilter((prev) => [...prev, country]);
        }
    };

    const applyFilter = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateFilter(
            pathname === "/"
                ? updateHomeFilter({ headline, dateFilter, countryFilter })
                : updateScrapFilter({ headline, dateFilter, countryFilter })
        );
        close();
    };
    return (
        <Wrapper>
            <Background onClick={close} />
            <Container onSubmit={applyFilter}>
                <Section>
                    <Title>헤드라인</Title>
                    <Input
                        placeholder="검색하실 헤드라인을 입력해주세요"
                        onChange={(e) => setHeadline(e.target.value)}
                        value={headline}
                    />
                </Section>
                <Section>
                    <Title>날짜</Title>
                    <div style={{ position: "relative" }}>
                        <Input
                            placeholder="날짜를 선택해주세요"
                            onChange={(e) => setDateFilter(e.target.value)}
                            value={dateFilter}
                        />
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
                    <CountryGroup>
                        {[
                            "대한민국",
                            "중국",
                            "일본",
                            "미국",
                            "북한",
                            "러시아",
                            "프랑스",
                            "영국",
                        ].map((country, idx) => (
                            <CountryButton
                                key={idx}
                                selected={checkCountryFilter(country)}
                                onClick={() => toggleCountryFilter(country)}
                            >
                                {country}
                            </CountryButton>
                        ))}
                    </CountryGroup>
                </Section>
                <Section>
                    <Button>필터 적용하기</Button>
                </Section>
            </Container>
        </Wrapper>
    );
};

export default connector(FilterModal);
