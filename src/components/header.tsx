import { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { RootState } from "../store";
import FilterModal from "./filterModal";
import { BsSearch, BsCalendarCheck } from "react-icons/bs";

const Wrapper = styled.div`
    background-color: white;
    display: flex;
    padding: 15px 20px;
    gap: 10px;
    height: 70px;
    flex-shrink: 0;
`;

interface IFilterProps {
    active: boolean;
}

const Filter = styled.div<IFilterProps>`
    padding: 10px;
    border-radius: 20px;
    border: 1px solid;
    border-color: ${(props) => (props.active ? "#4a7aff" : "#858585")};
    display: flex;
    align-items: center;
    gap: 5px;
    user-select: none;
    cursor: pointer;
    color: ${(props) => (props.active ? "#4a7aff" : "#858585")};
`;

const Icon = styled.div`
    width: 20px;
    height: 20px;
`;

const Title = styled.div`
    flex-shrink: 0;
`;

const mapStateToProps = (state: RootState) => {
    return { filterState: state };
};

const connector = connect(mapStateToProps, null);

type Props = ConnectedProps<typeof connector>;

const Header = ({ filterState }: Props) => {
    const { pathname } = useLocation();
    const filterReducer =
        pathname === "/"
            ? filterState.homeFilterReducer
            : filterState.scrapFilterReducer;

    const [showFilter, setShowFilter] = useState(false);
    return (
        <Wrapper>
            <Filter
                onClick={() => setShowFilter(true)}
                active={filterReducer.headline.length > 0}
            >
                <Icon>
                    <BsSearch />
                </Icon>
                <Title>
                    {filterReducer.headline
                        ? filterReducer.headline.length > 12
                            ? filterReducer.headline.slice(0, 12) + "..."
                            : filterReducer.headline
                        : "전체 헤드라인"}
                </Title>
            </Filter>
            <Filter
                onClick={() => setShowFilter(true)}
                active={filterReducer.dateFilter.length > 0}
            >
                <Icon>
                    <BsCalendarCheck />
                </Icon>
                <Title>
                    {filterReducer.dateFilter
                        ? filterReducer.dateFilter
                        : "전체 날짜"}
                </Title>
            </Filter>
            <Filter
                onClick={() => setShowFilter(true)}
                active={filterReducer.countryFilter.length > 0}
            >
                <Title>
                    {filterReducer.countryFilter.length > 0
                        ? filterReducer.countryFilter[0] +
                          (filterReducer.countryFilter.length > 1
                              ? ` 외 ${
                                    filterReducer.countryFilter.length - 1
                                }개`
                              : "")
                        : "전체 국가"}
                </Title>
            </Filter>
            {showFilter && <FilterModal close={() => setShowFilter(false)} />}
        </Wrapper>
    );
};

export default connector(Header);
