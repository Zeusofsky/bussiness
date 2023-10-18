import React, { FC, ReactElement, Dispatch } from "react";
import { connect, ConnectedProps, 
  // useDispatch 
} from "react-redux";
// import { useNavigate } from "react-router-dom";
import {
  Container,
  Toolbar,
  Typography,
  Divider,
  Box,
  Select,
  MenuItem,
  Avatar,
  Tooltip,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  useTheme,
  useMediaQuery,
  IconButton,
  // SvgIcon,
} from "@mui/material";
import {
  Help,
  ReviewsRounded,
  // HelpOutline, HelpOutlined,ReviewsOutlined, 
} from "@mui/icons-material";
// import { Menu, Search, } from "@mui/icons-material";
// import { Bell } from "../../assets";
// import { useProSidebar } from "react-pro-sidebar";
import { 
  useSidebar, 
  // useSidebarSelectedMenuTitleContext,
} from "../../hooks";
import {ConfigDrawer} from "../utilities/ConfigDrawer";
//Our Type Imports
import { RootState } from '../../redux/store/store';
// import { Action, ActionType, ILogout} from '../../redux/actionTypes/authActionTypes';
import { LogOut } from "../../redux/actionCreators/authActions"; 
// import { bindActionCreators } from "redux";
// import { RootActions } from "../../redux/actionCreators/actionResultTypes";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { useSidebarContext } from "../../hooks";
import { Menu, useProSidebar } from "react-pro-sidebar";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const monthDates = [
  '1400/8',
  '1400/9',
  '1400/10',
  '1400/11',
  '1400/12',
  '1401/1',
  '1401/1',
  '1401/2',
  '1401/3',
  '1401/4',
  '1401/5',
  '1401/6',
  '1401/7',
  '1401/8',
  '1401/9',
  '1401/10',
  '1401/11',
  '1401/12',
  '1402/1',
  '1402/2',
];
const contracts = [
  'Project #01',
  'Project #02',
  'Project #03',
  'Project #04',
  'Project #05',
  'Project #06',
  'Project #07',
  'Project #08',
  'Project #09',
  'Project #10',
];

