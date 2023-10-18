import { 
  FC, 
  ReactElement, 
  // useCallback, 
  // useEffect, 
  // useRef,
  // useState
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Sidebar, 
  Menu, 
  MenuItem, 
  SubMenu, 
  useProSidebar 
} from "react-pro-sidebar";
import {
  MenuOutlined, 
  HomeOutlined, 
  ViewArrayOutlined,
  DashboardOutlined, 
  FactoryOutlined,
  ImageOutlined,
  AdminPanelSettingsOutlined,
  SecurityOutlined
  // Person,
  // InfoOutlined, 
  // SearchOutlined,
  // RecommendOutlined,
  // Build,
  // ConstructionOutlined,
  // DocumentScannerOutlined,
  // ReportOutlined,
  // Report,
  // SecurityOutlined,
  // ImageAspectRatioOutlined,
  // ImageAspectRatioSharp,
} from "@mui/icons-material";
import { 
  Box, 
  Typography, 
  useTheme
} from "@mui/material";
// import { SidebarFooter } from "./SidebarFooter";
// import { Badge } from "../utilities/Badge";
import { 
  useSidebar, 
  useSidebarContext,
  useTemplateDirectionContext,
} from "../../hooks";
import { useDispatch, useSelector,
  // ConnectedProps, connect, 
} from "react-redux";
import { ActivateChangeUserPassword } from "../../redux/actionCreators/authActions";
import { RootState } from "../../redux/store/store";
import { IPermission, IUserContractPermission } from "../../models/permission";
// import { Dispatch } from "redux";

