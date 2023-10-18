import { Dispatch, FC, ReactElement, SyntheticEvent, useEffect, useState } from "react";
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
  // Tabs,
  // Tab,
  useTheme,
} from "@mui/material";
import {
  Help, 
  Menu, 
  ReviewsRounded,
  // MenuOutlined, 
  // HomeOutlined, 
  // ViewArrayOutlined,
  // DashboardOutlined, 
  // FactoryOutlined,
  // ImageOutlined,
  // AdminPanelSettingsOutlined,
  // SecurityOutlined,
  // Phone,
  // Favorite,
  // PersonPin,
} from "@mui/icons-material";
import { useProSidebar } from "react-pro-sidebar";

import {ConfigDrawer} from "../utilities/ConfigDrawer";
import { 
  useSidebar, 
  // useSidebarContext 
} from "../../hooks";
import { RootState } from "../../redux/store/store";
import { ActivateChangeUserPassword, LogOut } from "../../redux/actionCreators/authActions";
import { GetContracts, SetCurrentContract } from "../../redux/actionCreators/contractActions";
import { GetReportDates, SetCurrentReportDate } from "../../redux/actionCreators/reportDateActions";
import { IContract } from "../../models/contract";
import { IReportDate } from "../../models/reportDate";
import { IContractsState } from "../../redux/reducers/contractReducer";
import { IReportDatesState } from "../../redux/reducers/reportDateReducer";
import { IPermission, IUserContractPermission } from "../../models/permission";


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

// interface TabPanelProps {
//   children?: React.ReactNode;
//   index: number;
//   value: number;
// }

// function CustomTabPanel(props: TabPanelProps) {
//   const { children, value, index, ...other } = props;