// interface NavProps extends NavbarProps {
//   sidebarRef: React.RefObject<HTMLMenuElement>
// }
const Navbar: FC<NavbarProps> = ({ logout }): ReactElement => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { broken } = useProSidebar();
  const { toggle } = useSidebar();
  const { collapsed } = useProSidebar();
  // const { sideBarWidth, sideBarTitleHeight } = useSidebarContext();
  const [contract, setContract] = React.useState('');
  const [monthDate, setMonthDate] = React.useState('');

  const handleContractSelectChange = (event: SelectChangeEvent) => {
    setContract(event.target.value);
  }
  const handleMonthDateSelectChange = (event: SelectChangeEvent) => {
    setMonthDate(event.target.value);
  }
  const signOut = () => {
    logout();
    navigate('/', { replace: true})
  }
  
  const xs_Match = useMediaQuery(theme.breakpoints.up('xs'));
  const sm_Match = useMediaQuery(theme.breakpoints.up('sm'));
  const md_Match = useMediaQuery(theme.breakpoints.up('md'));
  const lg_Match = useMediaQuery(theme.breakpoints.up('lg'));
  const xl_Match = useMediaQuery(theme.breakpoints.up('xl'));
  let decrease = 0
  if (xs_Match){
    decrease = collapsed ? 10 : 75
  } 
  if (sm_Match){
    decrease = collapsed ? 89 : 257
  } 
  // if (md_Match){
  //   decrease = collapsed ? 89 : 180
  // } 
  // if (lg_Match){
  //   decrease = collapsed ? 89 : 200
  // } 
  // if (xl_Match){
  //   decrease = collapsed ? 89 : 257
  // }
  // console.log('xs_Match: ', xs_Match)
  // console.log('sm_Match: ', sm_Match)
  // console.log('md_Match: ', md_Match)
  // console.log('lg_Match: ', lg_Match)
  // console.log('xl_Match: ', xl_Match)

  var NavbarWidth = document.body.clientWidth - decrease; 
  // console.log('clientWidth: ', document.body.clientWidth)
  // console.log('decrease: ', decrease)
  // console.log('NavbarWidth: ', NavbarWidth)
  // console.log('offsetWidth: ', document.body.offsetWidth)
  // console.log('innerWidth: ', window.innerWidth)

  console.log("broken: ", broken)
  //  
  return (
    <Box 
      sx={{
        // position:"fixed", 
        backgroundColor:'rgb(201, 221, 254, 1)',
        // 'rgba(77, 144, 252, 1)', 
        width: NavbarWidth, 
        height:55
      }}
    >
      <Container maxWidth="xl">
        <Toolbar 
          disableGutters 
          sx={{
            display:'flex', 
            justifyContent:'flex-end',

          }}
        >
        <Box 
          sx={{display:'flex', 
          justifyContent:'flex-start'
        }}
        >
            {/* <Typography
              variant="subtitle1"
              color='inherit'
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: "bold",
                border: "2 solid black"
              }}
            >!sm_Match &&
            </Typography> */}
            { (
            <IconButton
              onClick={toggle}
              sx={{
                color:'inherit',
                mt:"8px"}}
            >
              <Menu />
            </IconButton>)}
          </Box>
          <Box flex={3} display='flex' justifyContent='center'>
            <FormControl sx={{ mt:-1, mx:1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small"><Typography variant="body2">تاریخ منتهی به</Typography></InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={monthDate}
                label="monthDate"
                onChange={handleMonthDateSelectChange}
                MenuProps={MenuProps}
              >
                  {monthDates.map((monthDate) => (
                    <MenuItem
                      key={monthDate}
                      value={monthDate}
                    >
                      {monthDate}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl sx={{ mt:-1, mx:1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small"><Typography variant="body2" textAlign='right'>پروژه</Typography></InputLabel>
              <Select 
                labelId="demo-select-small"
                id="demo-select-small"
                value={contract}
                label="Contract"
                onChange={handleContractSelectChange}
                MenuProps={MenuProps}
              >
                  {contracts.map((contract) => (
                    <MenuItem
                      key={contract}
                      value={contract}
                    >
                      {contract}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl> 
          </Box>
          {/* { xs: "none", sm: "flex" } */}
          <Box sx={{mt:-1, mx:1.5, display: { xs:"none", sm:'flex' }}}>
            <Tooltip 
              title={"بازدید ها"}
            >
              <ReviewsRounded 
                sx={{
                  m:'auto', 
                  color:'inherit',
                  width:20, 
                  Width:20
                }} 
              />
            </Tooltip>
            {/* </Box>*/}
            <Box sx={{ display: { xs:"none", sm:'flex' }, gap: 1, py:0, my:0, mx:1.5}}> 
                <Tooltip 
                  title={"راهنما"}
                >
                  <Help 
                    sx={{
                      m:'auto', 
                      color:'inherit',
                      width:20, 
                      height:20
                    }} 
                  />
                </Tooltip>
            </Box>
            {/* <Box sx={{display: { xs: "flex" }, justifyContent:'flex-end', py:0, my:0}}> 
            </Box> */}
            <Divider orientation="vertical" flexItem sx={{py:2, mt:2.65, height: '80%'}}/>
            <Select id='navbarSelect'
              sx={{
                '.MuiOutlinedInput-notchedOutline': { border: 0 }, 
                maxHeight:'100%', 
                px:0, 
                py:0, 
                my:0 
              }}
              displayEmpty
              renderValue={(value) => {
                return (
                  <Box sx={{ display:"flex", justifyContent:'flex-end', gap: 1, py:0, my:0 }}>
                    <>
                      <Typography 
                        sx={{display: { xs: "none", lg: "flex" }}} 
                        m='auto' 
                        color='text.secondary'
                        variant='caption'
                      >
                        Ali Sajadian
                      </Typography>
                      <Avatar sx={{ 
                        display: { xs: "none", md: "flex" }, 
                        width:45, 
                        height:45, 
                        m:0, 
                        mt:-.4,
                        p:0,
                      }}
                          src='https://avatars.githubusercontent.com/u/47317870?s=400&u=79da86747deb409779c3575c0da73d90ad65fe81&v=4'
                          alt='avatar'
                      />
                      {value}
                    </>
                  </Box>
                );
              }}
            >
              <MenuItem>امنیت</MenuItem>
              <MenuItem onClick={signOut}>خروج</MenuItem>
            </Select>
          </Box>
          <Divider orientation="vertical" flexItem sx={{py:2, mt:1.65, height: '80%', mr:2}}/>
          <ConfigDrawer/>
        </Toolbar>
      </Container>      
    </Box>

  );
};

const mapStateToProps = (state: RootState) => ({
	// currentUser: selectCurrentUser(state),
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    logout: () => dispatch(LogOut())
});

// const mapDispatchToProps = (dispatch: Dispatch<RootActions>) =>
//   bindActionCreators({
//     logout: LogOut(),
//   }, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

type NavbarProps = ConnectedProps<typeof connector>;

export default connector(Navbar)






// {
//   type: ActionType.LOGOUT ,            
// }


      // {/* <ConsoleLog title={'navbarSelect height'} message={document.getElementById("navbarSelect")?.clientHeight.toString()}/> */}

          //   {/* <Menu
          //     id="menu-appbar"
          //     anchorEl={anchorElNav}
          //     anchorOrigin={{
          //       vertical: "bottom",
          //       horizontal: "left",
          //     }}
          //     keepMounted
          //     transformOrigin={{
          //       vertical: "top",
          //       horizontal: "left",
          //     }}
          //     open={Boolean(anchorElNav)}
          //     onClose={toggle}
          //     sx={{
          //       display: { xs: "block", md: "none" },
          //     }}
          //   >
          //     {routes.map((page) => (
          //       <Link
          //         key={page.key}
          //         component={NavLink}
          //         to={page.path}
          //         color="black"
          //         underline="none"
          //         variant="button"
          //       >
          //         <MenuItem onClick={toggle}>
          //           <Typography textAlign="center">{page.title}</Typography>
          //         </MenuItem>
          //       </Link>
          //     ))}
          //   </Menu> 
          // </Box>*/}
          // {/*<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          //    <Box
          //     sx={{
          //       display: "flex",
          //       flexDirection: "row",
          //       justifyContent: "flex-start",
          //       alignItems: "center",
          //       marginLeft: "1rem",
          //     }}
          //   >
          //     {routes.map((page) => (
          //       <Link
          //         key={page.key}
          //         component={NavLink}
          //         to={page.path}
          //         color="black"
          //         underline="none"
          //         variant="button"
          //         sx={{ fontSize: "large", marginLeft: "2rem" }}
          //       >
          //         {page.title}
          //       </Link>
          //     ))}
          //   </Box> 
          // </Box>*/}
