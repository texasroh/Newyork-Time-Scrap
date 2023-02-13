import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: #d6d6d6;
  height: 100px;
`;

const Menu = styled.ul`
  background-color: black;
  border-radius: 30px 30px 0 0;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const MenuItem = styled.li`
  padding: 10px;
`;

interface IMenuItemContainerProps {
  selected: boolean;
}
const MenuItemContainer = styled.div<IMenuItemContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  color: white;
  opacity: ${(props) => (props.selected ? 1 : 0.3)};
`;

const Footer = () => {
  const match = useMatch("scrap");
  return (
    <Wrapper>
      <Menu>
        <MenuItem>
          <Link to="/">
            <MenuItemContainer selected={!match}>
              <svg
                fill="none"
                height="30"
                viewBox="0 0 16 16"
                width="30"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 6V15H6V11C6 9.89543 6.89543 9 8 9C9.10457 9 10 9.89543 10 11V15H15V6L8 0L1 6Z"
                  fill="#ffffff"
                />
              </svg>
              <span>홈</span>
            </MenuItemContainer>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/scrap">
            <MenuItemContainer selected={!!match}>
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
                  fill="#ffffff"
                />
              </svg>
              <span>스크랩</span>
            </MenuItemContainer>
          </Link>
        </MenuItem>
      </Menu>
    </Wrapper>
  );
};

export default Footer;
