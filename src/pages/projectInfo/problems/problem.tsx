import React, { FC, ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
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
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { ConnectedProps, connect, useDispatch, useSelector } from 'react-redux';
import { AddProblem, GetProblem, EditProblem, DeleteProblem } from '../../../redux/actionCreators/problemActions';
import { Dispatch } from 'redux';
import { IProblem, IRequestProblem } from '../../../models/problem';
import { RootState } from '../../../redux/store/store';
import { IProblemsState } from '../../../redux/reducers/problemReducer';
import { toastWarning } from '../../../services/toasters';


const Problem: FC<ProblemProps> = ({ 
    currentContractId, 
    currentReportDateId, 
    addProblem,
    editProblem,
    deleteProblem,
  }): ReactElement => {
    const dispatch = useDispatch();
  
    useEffect(() => {
      if (currentContractId < 1) return
  
      dispatch<any>(GetProblem(currentContractId, currentReportDateId));
    }, [dispatch, currentContractId, currentReportDateId]);

    const problemState: IProblemsState = useSelector((state: RootState) => state.problems)
    const problems: IProblem[] = problemState.problems
    
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [tableData, setTableData] = useState<IProblem[]>(() => problems);
    const [validationErrors, setValidationErrors] = useState<{
      [cellId: string]: string;
    }>({});

    useEffect(() => {
      if(tableData !== problems){
        setTableData(problems)
      }
    }, [tableData, problems]);
  
    const handleCreateNewRow = (values: IProblem) => {
      if(values.problem === ''){
        toastWarning("لطفا مشکلات و موانع را مشخص کنید");
        return;
      }

      const request: IRequestProblem = {
        contractid: currentContractId,
        dateid: currentReportDateId,
        problem: values.problem,
      }
      addProblem(request)
    };
  
    const handleSaveRowEdits: MaterialReactTableProps<IProblem>['onEditingRowSave'] =
      async ({ exitEditingMode, row, values }) => {
        if (!Object.keys(validationErrors).length) {
          tableData[row.index] = {
            problemid: row.original.problemid,
            contractid: currentContractId,
            dateid: currentReportDateId,
            problem: values.problem,
          };
          //send/receive api updates here, then refetch or update local table data for re-render
          const request: IRequestProblem = {
            contractid: currentContractId,
            dateid: currentReportDateId,
            problem: values.problem,
          }
          editProblem(Number(row.original.problemid), request)

          setTableData([...tableData]);
          exitEditingMode(); //required to exit editing mode and close modal
        }
      };
  
    const handleCancelRowEdits = () => {
      setValidationErrors({});
    };
  
    const handleDeleteRow = useCallback(
      (row: MRT_Row<IProblem>) => {
        if (
          // ${row.getValue('row_number')}
          !window.confirm(`آیا از حذف اطلاعات مورد نظر اطمینان دارید؟`)
        ) {
          return;
        }
        //send api delete request here, then refetch or update local table data for re-render
        deleteProblem(Number(row.original.problemid))

        tableData.splice(row.index, 1);
        setTableData([...tableData]);
      },
      [tableData, deleteProblem],
    );
  
    const getCommonEditTextFieldProps = useCallback(
      (
        cell: MRT_Cell<IProblem>,
      ): MRT_ColumnDef<IProblem>['muiTableBodyCellEditTextFieldProps'] => {
        return {
          error: !!validationErrors[cell.id],
          helperText: validationErrors[cell.id],
          onBlur: (event) => {
            const isValid =
              cell.column.id === 'problem' ? validateRequired(event.target.value) : '';
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
  
    const columns = useMemo<MRT_ColumnDef<IProblem>[]>(
        () => [
          {
            accessorKey: 'problem', //simple recommended way to define a column
            header: 'مشکلات و موانع پیشبرد پروژه',
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
            // columnVisibility: { problemid: false },
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

          // renderRowActions={({ row, table }) => (
          //   <Box sx={{ display: 'flex', gap: '1rem', width:'10%'}}>
          //     {/* <Tooltip arrow placement="left" title="Edit">
          //       <IconButton 
          //         onClick={() => table.setEditingRow(row)}
          //       >
          //         <Edit sx={{size:'small'}}/>
          //       </IconButton>
          //     </Tooltip>  */}
          //     <Tooltip arrow placement="right" title="Delete">
          //       <IconButton color="error" onClick={() => {
          //         tableData.splice(row.index, 1); //assuming simple data table
          //         setTableData([...tableData]);
          //         handleDeleteRow(row);
          //       }}>
          //         <Delete sx={{size:'small'}}/>
          //       </IconButton>
          //     </Tooltip>
          //   </Box>
          // )}

          renderTopToolbarCustomActions={() => (
            <Button
              color="secondary"
              onClick={() => setCreateModalOpen(true)}
              variant="contained"
              sx={{ fontFamily:'B Nazanin'}}
            >
              ساختن رکورد جدید
            </Button>
          )}
        />
        <CreateNewAccountModal
          columns={columns}
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSubmit={handleCreateNewRow}
        />
      </Box>
    );
  };
  
  interface CreateModalProps {
    columns: MRT_ColumnDef<IProblem>[];
    onClose: () => void;
    onSubmit: (values: IProblem) => void;
    open: boolean;
  }
  
  //example of creating a mui dialog modal for creating new rows
  export const CreateNewAccountModal = ({
    open,
    columns,
    onClose,
    onSubmit,
  }: CreateModalProps) => {
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
              {columns.filter(column => column.accessorKey === 'problem').map((column) => (
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
    currentReportDateId: state.reportDates.currentReportDateId
  });
  
  const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    addProblem: (request: IRequestProblem) => 
      dispatch(AddProblem(request)),
    editProblem: (id: number, request: IRequestProblem) => 
      dispatch(EditProblem(id, request)),
    deleteProblem: (id: number) => 
      dispatch(DeleteProblem(id)),
  }); 
  
  const connector = connect(mapStateToProps, mapDispatchToProps);
  
  type ProblemProps = ConnectedProps<typeof connector>;
  
  export default connector(Problem)