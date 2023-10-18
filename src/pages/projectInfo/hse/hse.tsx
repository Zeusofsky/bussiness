import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { 
  ConnectedProps, 
  connect, 
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
import { 
  RemoveNonNumeric,
  NumberTextField,
} from '../../../components';
import { IHse } from '../../../models/hse';
import { EditHse, GetHse } from '../../../redux/actionCreators/hseActions';
import { IHseState } from '../../../redux/reducers/hseReducer';
import { AddHseReportDoc, DeleteHseReportDoc, EditHseReportDoc, GetHseReportDoc, PartialEditHseReportDoc } from '../../../redux/actionCreators/hseReportDocActions';
import { IRequestHseReportDoc, IRequestPartialHseReportDoc } from '../../../models/hseReportDox';
import HseReportDoc from './components/HseReportDox';


const Hse: FC<HseProps> = ({ 
  currentContractId, 
  currentReportDateId, 
  getHse,
  editHse,
  getHseReportDoc,
  addHseReportDoc,
  editHseReportDoc,
  partialEditHseReportDoc,
  deleteHseReportDoc,
}): ReactElement => {

  useEffect(() => {
    if (currentContractId < 1) return

    getHse(currentContractId, currentReportDateId);
  }, [getHse, currentContractId, currentReportDateId]);
  
  const hseState: IHseState = useSelector((state: RootState) => state.hse)
  const hse: IHse = hseState.hse

  const [totaloperationdays, setTotaloperationdays] = useState<string>(RemoveNonNumeric(String(hse?.totaloperationdays)));
  const [disadvantageeventno, setDisadvantageeventno] = useState<string>(RemoveNonNumeric(String(hse?.disadvantageeventno)));
  const [withouteventdays, setWithouteventdays] = useState<string>((RemoveNonNumeric(String(hse?.withouteventdays))));
  const [woundno, setWoundno] = useState<string>(RemoveNonNumeric(String(hse?.woundno)));
  const [deathno, setDeathno] = useState<string>(RemoveNonNumeric(String(hse?.deathno)));
  const onChangeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log('name: ', event.target.name)
    // console.log('value: ',event.target.value)
    let name = event.target.name;
    switch(name){
      case "totaloperationdays": 
        setTotaloperationdays(RemoveNonNumeric(event.target.value));
        break;
      case "disadvantageeventno": 
        setDisadvantageeventno(RemoveNonNumeric(event.target.value));
        break;
      case "withouteventdays": 
        setWithouteventdays(RemoveNonNumeric(event.target.value));
        break;
      case "woundno": 
        setWoundno(RemoveNonNumeric(event.target.value));
        break;
      case "deathno": 
        setDeathno(RemoveNonNumeric(event.target.value));
        break;
      }
    // console.log('addendum_r5: ',addendum_r5)
    // console.log('addendum_fc5: ',addendum_fc5)
  };

  useEffect(() => {
    setTotaloperationdays(RemoveNonNumeric(String(hse?.totaloperationdays)));
  }, [hse?.totaloperationdays]);

  useEffect(() => {
    setDisadvantageeventno(RemoveNonNumeric(String(hse?.disadvantageeventno)));
  }, [hse?.disadvantageeventno]);

  useEffect(() => {
    setWithouteventdays(RemoveNonNumeric(String(hse?.withouteventdays)));
  }, [hse?.totaloperationdays, hse?.disadvantageeventno, hse?.withouteventdays]);

  useEffect(() => {
    setWoundno(RemoveNonNumeric(String(hse?.woundno)));
  }, [hse?.woundno]);

  useEffect(() => {
    setDeathno(RemoveNonNumeric(String(hse?.deathno)));
  }, [hse?.deathno]);

  const clickSaveHandler = (e: React.MouseEvent) => {
    const request: IHse = {
      hseid: hse.hseid,
      contractid: currentContractId,
      dateid: currentReportDateId,
      totaloperationdays: Number(RemoveNonNumeric(totaloperationdays)),
      disadvantageeventno: Number(RemoveNonNumeric(disadvantageeventno)),
      withouteventdays: Number(RemoveNonNumeric(withouteventdays)),
      woundno: Number(RemoveNonNumeric(woundno)),
      deathno: Number(RemoveNonNumeric(deathno)),
    }
    // console.log('request: ', request)

    editHse(hse.hseid, request)
  }

  return (
    <Grid container fontFamily='B Nazanin' rowSpacing={{ xs: 1, sm: 2, md: 3, lg: 3, xl:2.5 }} columnSpacing={{ xs:1,sm:2,md:3,lg:5,xl:7 }} px={{ xs:1,sm:2,md:3,lg:5,xl:7, direction:'ltr'}}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} px='auto'>
        <Box display="flex" flexDirection="column" mx='auto' pt={5} pb={4} px={{ xs:1,sm:2,md:3,lg:4,xl:5 }} borderRadius={2} boxShadow={3} >
          
          <Box display='flex' justifyContent='flex-end' mb={4}>
            <Typography
              variant='h6'
              fontWeight={500}
              fontFamily='B Nazanin'
              sx={{direction:'rtl'}}
            >
                گزارش HSE
            </Typography>
          </Box>

          <Box mb={5} pt={5} pb={3} borderRadius={2} boxShadow={3}>
            <Box display="flex" justifyContent='space-between' px={15} mb={3}>
              <Box display="flex" >
                <Box display="flex" flexDirection="column" mx={1}>
                  <NumberTextField
                    name={"totaloperationdays"}
                    label={""}
                    value={totaloperationdays}
                    onChangeHandler={onChangeInputHandler}
                  />
                  <NumberTextField
                    name={"withouteventdays"}
                    label={""}
                    value={withouteventdays}
                    onChangeHandler={onChangeInputHandler}
                  />
                  <NumberTextField
                    name={"deathno"}
                    label={""}
                    value={deathno}
                    onChangeHandler={onChangeInputHandler}
                  />
                  <NumberTextField
                    name={"woundno"}
                    label={""}
                    value={woundno}
                    onChangeHandler={onChangeInputHandler}
                  />
                  <NumberTextField
                    name={"disadvantageeventno"}
                    label={""}
                    value={disadvantageeventno}
                    onChangeHandler={onChangeInputHandler}
                  />
              </Box>  
              </Box>
              <Box display="flex" sx={{direction:'rtl'}}>
                <Box display="flex" flexDirection="column" mx={1}>
                  <InputLabel sx={{fontFamily:'B Nazanin', fontSize:{xs:'9pt', sm:'10pt', md:'11pt'}, pt:1.5, pb:1}}>تعداد کل روزهای عملیاتی از ابتدای پروژه:</InputLabel>
                  <InputLabel sx={{fontFamily:'B Nazanin', fontSize:{xs:'9pt', sm:'10pt', md:'11pt'}, pt:1.5, pb:1}}> تعداد روزهای بدون حادثه از ابتدای پروژه:</InputLabel>
                  <InputLabel sx={{fontFamily:'B Nazanin', fontSize:{xs:'9pt', sm:'10pt', md:'11pt'}, pt:1.5, pb:1}}> تعداد رخداد منجر به فوت از ابتدای پروژه:</InputLabel>
                  <InputLabel sx={{fontFamily:'B Nazanin', fontSize:{xs:'9pt', sm:'10pt', md:'11pt'}, pt:1.5, pb:1}}> تعداد رخداد منجر به جرح از ابتدای پروژه:</InputLabel>
                  <InputLabel sx={{fontFamily:'B Nazanin', fontSize:{xs:'9pt', sm:'10pt', md:'11pt'}, pt:1.5, pb:1}}>تعداد رخداد منجر به زیان مالی از ابتدای پروژه:</InputLabel>
                </Box>
              </Box>
            </Box>
            <Box display="flex" justifyContent='flex-end' p={2} pr={15}>
              <Button 
                sx={{width:120, fontFamily:'B Nazanin'}} 
                variant='contained' 
                color='info' 
                size='medium' 
                onClick={clickSaveHandler}
                startIcon={<SaveAsOutlined/>}
              >
                ذخیره
              </Button>
            </Box>
          </Box>

          <Box display="flex" justifyContent='center' borderRadius={2} boxShadow={3} pt={5} pb={5}>
            <HseReportDoc 
              currentContractId={currentContractId} 
              currentDateId={currentReportDateId} 
              getHseReportDoc={getHseReportDoc}
              addHseReportDoc={addHseReportDoc}
              editHseReportDoc={editHseReportDoc}
              partialEditHseReportDoc={partialEditHseReportDoc}
              deleteHseReportDoc={deleteHseReportDoc}            
            />
          </Box>
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
  getHse: (contactId: number, dateId: number) =>
    dispatch(GetHse(contactId, dateId)),
  editHse: (id: number, request: IHse) => 
    dispatch(EditHse(id, request)),

  getHseReportDoc: (contractId: number) => 
    dispatch(GetHseReportDoc(contractId)),
  addHseReportDoc: (request: IRequestHseReportDoc) => 
    dispatch(AddHseReportDoc(request)),
  editHseReportDoc: (id: number, request: IRequestHseReportDoc) => 
    dispatch(EditHseReportDoc(id, request)),
  partialEditHseReportDoc: (id: number, request: IRequestPartialHseReportDoc) => 
    dispatch(PartialEditHseReportDoc(id, request)),
  deleteHseReportDoc: (id: number) => 
    dispatch(DeleteHseReportDoc(id)),
  });

const connector = connect(mapStateToProps, mapDispatchToProps);

type HseProps = ConnectedProps<typeof connector>;

export default connector(Hse)
