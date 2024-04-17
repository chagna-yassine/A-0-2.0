// @mui material components
import Card from "@mui/material/Card";

import React, { useCallback, useEffect, useState } from 'react';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { login } from "API/Auth/login";

import { useCookies } from 'react-cookie'

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/departement.jpg";

function Cover() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authErr, setAuthErr] = useState('');

  //To handle if the user click the login button or not
  const [isClicked,setIsClicked] = useState(false);

  //Declare user cookies
  const [userCookies,setUserCookies] = useCookies(['token']);
  const [userIdCookies,setUserIdCookies] = useCookies(['userId']);
  const [userNameCookies,setUserNameCookies] = useCookies(['username']);

  //Use a callback hook to prevend multiple rerender in the useEffect hook
  const handleLogin = useCallback(async () => {
    try {
      const response = await login({ username, password });
      // Check if there is an err 
      if(response.errName === "Incorrect"){
        setAuthErr(<p className='alert alert-danger err'>{'err'}</p>);
      }else{ // create user cookies and rederect him to the main if there is no err
          setUserCookies('token',response.token);
          setUserIdCookies('userId',response.id);
          setUserNameCookies('username',response.username)
          navigate('/dashboard');
      }
      console.log(response); // Handle success or display error message
    } catch (error) {
      console.error(error);
    }
  },[username,password])



  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign In
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="email" label="Email" variant="standard" fullWidth onChange={(e) => setUsername(e.target.value)}/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" variant="standard" fullWidth onChange={(e) => setPassword(e.target.value)}/>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={()=>{setIsClicked(true);handleLogin()}}>
                sign in
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
