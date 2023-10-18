import { FC, ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
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
import { AddAddendum, GetAddendum, EditAddendum, DeleteAddendum } from '../../../../../redux/actionCreators/addendumActions';
import { Dispatch } from 'redux';
import { IAddendum, IRequestAddendum } from '../../../../../models/addendum';
import { RootState } from '../../../../../redux/store/store';
import { IAddendumsState } from '../../../../../redux/reducers/addendumReducer';
import { toastWarning } from '../../../../../services/toasters';
import { AdapterJalali } from '../../../../../components';


const Addendum: FC<AddendumProps> = ({ 
    currentContractId, 
    addAddendum,
    getAddendum,
    editAddendum,
    deleteAddendum,
  }): ReactElement => {
  
    useEffect(() => {
      if (currentContractId < 1) return
  
      getAddendum(currentContractId);
    }, [getAddendum, currentContractId]);

    
    const addendumState: IAddendumsState = useSelector((state: RootState) => state.addendums)
    const addendums: IAddendum[] = addendumState.addendums
    
    const [afteraddendumdate, setAfteraddendumdate] = useState<Date | null>( null)

    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false)
    const [tableData, setTableData] = useState<IAddendum[]>(() => addendums);

    const [validationErrors, setValidationErrors] = useState<{
      [cellId: string]: string;
    }>({});

    useEffect(() => {
      if(!editMode){
        setTableData(addendums)
      }
      else{
        setEditMode(false)
      }
    }, [editMode, addendums]);
  
    const handleCreateNewRow = (values: IAddendum) => {
    // console.log('.....addendumamount_r: ', values.addendumamount_r)
    // console.log('.....addendumamount_fc: ', values.addendumamount_fc)
    // console.log('.....afteraddendumdate: ', values.afteraddendumdate)
      if((values.addendumamount_r === null || String(values.addendumamount_r) === "") && 
        (values.addendumamount_fc === null || String(values.addendumamount_fc) === "") && 
        (values.afteraddendumdate === null || String(values.afteraddendumdate) === "")){
        toastWarning("لطفا حداقل یکی از فیلدها را مشخص کنید");
        return;
      }
      // tableData.push(values);
      // setTableData([...tableData]);
      const request: IRequestAddendum = {
        contractid: currentContractId,
        addendumamount_r: values.addendumamount_r !== null && String(values.addendumamount_r) !== "" ? 
                values.addendumamount_r : null,
        addendumamount_fc: values.addendumamount_fc !== null && String(values.addendumamount_fc) !== "" ? 
                values.addendumamount_fc : null, 
        afteraddendumdate: values.afteraddendumdate !== null && String(values.afteraddendumdate) !== "" ? 
          values.afteraddendumdate.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ) : null,
    }
    //   console.log('----request: ', request)
      addAddendum(request)
    };
  
    const handleSaveRowEdits: MaterialReactTableProps<IAddendum>['onEditingRowSave'] =
      async ({ exitEditingMode, row, values }) => {
        if (!Object.keys(validationErrors).length) {
          tableData[row.index] = {
            addendumid: row.original.addendumid,
            contractid: currentContractId,
            addendumamount_r: values.addendumamount_r,
            addendumamount_fc: values.addendumamount_fc,
            // addendumamountdate: values.addendumamountdate,
            afteraddendumdate: values.afteraddendumdate,
          };
          //send/receive api updates here, then refetch or update local table data for re-render
          const request: IRequestAddendum = {
            contractid: currentContractId,
            addendumamount_r: values.addendumamount_r,
            addendumamount_fc: values.addendumamount_fc,
            afteraddendumdate: values.afteraddendumdate,
          }
          // console.log('addendums: ', addendums)

          editAddendum(Number(row.original.addendumid), request)
          setTableData([...tableData]);
          exitEditingMode(); //required to exit editing mode and close modal
          setEditMode(true)
        }
      };
  
    const handleCancelRowEdits = () => {
      setValidationErrors({});
    };
  
    const handleDeleteRow = useCallback(
      (row: MRT_Row<IAddendum>) => {
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
        deleteAddendum(Number(row.original.addendumid))
      },
      [tableData, deleteAddendum],
    );
  
    const getCommonEditTextFieldProps = useCallback(
      (
        cell: MRT_Cell<IAddendum>,
      ): MRT_ColumnDef<IAddendum>['muiTableBodyCellEditTextFieldProps'] => {
        return {
          error: !!validationErrors[cell.id],
          helperText: validationErrors[cell.id],
        //   onBlur: (event) => {
        //     const isValid =
        //       cell.column.id === 'machine' ? validateRequired(event.target.value) : '';
        //     if (!isValid) {
        //       //set validation error for cell if invalid
        //       setValidationErrors({
        //         ...validationErrors,
        //         [cell.id]: `${cell.column.columnDef.header} الزامی است`,
        //       });
        //     } else {
        //       //remove validation error for cell if valid
        //       delete validationErrors[cell.id];
        //       setValidationErrors({
        //         ...validationErrors,
        //       });
        //     }
        //   },
        };
      },
      [validationErrors],
    );
  
    const columns = useMemo<MRT_ColumnDef<IAddendum>[]>(
        () => [
          {
            accessorKey: 'addendumamount_r', //simple recommended way to define a column
            header: 'ریالی (میلیون ریال) ',
            minSize: 100,
            maxSize: 150,
            size: 100,
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            enableColumnActions: false,
          },
          {
            accessorKey: 'addendumamount_fc', //simple recommended way to define a column
            header: ' (Euro) ارزی ',
            minSize: 100,
            maxSize: 150,
            size: 100,
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            enableColumnActions: false,
            },
          {
            accessorKey: 'afteraddendumdate', //simple recommended way to define a column
            header: 'تاریخ پایان با الحاقیه زمانی',
            minSize: 100,
            maxSize: 150,
            size: 120,
            enableColumnActions: false,
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'right' },
            muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                ...getCommonEditTextFieldProps(cell),
              }),
            Edit: ({ cell, column, table }) => 
              <AdapterJalali 
                date={new Date(cell.row.original.afteraddendumdate)} 
                dateChangeHandler={(date: Date | null) => { setAfteraddendumdate(date); }}
                label='تاریخ پایان با الحاقیه زمانی'
              />,
          },
        ],
        [getCommonEditTextFieldProps],
      );    
  
    return (
      <Box sx={{direction:'ltr', width: 480}}>
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
    columns: MRT_ColumnDef<IAddendum>[];
    onClose: () => void;
    onSubmit: (values: IAddendum) => void;
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
              {columns.filter(column => 
                  column.accessorKey === 'addendumamount_r' ||
                  column.accessorKey === 'addendumamount_fc').map((column) => (
                      <TextField
                      key={column.accessorKey}
                      label={column.header}
                      name={String(column.accessorKey)}
                      onChange={(e) =>
                        setValues({ ...values, [e.target.name]: e.target.value })
                    }
                    />
                ))}
              {columns.filter(column => 
                  column.accessorKey === 'afteraddendumdate').map((column) => ( 
                    <AdapterJalali 
                    key={column.accessorKey}
                    date={values.afteraddendumdate !== null ? values.afteraddendumdate : new Date()} 
                    dateChangeHandler={(date: Date | null) => setValues({ ...values, afteraddendumdate: date })}
                    label='تاریخ پایان با الحاقیه زمانی'
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
  
//   const validateRequired = (value: string) => !!value.length;

  const mapStateToProps = (state: RootState) => ({
    currentContractId: state.contracts.currentContractId,
  });
  
  const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    addAddendum: (request: IRequestAddendum) => 
      dispatch(AddAddendum(request)),
    getAddendum: (contractId: number) => 
      dispatch(GetAddendum(contractId)),
    editAddendum: (id: number, request: IRequestAddendum) => 
      dispatch(EditAddendum(id, request)),
    deleteAddendum: (id: number) => 
      dispatch(DeleteAddendum(id)),
  }); 
  
  const connector = connect(mapStateToProps, mapDispatchToProps);
  
  type AddendumProps = ConnectedProps<typeof connector>;
  
  export default connector(Addendum)