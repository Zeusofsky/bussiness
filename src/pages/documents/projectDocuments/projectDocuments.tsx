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
import { AddProjectDoc, DeleteProjectDoc, EditProjectDoc, GetProjectDoc, PartialEditProjectDoc } from '../../../redux/actionCreators/projectDoxActions';
import { IRequestProjectDoc, IRequestPartialProjectDoc } from '../../../models/projectDox';
import ProjectDox from './components/ProjectDox';
import { AddContractorDoc, DeleteContractorDoc, EditContractorDoc, GetContractorDoc, PartialEditContractorDoc } from '../../../redux/actionCreators/contractorDoxActions';
import { IRequestContractorDoc, IRequestPartialContractorDoc } from '../../../models/contractorDox';
import ContractorDox from './components/ContractorDox';


const ProjectDocuments: FC<ProjectDocumentsProps> = ({ 
  currentContractId, 
  currentReportDateId, 
  getProjectDoc,
  addProjectDoc,
  editProjectDoc,
  partialEditProjectDoc,
  deleteProjectDoc,
  getContractorDoc,
  addContractorDoc,
  editContractorDoc,
  partialEditContractorDoc,
  deleteContractorDoc,
}): ReactElement => {

  return (
    <Grid container fontFamily='B Nazanin' rowSpacing={{ xs: 1, sm: 2, md: 3, lg: 3, xl:2.5 }} columnSpacing={{ xs:1,sm:2,md:3,lg:5,xl:7 }} px={{ xs:1,sm:2,md:3,lg:5,xl:7, direction:'ltr'}}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} px='auto'>
        <Box display="flex" flexDirection="column" mx='auto' pt={5} pb={4} px={{ xs:1,sm:2,md:3,lg:4,xl:5 }} borderRadius={2} boxShadow={3} >
        <Box display="flex" justifyContent='center' borderRadius={2} boxShadow={3} mb={5} pt={5} pb={5}>
            <ProjectDox 
              currentContractId={currentContractId} 
              currentDateId={currentReportDateId}
              getProjectDoc={getProjectDoc}
              addProjectDoc={addProjectDoc}
              editProjectDoc={editProjectDoc}
              partialEditProjectDoc={partialEditProjectDoc}
              deleteProjectDoc={deleteProjectDoc}            
            />
          </Box>
          <Box display="flex" justifyContent='center' borderRadius={2} boxShadow={3} pt={5} pb={5}>
            <ContractorDox 
              currentContractId={currentContractId} 
              currentDateId={currentReportDateId}
              getContractorDoc={getContractorDoc}
              addContractorDoc={addContractorDoc}
              editContractorDoc={editContractorDoc}
              partialEditContractorDoc={partialEditContractorDoc}
              deleteContractorDoc={deleteContractorDoc}            
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
  getProjectDoc: (contractId: number) => 
    dispatch(GetProjectDoc(contractId)),
  addProjectDoc: (request: IRequestProjectDoc) => 
    dispatch(AddProjectDoc(request)),
  editProjectDoc: (id: number, request: IRequestProjectDoc) => 
    dispatch(EditProjectDoc(id, request)),
  partialEditProjectDoc: (id: number, request: IRequestPartialProjectDoc) => 
    dispatch(PartialEditProjectDoc(id, request)),
  deleteProjectDoc: (id: number) => 
    dispatch(DeleteProjectDoc(id)),

  getContractorDoc: (contractId: number) => 
    dispatch(GetContractorDoc(contractId)),
  addContractorDoc: (request: IRequestContractorDoc) => 
    dispatch(AddContractorDoc(request)),
  editContractorDoc: (id: number, request: IRequestContractorDoc) => 
    dispatch(EditContractorDoc(id, request)),
  partialEditContractorDoc: (id: number, request: IRequestPartialContractorDoc) => 
    dispatch(PartialEditContractorDoc(id, request)),
  deleteContractorDoc: (id: number) => 
    dispatch(DeleteContractorDoc(id)),
  });

const connector = connect(mapStateToProps, mapDispatchToProps);

type ProjectDocumentsProps = ConnectedProps<typeof connector>;

export default connector(ProjectDocuments)
