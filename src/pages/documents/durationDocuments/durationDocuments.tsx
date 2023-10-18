import { FC, ReactElement } from 'react';
import { Dispatch } from 'redux';
import { 
  ConnectedProps, 
  connect, 
} from 'react-redux';
import { 
  Box, 
  Grid, 
} from '@mui/material';

import { RootState } from '../../../redux/store/store';
import { AddProjectMonthlyDoc, DeleteProjectMonthlyDoc, EditProjectMonthlyDoc, GetProjectMonthlyDoc, PartialEditProjectMonthlyDoc } from '../../../redux/actionCreators/projectMonthlyDoxActions';
import { IRequestProjectMonthlyDoc, IRequestPartialProjectMonthlyDoc } from '../../../models/projectMonthlyDox';
import ProjectMonthlyDox from './components/ProjectMonthlyDox';
import { AddApprovedInvoiceDoc, DeleteApprovedInvoiceDoc, EditApprovedInvoiceDoc, GetApprovedInvoiceDoc, PartialEditApprovedInvoiceDoc } from '../../../redux/actionCreators/approvedInvoiceDoxActions';
import { IRequestApprovedInvoiceDoc, IRequestPartialApprovedInvoiceDoc } from '../../../models/approvedInvoiceDox';
import ApprovedInvoiceDox from './components/ApprovedInvoiceDox';


const DurationDocuments: FC<ApprovedInvoiceProps> = ({ 
  currentContractId, 
  currentReportDateId, 
  getProjectMonthlyDoc,
  addProjectMonthlyDoc,
  editProjectMonthlyDoc,
  partialEditProjectMonthlyDoc,
  deleteProjectMonthlyDoc,
  getApprovedInvoiceDoc,
  addApprovedInvoiceDoc,
  editApprovedInvoiceDoc,
  partialEditApprovedInvoiceDoc,
  deleteApprovedInvoiceDoc,
}): ReactElement => {

  return (
    <Grid container fontFamily='B Nazanin' rowSpacing={{ xs: 1, sm: 2, md: 3, lg: 3, xl:2.5 }} columnSpacing={{ xs:1,sm:2,md:3,lg:5,xl:7 }} px={{ xs:.5,sm:.5,md:.5,lg:.5,xl:.5, direction:'ltr'}}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} px='auto'>
        <Box display="flex" flexDirection="column" mx='auto' pt={5} pb={4} px={{ xs:.5,sm:.5,md:.5,lg:.5,xl:.5 }} borderRadius={2} boxShadow={3} >
        <Box display="flex" justifyContent='center' borderRadius={2} boxShadow={3} mb={5} pt={5} pb={5}>
            <ProjectMonthlyDox 
              currentContractId={currentContractId} 
              currentDateId={currentReportDateId}
              getProjectMonthlyDoc={getProjectMonthlyDoc}
              addProjectMonthlyDoc={addProjectMonthlyDoc}
              editProjectMonthlyDoc={editProjectMonthlyDoc}
              partialEditProjectMonthlyDoc={partialEditProjectMonthlyDoc}
              deleteProjectMonthlyDoc={deleteProjectMonthlyDoc}            
            />
          </Box>
          <Box display="flex" justifyContent='center' borderRadius={2} boxShadow={3} pt={5} pb={5}>
            <ApprovedInvoiceDox 
              currentContractId={currentContractId} 
              currentDateId={currentReportDateId}
              getApprovedInvoiceDoc={getApprovedInvoiceDoc}
              addApprovedInvoiceDoc={addApprovedInvoiceDoc}
              editApprovedInvoiceDoc={editApprovedInvoiceDoc}
              partialEditApprovedInvoiceDoc={partialEditApprovedInvoiceDoc}
              deleteApprovedInvoiceDoc={deleteApprovedInvoiceDoc}            
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
  getProjectMonthlyDoc: (contractId: number) => 
    dispatch(GetProjectMonthlyDoc(contractId)),
  addProjectMonthlyDoc: (request: IRequestProjectMonthlyDoc) => 
    dispatch(AddProjectMonthlyDoc(request)),
  editProjectMonthlyDoc: (id: number, request: IRequestProjectMonthlyDoc) => 
    dispatch(EditProjectMonthlyDoc(id, request)),
  partialEditProjectMonthlyDoc: (id: number, request: IRequestPartialProjectMonthlyDoc) => 
    dispatch(PartialEditProjectMonthlyDoc(id, request)),
  deleteProjectMonthlyDoc: (id: number) => 
    dispatch(DeleteProjectMonthlyDoc(id)),

  getApprovedInvoiceDoc: (contractId: number, dateId: number) => 
    dispatch(GetApprovedInvoiceDoc(contractId, dateId)),
  addApprovedInvoiceDoc: (request: IRequestApprovedInvoiceDoc) => 
    dispatch(AddApprovedInvoiceDoc(request)),
  editApprovedInvoiceDoc: (id: number, request: IRequestApprovedInvoiceDoc) => 
    dispatch(EditApprovedInvoiceDoc(id, request)),
  partialEditApprovedInvoiceDoc: (id: number, request: IRequestPartialApprovedInvoiceDoc) => 
    dispatch(PartialEditApprovedInvoiceDoc(id, request)),
  deleteApprovedInvoiceDoc: (id: number) => 
    dispatch(DeleteApprovedInvoiceDoc(id)),
  });

const connector = connect(mapStateToProps, mapDispatchToProps);

type ApprovedInvoiceProps = ConnectedProps<typeof connector>;

export default connector(DurationDocuments)
