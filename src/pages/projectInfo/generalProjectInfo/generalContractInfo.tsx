import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { 
  ConnectedProps, 
  connect, 
  // useDispatch, 
  useSelector,  
} from 'react-redux';
import { 
  Box, 
  // Button, 
  Grid, 
  Typography,
  useTheme, 
} from '@mui/material';
import { 
  // SaveAsOutlined, 
  // CalendarMonthRounded, 
  // AttachMoneyOutlined,  
  // MonetizationOn,
  EuroRounded,
  // Countertops
} from '@mui/icons-material'

import ProjectManager from './components/projectManager/projectManager';
import CustomerConsultantList from './components/contractConsultant/CustomerConsultantList';
import ContractCorporationList from './components/contractCorporation/ContractCorporationList';
import ContractCorporationList1 from './components/contractCorporation/ContractCorporationList_';
import { RootState } from '../../../redux/store/store';
import { 
  IContractInfo, 
  // IContractInfoRequest 
} from '../../../models/contractInfo';
import { IContractConsultant } from '../../../models/contractConsultant';
import { IContractCorporation } from '../../../models/contractCorporation';
import { IContractInfoState } from '../../../redux/reducers/contractInfoReducer';
import { IContractConsultantsState } from '../../../redux/reducers/contractConsultantReducer';
import { IContractCorporationsState } from '../../../redux/reducers/contractCorporationReducer';
import { 
  GetContractInfo, 
  // EditContractInfo,
  GetContractConsultants, 
  GetContractCorporations,
  EditStartOperationDate,
  EditNotificationDate,
  EditPlanStartDate,
  EditFinishDate,
  ProjectManagerConfirm
} from '../../../redux/actionCreators/contractInfoActions'
import { 
  // AddEuroCommas, 
  // AddMRCommas, 
  // MoneyTextField, 
  // RemoveNonNumeric,
  AdapterJalali,
  FormatDate,
} from '../../../components';
import { backendUrl } from '../../../services';
// import Map from './components/map/Map'
import ContractDurationGauge from './components/contractDuration/ContractDurationGauge';
import BingMap from './components/map/BingMap';
// import BingMap1 from './components/map/BingMap1';
import ContractTimeline from './components/contractTimeLine/ContractTimeLine';
import Addendum from './components/contractAddendum/ContractAddendum';

