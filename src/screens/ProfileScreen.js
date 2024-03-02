import React, { useEffect } from "react";
import Header from "./../components/Header";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../redux/actions/UserActions";
import moment from "moment";
import ProfileTabs from "../components/profileComponents/ProfileTabs";
import Loading from "./../components/loadingError/Loading";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading } = userDetails;
  useEffect(() => {
    if (userInfo) {
      dispatch(getUserDetails());
    } else {
      navigate("/");
    }
  }, [userInfo, dispatch, navigate]);

  return (
    <div>
      <Header />
      {loading && <Loading />}
      <div className="border-2 border-indigo-600 m-2 p-2">
        <div className="border-2 border-indigo-600 m-2 p-2">Avatar-img</div>
        <div className="border-2 border-indigo-600 m-2 p-2">
          <p>{userInfo?.name}</p>
          <p>Joined {moment(userInfo?.createdAt).format("LL")}</p>
        </div>

        <div className="border-2 border-indigo-600 m-2 p-2">
          <p>PROFILE SETTINGS</p>
          <p>ORDER LIST</p>
        </div>
      </div>
      <ProfileTabs />
    </div>
  );
};

export default ProfileScreen;
