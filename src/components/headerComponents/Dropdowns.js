import React, { useEffect, useState } from "react";
import { Dropdown } from "antd";
import { BsChevronCompactDown } from "react-icons/bs";
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./../../redux/actions/UserActions";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const DropdownStyled = styled.div`
  .css-dev-only-do-not-override-evo4q4.ant-dropdown {
    background: red;
  }
`;

const Dropdowns = () => {
  const navigate = useNavigate();
  const logoutHandle = () => {
    dispatch(logout());
  };
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dispatch = useDispatch();
  const darkModeHandle = () => {
    setIsDarkMode(!isDarkMode);
  };
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [browserWidth, setBrowserWidth] = useState(window.innerWidth);
  const items = userInfo
    ? [
        browserWidth <= 768 && {
          key: "6",
          disabled: true,
          label: (
            <p className="w-24 truncate font-semibold">
              {userInfo && "Hi " + userInfo.name}
            </p>
          ),
        },
        browserWidth <= 768 && {
          type: "divider",
        },
        {
          key: "1",
          label: <p onClick={() => navigate("/profile")}>Profile</p>,
        },
        {
          key: "2",
          label: <p onClick={logoutHandle}>Logout</p>,
        },
        {
          key: "8",
          label: (
            <p onClick={() => darkModeHandle()}>
              Chế độ {isDarkMode ? "sáng" : "tối"}
            </p>
          ),
        },
      ]
    : [
        browserWidth <= 768 && {
          key: "7",
          disabled: true,
          label: <p className="w-24 truncate font-semibold">Chưa đăng nhập"</p>,
        },
        browserWidth <= 768 && {
          type: "divider",
        },
        {
          key: "3",
          label: <p onClick={() => navigate("/login")}>Login</p>,
        },
        {
          key: "4",
          label: <p onClick={() => navigate("/register")}>Register</p>,
        },
        {
          key: "5",
          label: (
            <p onClick={() => darkModeHandle()}>
              Chế độ {isDarkMode ? "sáng" : "tối"}
            </p>
          ),
        },
      ];

  useEffect(() => {
    const handleResize = () => {
      setBrowserWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <DropdownStyled>
      <Dropdown
        arrow
        menu={{
          items,
        }}
        placement="bottomRight"
        trigger={["click"]}
        onClick={() => setIsOpenDropdown(!isOpenDropdown)}
        style={{ color: "red", background: "red", fontSize: 34 }}
      >
        <div className="dark:text-white cursor-pointer flex items-center">
          <p className="hidden md:block w-24 truncate text-sm">
            {userInfo ? "Hi " + userInfo.name : "Chưa đăng nhập"}
          </p>
          <BsChevronCompactDown
            size="1.1rem"
            className={`hidden md:block ${
              isOpenDropdown && "transform rotate-180"
            }`}
          />
          <FaRegCircleUser size="1.4rem" className="md:hidden" />
        </div>
      </Dropdown>
    </DropdownStyled>
  );
};

export default Dropdowns;