// const location = {
//   address: 'معدن چادرملو',
//   lat: 33.02216,
//   lng: 56.58427,
// }
let counter = 0
const GeneralContractInfo: FC<GeneralContractInfoProps> = ({ 
    currentContractId, 
    currentReportDateId,
    // editContractInfo,
    getContractInfo,
    getContractConsultants,
    getContractCorporations,
    editStartOperationDate,
    editNotificationDate,
    editPlanStartDate,
    editFinishDate,
    projectManagerConfirm,
  }): ReactElement => {
    counter = counter + 1;
  const theme = useTheme();
  // const dispatch = useDispatch();
  const [startOperationDate, setStartOperationDate] = useState<Date>(new Date())
  const [notificationDate, setNotificationDate] = useState<Date>(new Date())
  const [planStartDate, setPlanStartDate] = useState<Date>(new Date())
  const [finishDate, setFinishDate] = useState<Date>(new Date())
  const [isProjectManagerConfirmed, setIsProjectManagerConfirmed] = React.useState<boolean>(false);

  useEffect(() => {
    if (currentContractId < 1) return
    // console.log('useEffect===========')
    getContractInfo(currentContractId, currentReportDateId);
  }, [getContractInfo,  currentContractId, currentReportDateId]);
  
  useEffect(() => {
    if (currentContractId < 1) return
    // console.log('useEffect===========')
    getContractConsultants(currentContractId);
  }, [getContractConsultants, currentContractId]);

  useEffect(() => {
    if (currentContractId < 1) return
    // console.log('useEffect===========')
    getContractCorporations(currentContractId);
  }, [getContractCorporations, currentContractId]);

  const contractInfoState: IContractInfoState = useSelector((state: RootState) => state.contractInfo)
  const contractInfo: IContractInfo = contractInfoState.contractInfo
  const startOperationDateProp = contractInfo.startoperationdate
  const notificationDateProp = contractInfo.notificationdate
  const planStartDateProp = contractInfo.planstartdate
  const finishDateProp = contractInfo.finishdate
  const projectManagerConfirmed: boolean = contractInfoState.projectManagerConfirmed
 
  useEffect(() => {
    setStartOperationDate(startOperationDateProp)
  }, [startOperationDateProp])

  useEffect(() => {
    setNotificationDate(notificationDateProp)
  }, [notificationDateProp])

  useEffect(() => {
    setPlanStartDate(planStartDateProp)
  }, [planStartDateProp])

  useEffect(() => {
    setFinishDate(finishDateProp)
  }, [finishDateProp])

  useEffect(() => {
    setIsProjectManagerConfirmed(projectManagerConfirmed)
  }, [projectManagerConfirmed])

  const contractConsultantsState: IContractConsultantsState = useSelector((state: RootState) => state.contractConsultants)
  const contractConsultants: IContractConsultant[] = contractConsultantsState.contractConsultants

  const contractCorporationsState: IContractCorporationsState = useSelector((state: RootState) => state.contractCorporations)
  const contractCorporations: IContractCorporation = contractCorporationsState.contractCorporations!

  const handleProjectManagerConfirmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    projectManagerConfirm(currentContractId, currentReportDateId, event.target.checked ? 1 : 0)
    setIsProjectManagerConfirmed(event.target.checked);
  };
  // console.log('isProjectManagerConfirmed: ', isProjectManagerConfirmed)

  // const [addendum_r1, setAddendum_r1] = useState<string>(AddMRCommas(RemoveNonNumeric(String(contractInfo?.attachmentcontractprice1_r))));
  // const [addendum_r2, setAddendum_r2] = useState<string>(AddMRCommas(RemoveNonNumeric(String(contractInfo?.attachmentcontractprice2_r))));
  // const [addendum_r3, setAddendum_r3] = useState<string>(AddMRCommas(RemoveNonNumeric(String(contractInfo?.attachmentcontractprice3_r))));
  // const [addendum_r4, setAddendum_r4] = useState<string>(AddMRCommas(RemoveNonNumeric(String(contractInfo?.attachmentcontractprice4_r))));  
  // const [addendum_r5, setAddendum_r5] = useState<string>(AddMRCommas(RemoveNonNumeric(String(contractInfo?.attachmentcontractprice5_r))));
  // const [addendum_fc1, setAddendum_fc1] = useState<string>(AddEuroCommas(RemoveNonNumeric(String(contractInfo?.attachmentcontractprice1_fc))));
  // const [addendum_fc2, setAddendum_fc2] = useState<string>(AddEuroCommas(RemoveNonNumeric(String(contractInfo?.attachmentcontractprice2_fc))));
  // const [addendum_fc3, setAddendum_fc3] = useState<string>(AddEuroCommas(RemoveNonNumeric(String(contractInfo?.attachmentcontractprice3_fc))));
  // const [addendum_fc4, setAddendum_fc4] = useState<string>(AddEuroCommas(RemoveNonNumeric(String(contractInfo?.attachmentcontractprice4_fc))));  
  // const [addendum_fc5, setAddendum_fc5] = useState<string>(AddEuroCommas(RemoveNonNumeric(String(contractInfo?.attachmentcontractprice5_fc))));

  // const onChangeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   // console.log('name: ', event.target.name)
  //   // console.log('value: ',event.target.value)
  //   let name = event.target.name;
  //   switch(name){
  //     case "addendum_r1": 
  //       setAddendum_r1(AddMRCommas(RemoveNonNumeric(event.target.value)));
  //       break;
  //     case "addendum_r2": 
  //       setAddendum_r2(AddMRCommas(RemoveNonNumeric(event.target.value)));
  //       break;
  //     case "addendum_r3": 
  //       setAddendum_r3(AddMRCommas(RemoveNonNumeric(event.target.value)));
  //       break;
  //     case "addendum_r4": 
  //       setAddendum_r4(AddMRCommas(RemoveNonNumeric(event.target.value)));
  //       break;
  //     case "addendum_r5": 
  //       setAddendum_r5(AddMRCommas(RemoveNonNumeric(event.target.value)));
  //       break;
  //     case "addendum_fc1": 
  //       setAddendum_fc1(AddEuroCommas(RemoveNonNumeric(event.target.value)));
  //       break;
  //     case "addendum_fc2": 
  //       setAddendum_fc2(AddEuroCommas(RemoveNonNumeric(event.target.value)));
  //       break;
  //     case "addendum_fc3": 
  //       setAddendum_fc3(AddEuroCommas(RemoveNonNumeric(event.target.value)));
  //       break;
  //     case "addendum_fc4": 
  //       setAddendum_fc4(AddEuroCommas(RemoveNonNumeric(event.target.value)));
  //       break;
  //     case "addendum_fc5": 
  //       setAddendum_fc5(AddEuroCommas(RemoveNonNumeric(event.target.value)));
  //       break;
  //   }
  //   // console.log('addendum_r5: ',addendum_r5)
  //   // console.log('addendum_fc5: ',addendum_fc5)
  // };
  
  const changeStartOperationDateHandler = (date: Date | null) => {
    editStartOperationDate(currentContractId, FormatDate(date!))
    setStartOperationDate(date!)
  }
  const changeNotificationDateHandler = (date: Date | null) => {
    editNotificationDate(currentContractId, FormatDate(date!))
    setNotificationDate(date!)
  }
  const changePlanStartDateHandler = (date: Date | null) => {
    editPlanStartDate(currentContractId, FormatDate(date!))
    setPlanStartDate(date!)
  }
  const changeFinishDateHandler = (date: Date | null) => {
    editFinishDate(currentContractId, FormatDate(date!))
    setFinishDate(date!)
  }

  // const clickSaveHandler = (e: React.MouseEvent) => {
  //   const contract: IContractInfoRequest = {
  //     contractid: currentContractId,
  //     startoperationdate: FormatDate(startOperationDate),
  //     notificationdate: FormatDate(notificationDate),
  //     planstartdate: FormatDate(planStartDate),
  //     finishdate: FormatDate(finishDate),
      // attachmentcontractprice1_r: Number(RemoveNonNumeric(addendum_r1)),
      // attachmentcontractprice1_fc: Number(RemoveNonNumeric(addendum_fc1)),
      // attachmentcontractprice2_r: Number(RemoveNonNumeric(addendum_r2)),
      // attachmentcontractprice2_fc: Number(RemoveNonNumeric(addendum_fc2)),
      // attachmentcontractprice3_r: Number(RemoveNonNumeric(addendum_r3)),
      // attachmentcontractprice3_fc: Number(RemoveNonNumeric(addendum_fc3)),
      // attachmentcontractprice4_r: Number(RemoveNonNumeric(addendum_r4)),
      // attachmentcontractprice4_fc: Number(RemoveNonNumeric(addendum_fc4)),
      // attachmentcontractprice5_r: Number(RemoveNonNumeric(addendum_r5)),
      // attachmentcontractprice5_fc: Number(RemoveNonNumeric(addendum_fc5)),
    // }
    // console.log('contract: ', contract)

  //   editContractInfo(currentContractId, contract)
  // }
  return (
    <Grid container rowSpacing={{ xs: 1, sm: 2, md: 3, lg: 3, xl:2.5 }} columnSpacing={{ xs:1,sm:2,md:3,lg:5,xl:7 }} px={{ xs:1,sm:2,md:3,lg:5,xl:7 }}>
      <Grid item xs={12} sm={10} md={6} lg={6} xl={6} px='auto'>
        <Box display="flex" justifyContent='center' mx='auto' mb={3} p={2} fontFamily='B Nazanin'>
          <ContractCorporationList corporations={contractCorporations!}/>
        </Box>
        <Box display="flex" justifyContent='center' mx='auto' mb={3} p={2} fontFamily='B Nazanin'
          borderRadius={2} boxShadow={3} bgcolor={theme.palette.background.paper}>
          {/* <CustomerConsultantList customer={contractInfo?.customer} consultants={contractConsultants}/> */}
          <ContractDurationGauge 
            projectDuration={contractInfo.duration} 
            passedDuration={contractInfo.passedDuration}
            addendumDuration={contractInfo.addendumDuration}
          />
        </Box>
        <Box display="flex" justifyContent='center' mx='auto' mb={3} p={2} fontFamily='B Nazanin'>
          <CustomerConsultantList customer={contractInfo?.customer} consultants={contractConsultants}/>
        </Box>
        <Box display="flex" flexDirection="column" mx='auto' pt={5} pb={4} px={{ xs:1,sm:2,md:3,lg:5,xl:7 }} borderRadius={2} boxShadow={3} bgcolor={theme.palette.background.paper}>
          <Box display='flex' justifyContent='center' mb={2}>
            <EuroRounded sx={{mt:-1.5, width:40, height:40, color:'green'}}/>
            <Typography
              variant='subtitle1'
              fontWeight={400}
              fontFamily={'B Nazanin'}
            >
              مبالغ پروژه
            </Typography>
          </Box>
          <Box display="flex" justifyContent='center'>
            <Addendum/>
            {/* <Box display="flex" flexDirection="column" mx={1} fontFamily='B Nazanin'>
              <Typography variant='caption'>ریالی (میلیون ریال)</Typography>
              <MoneyTextField
                name={"projectPrice_r"}
                label={"مبلغ قرارداد"}
                value={AddMRCommas(RemoveNonNumeric(String(contractInfo?.totalprice_r)))}
                disabled={true}
                onChangeHandler={onChangeInputHandler}
              />
              <MoneyTextField
                name={"addendum_r1"}
                label={"الحاقیه 1"}
                value={addendum_r1}
                onChangeHandler={onChangeInputHandler}
              />
              <MoneyTextField
                name={"addendum_r2"}
                label={"الحاقیه 2"}
                value={addendum_r2}
                onChangeHandler={onChangeInputHandler}
              />
              <MoneyTextField
                name={"addendum_r3"}
                label={"الحاقیه 3"}
                value={addendum_r3}
                onChangeHandler={onChangeInputHandler}
              />
              <MoneyTextField
                name={"addendum_r4"}
                label={"الحاقیه 4"}
                value={addendum_r4}
                onChangeHandler={onChangeInputHandler}
              />
              <MoneyTextField
                name={"addendum_r5"}
                label={"الحاقیه 5"}
                value={addendum_r5}
                onChangeHandler={onChangeInputHandler}
              />
              <MoneyTextField
                name={"totalSumPrice_r"}
                label={"جمع کل"}
                value={
                  AddMRCommas(String((contractInfo?.totalprice_r ?? 0) + 
                  (Number(RemoveNonNumeric(addendum_r1)) ?? 0) + 
                  (Number(RemoveNonNumeric(addendum_r2)) ?? 0) + 
                  (Number(RemoveNonNumeric(addendum_r3)) ?? 0) + 
                  (Number(RemoveNonNumeric(addendum_r4)) ?? 0) + 
                  (Number(RemoveNonNumeric(addendum_r5)) ?? 0)))
                } 
                disabled={true}
                onChangeHandler={onChangeInputHandler}
              />
            </Box> 
            <Box display="flex" flexDirection="column" mx={1} fontFamily='B Nazanin'>
              <Typography variant='caption'> (Euro) ارزی </Typography>
              <MoneyTextField
                name={"projectPrice_fc"}
                label={"مبلغ قرارداد"}
                value={AddEuroCommas(RemoveNonNumeric(String(contractInfo?.totalprice_fc)))}
                disabled={true}
                onChangeHandler={onChangeInputHandler}
              />
              <MoneyTextField
                name={"addendum_fc1"}
                label={"الحاقیه 1"}
                value={addendum_fc1}
                onChangeHandler={onChangeInputHandler}
              />
              <MoneyTextField
                name={"addendum_fc2"}
                label={"الحاقیه 2"}
                value={addendum_fc2}
                onChangeHandler={onChangeInputHandler}
              />
              <MoneyTextField
                name={"addendum_fc3"}
                label={"الحاقیه 3"}
                value={addendum_fc3}
                onChangeHandler={onChangeInputHandler}
              />
              <MoneyTextField
                name={"addendum_fc4"}
                label={"الحاقیه 4"}
                value={addendum_fc4}
                onChangeHandler={onChangeInputHandler}
              />
              <MoneyTextField
                name={"addendum_fc5"}
                label={"الحاقیه 5"}
                value={addendum_fc5}
                onChangeHandler={onChangeInputHandler}
              />
              <MoneyTextField
                name={"totalSumPrice_fc"}
                label={"جمع کل"}
                value={
                  AddEuroCommas(String((contractInfo?.totalprice_fc ?? 0) + 
                  (Number(RemoveNonNumeric(addendum_fc1)) ?? 0) + 
                  (Number(RemoveNonNumeric(addendum_fc2)) ?? 0) + 
                  (Number(RemoveNonNumeric(addendum_fc3)) ?? 0) + 
                  (Number(RemoveNonNumeric(addendum_fc4)) ?? 0) + 
                  (Number(RemoveNonNumeric(addendum_fc5)) ?? 0)))
                } 
                disabled={true}
                onChangeHandler={onChangeInputHandler}
              />
            </Box>             */}
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={10} md={6} lg={6} xl={6} px='auto'>
        <Box display="flex" justifyContent='center' mx='auto' mb={3} p={2} fontFamily='B Nazanin'>
          <ContractCorporationList1 corporations={contractCorporations!}/>
        </Box>
        {/* <Box display="flex" justifyContent='center' mx='auto' mb={3} p={2} fontFamily='B Nazanin'>
          <BingMap1/>
        </Box> */}
        <Box display="flex" justifyContent='center' mx='auto' mb={3} p={2} fontFamily='B Nazanin'>
          {/* <Map location={location} zoomLevel={4.6} /> */}
          <BingMap/>
        </Box>
        <Box display="flex" justifyContent='space-around' mx='auto' mb={4} p={2} borderRadius={2} boxShadow={3} bgcolor={theme.palette.background.paper}>
          <Box display="flex" flexDirection="column" justifyContent='center' fontFamily='B Nazanin'>
            <ContractTimeline 
              startOperationDate={startOperationDate} 
              notificationDate={notificationDate} 
              planStartDate={planStartDate}
              finishDate={finishDate}
            />
            {/* <Typography
              variant='subtitle1'
              color={'black'}
              fontWeight={400}
              fontFamily={'B Nazanin'}
              mx='auto'
            >
              تاریخ پروژه
            </Typography>
            <CalendarMonthRounded sx={{mx:'auto', width:80, height:80, color:'green'}}/> */}
          </Box>
          <Box display="flex" flexDirection="column" justifyContent='center' fontFamily='B Nazanin'>
            <AdapterJalali date={new Date(startOperationDate)} dateChangeHandler={changeStartOperationDateHandler} label='تاریخ ابلاغ قرارداد '/>
            <AdapterJalali date={new Date(notificationDate)} dateChangeHandler={changeNotificationDateHandler} label='تاریخ تنفیذ قرارداد'/>
            <AdapterJalali date={new Date(planStartDate)} dateChangeHandler={changePlanStartDateHandler} label='تاریخ شروع مطابق برنامه'/>
            <AdapterJalali date={new Date(finishDate)} dateChangeHandler={changeFinishDateHandler} label='تاریخ پایان مطابق برنامه'/> 
          </Box>
        </Box>
        <Box display="flex" mx='auto' py={{xs:2.5,sm:2.5,md:2}} px={2} borderRadius={2} boxShadow={3} bgcolor={theme.palette.background.paper} fontFamily='B Nazanin'>
          <ProjectManager
            label={contractInfo?.projectManager}
            // imageSrc={'https://avatars.githubusercontent.com/u/47317870?s=400&u=79da86747deb409779c3575c0da73d90ad65fe81&v=4'}
            imageSrc={backendUrl + contractInfo?.projectManagerImage}
            projectManagerConfirmed={isProjectManagerConfirmed}
            handleChange = {handleProjectManagerConfirmChange}
          />
        </Box>
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} px='auto'>
        <Box display="flex" justifyContent='flex-end' p={2} fontFamily='B Nazanin'>
           Render Times: {counter}
          {/* <Button 
            sx={{width:120, fontFamily:'B Nazanin', gap:2}} 
            variant='contained' 
            color='info' 
            size='medium' 
            onClick={clickSaveHandler}
            startIcon={<SaveAsOutlined/>}
          >
            ذخیره
          </Button> */}
        </Box>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state: RootState) => ({
  currentContractId: state.contracts.currentContractId,
  currentReportDateId: state.reportDates.currentReportDateId,
  // ProjectManagerConfirmed: state.
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  getContractInfo: (currentContractId: number, currentReportDateId: number) => 
    dispatch(GetContractInfo(currentContractId, currentReportDateId)),
  getContractConsultants: (currentContractId: number) => 
    dispatch(GetContractConsultants(currentContractId)),
  getContractCorporations: (currentContractId: number) => 
    dispatch(GetContractCorporations(currentContractId)),  
    
  // editContractInfo: (id: number, contract: IContractInfoRequest) => 
    // dispatch(EditContractInfo(id, contract)),
  projectManagerConfirm: (currentContractId: number, currentReportDateId: number, confirmed: number) => 
    dispatch(ProjectManagerConfirm(currentContractId, currentReportDateId, confirmed)),    
  editStartOperationDate: (contractId: number, date: string) => 
    dispatch(EditStartOperationDate(contractId, date)),
  editNotificationDate: (contractId: number, date: string) => 
    dispatch(EditNotificationDate(contractId, date)),
  editPlanStartDate: (contractId: number, date: string) => 
    dispatch(EditPlanStartDate(contractId, date)),
  editFinishDate: (contractId: number, date: string) => 
    dispatch(EditFinishDate(contractId, date)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type GeneralContractInfoProps = ConnectedProps<typeof connector>;

export default connector(GeneralContractInfo)
