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
import { AddWorkVolume, GetWorkVolume, EditWorkVolume, DeleteWorkVolume } from '../../../redux/actionCreators/workVolumeActions';
import { Dispatch } from 'redux';
import { IWorkVolume, IRequestWorkVolume } from '../../../models/workVolume';
import { RootState } from '../../../redux/store/store';
import { IWorkVolumesState } from '../../../redux/reducers/workVolumeReducer';
import { toastWarning } from '../../../services/toasters';


const WorkVolume: FC<WorkVolumeProps> = ({ 
    currentContractId, 
    currentReportDateId, 
    addWorkVolume,
    editWorkVolume,
    deleteWorkVolume,
  }): ReactElement => {
    const dispatch = useDispatch();
  
    useEffect(() => {
      if (currentContractId < 1) return
  
      dispatch<any>(GetWorkVolume(currentContractId, currentReportDateId));
    }, [dispatch, currentContractId, currentReportDateId]);

    
    const workVolumeState: IWorkVolumesState = useSelector((state: RootState) => state.workVolumes)
    const workVolumes: IWorkVolume[] = workVolumeState.workVolumes
    
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false)
    const [tableData, setTableData] = useState<IWorkVolume[]>(() => workVolumes);
    const [validationErrors, setValidationErrors] = useState<{
      [cellId: string]: string;
    }>({});

    useEffect(() => {
      if(!editMode){
        setTableData(workVolumes)
      }
      else{
        setEditMode(false)
      }
    }, [workVolumes]);
  
    const handleCreateNewRow = (values: IWorkVolume) => {
      if(values.work === ''){
        toastWarning("لطفا ماشین را مشخص کنید");
        return;
      }
      // tableData.push(values);
      // setTableData([...tableData]);
      const request: IRequestWorkVolume = {
        contractid: currentContractId,
        dateid: currentReportDateId,
        work: values.work,
        planestimate: values.planestimate,
        totalestimate: values.totalestimate,
        executedsofar: values.executedsofar,
      }
      addWorkVolume(request)
    };
  
    const handleSaveRowEdits: MaterialReactTableProps<IWorkVolume>['onEditingRowSave'] =
      async ({ exitEditingMode, row, values }) => {
        if (!Object.keys(validationErrors).length) {
          tableData[row.index] = {
            workvolumeid: row.original.workvolumeid,
            contractid: currentContractId,
            dateid: currentReportDateId,
            work: values.work,
            planestimate: values.planestimate,
            totalestimate: values.totalestimate,
            executedsofar: values.executedsofar,
          };
          //send/receive api updates here, then refetch or update local table data for re-render
          const request: IRequestWorkVolume = {
            contractid: values.contractid,
            dateid: values.dateid,
            work: values.work,
            planestimate: values.planestimate,
            totalestimate: values.totalestimate,
            executedsofar: values.executedsofar,
          }
          // console.log('workVolumes: ', workVolumes)

          editWorkVolume(Number(row.original.workvolumeid), request)
          setTableData([...tableData]);
          exitEditingMode(); //required to exit editing mode and close modal
          setEditMode(true)
        }
      };
  
    const handleCancelRowEdits = () => {
      setValidationErrors({});
    };
  
    const handleDeleteRow = useCallback(
      (row: MRT_Row<IWorkVolume>) => {
        if (
          // ${row.getValue('row_number')}
          !window.confirm(`آیا از حذف اطلاعات مورد نظر اطمینان دارید؟`)
        ) {
          return;
        }
        //send api delete request here, then refetch or update local table data for re-render
        // console.log('workvolumeid: ', row.getValue('workvolumeid'))
        tableData.splice(row.index, 1);
        setTableData([...tableData]);
        deleteWorkVolume(Number(row.original.workvolumeid))
      },
      [tableData, deleteWorkVolume],
    );
  
    const getCommonEditTextFieldProps = useCallback(
      (
        cell: MRT_Cell<IWorkVolume>,
      ): MRT_ColumnDef<IWorkVolume>['muiTableBodyCellEditTextFieldProps'] => {
        return {
          error: !!validationErrors[cell.id],
          helperText: validationErrors[cell.id],
          onBlur: (event) => {
            const isValid =
              cell.column.id === 'work' ? validateRequired(event.target.value) : '';
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
  
    const columns = useMemo<MRT_ColumnDef<IWorkVolume>[]>(
        () => [
          {
            accessorKey: 'executedsofar', //simple recommended way to define a column
            header: 'اجرا شده تا کنون',
            minSize: 30,
            maxSize: 70,
            size: 50,
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            enableColumnActions: false,
          },
          {
            accessorKey: 'totalestimate', //simple recommended way to define a column
            header: 'برآورد کل',
            minSize: 30,
            maxSize: 70,
            size: 50,
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            enableColumnActions: false,
          },
          {
            accessorKey: 'planestimate', //simple recommended way to define a column
            header: 'برآورد طبق نقشه های دریافتی',
            minSize: 100,
            maxSize: 200,
            size: 150,
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            enableColumnActions: false,
          },
          {
            accessorKey: 'work', //simple recommended way to define a column
            header: 'فعالیت',
            minSize: 180,
            maxSize: 280,
            size: 230,
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
            // columnVisibility: { workvolumeid: false, contractid: false, dateid: false } 
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
    columns: MRT_ColumnDef<IWorkVolume>[];
    onClose: () => void;
    onSubmit: (values: IWorkVolume) => void;
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
                  column.accessorKey === 'work' ||
                  column.accessorKey === 'planestimate' || 
                  column.accessorKey === 'totalestimate' ||
                  column.accessorKey === 'executedsofar').map((column) => (
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
    addWorkVolume: (request: IRequestWorkVolume) => 
      dispatch(AddWorkVolume(request)),
    editWorkVolume: (id: number, request: IRequestWorkVolume) => 
      dispatch(EditWorkVolume(id, request)),
    deleteWorkVolume: (id: number) => 
      dispatch(DeleteWorkVolume(id)),
  }); 
  
  const connector = connect(mapStateToProps, mapDispatchToProps);
  
  type WorkVolumeProps = ConnectedProps<typeof connector>;
  
  export default connector(WorkVolume)