//   return (
//     <Box 
//       sx={{ minWidth: 480, maxWidth: 520, width:500 }}
//       // role="tabpanel"
//       // hidden={value !== index}
//       // id={`simple-tabpanel-${index}`}
//       // aria-labelledby={`simple-tab-${index}`}
//       // {...other}
//     >
//       {value === index && (
//         <Box 
//         >
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </Box>
//   );
// }

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
  const theme = useTheme();
  const navigate = useNavigate();
  const { broken } = useProSidebar();
  const { toggle } = useSidebar();
  // const { setMenuTitle } = useSidebarContext();
  // const menuItemMouseUpHandler = (mnuTitle: string) => {
  //   setMenuTitle(mnuTitle)
  // };
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

  // const [value, setValue] = useState(0);
  // const [value1, setValue1] = useState(0);
  // const [value2, setValue2] = useState(0);
  // const [value3, setValue3] = useState(0);

  // const handleChange = (event: SyntheticEvent, newValue: number) => {
  //   setValue(newValue);
  // };
  // const handleChange1 = (event: SyntheticEvent, newValue: number) => {
  //   setValue1(newValue);
  // };
  // const handleChange2 = (event: SyntheticEvent, newValue: number) => {
  //   setValue2(newValue);
  // };
  // const handleChange3 = (event: SyntheticEvent, newValue: number) => {
  //   setValue3(newValue);
  // };

  const handleContractSelectChange = (event: SelectChangeEvent<typeof contractId>) => {
    setContractId(event.target.value);  
    setCurrentContract(Number(event.target.value));
  }
  const handleMonthDateSelectChange = (event: SelectChangeEvent<typeof monthDateId>) => {
    setMonthDateId(event.target.value);
    setCurrentReportDate(Number(event.target.value));
  }

  const currentContractId: number = useSelector((state: RootState) => state.contracts.currentContractId)
  const all_projects_r: boolean | null | undefined = useSelector((state: RootState) => state.auth.user?.all_projects_r)
  const all_projects_rw: boolean | null | undefined = useSelector((state: RootState) => state.auth.user?.all_projects_rw)

  // console.log('currentContractId: ', currentContractId)
  const userContractPermissions: IUserContractPermission[] = useSelector((state: RootState) => state.auth.userContractPermissions)
  const permissions: IPermission[] = userContractPermissions.length > 0  && 
      userContractPermissions.filter(x => x.contractid === currentContractId) &&
      userContractPermissions.filter(x => x.contractid === currentContractId).length > 0 ? 
      userContractPermissions.filter(x => x.contractid === currentContractId)[0].permissions : [];
  // console.log('****monthDateId: ', monthDateId)

  const signOut = () => {
    logout();
    navigate('/', { replace: true})
  }

  return (
      <Container 
        maxWidth="xl" 
        sx={{
          backgroundColor: theme.palette.background.default
          // 'rgb(201, 221, 254, 1)'
        }}
      >
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
          {/* {!broken && (
          <Box sx={{display: { xs:"none", sm:"None", md:"None", lg: "none", xl: "block"}, direction:'ltr'}}>
            <Box >
              <Tabs sx={{minHeight:30, height:35}} value={value} onChange={handleChange} aria-label="icon tabs example">
                <Tooltip title={<Typography variant='subtitle1'>اطلاعات کلی پروژه</Typography>}>
                  <Tab 
                    sx={{pt:0, pb:0, fontSize:11.5, minHeight:30, height:35, minWidth: 130, width:160, border: 1, borderColor: 'divider'}} 
                    icon={<FactoryOutlined sx={{height:20, width:20, mt:-.1}}/>} 
                    iconPosition="start"
                    label='اطلاعات کلی پروژه'
                    aria-label="phone" />
                </Tooltip>
                <Tooltip title={<Typography variant='subtitle1'>تصاویر سازه ها و اسناد</Typography>}>
                  <Tab 
                    sx={{pt:0, pb:0, fontSize:11.5, minHeight:30, height:35, minWidth: 130, width:160, border: 1, borderColor: 'divider'}} 
                    icon={<ImageOutlined sx={{height:20, width:20, mt:-.1}}/>} 
                    iconPosition="start"
                    label='تصاویر سازه ها و اسناد'
                    aria-label="favorite" />
                </Tooltip>
                <Tooltip title={<Typography variant='subtitle1'>گزارشهای مدیریتی</Typography>}>
                  <Tab 
                    sx={{pt:0, pb:0, fontSize:11.5, minHeight:30, height:35, minWidth: 130, width:160, border: 1, borderColor: 'divider'}} 
                    icon={<DashboardOutlined sx={{height:20, width:20, mt:-.1}}/>} 
                    iconPosition="start"
                    label='گزارشهای مدیریتی'
                    aria-label="person" />
                </Tooltip>
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <Tabs 
                sx={{minHeight:30, height:35}} 
                value={value1} 
                onChange={handleChange1}   
                variant="scrollable"
                scrollButtons="auto"
                aria-label="nested icon tabs example"
              >
                <Tooltip title={<Typography variant='subtitle1'>اطلاعات مالی</Typography>}>
                  <Tab 
                    sx={{pt:0, minWidth: 45, width:50, border: 1, borderColor: 'divider'}} 
                    icon={<Phone sx={{height:20, width:20, mt:-.1}}/>} 
                    onClick={() => navigate('project/financialInfo', { replace: true })}
                    onMouseUp={() => menuItemMouseUpHandler('اطلاعات مالی(چنانچه پروژه PC یا EPC است مبالغ تجمیع گردد)')}
                    disabled={permissions.length === 0 || (!permissions.some(p => p.permission === 'Project Info R') && !permissions.some(p => p.permission === 'Project Info R/W'))}
                    aria-label="phone" 
                  />
                </Tooltip>
                <Tooltip title={<Typography variant='subtitle1'>HSE</Typography>}>
                  <Tab 
                    sx={{pt:0, minWidth: 45, width:50, border: 1, borderColor: 'divider'}} 
                    icon={<Favorite sx={{height:20, width:20, mt:-.1}}/>} 
                    onClick={() => navigate('project/hse', { replace: true })}
                    onMouseUp={() => menuItemMouseUpHandler('HSE')}
                    disabled={permissions.length === 0 || (!permissions.some(p => p.permission === 'HSE R') && !permissions.some(p => p.permission === 'HSE R/W'))}
                    aria-label="favorite" 
                  />
                </Tooltip>
                <Tooltip title={<Typography variant='subtitle1'>وضعیت پیشرفت</Typography>}>
                  <Tab 
                    sx={{pt:0, minWidth: 45, width:50, border: 1, borderColor: 'divider'}} 
                    icon={<PersonPin sx={{height:20, width:20, mt:-.1}}/>} 
                    onClick={() => navigate('project/progressState', { replace: true })}
                    onMouseUp={() => menuItemMouseUpHandler('گزارش وضعیت پیشرفت پروژه در حال حاضر')}
                    disabled={permissions.length === 0 || (!permissions.some(p => p.permission === 'Progress State R') && !permissions.some(p => p.permission === 'Progress State R/W'))}
                    aria-label="person" 
                  />
                </Tooltip>
                <Tooltip title={<Typography variant='subtitle1'>وضعیت پیشرفت زمانی</Typography>}>
                  <Tab 
                    sx={{pt:0, minWidth: 45, width:50, border: 1, borderColor: 'divider'}} 
                    icon={<Phone sx={{height:20, width:20, mt:-.1}}/>} 
                    onClick={() => navigate('project/timeProgress', { replace: true })}
                    onMouseUp={() => menuItemMouseUpHandler('گزارش وضعیت پیشرفت زمانی پروژه در حال حاضر')}
                    disabled={permissions.length === 0 || (!permissions.some(p => p.permission === 'Time Progress State R') && !permissions.some(p => p.permission === 'Time Progress State R/W'))}
                    aria-label="phone" 
                  />
                </Tooltip>
                <Tooltip title={<Typography variant='subtitle1'>صورت وضعیتها</Typography>}>
                  <Tab 
                    sx={{pt:0, minWidth: 45, width:50, border: 1, borderColor: 'divider'}} 
                    icon={<Favorite sx={{height:20, width:20, mt:-.1}}/>} 
                    onClick={() => navigate('project/invoice', { replace: true })}
                    onMouseUp={() => menuItemMouseUpHandler('صورت وضعیت')}
                    disabled={permissions.length === 0 || (!permissions.some(p => p.permission === 'Invoices R') && !permissions.some(p => p.permission === 'Invoices R/W'))}
                    aria-label="favorite" 
                    />
                </Tooltip>
                <Tooltip title={<Typography variant='subtitle1'>صورت وضعیتها مالی</Typography>}>
                  <Tab 
                    sx={{pt:0, minWidth: 45, width:50, border: 1, borderColor: 'divider'}} 
                    icon={<PersonPin sx={{height:20, width:20, mt:-.1}}/>} 
                    onClick={() => navigate('project/invoiceFinancial', { replace: true })}
                    onMouseUp={() => menuItemMouseUpHandler('صورت وضعیت مالی')}
                    disabled={permissions.length === 0 || (!permissions.some(p => p.permission === 'Invoice Financial R') && !permissions.some(p => p.permission === 'Invoice Financial R/W'))}
                    aria-label="person" 
                  />
                </Tooltip>
                <Tooltip title={<Typography variant='subtitle1'>احجام انجام شده</Typography>}>
                  <Tab 
                    sx={{pt:0, minWidth: 45, width:50, border: 1, borderColor: 'divider'}} 
                    icon={<Phone sx={{height:20, width:20, mt:-.1}}/>} 
                    onClick={() => navigate('project/workVolume', { replace: true })}
                    onMouseUp={() => menuItemMouseUpHandler('شرح احجام انجام شده تا کنون')}
                    disabled={permissions.length === 0 || (!permissions.some(p => p.permission === 'Work Volume Done R') && !permissions.some(p => p.permission === 'Work Volume Done R/W'))}
                    aria-label="phone" 
                  />
                </Tooltip>
                <Tooltip title={<Typography variant='subtitle1'>pms درصد پیشرفت</Typography>}>
                  <Tab 
                    sx={{pt:0, minWidth: 45, width:50, border: 1, borderColor: 'divider'}} 
                    icon={<Favorite sx={{height:20, width:20, mt:-.1}}/>} 
                    onClick={() => navigate('project/pmsProgress', { replace: true })}
                    onMouseUp={() => menuItemMouseUpHandler('PMS درصدهای پیشرفت مطابق ')}
                    disabled={permissions.length === 0 || (!permissions.some(p => p.permission === 'PMS Progress R') && !permissions.some(p => p.permission === 'PMS Progress R/W'))}
                    aria-label="favorite" 
                  />
                </Tooltip>
                <Tooltip title={<Typography variant='subtitle1'>بودجه مصوب</Typography>}>
                  <Tab 
                    sx={{pt:0, minWidth: 45, width:50, border: 1, borderColor: 'divider'}} 
                    icon={<PersonPin sx={{height:20, width:20, mt:-.1}}/>} 
                    onClick={() => navigate('project/budget', { replace: true })}
                    onMouseUp={() => menuItemMouseUpHandler('بودجه مصوب و هزینه های تجمعی')}
                    disabled={permissions.length === 0 || (!permissions.some(p => p.permission === 'Budget R') && !permissions.some(p => p.permission === 'Budget R/W'))}
                    aria-label="person" 
                  />
                </Tooltip>
                <Tooltip title={<Typography variant='subtitle1'>ماشین آلات</Typography>}>
                  <Tab 
                    sx={{pt:0, minWidth: 45, width:50, border: 1, borderColor: 'divider'}} 
                    icon={<Phone sx={{height:20, width:20, mt:-.1}}/>} 
                    onClick={() => navigate('project/machinery', { replace: true })}
                    onMouseUp={() => menuItemMouseUpHandler(' اهم ماشین آلات')}
                    disabled={permissions.length === 0 || (!permissions.some(p => p.permission === 'Machinary R') && !permissions.some(p => p.permission === 'Machinary R/W'))}
                    aria-label="phone" 
                  />
                </Tooltip>
                <Tooltip title={<Typography variant='subtitle1'>منابع انسانی</Typography>}>
                  <Tab 
                    sx={{pt:0, minWidth: 45, width:50, border: 1, borderColor: 'divider'}} 
                    icon={<Favorite sx={{height:20, width:20, mt:-.1}}/>} 
                    onClick={() => navigate('project/personal', { replace: true })}
                    onMouseUp={() => menuItemMouseUpHandler('نیروی انسانی ستادی و اجرایی')}
                    disabled={permissions.length === 0 || (!permissions.some(p => p.permission === 'Project Personel R') && !permissions.some(p => p.permission === 'Project Personel R/W'))}
                    aria-label="favorite" 
                  />
                </Tooltip>
                <Tooltip title={<Typography variant='subtitle1'>موانع و مشکلات</Typography>}>
                  <Tab 
                    sx={{pt:0, minWidth: 45, width:50, border: 1, borderColor: 'divider'}} 
                    icon={<PersonPin sx={{height:20, width:20, mt:-.1}}/>} 
                    onClick={() => navigate('project/problems', { replace: true })}
                    onMouseUp={() => menuItemMouseUpHandler('مشکلات و موانع پیشبرد پروژه')}
                    disabled={permissions.length === 0 || (!permissions.some(p => p.permission === 'Problems R') && !permissions.some(p => p.permission === 'Problems R/W'))}
                    aria-label="person" 
                  />
                </Tooltip> 
                <Tooltip title={<Typography variant='subtitle1'>فعالیتهای بحرانی</Typography>}>
                  <Tab 
                    sx={{pt:0, minWidth: 45, width:50, border: 1, borderColor: 'divider'}} 
                    icon={<PersonPin sx={{height:20, width:20, mt:-.1}}/>} 
                    onClick={() => navigate('project/criticalActions', { replace: true })}
                    onMouseUp={() => menuItemMouseUpHandler('فعالیتهای بحرانی و اصلی ماه آینده')}
                    disabled={permissions.length === 0 || (!permissions.some(p => p.permission === 'Critical Action R') && !permissions.some(p => p.permission === 'Critical Action R/W'))}
                    aria-label="person" 
                  />
                </Tooltip>                      
              </Tabs>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <Tabs sx={{minHeight:30, height:35}} value={value2} onChange={handleChange2} aria-label="nested icon tabs example">
                <Tooltip title={<Typography variant='subtitle1'>"تصاویر سازه ها"</Typography>}>
                  <Tab 
                    sx={{pt:0, minWidth: 45, width:50, border: 1, borderColor: 'divider'}} 
                    icon={<MenuOutlined sx={{height:20, width:20, mt:-.1}}/>} 
                    onClick={() => navigate('documents/constructionImages', { replace: true })}
                    onMouseUp={() => menuItemMouseUpHandler("تصاویر سازه ها و اسناد")}
                    // label="تصاویر سازه ها و اسناد"
                    disabled={permissions.length === 0 || (!permissions.some(p => p.permission === 'Zone R') && !permissions.some(p => p.permission === 'Zone R/W'))}
                    aria-label="phone" 
                  />
                </Tooltip>
                <Tooltip title={<Typography variant='subtitle1'>اسناد پروژه</Typography>}>
                  <Tab 
                    sx={{pt:0, minWidth: 45, width:50, border: 1, borderColor: 'divider'}} 
                    icon={<HomeOutlined sx={{height:20, width:20, mt:-.1}}/>} 
                    onClick={() => navigate('documents/durationDocuments', { replace: true })}
                    onMouseUp={() => menuItemMouseUpHandler('اسناد پروژه')}
                    disabled={permissions.length === 0 || (!permissions.some(p => p.permission === 'Project Documents R') && !permissions.some(p => p.permission === 'Project Documents R/W'))}
                    aria-label="favorite" 
                  />
                </Tooltip>
                <Tooltip title={<Typography variant='subtitle1'>اسناد دوره ای</Typography>}>
                  <Tab 
                    sx={{pt:0, minWidth: 45, width:50, border: 1, borderColor: 'divider'}} 
                    icon={<ViewArrayOutlined sx={{height:20, width:20, mt:-.1}}/>} 
                    onClick={() => navigate('documents/projectDocuments', { replace: true })}
                    onMouseUp={() => menuItemMouseUpHandler('اسناد دوره ای')}
                    disabled={permissions.length === 0 || (!permissions.some(p => p.permission === 'Periodic Documents R') && !permissions.some(p => p.permission === 'Periodic Documents R/W'))}
                    aria-label="person" 
                  />
                </Tooltip>
              </Tabs>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <Tabs sx={{minHeight:30, height:35}} value={value3} onChange={handleChange3} aria-label="nested icon tabs example">
                <Tooltip title={<Typography variant='subtitle1'>داشبورد مدیریتی</Typography>}>
                  <Tab 
                    sx={{pt:0, minWidth: 45, width:50, border: 1, borderColor: 'divider'}} 
                    icon={<AdminPanelSettingsOutlined sx={{height:20, width:20, mt:-.1}}/>} 
                    onClick={() => navigate('report/managementReport', { replace: true })}
                    onMouseUp={() => menuItemMouseUpHandler('داشبورد مدیریتی')}
                    disabled={permissions.length === 0 || !permissions.some(p => p.permission === 'Dashboard Report R')}
                    aria-label="phone" 
                  />
                </Tooltip>
                <Tooltip title={<Typography variant='subtitle1'>داشبورد مدیریتی ارزی</Typography>}>
                  <Tab 
                    sx={{pt:0, minWidth: 45, width:50, border: 1, borderColor: 'divider'}} 
                    icon={<SecurityOutlined sx={{height:20, width:20, mt:-.1}}/>} 
                    onClick={() => navigate('report/managementReport_fc', { replace: true })}
                    onMouseUp={() => menuItemMouseUpHandler('داشبورد مدیریتی ارزی')}
                    disabled={permissions.length === 0 || !permissions.some(p => p.permission === 'Dashboard Report FC R')}
                    aria-label="favorite" 
                  />
                </Tooltip>
              </Tabs>
            </CustomTabPanel>
          </Box>
          )} */}
          <Box flex={3} display='flex' justifyContent='center'>
            <FormControl sx={{ mt:-1, mx:1, minWidth: 150}} size="small">
              <InputLabel id="demo-select-small"><Typography variant="body2" textAlign='right'>پروژه</Typography></InputLabel>
              <Select 
                labelId="demo-select-small"
                id="demo-select-small"
                value={contractId}
                label="ReportDate"
                onChange={handleContractSelectChange}
                MenuProps={MenuProps}
                sx={{fontFamily:'B Nazanin', maxWidth:400}}
              >
                  {contracts.map((contract: IContract) => 
                  {
                    return(
                      <MenuItem
                      key={contract.contractid}
                      value={contract.contractid}
                      sx={{fontFamily:'B Nazanin'}}
                    >
                      {contract.contract}
                    </MenuItem>
                    );
                  })}
              </Select>
            </FormControl> 
            <FormControl sx={{ mt:-1, mx:1, minWidth: 90 }} size="small">
              <InputLabel id="demo-select-small"><Typography variant="body2">تاریخ منتهی به</Typography></InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={monthDateId}
                label="monthDate"
                onChange={handleMonthDateSelectChange}
                MenuProps={MenuProps}
                sx={{fontFamily:'B Nazanin'}}
              >
                  {reportDates.map((reportDate: IReportDate) => 
                  {
                    return(
                      <MenuItem
                        key={reportDate.dateid}
                        value={reportDate.dateid}
                        sx={{fontFamily:'B Nazanin'}}
                        >
                        {reportDate.shamsiDate}
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
              <Box sx={{ display: { xs:"none", sm:'flex' }, py:0, my:0, mx:1}}> 
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
                  mx:0,
                  py:0, 
                  my:0 
                }}
                displayEmpty
                renderValue={(value) => {
                  return (
                    <Box sx={{ display:"flex", justifyContent:'flex-end', py:0, my:0 }}>
                      <>
                        <Typography 
                          sx={{display: { xs: "none", lg: "flex"}, fontFamily:'B Nazanin'}} 
                          m='auto' 
                          color='text.secondary'
                          variant='button'
                        >
                          {fullname}
                        </Typography>
                        <Avatar 
                          sx={{ 
                            display: { xs: "none", md: "flex" }, 
                            width:45, 
                            height:45, 
                            m:0, 
                            mt:-.4,
                            p:0,
                            gap:.5
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
                  <Typography variant="button" fontFamily='B Nazanin'>
                    تغییر کلمه عبور
                  </Typography>
                </MenuItem>
                <MenuItem onClick={signOut}>
                  <Typography variant="button" fontFamily='B Nazanin'>
                    خروج
                  </Typography>
                </MenuItem>
              </Select>
            </Box>
            <Divider orientation="vertical" flexItem sx={{py:2, mt:1.65, height:'80%'}}/>
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
     
          









// export default function BasicTabs() {


//   return (
//   );
// }




// import * as React from 'react';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import PhoneIcon from '@mui/icons-material/Phone';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import PersonPinIcon from '@mui/icons-material/PersonPin';

// export default function IconTabs() {
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
//     setValue(newValue);
//   };

//   return (
//     <Tabs value={value} onChange={handleChange} aria-label="icon tabs example">
//       <Tab icon={<PhoneIcon />} aria-label="phone" />
//       <Tab icon={<FavoriteIcon />} aria-label="favorite" />
//       <Tab icon={<PersonPinIcon />} aria-label="person" />
//     </Tabs>
//   );
// }