// interface SideBarProps {
//   sidebarRef: React.RefObject<HTMLMenuElement>
// }
export const SideBar: FC = (): ReactElement => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { 
    collapsed, 
    // collapseSidebar 
  } = useProSidebar();
  const { 
    toggle,
    menuItemStyles
  } = useSidebar();
  const { setMenuTitle, 
    // setSideBarWidth, setSideBarTitleHeight, sideBarWidth, sideBarTitleHeight 
  } = useSidebarContext();
  const { rtl } = useTemplateDirectionContext();

  const currentContractId: number = useSelector((state: RootState) => state.contracts.currentContractId)
  const all_projects_r: boolean | null | undefined = useSelector((state: RootState) => state.auth.user?.all_projects_r)
  const all_projects_rw: boolean | null | undefined = useSelector((state: RootState) => state.auth.user?.all_projects_rw)

  // console.log('currentContractId: ', currentContractId)
  const userContractPermissions: IUserContractPermission[] = useSelector((state: RootState) => state.auth.userContractPermissions)
  const permissions: IPermission[] = 
      (userContractPermissions.length === 1 && userContractPermissions[0].contractid === null) ?
      userContractPermissions[0].permissions :
      (userContractPermissions.length > 0  && 
      userContractPermissions.filter(x => x.contractid === currentContractId) &&
      userContractPermissions.filter(x => x.contractid === currentContractId).length > 0) ? 
      userContractPermissions.filter(x => x.contractid === currentContractId)[0].permissions : [];
  // console.log('userContractPermissions: ', userContractPermissions)
  // console.log('permissions: ', permissions)
      

  // const sidebarRef = useRef<HTMLMenuElement>(null);

  // const [ sideBarWidth, setSideBarWidth ] = useState<number>(0)
  // const [ sideBarTitleHeight, setSideBarTitleHeight ] = useState<number>(0)

  // const refCallback = useCallback((node: HTMLMenuElement) => {
  //   if (node !== null) {
  //     setSideBarWidth(node.getBoundingClientRect().height)
  //     setSideBarTitleHeight(node.getBoundingClientRect().width)
  //   }
  // }, [])

  // useEffect(() => {
  //   console.log('test')
  // }, [sidebarRef.current])

  // console.log("1.... ", sideBarWidth, sideBarTitleHeight)

  const menuItemMouseUpHandler = (mnuTitle: string) => {
    setMenuTitle(mnuTitle)
  };
  return(
    <Sidebar  
      rtl={false} 
      breakPoint="sm"
      // defaultCollapsed={true}
      transitionDuration={800} 
      style={{ height: "100vh" }}
      backgroundColor= {theme.palette.background.default}
      // 'rgba(11, 105, 255, 0.1)'
      
      dir={rtl ? 'rtl' : 'ltr'}
      rootStyles={{
        color: 'inherit',
        fontFamily:'B Nazanin',
      }}
    >
      <Menu 
      // ref={refCallback}
      >
        <MenuItem 
          style={{ 
            backgroundColor:'rgba(77, 144, 252, 0.1)',
            textAlign: "center", 
            height: 70, 
            marginTop: 0,
            // background: theme.palette.primary,
            // backgroundColor: 'rgba(11, 105, 255, 0.4)'

            // boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.4)',
          }}
          icon={<MenuOutlined 
                  sx={{color: 'inherit'}}
                />}
          onClick={() => {
            toggle();
          }}
        >
          {" "}
          <Typography 
            sx={{textAlign:"center", fontWeight:"bold", color: 'inherit'}} 
            variant="h6"
          >
            PMRS
          </Typography>
        </MenuItem>
      </Menu>
      <Box sx={{ p: '0 24px', mb: '8px', mt: '8px' }}>
        <Typography
          variant="body2"
          fontWeight={600}
          sx={{ opacity: collapsed ? 0 : 0.8, letterSpacing: '0.5px', fontFamily:'B Nazanin', fontSize:'1em'}}
        >
          اطلاعات پروژه
        </Typography>
      </Box>
      <Menu menuItemStyles={menuItemStyles}>
        <MenuItem 
          icon={<HomeOutlined />} 
          onClick={() => (navigate('/', { replace: true }))} 
          onMouseUp={() => menuItemMouseUpHandler('اطلاعات کلی پروژه')}
        >
          اطلاعات کلی پروژه
        </MenuItem>
        {/* <SubMenu icon={<InfoOutlined />} label="اطلاعات پایه">
          <MenuItem onClick={() => navigate('baseinfo/contract', { replace: true })}
            onMouseUp={() => menuItemMouseUpHandler('قرارداد')}>قرارداد ها</MenuItem>
          <MenuItem onClick={() => navigate('baseinfo/contractType', { replace: true })}
            onMouseUp={() => menuItemMouseUpHandler('نوع قرارداد')}>نوع قرارداد ها</MenuItem>
          <MenuItem onClick={() => navigate('baseinfo/customer', { replace: true })}
            onMouseUp={() => menuItemMouseUpHandler('کارفرما')}>کارفرما</MenuItem>
          <MenuItem onClick={() => navigate('baseinfo/projectManager', { replace: true })}
            onMouseUp={() => menuItemMouseUpHandler('مدیر پروژه')}>مدیر پروژه</MenuItem>
          <MenuItem onClick={() => navigate('baseinfo/coordinator', { replace: true })}
            onMouseUp={() => menuItemMouseUpHandler('هماهنگ کننده')}>هماهنگ کننده</MenuItem>
        </SubMenu> */}
        <SubMenu icon={<FactoryOutlined />} label="اطلاعات ماهانه پروژه">
          {permissions.length > 0 && (permissions.some(p => p.permission === 'System Admin') || 
                                    permissions.some(p => p.permission === 'Project Info R') || 
                                    permissions.some(p => p.permission === 'Project Info R/W')) &&
            <MenuItem 
              onClick={() => navigate('project/financialInfo', { replace: true })}
              onMouseUp={() => menuItemMouseUpHandler('اطلاعات مالی(چنانچه پروژه PC یا EPC است مبالغ تجمیع گردد)')}
            >اطلاعات مالی</MenuItem>
          }  
          {permissions.length > 0 && (permissions.some(p => p.permission === 'System Admin') || 
                                             permissions.some(p => p.permission === 'HSE R') || 
                                             permissions.some(p => p.permission === 'HSE R/W')) &&
            <MenuItem 
              onClick={() => navigate('project/hse', { replace: true })}
              onMouseUp={() => menuItemMouseUpHandler('HSE')}
            >HSE</MenuItem>
          }
          {permissions.length > 0 && (permissions.some(p => p.permission === 'System Admin') || 
                                  permissions.some(p => p.permission === 'Progress State R') || 
                                  permissions.some(p => p.permission === 'Progress State R/W')) &&
            <MenuItem 
              onClick={() => navigate('project/progressState', { replace: true })}
              onMouseUp={() => menuItemMouseUpHandler('گزارش وضعیت پیشرفت پروژه در حال حاضر')}
            >وضعیت پیشرفت</MenuItem>
          }
          {permissions.length > 0 && (permissions.some(p => p.permission === 'System Admin') ||   
                             permissions.some(p => p.permission === 'Time Progress State R') || 
                             permissions.some(p => p.permission === 'Time Progress State R/W')) &&
            <MenuItem 
              onClick={() => navigate('project/timeProgress', { replace: true })}
              onMouseUp={() => menuItemMouseUpHandler('گزارش وضعیت پیشرفت زمانی پروژه در حال حاضر')}
            >وضعیت پیشرفت زمانی</MenuItem>
          }
          {permissions.length > 0 && (permissions.some(p => p.permission === 'System Admin') || 
                                        permissions.some(p => p.permission === 'Invoices R') || 
                                        permissions.some(p => p.permission === 'Invoices R/W')) &&
            <MenuItem 
              onClick={() => navigate('project/invoice', { replace: true })}
              onMouseUp={() => menuItemMouseUpHandler('صورت وضعیت')}
            >صورت وضعیتها</MenuItem>
          }
          {permissions.length > 0 && (permissions.some(p => p.permission === 'System Admin') || 
                               permissions.some(p => p.permission === 'Invoice Financial R') || 
                               permissions.some(p => p.permission === 'Invoice Financial R/W')) &&
            <MenuItem 
              onClick={() => navigate('project/invoiceFinancial', { replace: true })}
              onMouseUp={() => menuItemMouseUpHandler('صورت وضعیت مالی')}
            >صورت وضعیتها مالی</MenuItem>
          }
          {permissions.length > 0 && (permissions.some(p => p.permission === 'System Admin') || 
                                permissions.some(p => p.permission === 'Work Volume Done R') || 
                                permissions.some(p => p.permission === 'Work Volume Done R/W')) &&
            <MenuItem 
              onClick={() => navigate('project/workVolume', { replace: true })}
              onMouseUp={() => menuItemMouseUpHandler('شرح احجام انجام شده تا کنون')}
            >احجام انجام شده</MenuItem>
          }
          {permissions.length > 0 && (permissions.some(p => p.permission === 'System Admin') || 
                                    permissions.some(p => p.permission === 'PMS Progress R') || 
                                    permissions.some(p => p.permission === 'PMS Progress R/W')) &&
            <MenuItem 
              onClick={() => navigate('project/pmsProgress', { replace: true })}
              onMouseUp={() => menuItemMouseUpHandler('PMS درصدهای پیشرفت مطابق ')}
            >pms درصد پیشرفت</MenuItem>
          }
          {permissions.length > 0 && (permissions.some(p => p.permission === 'System Admin') || 
                                          permissions.some(p => p.permission === 'Budget R') || 
                                          permissions.some(p => p.permission === 'Budget R/W')) &&
            <MenuItem 
              onClick={() => navigate('project/budget', { replace: true })}
              onMouseUp={() => menuItemMouseUpHandler('بودجه مصوب و هزینه های تجمعی')}
            >بودجه مصوب</MenuItem>
          }
          {permissions.length > 0 && (permissions.some(p => p.permission === 'System Admin') || 
                                       permissions.some(p => p.permission === 'Machinary R') || 
                                       permissions.some(p => p.permission === 'Machinary R/W')) &&
            <MenuItem 
              onClick={() => navigate('project/machinery', { replace: true })}
              onMouseUp={() => menuItemMouseUpHandler(' اهم ماشین آلات')}
            >ماشین آلات</MenuItem>
          }
          {permissions.length > 0 && (permissions.some(p => p.permission === 'System Admin') || 
                                permissions.some(p => p.permission === 'Project Personel R') || 
                                permissions.some(p => p.permission === 'Project Personel R/W')) &&
            <MenuItem 
              onClick={() => navigate('project/personal', { replace: true })}
              onMouseUp={() => menuItemMouseUpHandler('نیروی انسانی ستادی و اجرایی')}
            >منابع انسانی</MenuItem>
          }
          {permissions.length > 0 && (permissions.some(p => p.permission === 'System Admin') || 
                                        permissions.some(p => p.permission === 'Problems R') || 
                                        permissions.some(p => p.permission === 'Problems R/W')) &&
            <MenuItem 
              onClick={() => navigate('project/problems', { replace: true })}
              onMouseUp={() => menuItemMouseUpHandler('مشکلات و موانع پیشبرد پروژه')}
            >موانع و مشکلات</MenuItem>
          }
          {permissions.length > 0 && (permissions.some(p => p.permission === 'System Admin') || 
                                 permissions.some(p => p.permission === 'Critical Action R') || 
                                 permissions.some(p => p.permission === 'Critical Action R/W')) &&
            <MenuItem 
              onClick={() => navigate('project/criticalActions', { replace: true })}
              onMouseUp={() => menuItemMouseUpHandler('فعالیتهای بحرانی و اصلی ماه آینده')}
            >فعالیتهای بحرانی</MenuItem>
          }
        </SubMenu>
        <SubMenu icon={<ImageOutlined />} label="تصاویر سازه ها و اسناد">
          {permissions.length > 0 && (permissions.some(p => p.permission === 'System Admin') || 
                                            permissions.some(p => p.permission === 'Zone R') || 
                                            permissions.some(p => p.permission === 'Zone R/W')) &&
            <MenuItem 
              onClick={() => navigate('documents/constructionImages', { replace: true })}
              onMouseUp={() => menuItemMouseUpHandler('سازه ها')}
            >سازه ها</MenuItem>
          }
          {permissions.length > 0 && (permissions.some(p => p.permission === 'System Admin') || 
                               permissions.some(p => p.permission === 'Project Documents R') || 
                               permissions.some(p => p.permission === 'Project Documents R/W')) &&
            <MenuItem 
              onClick={() => navigate('documents/durationDocuments', { replace: true })}
              onMouseUp={() => menuItemMouseUpHandler('اسناد پروژه')}
            >اسناد پروژه</MenuItem>
          }
          {permissions.length > 0 && (permissions.some(p => p.permission === 'System Admin') || 
                              permissions.some(p => p.permission === 'Periodic Documents R') || 
                              permissions.some(p => p.permission === 'Periodic Documents R/W')) &&
            <MenuItem 
              onClick={() => navigate('documents/projectDocuments', { replace: true })}
              onMouseUp={() => menuItemMouseUpHandler('اسناد دوره ای')}
              >اسناد دوره ای</MenuItem>
          }
        </SubMenu>
        <Box sx={{ p: '0 24px', mb: '8px', mt: '8px' }}>
        <Typography
          variant="body2"
          fontWeight={600}
          sx={{ opacity: collapsed ? 0 : 0.8, letterSpacing: '0.5px', fontFamily:'B Nazanin', fontSize:'1em'}}
        >
          گزارشات
        </Typography>
      </Box>
      <SubMenu icon={<DashboardOutlined />} label="گزارشهای مدیریتی">
        {permissions.length > 0 && (permissions.some(p => p.permission === 'System Admin') || 
                                permissions.some(p => p.permission === 'Dashboard Report R')) &&
          <MenuItem 
            onClick={() => navigate('report/managementReport', { replace: true })}
            onMouseUp={() => menuItemMouseUpHandler('داشبورد مدیریتی')}
          >داشبورد مدیریتی</MenuItem>
        }
        {permissions.length > 0 && (permissions.some(p => p.permission === 'System Admin') || 
                             permissions.some(p => p.permission === 'Dashboard Report FC R')) &&
          <MenuItem 
            onClick={() => navigate('report/managementReport_fc', { replace: true })}
            onMouseUp={() => menuItemMouseUpHandler('داشبورد مدیریتی ارزی')}
          >داشبورد مدیریتی ارزی</MenuItem>
        }
      </SubMenu>
      <SubMenu icon={<ImageOutlined />} label="گزارش تصاویر سازه ها">
        {permissions.length > 0 && (permissions.some(p => p.permission === 'System Admin') || 
                         permissions.some(p => p.permission === 'Projects Images Reports R')) &&
          <MenuItem 
            onClick={() => navigate('report/constructionImagesReport', { replace: true })}
            onMouseUp={() => menuItemMouseUpHandler('گزارش تصاویر سازه ها')}
          >گزارش تصاویر سازه ها</MenuItem>
        }
      </SubMenu>
      <SubMenu icon={<ViewArrayOutlined />} label="گزارش بازدید ها">
      <MenuItem onClick={() => navigate('report/siteVisitReport', { replace: true })}
          onMouseUp={() => menuItemMouseUpHandler('گزارش بازدید ها')}>گزارش بازدید ها</MenuItem>
      </SubMenu>
      <Box sx={{ py: '0', px:'24px', mb: '8px', mt: '15px' }}>
        <Typography
          variant="body2"
          fontWeight={600}
          sx={{ opacity: collapsed ? 0 : 0.8, letterSpacing: '0.5px', fontFamily:'B Nazanin', fontSize:'1em'}}
        >
          امنیت
        </Typography>
      </Box>
      <SubMenu icon={<SecurityOutlined />} label="امنیت">
        <MenuItem onClick={() => {
          dispatch<any>(ActivateChangeUserPassword(true));
          navigate('auth/changepassword', { replace: true });
        }}
          onMouseUp={() => menuItemMouseUpHandler('تغییر کلمه عبور')}>تغییر کلمه عبور</MenuItem>
      </SubMenu>
      {/* <SubMenu icon={<SecurityOutlined />} label="امنیت">
        <MenuItem onClick={() => navigate('security/user', { replace: true })}
          onMouseUp={() => menuItemMouseUpHandler('کاربر')}>کاربر</MenuItem>
        <MenuItem onClick={() => navigate('security/group', { replace: true })}
          onMouseUp={() => menuItemMouseUpHandler('گروه')}>گروه</MenuItem>
        <MenuItem onClick={() => navigate('security/permission', { replace: true })}
          onMouseUp={() => menuItemMouseUpHandler('دسترسی')}>دسترسی</MenuItem>
        <MenuItem onClick={() => navigate('security/grouppermission', { replace: true })}
          onMouseUp={() => menuItemMouseUpHandler('دسترسی گروه')}>دسترسی گروه</MenuItem>
        <MenuItem onClick={() => navigate('security/usergroup', { replace: true })}
          onMouseUp={() => menuItemMouseUpHandler('کاربران گروه')}>کاربران گروه</MenuItem>
      </SubMenu> */}
      <Box sx={{ py: '0', px:'24px', mb: '8px', mt: '15px' }}>
        <Typography
          variant="body2"
          fontWeight={600}
          sx={{ opacity: collapsed ? 0 : 0.8, letterSpacing: '0.5px', fontFamily:'B Nazanin', fontSize:'1em'}}
        >
          مدیر سامانه
        </Typography>
      </Box>
      <Menu menuItemStyles={menuItemStyles}>
      {permissions.length > 0 && (permissions.some(p => p.permission === 'System Admin')) &&
        <MenuItem component={<Link to="http://127.0.0.1:8000/control_panel/" target="blank" style={{textDecoration:'none', fontFamily:'B Nazanin'}}/>} icon={<AdminPanelSettingsOutlined />}>
          پنل مدیر سامانه
        </MenuItem>
      }
        {/* <SubMenu icon={<SearchOutlined />} label="User Survey">
          <MenuItem>January</MenuItem>
          <MenuItem>February</MenuItem>
          <MenuItem>March</MenuItem>
        </SubMenu>
        <MenuItem disabled icon={<RecommendOutlined />}>
          Examples
        </MenuItem> */}
      </Menu>
    </Menu>
    {/* <SidebarFooter collapsed={collapsed}/> */}
    </Sidebar>
  );
};

export default SideBar;

// const mapStateToProps = (state: RootState) => ({
//   permissions: state.auth.permissions,
//   // userid: state.auth.user?.id,
//   // fullname: state.auth.user?.fullname,
//   // userImage: state.auth.user?.user_img,        , mapDispatchToProps
// });

// const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
// // getContracts: (userId: number) => 
// //   dispatch(GetContracts(userId)),
// // getReportDates: () => 
// //   dispatch(GetReportDates()),
// // setCurrentContract: (currentContractId: number) => 
// //   dispatch(SetCurrentContract(currentContractId)),
// // setCurrentReportDate: (currentReportDateId: number) => 
// //   dispatch(SetCurrentReportDate(currentReportDateId)),
// // activateChangeUserPassword: (active: boolean) => 
// //   dispatch(ActivateChangeUserPassword(active)),
// // logout: () => dispatch(LogOut()),
// });

// const connector = connect(mapStateToProps);

// type SideBarProps = ConnectedProps<typeof connector>;

// export default connector(SideBar)