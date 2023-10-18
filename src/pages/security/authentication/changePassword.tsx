import React, { ReactElement, FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { 
    Box, 
    FormControl, 
    IconButton, 
    InputAdornment, 
    InputLabel, 
    OutlinedInput, 
    Typography, 
    Button,
    Divider,
    Avatar,
} from "@mui/material";
import { 
    Visibility, 
    VisibilityOff,
} from "@mui/icons-material";

import { toastWarning } from "../../../services/toasters";
import { ActivateChangeUserPassword, ChangeUserPassword } from "../../../redux/actionCreators/authActions";
import { IChangePassword } from "../../../models/auth";
import { RootState } from "../../../redux/store/store";


const ChangePassword: FC = (): ReactElement => {
    const userId: number = useSelector((state: RootState) => state.auth.user?.id!)
    const userImage: string = useSelector((state: RootState) => state.auth.user?.user_img!)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [username, setUsername] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

    const handleClickShowCurrentPassword = () => setShowCurrentPassword((show) => !show);
    const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
    const handleClickShowConfirmNewPassword = () => setShowConfirmNewPassword((show) => !show);
    const handleMouseDownCurrentPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };
    const handleMouseDownNewPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };
    const handleMouseDownConfirmNewPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      let name = event.target.name;
      let value = event.target.value;
      switch(name){
        case "username": 
          setUsername(value.toString());
          break;
        case "current-password": 
          setCurrentPassword(value.toString());
          break;
        case "new-password": 
          setNewPassword(value.toString());
          break;
        case "confirm-new-password": 
          setConfirmNewPassword(value.toString());
          break;      }
    }
  
     const changePassword = () => {
      if(currentPassword === newPassword){
        toastWarning("کلمه عبور جدید با کلمه عبور قبلی نمی توانند یکسان باشند");
        return;
      }
      if(newPassword.length < 4){
        toastWarning("طول کلمه عبور نمی تواند از 4 حرف کمتر باشد");
        return;
      }
      if(username === newPassword){
        toastWarning("کلمه عبور و نام کاربری نمی توانند یکسان باشند");
        return;
      }
      if(newPassword !== confirmNewPassword){
        toastWarning("کلمه عبور جدید تائید نشد");
        return;
      }

      const request: IChangePassword = {
        userid : userId,
        username : username,
        currentpassword : currentPassword,
        newpassword: newPassword, 
      } 
      dispatch<any>(ChangeUserPassword(request))
      dispatch<any>(ActivateChangeUserPassword(false));
      navigate('/', { replace: true })
    }

    const cancel = () => {
      dispatch<any>(ActivateChangeUserPassword(false));
      navigate('/', { replace: true })
    }

    return (
    <Box 
      display='block'
      m='auto'
      px={3}
      width={350}
      border={1}
      borderRadius={1}
      boxShadow={12}
      sx={{backgroundColor:'#c0f8d3'}}
    >
      {/* fdede3 fae5d7 fee5cb fcdebe */}
      <Box
        flexGrow= {1}
        display= "flex"
        pt={6}
        sx={{
          justifyContent:"center",
          backgroundColor:"inherit"
        }}
      >
        {/* <img style={{width:60, height:60}} src={asft} alt='img'/> */}
        <Avatar 
          sx={{ 
            display: { xs: "none", md: "flex" }, 
            width:100, 
            height:100, 
            m:0, 
          }}
          // src='https://avatars.githubusercontent.com/u/47317870?s=400&u=79da86747deb409779c3575c0da73d90ad65fe81&v=4'
          src={userImage}
          alt='avatar'
        />
      </Box>
      <Box
        flexGrow= {1}
        display= "flex"
        pt={3}
        sx={{
          justifyContent:"center",
          backgroundColor:"inherit"
        }}
      >
        <Typography variant="h6" fontFamily='B Nazanin' fontWeight={600}>تغییر نام کاربری و کلمه عبور</Typography>
      </Box>
      <Box
        flexGrow= {1}
        display= "flex"
        pb={1}
        sx={{
          justifyContent:"center",
          backgroundColor:"inherit"
        }}
      >
        <Typography variant="body2" fontFamily='B Nazanin' fontWeight={400}>شما می توانید نام کاربری و کلمه عبور را تغییر دهید</Typography>
      </Box>
      <Divider sx={{mb:5, mt:0, opacity:.4, height:2, boxShadow:5}} />

      <Box display='block' px={3} mb={3} >
        <FormControl fullWidth variant="outlined" size='small' sx={{border: '1 solid info', fontFamily:'B Nazanin', fontSize: {xs:'9pt', sm:'9pt', md:'10pt'}}}>
          <InputLabel htmlFor="outlined-input-username" sx={{fontFamily:'B Nazanin', fontSize:{xs:'9pt', sm:'10pt', md:'11pt'}}}>کلمه عبور</InputLabel>
          <OutlinedInput
            sx={{border: '1 solid info', my: 1}}
            id="outlined-input-username" 
            name="username"
            type='text'
            onChange={inputHandler}
          />
        </FormControl>

        <FormControl fullWidth variant="outlined" size='small' sx={{fontFamily:'B Nazanin', fontSize: {xs:'9pt', sm:'9pt', md:'10pt'}}}>
          <InputLabel htmlFor="outlined-adornment-current-password" sx={{fontFamily:'B Nazanin', fontSize:{xs:'9pt', sm:'10pt', md:'11pt'}}}>کلمه عبور فعلی</InputLabel>
          <OutlinedInput
            sx={{border: '1 solid info', my: 1}}
            id="outlined-adornment-current-password"
            name="current-password"
            type={showCurrentPassword ? 'text' : 'password'}
            disabled={ username === '' }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle current password visibility"
                  onClick={handleClickShowCurrentPassword}
                  onMouseDown={handleMouseDownCurrentPassword}
                  edge="end"
                >
                  {showCurrentPassword ? <Visibility /> : <VisibilityOff/> }
                </IconButton>
              </InputAdornment>
            }
            label="کلمه عبور فعلی"
            onChange={inputHandler}
          />
        </FormControl>

        <FormControl fullWidth variant="outlined" size='small' sx={{fontFamily:'B Nazanin', fontSize: {xs:'9pt', sm:'9pt', md:'10pt'}}}>
          <InputLabel htmlFor="outlined-adornment-new-password" sx={{fontFamily:'B Nazanin', fontSize:{xs:'9pt', sm:'10pt', md:'11pt'}}}>کلمه عبور جدید</InputLabel>
          <OutlinedInput
            sx={{border: '1 solid info', my: 1}}
            id="outlined-adornment-new-password"
            name="new-password"
            type={showNewPassword ? 'text' : 'password'}
            disabled={ username === '' || currentPassword === '' }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle new password visibility"
                  onClick={handleClickShowNewPassword}
                  onMouseDown={handleMouseDownNewPassword}
                  edge="end"
                >
                  {showNewPassword ? <Visibility /> : <VisibilityOff/> }
                </IconButton>
              </InputAdornment>
            }
            label="کلمه عبور جدید "
            onChange={inputHandler}
          />
        </FormControl>

        <FormControl fullWidth variant="outlined" size='small' sx={{fontSize: {xs:'9pt', sm:'9pt', md:'10pt'}, fontFamily:'B Nazanin'}}>
          <InputLabel htmlFor="outlined-adornment-confirm-new-password" sx={{fontSize:{xs:'9pt', sm:'10pt', md:'11pt'}, fontFamily:'B Nazanin'}}>تائید کلمه عبور جدید</InputLabel>
          <OutlinedInput
            sx={{border: '1 solid info', my: 1}}
            id="outlined-adornment-confirm-new-password"
            name="confirm-new-password"
            type={showConfirmNewPassword ? 'text' : 'password'}
            disabled={ username === '' || currentPassword === '' || newPassword === '' }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirm new password visibility"
                  onClick={handleClickShowConfirmNewPassword}
                  onMouseDown={handleMouseDownConfirmNewPassword}
                  edge="end"
                >
                  {showConfirmNewPassword ? <Visibility /> : <VisibilityOff/> }
                </IconButton>
              </InputAdornment>
            }
            label="تائید کلمه عبور جدید"
            onChange={inputHandler}
          />
        </FormControl>

        <Box display='flex' justifyContent='space-around' pt={3} pb={3} >
          <Button variant="contained" color="error" size='small' 
              sx={{fontSize:{xs:'9pt', sm:'9pt', md:'10pt', fontFamily:'B Nazanin'}}} onClick={cancel}
          >
            انصراف
          </Button>          
          <Button variant="contained" color="info" size='small'  
              sx={{fontSize:{xs:'9pt', sm:'9pt', md:'10pt', fontFamily:'B Nazanin'}}} onClick={changePassword}
              disabled={ username === "" || currentPassword === "" || newPassword === "" || 
                         confirmNewPassword === ""  }
          >
            {/* || newPassword !== confirmNewPassword */}
            تغییر کلمه عبور
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ChangePassword
