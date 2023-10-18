// import React, { useState, useEffect, FC } from "react";
// import {
//   Button,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   Form,
//   Card,
//   CardBody
// } from "reactstrap";
// import { ConnectedProps, connect } from "react-redux";
// import {
//   CompanyModalToggler,
//   AddCompany,
//   EditCompany
// } from "../../../../../redux/actions/companiesActions";
// import { Dispatch } from "redux";
// import { ActionType } from "../../../redux/actionTypes/criticalActionActionTypes";
// import { ICriticalAction, IRequestCriticalAction } from "../../../models/criticalAction";
// import { AddCriticalAction, CriticalActionModalToggler, EditCriticalAction } from "../../../redux/actionCreators/criticalActionActions";
// import { RootState } from "../../../redux/store/store";
// import { TextField } from "@mui/material";


// const CriticalActionModal: FC<CriticalActionModelProps> = ({
//     isOpen,
//     criticalActionInEditStage,
//     currentContractId,
//     currentReportDateId,
//     modalToggleHandler,
//     addCriticalAction,
//     editCriticalAction,
// }) => {
//   const [criticalaction, setCriticalAction] = useState<string>('')
//   const [isFormValid, setIsFormValid] = useState(false)


//   useEffect(() => {
//     if (criticalActionInEditStage){
//         setCriticalAction(criticalActionInEditStage.criticalaction)
//     }
//   },[criticalActionInEditStage])

//   const InputChangeHandler = (event: ) => {
//     setCriticalAction(event.target.value)
//     setIsFormValid(true)
//   };

//   const SubmitFormHandler = (event: ) => {
//     event.preventDefault();

//     const request: IRequestCriticalAction = {
//         contractid: currentContractId,
//         dateid: currentReportDateId,
//         criticalaction: criticalaction,
//       }

//     if (!criticalActionInEditStage) {
//         addCriticalAction(request);
//         setCriticalAction('')
//     } else {
//       editCriticalAction(criticalActionInEditStage.criticalactionid, request);
//     }
//   };

//   return (
//     <Modal style={{direction:'rtl'}}
//       size="sm"
//       centered
//       isOpen={isOpen}
//       toggle={modalToggleHandler}
//     >
//       <ModalHeader  style={{direction:'ltr'}} toggle={modalToggleHandler} className="card-header">
//         ویرایش شرکت
//       </ModalHeader>
//       <ModalBody style={{ textAlign: "center" }} className="modal-body">
//         <Card>
//           <CardBody>
//             <Form onSubmit={SubmitFormHandler}>
//               <TextField
//                 label="فعالیت بحرانی"
//                 type="text"
//                 name="name"
//                 value={criticalaction}
//                 onChange={InputChangeHandler}
//                 size="small"
//                 variant="outlined"
//               />
//               <Button
//                 disabled={!isFormValid}
//                 type="submit"
//                 color="success"
//               >
//                 تائید
//               </Button>
//             </Form>
//           </CardBody>
//         </Card>
//       </ModalBody>
//     </Modal>
//   );
// }

// const mapStateToProps = (state: RootState) => {
//   return {
//     isOpen: state.criticalActions.isModalOpen,
//     criticalActionInEditStage: state.criticalActions.criticalActionInEditStage,
//     currentContractId: state.contracts.currentContractId,
//     currentReportDateId: state.reportDates.currentReportDateId,
//   };
// };

// const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
//     modalToggleHandler: () => dispatch(CriticalActionModalToggler()),
//     addCriticalAction: (request: IRequestCriticalAction) => 
//         dispatch(AddCriticalAction(request)),
//     editCriticalAction: (id: number, request: IRequestCriticalAction) => 
//       dispatch(EditCriticalAction(id, request)),
//   }); 
  
//   const connector = connect(mapStateToProps, mapDispatchToProps);
  
//   type CriticalActionModelProps = ConnectedProps<typeof connector>;
  
//   export default connector(CriticalActionModal)
