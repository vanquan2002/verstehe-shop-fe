import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { RiSearchLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { setLayoutResetActions } from "../../redux/actions/LayoutActions";

const SearchLayout = ({ result }) => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const layoutSearchHandle = () => {
    dispatch(setLayoutResetActions());
  };
  const submitHandle = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate(`/`);
    }
    dispatch(setLayoutResetActions());
    setKeyword("");
  };

  useEffect(() => {
    inputRef.current.focus();
  }, [result]);

  return (
    <div
      className={`fixed top-0 right-0 transition ${
        result
          ? "translate-x-0 duration-500"
          : "translate-x-[500px] duration-500"
      } `}
    >
      <div className={`w-[300px] md:w-[500px] h-screen bg-whitePrimary`}>
        <div className="flex flex-col items-center pt-32">
          <div className="flex justify-between items-center md:w-80 w-60 mb-5">
            <p className="text-darkPrimary font-medium">SEARCH</p>
            <MdClose
              onClick={layoutSearchHandle}
              size="1.7rem"
              className="cursor-pointer"
            />
          </div>
          <form
            className="flex items-center justify-center"
            onSubmit={submitHandle}
          >
            <div className="relative">
              <input
                ref={inputRef}
                onChange={(e) => setKeyword(e.target.value)}
                className="md:w-80 w-60 px-6 py-3 placeholder:text-[0.9rem] placeholder:text-darkPrimary outline-none bg-firePrimary"
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={keyword}
              />
              <RiSearchLine
                onClick={submitHandle}
                size="1.3rem"
                className="absolute top-1/2 right-5 cursor-pointer transform -translate-y-1/2 text-darkPrimary"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchLayout;
