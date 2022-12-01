import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { UrlHasToken, getToken,ParseTokenInfo,ConfirmFreelancerRegisterationThunk,ConfirmServiceSeekerRegistrationThunk,login } from './features/auth/authSlice'

import LayoutVisitor from "./components/Layout/LayoutVisitor";
import LayoutSS from "./components/Layout/LayoutSS";
import LayoutFS from "./components/Layout/LayoutFS";

const Router = () => {

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const tokenInsideUrl = UrlHasToken() 

    useEffect(()=> {
        if(tokenInsideUrl) {
            let currntUrl = window.location.href
            if(currntUrl.split("confirmation/ss").length > 1){
                dispatch(ConfirmServiceSeekerRegistrationThunk(ParseTokenInfo(getToken())))
                navigate("/")
            }
            if(currntUrl.split("confirmation/fs").length > 1){
                dispatch(ConfirmFreelancerRegisterationThunk(ParseTokenInfo(getToken())))
                navigate("/")
            }
            if(currntUrl.split("/login").length > 1){
                dispatch(login(ParseTokenInfo(getToken())))
                navigate("/")
            }
        }
    },[tokenInsideUrl])

  return (
    <Routes>
        {
            !isLoggedIn &&  <Route path="/" element={<LayoutVisitor/>} />
        }

        {/* Service seeker logged in */}
        {
            isLoggedIn && (
                userData["cognito:groups"][0] == "ss" && (
                    <Route path="/" element={<LayoutSS/>} />
                )
            )   
        }

        {/* Freelancer logged in */}
        {
            isLoggedIn && (
                userData["cognito:groups"][0] == "fs" && (
                    <Route path="/" element={<LayoutFS/>} />
                )
            )   
        }
    </Routes>
  );
};
export default Router;
