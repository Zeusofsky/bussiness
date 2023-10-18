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
import { AddPmsProgress, GetPmsProgress, EditPmsProgress, DeletePmsProgress } from '../../../redux/actionCreators/pmsProgressActions';
import { Dispatch } from 'redux';
import { IPmsProgress, IRequestPmsProgress } from '../../../models/pmsProgress';
import { RootState } from '../../../redux/store/store';
import { IPmsProgressesState } from '../../../redux/reducers/pmsProgressReducer';
import { toastWarning } from '../../../services/toasters';


const PmsProgress: FC<PmsProgressProps> = ({ 
    currentContractId, 
    currentReportDateId, 
    addPmsProgress,
    editPmsProgress,
    deletePmsProgress,
  }): ReactElement => {
    const dispatch = useDispatch();
  
    useEffect(() => {
      if (currentContractId < 1) return
  
      dispatch<any>(GetPmsProgress(currentContractId, currentReportDateId));
    }, [dispatch, currentContractId, currentReportDateId]);
    
    const pmsProgressState: IPmsProgressesState = useSelector((state: RootState) => state.pmsProgresses)
    const pmsProgresses: IPmsProgress[] = pmsProgressState.pmsProgresses
    
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false)
    const [tableData, setTableData] = useState<IPmsProgress[]>(() => pmsProgresses);
    const [validationErrors, setValidationErrors] = useState<{
      [cellId: string]: string;
    }>({});

    useEffect(() => {
      if(!editMode){
        setTableData(pmsProgresses)
      }
      else{
        setEditMode(false)
      }
    }, [pmsProgresses]);
  
    const handleCreateNewRow = (values: IPmsProgress) => {
      if(values.item === ''){
        toastWarning("لطفا ماشین را مشخص کنید");
        return;
      }
      // tableData.push(values);
      // setTableData([...tableData]);
      const request: IRequestPmsProgress = {
        contractid: currentContractId,
        dateid: currentReportDateId,
        item: values.item,
        lastplanprogress: values.lastplanprogress,
        lastplanvirtualprogress: values.lastplanvirtualprogress,
      }
      addPmsProgress(request)
    };
  
    const handleSaveRowEdits: MaterialReactTableProps<IPmsProgress>['onEditingRowSave'] =
      async ({ exitEditingMode, row, values }) => {
        if (!Object.keys(validationErrors).length) {
          tableData[row.index] = {
            pmsprogressid: row.original.pmsprogressid,
            contractid: currentContractId,
            dateid: currentReportDateId,
            item: values.item,
            lastplanprogress: values.lastplanprogress,
            lastplanvirtualprogress: values.lastplanvirtualprogress,
          };
          //send/receive api updates here, then refetch or update local table data for re-render
          const request: IRequestPmsProgress = {
            contractid: values.contractid,
            dateid: values.dateid,
            item: values.item,
            lastplanprogress: values.lastplanprogress,
            lastplanvirtualprogress: values.lastplanvirtualprogress,
          }
          // console.log('pmsProgresses: ', pmsProgresses)

          editPmsProgress(Number(row.original.pmsprogressid), request)
          setTableData([...tableData]);
          exitEditingMode(); //required to exit editing mode and close modal
          setEditMode(true)
        }
      };
  
    const handleCancelRowEdits = () => {
      setValidationErrors({});
    };
  
    const handleDeleteRow = useCallback(
      (row: MRT_Row<IPmsProgress>) => {
        if (
          // ${row.getValue('row_number')}
          !window.confirm(`آیا از حذف اطلاعات مورد نظر اطمینان دارید؟`)
        ) {
          return;
        }
        //send api delete request here, then refetch or update local table data for re-render
        // console.log('pmsprogressid: ', row.getValue('pmsprogressid'))
        tableData.splice(row.index, 1);
        setTableData([...tableData]);
        deletePmsProgress(Number(row.original.pmsprogressid))
      },
      [tableData, deletePmsProgress],
    );
  
    const getCommonEditTextFieldProps = useCallback(
      (
        cell: MRT_Cell<IPmsProgress>,
      ): MRT_ColumnDef<IPmsProgress>['muiTableBodyCellEditTextFieldProps'] => {
        return {
          error: !!validationErrors[cell.id],
          helperText: validationErrors[cell.id],
          onBlur: (event) => {
            const isValid =
              cell.column.id === 'item' ? validateRequired(event.target.value) : '';
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
  
    const columns = useMemo<MRT_ColumnDef<IPmsProgress>[]>(
        () => [
          {
            accessorKey: 'lastplanvirtualprogress', //simple recommended way to define a column
            header: 'درصد پیشرفت واقعی مطابق آخرین برنامه مصوب',
            minSize: 150,
            maxSize: 250,
            size: 200,
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            enableColumnActions: false,
          },
          {
            accessorKey: 'lastplanprogress', //simple recommended way to define a column
            header: 'درصد پیشرفت برنامه ای مطابق آخرین برنامه مصوب',
            minSize: 150,
            maxSize: 250,
            size: 200,
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            enableColumnActions: false,
          },
          {
            accessorKey: 'item', //simple recommended way to define a column
            header: 'فعالیت',
            minSize: 150,
            maxSize: 250,
            size: 200,
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
            'mrt-row-numbers': {
              muiTableHeadCellProps: {
                width: 10,
              },
              size: 10,
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
            // columnVisibility: { pmsprogressid: false, contractid: false, dateid: false } 
          }}

          enableRowNumbers
          enableRowOrdering={false}
          enableDensityToggle={false}
          enableHiding={false}
          enablePagination={false}
          enableColumnFilters={false}
          enableFilters={false}
          enableSorting={false}
          enableStickyHeader
          muiTableContainerProps={{ sx: { maxHeight: '450px' } }}

          editingMode="modal" //default  
          enableEditing
          onEditingRowSave={handleSaveRowEdits}
          onEditingRowCancel={handleCancelRowEdits}
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '1rem', width:'10%'}}>
              <Tooltip arrow placement="left" title="Edit">
                <IconButton onClick={() => table.setEditingRow(row)}>
                  <Edit sx={{size:'small'}}/>
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Delete">
                <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                  <Delete sx={{size:'small'}}/>
                </IconButton>
              </Tooltip>
            </Box>
          )}
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
    columns: MRT_ColumnDef<IPmsProgress>[];
    onClose: () => void;
    onSubmit: (values: IPmsProgress) => void;
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
              {columns.filter(column => 
                  column.accessorKey === 'item' ||
                  column.accessorKey === 'lastplanprogress' || 
                  column.accessorKey === 'lastplanvirtualprogress').map((column) => (
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
    addPmsProgress: (request: IRequestPmsProgress) => 
      dispatch(AddPmsProgress(request)),
    editPmsProgress: (id: number, request: IRequestPmsProgress) => 
      dispatch(EditPmsProgress(id, request)),
    deletePmsProgress: (id: number) => 
      dispatch(DeletePmsProgress(id)),
  }); 
  
  const connector = connect(mapStateToProps, mapDispatchToProps);
  
  type PmsProgressProps = ConnectedProps<typeof connector>;
  
  export default connector(PmsProgress)