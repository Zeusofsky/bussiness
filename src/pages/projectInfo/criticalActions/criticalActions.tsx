import React, { FC, ReactElement, useCallback, 
  useEffect, 
  // useEffect, 
  useMemo, useState } from 'react';
import {
  MaterialReactTable,
  type MaterialReactTableProps,
  type MRT_Cell,
  type MRT_ColumnDef,
  type MRT_Row,
} from 'material-react-table';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  // Typography,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { ConnectedProps, connect, useSelector, 
  // useDispatch, useSelector 
} from 'react-redux';
import { AddCriticalAction, 
  GetCriticalAction, 
  EditCriticalAction, DeleteCriticalAction } from '../../../redux/actionCreators/criticalActionActions';
import { Dispatch } from 'redux';
import { ICriticalAction, IRequestCriticalAction } from '../../../models/criticalAction';
import { RootState } from '../../../redux/store/store';
import { toastWarning } from '../../../services/toasters';
import { ICriticalActionsState } from '../../../redux/reducers/criticalActionReducer';
// import { ActionType } from '../../../redux/actionTypes/criticalActionActionTypes';
// import { ICriticalActionsState } from '../../../redux/reducers/criticalActionReducer';


const CriticalAction: FC<CriticalActionProps> = ({ 
    currentContractId, 
    currentReportDateId, 
    addCriticalAction,
    getCriticalAction,
    editCriticalAction,
    deleteCriticalAction,
  }): ReactElement => {

    // console.log('currentContractId: ', currentContractId)
    // console.log('currentReportDateId: ', currentReportDateId)

    useEffect(() => {
      if (currentContractId < 1) return
  
      getCriticalAction(currentContractId, currentReportDateId);
    }, [getCriticalAction, currentContractId, currentReportDateId]);
    
    const criticalActionState: ICriticalActionsState = useSelector((state: RootState) => state.criticalActions)
    const criticalActions: ICriticalAction[] = criticalActionState.criticalActions

    const [modalOpen, setModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false)
    const [tableData, setTableData] = useState<ICriticalAction[]>(criticalActions);
    const [validationErrors, setValidationErrors] = useState<{
      [cellId: string]: string;
    }>({});

    useEffect(() => {
      // console.log('useEffect....')
      if(!editMode){
        setTableData(criticalActions)
      }
      else{
        setEditMode(false)
      }
    }, [criticalActions]);


    const handleCreateNewRow = (values: ICriticalAction) => {
      if(values.criticalaction === ''){
        toastWarning("لطفا فعالیت بحرانی را مشخص کنید");
        return;
      }

      const request: IRequestCriticalAction = {
        contractid: currentContractId,
        dateid: currentReportDateId,
        criticalaction: values.criticalaction,
      }
      addCriticalAction(request)
    };
  
    const handleSaveRowEdits: MaterialReactTableProps<ICriticalAction>['onEditingRowSave'] =
      async ({ exitEditingMode, row, values }) => {
        if (!Object.keys(validationErrors).length) {
          tableData[row.index] = {
            criticalactionid: row.original.criticalactionid,
            contractid: currentContractId,
            dateid: currentReportDateId,
            criticalaction: values.criticalaction,
          };
          //send/receive api updates here, then refetch or update local table data for re-render
          const request: IRequestCriticalAction = {
            contractid: currentContractId,
            dateid: currentReportDateId,
            criticalaction: values.criticalaction,
          }
          editCriticalAction(Number(row.original.criticalactionid), request)

          setTableData([...tableData]);
          exitEditingMode(); //required to exit editing mode and close modal
          setEditMode(true)
        }
      };
  
    const handleCancelRowEdits = () => {
      setValidationErrors({});
    };
  
    const handleDeleteRow = useCallback(
      (row: MRT_Row<ICriticalAction>) => {
        if (
          // ${row.getValue('row_number')}
          !window.confirm(`آیا از حذف اطلاعات مورد نظر اطمینان دارید؟`)
        ) {
          return;
        }
        //send api delete request here, then refetch or update local table data for re-render
        deleteCriticalAction(Number(row.original.criticalactionid))

        tableData.splice(row.index, 1);
        setTableData([...tableData]);
      },
      [tableData, deleteCriticalAction],
    );
  
    const getCommonEditTextFieldProps = useCallback(
      (
        cell: MRT_Cell<ICriticalAction>,
      ): MRT_ColumnDef<ICriticalAction>['muiTableBodyCellEditTextFieldProps'] => {
        return {
          error: !!validationErrors[cell.id],
          helperText: validationErrors[cell.id],
          onBlur: (event) => {
            const isValid =
              cell.column.id === 'criticalaction' ? validateRequired(event.target.value) : '';
            if (!isValid) {
              //set validation error for cell if invalid
              setValidationErrors({
                ...validationErrors,
                [cell.id]: `${cell.column.columnDef.header} الزامی است`,
              });
            } else {
              //remove validation error for cell if valid
              delete validationErrors[cell.id];
              setValidationErrors({
                ...validationErrors,
              });
            }
          },
        };
      },
      [validationErrors],
    );
  
    const columns = useMemo<MRT_ColumnDef<ICriticalAction>[]>(
        () => [
          {
            accessorKey: 'criticalaction', //simple recommended way to define a column
            header: 'فعالیتهای بحرانی',
            size: 700,
            minSize: 500,
            maxSize: 900,
            enableColumnActions: false,
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'right' },
            muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                ...getCommonEditTextFieldProps(cell),
              }),
          },
        ],
        [getCommonEditTextFieldProps],
      );    

    return (
      <Box sx={{direction:'ltr'}}>
        <MaterialReactTable
          displayColumnDefOptions={{
            'mrt-row-actions': {
              header: 'ویرایش',
              muiTableHeadCellProps: {
                align: 'center',
              },
              size: 80,
            },
            // 'mrt-row-numbers': {
            //   muiTableHeadCellProps: {
            //     align: 'center',
            //     width: 40
            //   },
            //   muiTableBodyCellProps: {
            //     align: 'center',
            //     width: 40
            //   },
            //   size: 40,
            // }
          }}
          muiTableHeadCellProps={{
            sx: {
              // '& .Mui-TableHeadCell-Content': {
              //   justifyContent: 'space-between',
              // },
              fontWeight: '550',
              fontSize: '11.8px',
              fontFamily: 'B Nazanin',
              borderTop: '2px solid #888888', //add a border between columns
              borderRight: '1px solid #888888', //add a border between columns
              borderLeft: '1px solid #888888', //add a border between columns
            },
          }}
          muiTableBodyCellProps={{
            sx: {
              '& .Mui-TableBodyCell-Content': {
                justifyContent: 'space-between',
              },
              fontSize: '11.8px',
              fontFamily: 'B Nazanin',
              borderRight: '2px solid #e0e0e0', //add a border between columns
            },
          }}
          muiTableBodyProps={{
            sx: {
              //stripe the rows, make odd rows a darker color   sx={{direction:'ltr'}}
              '& tr:nth-of-type(odd)': {
                backgroundColor: 'rgb(245, 245, 245, .1)',
              },
            },
          }}

          columns={columns}
          data={tableData}
          initialState={{ 
            density: 'compact', 
            columnPinning: { right: ['mrt-row-numbers'] },
            // columnVisibility: { criticalactionid: false,  } 
          }}
          enableRowNumbers
          enableRowOrdering={false}
          enableDensityToggle={false}
          enableHiding={false}
          enablePagination={false}
          enableColumnFilters={false}
          enableFilters={false}
          enableSorting={false}

          editingMode="modal" //default   
          enableEditing
          onEditingRowSave={handleSaveRowEdits}
          onEditingRowCancel={handleCancelRowEdits}
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '1rem', width:'10%'}}>
              <Tooltip arrow placement="left" title="ویرایش">
                <IconButton onClick={() =>  table.setEditingRow(row)}>
                  {/* startEditModal(row.original)}> */}
                  <Edit sx={{size:'small'}}/>
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="حذف">
                <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                  <Delete sx={{size:'small'}}/>
                </IconButton>
              </Tooltip>
            </Box>
          )}

          renderTopToolbarCustomActions={() => (
            <Button
              color="secondary"
              onClick={() => setModalOpen(true)}
              variant="contained"
              sx={{ fontFamily:'B Nazanin'}}
            >
              ساختن رکورد جدید
            </Button>
          )}
        />
        <CreateCriticalActionModal
          columns={columns}
          open={modalOpen}
          // editMode={editMode}
          // criticalActionInEditStage={criticalActionInEditStage}
          onClose={() => setModalOpen(false)}
          onSubmit={handleCreateNewRow}
        />
      </Box>
    );
  };
  
  interface ModalProps {
    columns: MRT_ColumnDef<ICriticalAction>[];
    open: boolean;
    // editMode: boolean;
    // criticalActionInEditStage: ICriticalAction | null;
    onClose: () => void;
    onSubmit: (values: ICriticalAction) => void;
  }
  
  //example of creating a mui dialog modal for creating new rows
  export const CreateCriticalActionModal = ({
    open,
    columns,
    onClose,
    onSubmit,
  }: ModalProps) => {
    const [values, setValues] = useState<any>(() =>
      columns.reduce((acc, column) => {
        acc[column.accessorKey ?? ''] = '';
        return acc;
      }, {} as any),
    );
  
    const handleSubmit = () => {
      //put your validation logic here
      onSubmit(values);
      onClose();
    };
  
    return (
      <Dialog open={open}>
        <DialogTitle textAlign="center" sx={{fontFamily:'B Nazanin'}}>ساختن رکورد جدید</DialogTitle>
        <DialogContent>
          <form onSubmit={(e) => e.preventDefault()}>
            <Stack
              sx={{
                width: '100%',
                minWidth: { xs: '300px', sm: '360px', md: '400px' },
                gap: '1.5rem',
              }}
            >
              {/*  */}
              {columns.filter(column => column.accessorKey === 'criticalaction').map((column) => (
                <TextField
                  key={column.accessorKey}
                  label={column.header}
                  name={column.accessorKey}
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                />
              ))}
            </Stack>
          </form>
        </DialogContent>
        <DialogActions sx={{ p: '1.25rem' }}>
          <Button color="primary" onClick={onClose}>انصراف</Button>
          <Button color="secondary" onClick={handleSubmit} variant="contained">
            ساختن رکورد جدید
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  const validateRequired = (value: string) => !!value.length;

  const mapStateToProps = (state: RootState) => ({
    currentContractId: state.contracts.currentContractId,
    currentReportDateId: state.reportDates.currentReportDateId,
    // criticalActions: state.criticalActions.criticalActions,
  });
  
  const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    // toggleModal: () => dispatch({
    //   type: ActionType.TOGGLE_CRITICALACTION_MODAL
    // }),
    addCriticalAction: (request: IRequestCriticalAction) => 
    dispatch(AddCriticalAction(request)),
    getCriticalAction: (contractId: number, dateId: number) => 
      dispatch(GetCriticalAction(contractId, dateId)),
    editCriticalAction: (id: number, request: IRequestCriticalAction) => 
      dispatch(EditCriticalAction(id, request)),
    deleteCriticalAction: (id: number) => 
      dispatch(DeleteCriticalAction(id)),
  }); 
  
  const connector = connect(mapStateToProps, mapDispatchToProps);
  
  type CriticalActionProps = ConnectedProps<typeof connector>;
  
  export default connector(CriticalAction)