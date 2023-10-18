import { Dispatch, FC, ReactElement, useEffect, useState } from "react";
import { ConnectedProps, connect, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  IconButton,
  Toolbar,
  Typography,
  Divider,
  Box,
  Select,
  MenuItem,
  Avatar,
  Tooltip,
  SelectChangeEvent,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Help, Menu, ReviewsRounded } from "@mui/icons-material";
import { useProSidebar } from "react-pro-sidebar";

import {ConfigDrawer} from "../utilities/ConfigDrawer";
import { useSidebar } from "../../hooks";
import { RootState } from "../../redux/store/store";
import { ActivateChangeUserPassword, LogOut } from "../../redux/actionCreators/authActions";
import { GetContracts, SetCurrentContract } from "../../redux/actionCreators/contractActions";
import { GetReportDates, SetCurrentReportDate } from "../../redux/actionCreators/reportDateActions";
import { IContract } from "../../models/contract";
import { IReportDate } from "../../models/reportDate";
import { IContractsState } from "../../redux/reducers/contractReducer";
import { IReportDatesState } from "../../redux/reducers/reportDateReducer";


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

const Navbar: FC<NavbarProps> = ({ 
    userid, 
    fullname,
    userImage,
    getContracts,
    getReportDates,
    setCurrentContract,
    setCurrentReportDate,
    activateChangeUserPassword,
    logout,
  }): ReactElement => {
  const navigate = useNavigate();
  const { broken } = useProSidebar();
  const { toggle } = useSidebar();

  useEffect(() => {
    getContracts(userid!);
    getReportDates();
  }, [getContracts, getReportDates, userid])

  const contractState: IContractsState = useSelector((state: RootState) => state.contracts)
  const contracts: IContract[] = contractState.contracts
// console.log('contracts: ', contracts)
  const reportDateState: IReportDatesState = useSelector((state: RootState) => state.reportDates)
  const reportDates: IReportDate[] = reportDateState.reportDates
  
  const [contractId, setContractId] = useState<string>('');
  const [monthDateId, setMonthDateId] = useState<string>('');

  useEffect(() => {
    if(contracts !== null && contracts.length > 0){
      setContractId(String(contracts[0].contractid));
      setCurrentContract(contracts[0].contractid);
      // console.log('^^^^contractid: ', String(contracts[0].contractid))

    }
  }, [contracts, setCurrentContract])

  useEffect(() => {
    if(reportDates !== null && reportDates.length > 0){
      setMonthDateId(String(reportDates[0].dateid));
      setCurrentReportDate(reportDates[0].dateid);
      // console.log('^^^^dateid: ', String(reportDates[0].dateid))
    }
  }, [reportDates, setCurrentReportDate])


  const handleContractSelectChange = (event: SelectChangeEvent<typeof contractId>) => {
    setContractId(event.target.value);  
    setCurrentContract(Number(event.target.value));
  }
  const handleMonthDateSelectChange = (event: SelectChangeEvent<typeof monthDateId>) => {
    setMonthDateId(event.target.value);
    setCurrentReportDate(Number(event.target.value));
  }

  // console.log('****monthDateId: ', monthDateId)

  const signOut = () => {
    logout();
    navigate('/', { replace: true})
  }

  // console.log('----fullname: ', fullname)

  // console.log('----userImage: ', userImage)
  return (
      <Container maxWidth="xl" sx={{backgroundColor:'rgb(201, 221, 254, 1)', height:55}}>
        <Toolbar 
          disableGutters 
          sx={{
            display:'flex', 
            justifyContent:'space-between'
          }}
        >
          <Box 
            sx={{
              display:'flex', 
              justifyContent:'flex-start'
            }}
          >
            {broken && (
            <IconButton
              onClick={toggle}
              sx={{
                color:'inherit',
                mt:-1.5}}
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
                value={monthDateId}
                label="monthDate"
                onChange={handleMonthDateSelectChange}
                MenuProps={MenuProps}
              >
                  {reportDates.map((reportDate: IReportDate) => 
                  {
                    return(
                      <MenuItem
                        key={reportDate.dateid}
                        value={reportDate.dateid}
                      >
                        {reportDate.shamsiDate}
                      </MenuItem>
                    );
                    })}
              </Select>
            </FormControl>
            <FormControl sx={{ mt:-1, mx:1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small"><Typography variant="body2" textAlign='right'>پروژه</Typography></InputLabel>
              <Select 
                labelId="demo-select-small"
                id="demo-select-small"
                value={contractId}
                label="ReportDate"
                onChange={handleContractSelectChange}
                MenuProps={MenuProps}
              >
                  {contracts.map((contract: IContract) => 
                  {
                    return(
                      <MenuItem
                      key={contract.contractid}
                      value={contract.contractid}
                    >
                      {contract.contract}
                    </MenuItem>
                    );
                  })}
              </Select>
            </FormControl> 
          </Box>
          <Box display='flex'>
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
              <Divider orientation="vertical" flexItem sx={{py:2, mt:2.5, height:'40%'}}/>
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
                          {fullname}
                        </Typography>
                        <Avatar sx={{ 
                          display: { xs: "none", md: "flex" }, 
                          width:45, 
                          height:45, 
                          m:0, 
                          mt:-.4,
                          p:0,
                        }}
                            // src='https://avatars.githubusercontent.com/u/47317870?s=400&u=79da86747deb409779c3575c0da73d90ad65fe81&v=4'
                            src={userImage}
                            alt='avatar'
                        />
                        {value}
                      </>
                    </Box>
                  );
                }}
              >
                <MenuItem 
                  onClick={() => {
                      activateChangeUserPassword(true);
                      navigate('auth/changepassword', { replace: true });
                  }}
                >
                  تغییر کلمه عبور
                </MenuItem>
                <MenuItem onClick={signOut}>خروج</MenuItem>
              </Select>
            </Box>
            <Divider orientation="vertical" flexItem sx={{py:2, mt:1.65, height:'80%', mr:2}}/>
            <ConfigDrawer/>
          </Box>
        </Toolbar>
      </Container>
  );
};

const mapStateToProps = (state: RootState) => ({
    userid: state.auth.user?.id,
    fullname: state.auth.user?.full_name,
    userImage: state.auth.user?.user_img,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  getContracts: (userId: number) => 
    dispatch(GetContracts(userId)),
  getReportDates: () => 
    dispatch(GetReportDates()),
  setCurrentContract: (currentContractId: number) => 
    dispatch(SetCurrentContract(currentContractId)),
  setCurrentReportDate: (currentReportDateId: number) => 
    dispatch(SetCurrentReportDate(currentReportDateId)),
  activateChangeUserPassword: (active: boolean) => 
    dispatch(ActivateChangeUserPassword(active)),
  logout: () => dispatch(LogOut()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type NavbarProps = ConnectedProps<typeof connector>;

export default connector(Navbar)







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


          
          