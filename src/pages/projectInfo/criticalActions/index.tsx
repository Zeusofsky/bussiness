import { Box } from "@mui/material";
import { FC, useEffect } from "react";

import CriticalAction from "./criticalActions";
import { ConnectedProps, connect } from "react-redux";
import { GetCriticalAction } from "../../../redux/actionCreators/criticalActionActions";
import { Dispatch } from "redux";
import { RootState } from "../../../redux/store/store";

const Index: FC<IndexProps> = ({
    currentContractId, 
    currentReportDateId, 
    getCriticalAction,
}) => {

    useEffect(() => {
        if (currentContractId < 1) return
    
        getCriticalAction(currentContractId, currentReportDateId);
      }, [getCriticalAction, currentContractId, currentReportDateId]);
  
    return (
      <Box>
        <CriticalAction/>
      </Box>
    )
  };
  
  const mapStateToProps = (state: RootState) => ({
    currentContractId: state.contracts.currentContractId,
    currentReportDateId: state.reportDates.currentReportDateId,
  });
  
  const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    getCriticalAction: (contractId: number, dateId: number) => 
      dispatch(GetCriticalAction(contractId, dateId)),
  }); 
  
  const connector = connect(mapStateToProps, mapDispatchToProps);
  
  type IndexProps = ConnectedProps<typeof connector>;
  
  export default connector(Index)