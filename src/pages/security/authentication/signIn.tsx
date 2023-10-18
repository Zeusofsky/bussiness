import React, { ReactElement, FC, useState } from "react";
import { useDispatch, connect, ConnectedProps } from "react-redux";
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
} from "@mui/material";
import { 
    Visibility, 
    VisibilityOff,
} from "@mui/icons-material";

import { toastWarning } from "../../../services/toasters";
import { RootState } from '../../../redux/store/store';
import { AuthStart } from "../../../redux/actionCreators/authActions";
import SecurityCode from "../../../components/utilities/SecurityCode";
import refresh  from "../../../assets/refresh.jpg"
import { asft } from '../../../assets'


const SignIn: FC<SignInProps> = ({ token }): ReactElement => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [securityCode, setSecurityCode] = useState('');
    const [securityCodeRefresh, setSecurityCodeRefresh] = useState(true);
    const [forceRefresh, setForceRefresh] = useState(false);
    const [loginTrialNo, setLoginTrialNo] = useState(0);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

    const refreshSecurityCode = () => {
      setForceRefresh(!forceRefresh)
    };        

    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      let name = event.target.name;
      let value = event.target.value;
      switch(name){
        case "username": 
          setUsername(value.toString());
          break;
        case "password": 
          setPassword(value.toString());
          break;
        default: 
          setSecurityCode(value.toString());
      }
      setSecurityCodeRefresh(false)
    }
  
    const navigation = () => {
      navigate('/', { replace: true })
    }

    const login = () => {
      if(Number(loginTrialNo) < 2){
        dispatch<any>(AuthStart(username, password, navigation))
      }
      else{
        if(String(securityCode).toLowerCase() === String(sessionStorage.getItem('securityCode')).toLowerCase()){
          dispatch<any>(AuthStart(username, password, navigation))
        } 
        else {
          toastWarning('کد امنیتی اشتباه است ');
          return
        }
      }

      setLoginTrialNo(loginTrialNo + 1);
      setSecurityCodeRefresh(true);
    }
    // console.log('loginTrialNo: ', loginTrialNo, ' ,token: ', token !== null && token !== '')
    return (
    <Box 
      display='block'
      m='auto'
      px={3}
      pt={3}
      width={350}
      border={1}
      borderRadius={1}
      boxShadow={12}
      sx={{backgroundColor:'#fedab3'}}
    >
      {/* fdede3 fae5d7 fee5cb fcdebe */}
      <Box
        flexGrow= {1}
        display= "flex"
        sx={{
          justifyContent:"center",
          backgroundColor:"inherit"
        }}
      >
        <img style={{width:60, height:60}} src={asft} alt='img'/>
      </Box>
      <Box
        flexGrow= {1}
        display= "flex"
        pt={5}
        sx={{
          justifyContent:"center",
          backgroundColor:"inherit"
        }}
      >
        <Typography variant="h5" fontFamily='B Nazanin' fontWeight={700}>ورود به سامانه</Typography>
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
        <Typography variant="body1" fontFamily='B Nazanin' fontWeight={400}>سامانه مدیریت گزارشات پروژه ها</Typography>
      </Box>
      <Divider sx={{mb:5, mt:0, opacity:.4, height:1, boxShadow:5}} />

      <Box display='block' px={3} mb={3} >
        <FormControl fullWidth variant="outlined" size='small' sx={{border: '1 solid info', fontSize: {xs:'9pt', sm:'9pt', md:'10pt'}}}>
          <InputLabel htmlFor="outlined-input-username" sx={{fontSize:{xs:'9pt', sm:'10pt', md:'11pt'}}}>
            <Typography variant="body2" fontFamily='B Nazanin'>
              نام کاربری
            </Typography>
          </InputLabel>
          <OutlinedInput
            sx={{border: '1 solid info', my: 1}}
            id="outlined-input-username" 
            name="username"
            type='text'
            onChange={inputHandler}
          />
        </FormControl>

        <FormControl fullWidth variant="outlined" size='small' sx={{fontSize: {xs:'9pt', sm:'9pt', md:'10pt'}}}>
          <InputLabel htmlFor="outlined-adornment-password" sx={{fontSize:{xs:'9pt', sm:'10pt', md:'11pt'}}}>
            <Typography variant="body2" fontFamily='B Nazanin'>
              کلمه عبور
            </Typography> 
          </InputLabel>
          <OutlinedInput
            sx={{border: '1 solid info', my: 1}}
            id="outlined-adornment-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff/> }
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            onChange={inputHandler}
          />
        </FormControl>
        {Number(loginTrialNo) > 1 && (token === null || token === '') && (
          <FormControl fullWidth variant="outlined" size='small' sx={{fontSize: {xs:'9pt', sm:'9pt', md:'10pt'}}}>
            <InputLabel htmlFor="outlined-input-security-code" sx={{fontSize:{xs:'9pt', sm:'10pt', md:'11pt'}}}>
              <Typography variant="body2" fontFamily='B Nazanin'>
                کد امنیتی
              </Typography>
            </InputLabel>
            <OutlinedInput 
              sx={{border: '1 solid info', my: 1}}
              id="outlined-input-security-code" 
              name="securityCode"
              type='text'
              onChange={inputHandler}
            />
          </FormControl>
        )}
        {Number(loginTrialNo) > 1 && (token === null || token === '') && (
          <Box display='flex' pt={1} >
            <img alt='img' style={{width:'1.2em', height:'1.2em'}} src={refresh} onClick={refreshSecurityCode}/> 
            <SecurityCode style={{flex:1}} refresh={securityCodeRefresh} forceRefresh={forceRefresh}/>
          </Box>
        )}
        <Box display='block' justifyContent='center' pt={3} pb={3} >
          <Button fullWidth variant="contained" color="info" size='small' 
              sx={{fontSize:{xs:'9pt', sm:'9pt', md:'10pt'}}} onClick={login}
              disabled={(Number(loginTrialNo) > 1 &&  securityCode === "") || username === "" || password === "" }
          >
            <Typography variant="body1" fontFamily='B Nazanin'>
              ورود
            </Typography>         
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state: RootState) => ({
  token: state.auth.authToken,
});

const mapDispatchToProps = () => ({
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type SignInProps = ConnectedProps<typeof connector>;

export default connector(SignIn)
