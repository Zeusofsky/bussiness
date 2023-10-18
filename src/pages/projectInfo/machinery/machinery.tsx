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
import { ConnectedProps, connect, useSelector } from 'react-redux';
import { AddMachinery, GetMachinery, EditMachinery, DeleteMachinery } from '../../../redux/actionCreators/machineryActions';
import { Dispatch } from 'redux';
import { IMachinery, IRequestMachinery } from '../../../models/machinery';
import { RootState } from '../../../redux/store/store';
import { IMachineriesState } from '../../../redux/reducers/machineryReducer';
import { toastWarning } from '../../../services/toasters';


const Machinery: FC<MachineryProps> = ({ 
    currentContractId, 
    currentReportDateId, 
    addMachinery,
    getMachinery,
    editMachinery,
    deleteMachinery,
  }): ReactElement => {
  
    useEffect(() => {
      if (currentContractId < 1) return
  
      getMachinery(currentContractId, currentReportDateId);
    }, [getMachinery, currentContractId, currentReportDateId]);

    
    const machineryState: IMachineriesState = useSelector((state: RootState) => state.machineries)
    const machineries: IMachinery[] = machineryState.machineries
    
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false)
    const [tableData, setTableData] = useState<IMachinery[]>(() => machineries);
    const [validationErrors, setValidationErrors] = useState<{
      [cellId: string]: string;
    }>({});

    useEffect(() => {
      if(!editMode){
        setTableData(machineries)
      }
      else{
        setEditMode(false)
      }
    }, [machineries]);
  
    const handleCreateNewRow = (values: IMachinery) => {
      if(values.machine === ''){
        toastWarning("لطفا ماشین را مشخص کنید");
        return;
      }
      // tableData.push(values);
      // setTableData([...tableData]);
      const request: IRequestMachinery = {
        contractid: currentContractId,
        dateid: currentReportDateId,
        machine: values.machine,
        activeno: values.activeno,
        inactiveno: values.inactiveno,
      }
      addMachinery(request)
    };
  
    const handleSaveRowEdits: MaterialReactTableProps<IMachinery>['onEditingRowSave'] =
      async ({ exitEditingMode, row, values }) => {
        if (!Object.keys(validationErrors).length) {
          tableData[row.index] = {
            machinaryid: row.original.machinaryid,
            contractid: currentContractId,
            dateid: currentReportDateId,
            machine: values.machine,
            activeno: values.activeno,
            inactiveno: values.inactiveno,
            description: '',
          };
          //send/receive api updates here, then refetch or update local table data for re-render
          const request: IRequestMachinery = {
            contractid: currentContractId,
            dateid: currentReportDateId,
            machine: values.machine,
            activeno: values.activeno,
            inactiveno: values.inactiveno,
          }
          // console.log('machineries: ', machineries)

          editMachinery(Number(row.original.machinaryid), request)
          setTableData([...tableData]);
          exitEditingMode(); //required to exit editing mode and close modal
          setEditMode(true)
        }
      };
  
    const handleCancelRowEdits = () => {
      setValidationErrors({});
    };
  
    const handleDeleteRow = useCallback(
      (row: MRT_Row<IMachinery>) => {
        if (
          // ${row.getValue('row_number')}
          !window.confirm(`آیا از حذف اطلاعات مورد نظر اطمینان دارید؟`)
        ) {
          return;
        }
        //send api delete request here, then refetch or update local table data for re-render
        // console.log('machinaryid: ', row.getValue('machinaryid'))
        tableData.splice(row.index, 1);
        setTableData([...tableData]);
        deleteMachinery(Number(row.original.machinaryid))
      },
      [tableData, deleteMachinery],
    );
  
    const getCommonEditTextFieldProps = useCallback(
      (
        cell: MRT_Cell<IMachinery>,
      ): MRT_ColumnDef<IMachinery>['muiTableBodyCellEditTextFieldProps'] => {
        return {
          error: !!validationErrors[cell.id],
          helperText: validationErrors[cell.id],
          onBlur: (event) => {
            const isValid =
              cell.column.id === 'machine' ? validateRequired(event.target.value) : '';
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
  
    const columns = useMemo<MRT_ColumnDef<IMachinery>[]>(
        () => [
          {
            accessorKey: 'inactiveno', //simple recommended way to define a column
            header: 'تعداد غیر فعال در دوره',
            minSize: 100,
            maxSize: 200,
            size: 150,
            muiTableHeadCellProps: {
              align: 'center',
            },
            muiTableBodyCellProps: {
              align: 'center',
            },
            enableColumnActions: false,
          },
          {
            accessorKey: 'activeno', //simple recommended way to define a column
            header: 'تعداد فعال در دوره',
            minSize: 100,
            maxSize: 200,
            size: 150,
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            enableColumnActions: false,
            },
          {
            accessorKey: 'machine', //simple recommended way to define a column
            header: 'اهم ماشین آلات و تجهیزات',
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
          // muiTableBodyCellProps={{
          //   sx: {
          //     borderRight: '2px solid #e0e0e0', //add a border between columns
          //   },
          // }}

          columns={columns}
          data={tableData}

          initialState={{ 
            density: 'compact', 
            columnPinning: { right: ['mrt-row-numbers'] },
            // columnVisibility: { machinaryid: false, contractid: false, dateid: false } 
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
              <Tooltip arrow placement="left" title="ویرایش">
                <IconButton onClick={() => table.setEditingRow(row)}>
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
    columns: MRT_ColumnDef<IMachinery>[];
    onClose: () => void;
    onSubmit: (values: IMachinery) => void;
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
                  column.accessorKey === 'machine' ||
                  column.accessorKey === 'activeno' || 
                  column.accessorKey === 'inactiveno').map((column) => (
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
    addMachinery: (request: IRequestMachinery) => 
      dispatch(AddMachinery(request)),
    getMachinery: (contractId: number, dateId: number) => 
      dispatch(GetMachinery(contractId, dateId)),
    editMachinery: (id: number, request: IRequestMachinery) => 
      dispatch(EditMachinery(id, request)),
    deleteMachinery: (id: number) => 
      dispatch(DeleteMachinery(id)),
  }); 
  
  const connector = connect(mapStateToProps, mapDispatchToProps);
  
  type MachineryProps = ConnectedProps<typeof connector>;
  
  export default connector(Machinery)