import { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  type MaterialReactTableProps,
  // type MRT_Cell,
  type MRT_ColumnDef,
  // type MRT_Row,
} from 'material-react-table';
import {
  Box,
  // Button,
  // Dialog,
  // DialogActions,
  // DialogContent,
  // DialogTitle,
  // IconButton,
  // Stack,
  // TextField,
  // Tooltip,
} from '@mui/material';
// import { Edit,} from '@mui/icons-material';
import { ConnectedProps, connect, useSelector } from 'react-redux';
import { GetProjectPersonal, EditProjectPersonal } from '../../../redux/actionCreators/projectPersonalActions';
import { Dispatch } from 'redux';
import { IProjectPersonal, IRequestProjectPersonal } from '../../../models/projectPersonal';
import { RootState } from '../../../redux/store/store';
import { IProjectPersonalsState } from '../../../redux/reducers/projectPersonalReducer';
import { toastInfo } from '../../../services/toasters';


const ProjectPersonal: FC<ProjectPersonalProps> = ({ 
    currentContractId, 
    currentReportDateId, 
    getProjectPersonal,
    editProjectPersonal,
  }): ReactElement => {

    useEffect(() => {
      if (currentContractId < 1) return
  
      getProjectPersonal(currentContractId, currentReportDateId);
    }, [getProjectPersonal, currentContractId, currentReportDateId]);

    const projectPersonalState: IProjectPersonalsState = useSelector((state: RootState) => state.projectPersonals)
    const projectPersonals: IProjectPersonal[] = projectPersonalState.projectPersonals

    const [tableData, setTableData] = useState<IProjectPersonal[]>(() => projectPersonals);
    const [validationErrors] = useState<{
      [cellId: string]: string;
    }>({});

    useEffect(() => {
      if(tableData !== projectPersonals){
        setTableData(projectPersonals)
      }
    }, [tableData, projectPersonals]);
  
    const handleSaveRowEdits: MaterialReactTableProps<IProjectPersonal>['onEditingRowSave'] =
      async ({ exitEditingMode, row, values }) => {
        if(values.dcpno === null || values.dcpno === '') {
          toastInfo("لطفا تعداد نیروهای ستادی با احتساب پیمانکاران را وارد کنید  ");
          return;
        }
        if(values.mepno === null || values.mepno === '') {
          toastInfo("لطفا میانگین تعداد نیروهای اجرائی طی دوره را وارد کنید  ");
          return;
        }
        if(values.dpno === null || values.dpno === '') {
          toastInfo("لطفا تعداد نیروهای ستادی آسفالت طوس را وارد کنید  ");
          return;
        }        
        if (!Object.keys(validationErrors).length) {
          tableData[row.index] = {
            projectpersonelid: row.original.projectpersonelid,
            contractid: row.original.contractid,
            dateid: row.original.dateid,
            year: row.original.year,
            month: row.original.month,
            dpno: values.dpno,
            dcpno: values.dcpno,
            mepno: values.mepno,
            tpno: (values.dcpno ?? 0) + (values.mepno ?? 0),
            description: ''
          };         
          //send/receive api updates here, then refetch or update local table data for re-render
          const request: IRequestProjectPersonal = {
            contractid: row.original.contractid,
            dateid: row.original.dateid,
            dpno: values.dpno,
            dcpno: values.dcpno,
            mepno: values.mepno,
            description: ''
          }
          // console.log('projectPersonals: ', projectPersonals)

          editProjectPersonal(Number(row.original.projectpersonelid), request)
          setTableData([...tableData]);
          exitEditingMode(); //required to exit editing mode and close modal
        }
      };
  
    // const handleCancelRowEdits = () => {
    //   setValidationErrors({});
    // };
  
    // const getCommonEditTextFieldProps = useCallback(
    //   (
    //     cell: MRT_Cell<IProjectPersonal>,
    //   ): MRT_ColumnDef<IProjectPersonal>['muiTableBodyCellEditTextFieldProps'] => {
    //     return {
    //       error: !!validationErrors[cell.id],
    //       helperText: validationErrors[cell.id],
    //       onBlur: (event) => {
    //         const isValid =
    //           cell.column.id === 'projectPersonal' ? validateRequired(event.target.value) : '';
    //         if (!isValid) {
    //           //set validation error for cell if invalid
    //           setValidationErrors({
    //             ...validationErrors,
    //             [cell.id]: `${cell.column.columnDef.header} الزامی است`,
    //           });
    //         } else {
    //           //remove validation error for cell if valid
    //           delete validationErrors[cell.id];
    //           setValidationErrors({
    //             ...validationErrors,
    //           });
    //         }
    //       },
    //     };
    //   },
    //   [validationErrors],
    // );
  
    const columns = useMemo<MRT_ColumnDef<IProjectPersonal>[]>(
        () => [
          {
            accessorKey: 'dcpno', //simple recommended way to define a column
            header: "تعداد نیروهای ستادی با احتساب پیمانکاران",

            muiTableHeadCellProps: {
              align: 'center',
            },
            muiTableBodyCellProps: {
              align: 'center',
            },
            size: 200,
            minSize: 100,
            maxSize: 250,
            enableColumnActions: false,
            muiTableBodyCellEditTextFieldProps: () => ({
              required: true,
              type: 'number',
              variant: 'outlined',
              size:'small',
              // ...getCommonEditTextFieldProps(cell),
            }),
          },
          {
            accessorKey: 'mepno', //simple recommended way to define a column
            header: "میانگین تعداد نیروهای اجرائی طی دوره",
            muiTableHeadCellProps: {
              align: 'center',
            },
            muiTableBodyCellProps: {
              align: 'center',
            },
            size: 200,
            minSize: 100,
            maxSize: 250,
            enableColumnActions: false,
            muiTableBodyCellEditTextFieldProps: () => ({
              required: true,
              type: 'number',
              variant: 'outlined',
              size:'small',
              // ...getCommonEditTextFieldProps(cell),
            }),
          },
          {
            accessorKey: 'dpno', //simple recommended way to define a column
            header: 'تعداد نیروهای ستادی آسفالت طوس',
            muiTableHeadCellProps: {
              align: 'center',
            },
            muiTableBodyCellProps: {
              align: 'center',
            },
            size: 200,
            minSize: 100,
            maxSize: 250,
            enableColumnActions: false,
            muiTableBodyCellEditTextFieldProps: () => ({
              required: true,
              type: 'number',
              variant: 'outlined',
              size:'small',
              // ...getCommonEditTextFieldProps(cell),
            }),
          },
          {  
            id: 'year',
            header: 'سال',
            muiTableHeadCellProps: {
              align: 'center',
            },
            muiTableBodyCellProps: {
              align: 'center',
            },
            size: 40,
            minSize: 30,
            maxSize: 50,
            columnDefType: 'display', 
            enableColumnActions: false,
            //Header: <i style={{ color: 'red' }}>Age</i>, //plain jsx with no function
            Cell: ({ cell }) => cell.row.original.year,
          },
          {  
            id: 'month',
            header: 'ماه منتهی به',
            muiTableHeadCellProps: {
              align: 'center',
            },
            muiTableBodyCellProps: {
              align: 'center',
            },
            size: 30,
            minSize: 25,
            maxSize: 40,
            columnDefType: 'display', 
            enableColumnActions: false,
            //Header: <i style={{ color: 'red' }}>Age</i>, //plain jsx with no function
            Cell: ({ cell }) => cell.row.original.month,
          } 
        ],
        [],
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
              size: 90,
            },
            'mrt-row-expand': {
              muiTableHeadCellProps: {
                align: 'center',
              },
              size: 10,
            },
            'mrt-row-numbers': {
              size: 10,
            },
          }}

          columns={columns}
          data={tableData}
          
          muiTopToolbarProps={{
            sx: {
              borderTop: '2px solid #888888', //add a border between columns
              borderRight: '1px solid #888888', //add a border between columns
              borderLeft: '1px solid #888888', //add a border between columns
            }
          }}
          muiTableHeadCellProps={{
            sx: {
              '& .Mui-TableHeadCell-Content': {
                justifyContent: 'space-between',
              },
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
              //stripe the rows, make odd rows a darker color
              '& tr:nth-of-type(odd)': {
                backgroundColor: 'rgb(245, 245, 245, .1)',
              },
            },
          }}

          initialState={{ 
            density: 'compact', 
            columnPinning: { right: ['mrt-row-numbers'] },
            // columnVisibility: { projectpersonelid: false, contractid: false, dateid: false } 
          }}
          enableRowNumbers
          enableRowOrdering={false}
          enableDensityToggle={false}
          //memoMode="cells"
          enableHiding={false}
          enablePagination={false}
          enableColumnFilters={false}
          enableFilters={false}
          enableSorting={false}
          enableStickyHeader
          muiTableContainerProps={{ sx: { maxHeight: '450px' } }}

          enableEditing
          editingMode="row" //default 
          onEditingRowSave={handleSaveRowEdits}
          // onEditingRowCancel={handleCancelRowEdits}
          // renderRowActions={({ row, table }) => (
          //   <Box sx={{ display: 'flex', gap: '1rem', width:'10%'}}>
          //     {
          //  (row.index === projectPersonals.length - 1) &&
          //         <Tooltip arrow placement="left" title="ویرایش">
          //           <IconButton color="info" onClick={() => {
          //               table.setEditingRow(row)
          //             }}>
          //             <Edit sx={{size:'small'}}/>
          //           </IconButton>
          //         </Tooltip>
          //     }
          //   </Box>
          // )}
        />
      </Box>
    );
  };
  
  const mapStateToProps = (state: RootState) => ({
    currentContractId: state.contracts.currentContractId,
    currentReportDateId: state.reportDates.currentReportDateId
  });
  
  const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    getProjectPersonal: (contractId: number, dateId: number) => 
      dispatch(GetProjectPersonal(contractId, dateId)),
    editProjectPersonal: (id: number, request: IRequestProjectPersonal) => 
      dispatch(EditProjectPersonal(id, request)),
  }); 
  
  const connector = connect(mapStateToProps, mapDispatchToProps);
  
  type ProjectPersonalProps = ConnectedProps<typeof connector>;
  
  export default connector(ProjectPersonal)