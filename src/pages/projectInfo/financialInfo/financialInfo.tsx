import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { 
  ConnectedProps, 
  connect, 
  useDispatch, 
  useSelector,  
} from 'react-redux';
import { 
  Box, 
  Button, 
  Grid, 
  InputLabel, 
  Typography, 
} from '@mui/material';
import { 
  SaveAsOutlined, 
} from '@mui/icons-material'

import { RootState } from '../../../redux/store/store';
import { IFinancialInfo } from '../../../models/financialInfo';
import { IFinancialInfoState } from '../../../redux/reducers/financialInfoReducer';
import { 
  GetFinancialInfo, 
  EditFinancialInfo,
} from '../../../redux/actionCreators/financialInfoActions'
import { 
  AddEuroCommas, 
  AddMRCommas, 
  MoneyTextField, 
  RemoveNonNumeric,
  NumberTextField,
} from '../../../components';


const FinancialInfo: FC<FinancialInfoProps> = ({ 
  currentContractId, 
  currentReportDateId, 
  editFinancialInfo 
}): ReactElement => {
  const dispatch = useDispatch();
  // console.log('currentContractId: ', currentContractId)
  // console.log('currentReportDateId: ', currentReportDateId)

  useEffect(() => {
    if (currentContractId < 1) return

    dispatch<any>(GetFinancialInfo(currentContractId, currentReportDateId));
  }, [dispatch, currentContractId, currentReportDateId]);
  
  const financialInfoState: IFinancialInfoState = useSelector((state: RootState) => state.financialInfo)
  const financialInfo: IFinancialInfo = financialInfoState.financialInfo
  // console.log('financialInfo: ', financialInfo)

  const [lastclaimedinvoice_r, setLastclaimedinvoice_r] = useState<string>(AddMRCommas(RemoveNonNumeric(String(financialInfo?.lastclaimedinvoice_r))));
  const [lastclaimedinvoice_fc, setLastclaimedinvoice_fc] = useState<string>(AddEuroCommas(RemoveNonNumeric(String(financialInfo?.lastclaimedinvoice_fc))));
  const [lci_no, setLci_no] = useState<string>((RemoveNonNumeric(String(financialInfo?.lci_no))));
  const [lastverifiedinvoice_r, setLastverifiedinvoice_r] = useState<string>(AddMRCommas(RemoveNonNumeric(String(financialInfo?.lastverifiedinvoice_r))));
  const [lastverifiedinvoice_fc, setLastverifiedinvoice_fc] = useState<string>(AddEuroCommas(RemoveNonNumeric(String(financialInfo?.lastverifiedinvoice_fc))));
  const [lvi_no, setLvi_no] = useState<string>((RemoveNonNumeric(String(financialInfo?.lvi_no))));
  const [lastclaimedadjustmentinvoice_r, setLastclaimedadjustmentinvoice_r] = useState<string>(AddMRCommas(RemoveNonNumeric(String(financialInfo?.lastclaimedadjustmentinvoice_r))));
  const [lastclaimedadjustmentinvoice_fc, setLastclaimedadjustmentinvoice_fc] = useState<string>(AddEuroCommas(RemoveNonNumeric(String(financialInfo?.lastclaimedadjustmentinvoice_fc))));
  const [lcai_no, setLcai_no] = useState<string>((RemoveNonNumeric(String(financialInfo?.lcai_no))));
  const [lastverifiedadjustmentinvoice_r, setLastverifiedadjustmentinvoice_r] = useState<string>(AddMRCommas(RemoveNonNumeric(String(financialInfo?.lastverifiedadjustmentinvoice_r))));  
  const [lastverifiedadjustmentinvoice_fc, setLastverifiedadjustmentinvoice_fc] = useState<string>(AddEuroCommas(RemoveNonNumeric(String(financialInfo?.lastverifiedadjustmentinvoice_fc))));  
  const [lvai_no, setLvai_no] = useState<string>((RemoveNonNumeric(String(financialInfo?.lvai_no))));
  const [lastclaimedextraworkinvoice_r, setLastclaimedextraworkinvoice_r] = useState<string>(AddMRCommas(RemoveNonNumeric(String(financialInfo?.lastclaimedextraworkinvoice_r))));
  const [lastclaimedextraworkinvoice_fc, setLastclaimedextraworkinvoice_fc] = useState<string>(AddEuroCommas(RemoveNonNumeric(String(financialInfo?.lastclaimedextraworkinvoice_fc))));
  const [lcewi_no, setLcewi_no] = useState<string>((RemoveNonNumeric(String(financialInfo?.lcewi_no))));
  const [lastverifiedextraworkinvoice_r, setLastverifiedextraworkinvoice_r] = useState<string>(AddMRCommas(RemoveNonNumeric(String(financialInfo?.lastverifiedextraworkinvoice_r))));
  const [lastverifiedextraworkinvoice_fc, setLastverifiedextraworkinvoice_fc] = useState<string>(AddEuroCommas(RemoveNonNumeric(String(financialInfo?.lastverifiedextraworkinvoice_fc))));
  const [lvewi_no, setLvewi_no] = useState<string>((RemoveNonNumeric(String(financialInfo?.lvewi_no))));
  const [lastclaimbill_r, setLastclaimbill_r] = useState<string>(AddMRCommas(RemoveNonNumeric(String(financialInfo?.lastclaimbill_r))));
  const [lastclaimbill_fc, setLastclaimbill_fc] = useState<string>(AddEuroCommas(RemoveNonNumeric(String(financialInfo?.lastclaimbill_fc))));
  const [lcb_no, setLcb_no] = useState<string>((RemoveNonNumeric(String(financialInfo?.lcb_no))));
  const [lastclaimbillverified_r, setLastclaimbillverified_r] = useState<string>(AddMRCommas(RemoveNonNumeric(String(financialInfo?.lastclaimbillverified_r))));
  const [lastclaimbillverified_fc, setLastclaimbillverified_fc] = useState<string>(AddEuroCommas(RemoveNonNumeric(String(financialInfo?.lastclaimbillverified_fc))));
  const [lcbv_no, setLcbv_no] = useState<string>((RemoveNonNumeric(String(financialInfo?.lcbv_no))));
  const [lastclaimbillrecievedamount_r, setLastclaimbillrecievedamount_r] = useState<string>(AddMRCommas(RemoveNonNumeric(String(financialInfo?.lastclaimbillrecievedamount_r))));  
  const [lastclaimbillrecievedamount_fc, setLastclaimbillrecievedamount_fc] = useState<string>(AddEuroCommas(RemoveNonNumeric(String(financialInfo?.lastclaimbillrecievedamount_fc))));  
  const [cumulativeclientpayment_r, seCumulativeclientpayment_r] = useState<string>(AddMRCommas(RemoveNonNumeric(String(financialInfo?.cumulativeclientpayment_r))));
  const [cumulativeclientpayment_fc, seCumulativeclientpayment_fc] = useState<string>(AddEuroCommas(RemoveNonNumeric(String(financialInfo?.cumulativeclientpayment_fc))));
  const [clientprepaymentdeferment_r, setClientprepaymentdeferment_r] = useState<string>(AddMRCommas(RemoveNonNumeric(String(financialInfo?.clientprepaymentdeferment_r))));
  const [clientprepaymentdeferment_fc, setClientprepaymentdeferment_fc] = useState<string>(AddEuroCommas(RemoveNonNumeric(String(financialInfo?.clientprepaymentdeferment_fc))));
  const [estcost_r, setEstcost_r] = useState<string>(AddMRCommas(RemoveNonNumeric(String(financialInfo?.estcost_r))));
  const [estcost_fc, setEstcost_fc] = useState<string>(AddEuroCommas(RemoveNonNumeric(String(financialInfo?.estcost_fc))));
  const [estclientpayment_r, setEstclientpayment_r] = useState<string>(AddMRCommas(RemoveNonNumeric(String(financialInfo?.estclientpayment_r))));
  const [estclientpayment_fc, setEstclientpayment_fc] = useState<string>(AddEuroCommas(RemoveNonNumeric(String(financialInfo?.estclientpayment_fc))));
  const [estdebitcredit_r, setEstdebitcredit_r] = useState<string>(AddMRCommas(RemoveNonNumeric(String(financialInfo?.estdebitcredit_r))));
  const [estdebitcredit_fc, setEstdebitcredit_fc] = useState<string>(AddEuroCommas(RemoveNonNumeric(String(financialInfo?.estdebitcredit_fc))));

  const onChangeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log('name: ', event.target.name)
    // console.log('value: ',event.target.value)
    let name = event.target.name;
    switch(name){
      case "lastclaimedinvoice_r": 
        setLastclaimedinvoice_r(AddMRCommas(RemoveNonNumeric(event.target.value)));
        break;
      case "lastclaimedinvoice_fc": 
        setLastclaimedinvoice_fc(AddEuroCommas(RemoveNonNumeric(event.target.value)));
        break;
      case "lci_no": 
        setLci_no((RemoveNonNumeric(event.target.value)));
        break;
      case "lastverifiedinvoice_r": 
        setLastverifiedinvoice_r(AddMRCommas(RemoveNonNumeric(event.target.value)));
        break;
      case "lastverifiedinvoice_fc": 
        setLastverifiedinvoice_fc(AddEuroCommas(RemoveNonNumeric(event.target.value)));
        break;
      case "lvi_no": 
        setLvi_no((RemoveNonNumeric(event.target.value)));
        break;
      case "lastclaimedadjustmentinvoice_r": 
        setLastclaimedadjustmentinvoice_r(AddMRCommas(RemoveNonNumeric(event.target.value)));
        break;
      case "lastclaimedadjustmentinvoice_fc": 
        setLastclaimedadjustmentinvoice_fc(AddEuroCommas(RemoveNonNumeric(event.target.value)));
        break;
      case "lcai_no": 
        setLcai_no((RemoveNonNumeric(event.target.value)));
        break;
      case "lastverifiedadjustmentinvoice_r": 
        setLastverifiedadjustmentinvoice_r(AddMRCommas(RemoveNonNumeric(event.target.value)));
        break;
      case "lastverifiedadjustmentinvoice_fc": 
        setLastverifiedadjustmentinvoice_fc(AddEuroCommas(RemoveNonNumeric(event.target.value)));
        break;
      case "lvai_no": 
        setLvai_no((RemoveNonNumeric(event.target.value)));
        break;
      case "lastclaimedextraworkinvoice_r": 
        setLastclaimedextraworkinvoice_r(AddMRCommas(RemoveNonNumeric(event.target.value)));
        break;
      case "lastclaimedextraworkinvoice_fc": 
        setLastclaimedextraworkinvoice_fc(AddEuroCommas(RemoveNonNumeric(event.target.value)));
        break;
      case "lcewi_no": 
        setLcewi_no((RemoveNonNumeric(event.target.value)));
        break;
      case "lastverifiedextraworkinvoice_r": 
        setLastverifiedextraworkinvoice_r(AddMRCommas(RemoveNonNumeric(event.target.value)));
        break;
      case "lastverifiedextraworkinvoice_fc": 
        setLastverifiedextraworkinvoice_fc(AddEuroCommas(RemoveNonNumeric(event.target.value)));
        break;
      case "lvewi_no": 
        setLvewi_no((RemoveNonNumeric(event.target.value)));
        break;
      case "lastclaimbill_r": 
        setLastclaimbill_r(AddMRCommas(RemoveNonNumeric(event.target.value)));
        break;
      case "lastclaimbill_fc": 
        setLastclaimbill_fc(AddEuroCommas(RemoveNonNumeric(event.target.value)));
        break;
      case "lcb_no": 
        setLcb_no((RemoveNonNumeric(event.target.value)));
        break;
      case "lastclaimbillverified_r": 
        setLastclaimbillverified_r(AddMRCommas(RemoveNonNumeric(event.target.value)));
        break;  
      case "lastclaimbillverified_fc": 
        setLastclaimbillverified_fc(AddEuroCommas(RemoveNonNumeric(event.target.value)));
        break;
      case "lcbv_no": 
        setLcbv_no((RemoveNonNumeric(event.target.value)));
        break;
      case "lastclaimbillrecievedamount_r": 
        setLastclaimbillrecievedamount_r(AddMRCommas(RemoveNonNumeric(event.target.value)));
        break;  
      case "lastclaimbillrecievedamount_fc": 
        setLastclaimbillrecievedamount_fc(AddEuroCommas(RemoveNonNumeric(event.target.value)));
        break;
      case "cumulativeclientpayment_r": 
        seCumulativeclientpayment_r(AddMRCommas(RemoveNonNumeric(event.target.value)));
        break;          
      case "cumulativeclientpayment_fc": 
        seCumulativeclientpayment_fc(AddEuroCommas(RemoveNonNumeric(event.target.value)));
        break;  
      case "clientprepaymentdeferment_r": 
        setClientprepaymentdeferment_r(AddMRCommas(RemoveNonNumeric(event.target.value)));
        break;
      case "clientprepaymentdeferment_fc": 
        setClientprepaymentdeferment_fc(AddEuroCommas(RemoveNonNumeric(event.target.value)));
        break;   
      case "estcost_r": 
        setEstcost_r(AddMRCommas(RemoveNonNumeric(event.target.value)));
        break;          
      case "estcost_fc": 
        setEstcost_fc(AddEuroCommas(RemoveNonNumeric(event.target.value)));
        break;  
      case "estclientpayment_r": 
        setEstclientpayment_r(AddMRCommas(RemoveNonNumeric(event.target.value)));
        break;
      case "estclientpayment_fc": 
        setEstclientpayment_fc(AddEuroCommas(RemoveNonNumeric(event.target.value)));
        break;      
      case "estdebitcredit_r": 
        setEstdebitcredit_r(AddMRCommas(RemoveNonNumeric(event.target.value)));
        break;          
      case "estdebitcredit_fc": 
        setEstdebitcredit_fc(AddEuroCommas(RemoveNonNumeric(event.target.value)));
        break;  
      }
    // console.log('addendum_r5: ',addendum_r5)
    // console.log('addendum_fc5: ',addendum_fc5)
  };

  const clickSaveHandler = (e: React.MouseEvent) => {
    const request: IFinancialInfo = {
      financialinfoid: financialInfo.financialinfoid,
      contractid: currentContractId,
      dateid: currentReportDateId,
      lastclaimedinvoice_r: Number(RemoveNonNumeric(lastclaimedinvoice_r)),
      lastclaimedinvoice_fc: Number(RemoveNonNumeric(lastclaimedinvoice_fc)),
      lci_no: Number(RemoveNonNumeric(lci_no)),
      lastverifiedinvoice_r: Number(RemoveNonNumeric(lastverifiedinvoice_r)),
      lastverifiedinvoice_fc: Number(RemoveNonNumeric(lastverifiedinvoice_fc)),
      lvi_no: Number(RemoveNonNumeric(lvi_no)),
      lastclaimedadjustmentinvoice_r: Number(RemoveNonNumeric(lastclaimedadjustmentinvoice_r)),
      lastclaimedadjustmentinvoice_fc: Number(RemoveNonNumeric(lastclaimedadjustmentinvoice_fc)),
      lcai_no: Number(RemoveNonNumeric(lcai_no)),
      lastverifiedadjustmentinvoice_r: Number(RemoveNonNumeric(lastverifiedadjustmentinvoice_r)),
      lastverifiedadjustmentinvoice_fc: Number(RemoveNonNumeric(lastverifiedadjustmentinvoice_fc)),
      lvai_no: Number(RemoveNonNumeric(lvai_no)),
      lastclaimedextraworkinvoice_r: Number(RemoveNonNumeric(lastclaimedextraworkinvoice_r)),
      lastclaimedextraworkinvoice_fc: Number(RemoveNonNumeric(lastclaimedextraworkinvoice_fc)),
      lcewi_no: Number(RemoveNonNumeric(lcewi_no)),
      lastverifiedextraworkinvoice_r: Number(RemoveNonNumeric(lastverifiedextraworkinvoice_r)),
      lastverifiedextraworkinvoice_fc: Number(RemoveNonNumeric(lastverifiedextraworkinvoice_fc)),
      lvewi_no: Number(RemoveNonNumeric(lvewi_no)),
      lastclaimbill_r: Number(RemoveNonNumeric(lastclaimbill_r)),
      lastclaimbill_fc: Number(RemoveNonNumeric(lastclaimbill_fc)),
      lcb_no: Number(RemoveNonNumeric(lcb_no)),
      lastclaimbillverified_r: Number(RemoveNonNumeric(lastclaimbillverified_r)),
      lastclaimbillverified_fc: Number(RemoveNonNumeric(lastclaimbillverified_fc)),
      lcbv_no: Number(RemoveNonNumeric(lcbv_no)),
      lastclaimbillrecievedamount_r: Number(RemoveNonNumeric(lastclaimbillrecievedamount_r)),
      lastclaimbillrecievedamount_fc: Number(RemoveNonNumeric(lastclaimbillrecievedamount_fc)),
      cumulativeclientpayment_r: Number(RemoveNonNumeric(cumulativeclientpayment_r)),
      cumulativeclientpayment_fc: Number(RemoveNonNumeric(cumulativeclientpayment_fc)),
      clientprepaymentdeferment_r: Number(RemoveNonNumeric(clientprepaymentdeferment_r)),
      clientprepaymentdeferment_fc: Number(RemoveNonNumeric(clientprepaymentdeferment_fc)),
      estcost_r: Number(RemoveNonNumeric(estcost_r)),
      estcost_fc: Number(RemoveNonNumeric(estcost_fc)),
      estclientpayment_r: Number(RemoveNonNumeric(estclientpayment_r)),
      estclientpayment_fc: Number(RemoveNonNumeric(estclientpayment_fc)),
      estdebitcredit_r: Number(RemoveNonNumeric(estdebitcredit_r)),
      estdebitcredit_fc: Number(RemoveNonNumeric(estdebitcredit_fc))
 
    }
    // console.log('request: ', request)

    editFinancialInfo(financialInfo.financialinfoid, request)
  }

  return (
    <Grid container fontFamily='B Nazanin' rowSpacing={{ xs: 1, sm: 2, md: 3, lg: 3, xl:2.5 }} columnSpacing={{ xs:1,sm:2,md:3,lg:5,xl:7 }} px={{ xs:1,sm:2,md:3,lg:5,xl:7, direction:'ltr'}}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} px='auto'>
        <Box display="flex" flexDirection="column" mx='auto' pt={5} pb={4} px={{ xs:1,sm:2,md:3,lg:4,xl:5 }} borderRadius={2} boxShadow={3} >
          <Box display='flex' justifyContent='flex-end' mb={4}>
            <Typography
              variant='subtitle1'
              fontWeight={500}
              sx={{direction:'rtl'}}
            >
               اطلاعات مالی (چنانچه پروژه PC یا EPC است مبالغ تجمیع گردد) 
            </Typography>
          </Box>
          <Box display="flex" justifyContent='space-between'>
            <Box display="flex" >
              <Box display="flex" flexDirection="column" mx={1}>
                <Typography variant='caption'> (Euro) ارزی </Typography>
                <MoneyTextField
                  name={"lastclaimedinvoice_fc"}
                  label={""}
                  value={lastclaimedinvoice_fc}
                  onChangeHandler={onChangeInputHandler}
                />
                <MoneyTextField
                  name={"lastverifiedinvoice_fc"}
                  label={""}
                  value={lastverifiedinvoice_fc}
                  onChangeHandler={onChangeInputHandler}
                />
                <MoneyTextField
                  name={"lastclaimedadjustmentinvoice_fc"}
                  label={""}
                  value={lastclaimedadjustmentinvoice_fc}
                  onChangeHandler={onChangeInputHandler}
                />
                <MoneyTextField
                  name={"lastverifiedadjustmentinvoice_fc"}
                  label={""}
                  value={lastverifiedadjustmentinvoice_fc}
                  onChangeHandler={onChangeInputHandler}
                />
                <MoneyTextField
                  name={"lastclaimedextraworkinvoice_fc"}
                  label={""}
                  value={lastclaimedextraworkinvoice_fc}
                  onChangeHandler={onChangeInputHandler}
                />
                <MoneyTextField
                  name={"lastverifiedextraworkinvoice_fc"}
                  label={""}
                  value={lastverifiedextraworkinvoice_fc}
                  onChangeHandler={onChangeInputHandler}
                />
                <MoneyTextField
                  mt={4}
                  name={"lastclaimbill_fc"}
                  label={""}
                  value={lastclaimbill_fc}
                  onChangeHandler={onChangeInputHandler}
                />
                <MoneyTextField
                  name={"lastclaimbillverified_fc"}
                  label={""}
                  value={lastclaimbillverified_fc}
                  onChangeHandler={onChangeInputHandler}
                />
                <MoneyTextField
                  name={"lastclaimbillrecievedamount_fc"}
                  label={""}
                  value={lastclaimbillrecievedamount_fc}
                  onChangeHandler={onChangeInputHandler}
                />
                <MoneyTextField
                  mt={4}
                  name={"cumulativeclientpayment_fc"}
                  label={""}
                  value={cumulativeclientpayment_fc}
                  onChangeHandler={onChangeInputHandler}
                />
                <MoneyTextField
                  name={"clientprepaymentdeferment_fc"}
                  label={""}
                  value={clientprepaymentdeferment_fc}
                  onChangeHandler={onChangeInputHandler}
                />
                <MoneyTextField
                  mt={4}
                  name={"estcost_fc"}
                  label={""}
                  value={estcost_fc}
                  onChangeHandler={onChangeInputHandler}
                />
                <MoneyTextField
                  name={"estclientpayment_fc"}
                  label={""}
                  value={estclientpayment_fc}
                  onChangeHandler={onChangeInputHandler}
                />
                <MoneyTextField
                  name={"estdebitcredit_fc"}
                  label={""}
                  value={estdebitcredit_fc}
                  onChangeHandler={onChangeInputHandler}
                />
              </Box>   
              <Box display="flex" flexDirection="column" mx={1}>
                <Typography variant='caption'>ریالی (میلیون ریال)</Typography>
                <MoneyTextField
                  name={"lastclaimedinvoice_r"}
                  label={""}
                  value={lastclaimedinvoice_r}
                  onChangeHandler={onChangeInputHandler}
                />
                <MoneyTextField
                  name={"lastverifiedinvoice_r"}
                  label={""}
                  value={lastverifiedinvoice_r}
                  onChangeHandler={onChangeInputHandler}
                />
                <MoneyTextField
                  name={"lastclaimedadjustmentinvoice_r"}
                  label={""}
                  value={lastclaimedadjustmentinvoice_r}
                  onChangeHandler={onChangeInputHandler}
                />
                <MoneyTextField
                  name={"lastverifiedadjustmentinvoice_r"}
                  label={""}
                  value={lastverifiedadjustmentinvoice_r}
                  onChangeHandler={onChangeInputHandler}
                />
                <MoneyTextField
                  name={"lastclaimedextraworkinvoice_r"}
                  label={""}
                  value={lastclaimedextraworkinvoice_r}
                  onChangeHandler={onChangeInputHandler}
                />
                <MoneyTextField
                  name={"lastverifiedextraworkinvoice_r"}
                  label={""}
                  value={lastverifiedextraworkinvoice_r}
                  onChangeHandler={onChangeInputHandler}
                />
                <MoneyTextField
                  mt={4}
                  name={"lastclaimbill_r"}
                  label={""}
                  value={lastclaimbill_r}
                  onChangeHandler={onChangeInputHandler}
                />
                <MoneyTextField
                  name={"lastclaimbillverified_r"}
                  label={""}
                  value={lastclaimbillverified_r}
                  onChangeHandler={onChangeInputHandler}
                />
                <MoneyTextField
                  name={"lastclaimbillrecievedamount_r"}
                  label={""}
                  value={lastclaimbillrecievedamount_r}
                  onChangeHandler={onChangeInputHandler}
                />
                <MoneyTextField
                  mt={4}
                  name={"cumulativeclientpayment_r"}
                  label={""}
                  value={cumulativeclientpayment_r}
                  onChangeHandler={onChangeInputHandler}
                />
                <MoneyTextField
                  name={"clientprepaymentdeferment_r"}
                  label={""}
                  value={clientprepaymentdeferment_r}
                  onChangeHandler={onChangeInputHandler}
                />
                <MoneyTextField
                  mt={4}
                  name={"estcost_r"}
                  label={""}
                  value={estcost_r}
                  onChangeHandler={onChangeInputHandler}
                />
                <MoneyTextField
                  name={"estclientpayment_r"}
                  label={""}
                  value={estclientpayment_r}
                  onChangeHandler={onChangeInputHandler}
                />
                <MoneyTextField
                  name={"estdebitcredit_r"}
                  label={""}
                  value={estdebitcredit_r}
                  onChangeHandler={onChangeInputHandler}
                />
              </Box> 
              <Box display="flex" flexDirection="column" mx={1}>
                <Typography variant='caption'>  به شماره ی  </Typography>
                <NumberTextField
                  name={"lci_no"}
                  label={""}
                  value={lci_no}
                  onChangeHandler={onChangeInputHandler}
                />
                <NumberTextField
                  name={"lvi_no"}
                  label={""}
                  value={lvi_no}
                  onChangeHandler={onChangeInputHandler}
                />
                <NumberTextField
                  name={"lcai_no"}
                  label={""}
                  value={lcai_no}
                  onChangeHandler={onChangeInputHandler}
                />
                <NumberTextField
                  name={"lvai_no"}
                  label={""}
                  value={lvai_no}
                  onChangeHandler={onChangeInputHandler}
                />
                <NumberTextField
                  name={"lcewi_no"}
                  label={""}
                  value={lcewi_no}
                  onChangeHandler={onChangeInputHandler}
                />
                <NumberTextField
                  name={"lvewi_no"}
                  label={""}
                  value={lvewi_no}
                  onChangeHandler={onChangeInputHandler}
                />
              </Box>  
            </Box>
            <Box display="flex" sx={{direction:'rtl'}}>
              <Box display="flex" flexDirection="column" mx={1}>
                <Typography variant='body1' >   مبالغ تجمعی خالص صورت وضعیت ها و دریافت ها   </Typography>
                <InputLabel sx={{fontSize:{xs:'9pt', sm:'10pt', md:'11pt'}, pt:1.5, pb:1}}>آخرین صورت وضعیت کارکرد ادعایی بررسی شده :</InputLabel>
                <InputLabel sx={{fontSize:{xs:'9pt', sm:'10pt', md:'11pt'}, pt:1.5, pb:1}}> آخرین صورت وضعیت کارکرد تائید شده:</InputLabel>
                <InputLabel sx={{fontSize:{xs:'9pt', sm:'10pt', md:'11pt'}, pt:1.5, pb:1}}> آخرین صورت وضعیت تعدیل ادعایی بررسی شده:</InputLabel>
                <InputLabel sx={{fontSize:{xs:'9pt', sm:'10pt', md:'11pt'}, pt:1.5, pb:1}}> آخرین صورت وضعیت تعدیل تائید شده:</InputLabel>
                <InputLabel sx={{fontSize:{xs:'9pt', sm:'10pt', md:'11pt'}, pt:1.5, pb:1}}>آخرین صورت وضعیت کارهای اضافی ادعایی بررسی شده:</InputLabel>
                <InputLabel sx={{fontSize:{xs:'9pt', sm:'10pt', md:'11pt'}, pt:1.5, pb:1}}>آخرین صورت وضعیت کارهای اضافی تائید شده:</InputLabel>

                <InputLabel sx={{fontSize:{xs:'9pt', sm:'10pt', md:'11pt'}, pt:4.5, pb:1}}>مجموع کلیه لوایح ادعایی :</InputLabel>
                <InputLabel sx={{fontSize:{xs:'9pt', sm:'10pt', md:'11pt'}, pt:1.5, pb:1}}>مجموع مبلغ تائیدی از لوایح ادعایی :</InputLabel>
                <InputLabel sx={{fontSize:{xs:'9pt', sm:'10pt', md:'11pt'}, pt:1.5, pb:1}}>مبلغ دریافتی علی الحساب بابت ادعا :</InputLabel>

                <InputLabel sx={{fontSize:{xs:'9pt', sm:'10pt', md:'11pt'}, pt:4.5, pb:1}}>مبلغ تجمعی دریافت از کارفرما/مشارکت بابت صورت وضعیت های کارکردو تعدیل و کارهای اضافی:</InputLabel>
                <InputLabel sx={{fontSize:{xs:'9pt', sm:'10pt', md:'11pt'}, pt:1.5, pb:1}}>مبلغ معوقات پیش دریافت از کارفرما/مشارکت:</InputLabel>

                <InputLabel sx={{fontSize:{xs:'9pt', sm:'10pt', md:'11pt'}, pt:4.5, pb:1}}>پیش بینی مبلغ هزینه کرد در ماه آتی-A (Cash out):</InputLabel>
                <InputLabel sx={{fontSize:{xs:'9pt', sm:'10pt', md:'11pt'}, pt:1.5, pb:1}}>پپیش بینی مبلغ دریافتی از کارفرما / مشارکت در ماه آتی-B (Cash in):</InputLabel>
                <InputLabel sx={{fontSize:{xs:'9pt', sm:'10pt', md:'11pt'}, pt:1.5, pb:1}}>مازاد/کسری جریان نقدینگی پروژه(B - A):</InputLabel>
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} px='auto'>
        <Box display="flex" justifyContent='flex-end' p={2}>
          <Button 
            sx={{width:120}} 
            variant='contained' 
            color='info' 
            size='medium' 
            onClick={clickSaveHandler}
            startIcon={<SaveAsOutlined/>}
          >
            ذخیره
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state: RootState) => ({
  currentContractId: state.contracts.currentContractId,
  currentReportDateId: state.reportDates.currentReportDateId
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  editFinancialInfo: (id: number, request: IFinancialInfo) => 
    dispatch(EditFinancialInfo(id, request)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type FinancialInfoProps = ConnectedProps<typeof connector>;

export default connector(FinancialInfo)
