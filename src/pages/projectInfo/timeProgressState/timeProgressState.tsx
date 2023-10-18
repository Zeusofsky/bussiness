import { FC, ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  type MaterialReactTableProps,
  type MRT_Cell,
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
import { format } from 'date-fns-jalali'

import { GetTimeProgressState, EditTimeProgressState } from '../../../redux/actionCreators/timeProgressStateActions';
import { Dispatch } from 'redux';
import { ITimeProgressState, IRequestTimeProgressState } from '../../../models/timeProgressState';
import { RootState } from '../../../redux/store/store';
import { ITimeProgressStatesState } from '../../../redux/reducers/timeProgressStateReducer';
import { AdapterJalali, FormatDate } from '../../../components';
import { toastInfo } from '../../../services/toasters';


const TimeProgressState: FC<ProgressStateProps> = ({ 
    currentContractId, 
    currentReportDateId, 
    getTimeProgressState,
    editTimeProgressState,
  }): ReactElement => {

    useEffect(() => {
      if (currentContractId < 1) return
  
      getTimeProgressState(currentContractId, currentReportDateId);
    }, [getTimeProgressState, currentContractId, currentReportDateId]);

    const timeProgressStateState: ITimeProgressStatesState = useSelector((state: RootState) => state.timeProgressStates)
    const timeProgressStates: ITimeProgressState[] = timeProgressStateState.timeProgressStates

    const [tableData, setTableData] = useState<ITimeProgressState[]>(() => timeProgressStates);
    const [validationErrors, setValidationErrors] = useState<{
      [cellId: string]: string;
    }>({});

    useEffect(() => {
      if(tableData !== timeProgressStates){
        setTableData(timeProgressStates)
      }
    }, [tableData, timeProgressStates]);
  
    // console.log('==========================================')
    // const is_timeProgressStates_ok = (timeProgressStates && timeProgressStates.length > 0)
    // console.log('is_timeProgressStates_ok: ', is_timeProgressStates_ok)
    // if(is_timeProgressStates_ok)
    // console.log('epje_date: ', timeProgressStates[timeProgressStates.length - 1].epje_date)

    const [epje_date, setEpje_date] = useState<Date | null>(null)
    //   is_timeProgressStates_ok ? 
    //   timeProgressStates[timeProgressStates.length - 1].epje_date : 
    // console.log('epje_date: ', epje_date)
    // console.log('==========================================')

    const [epjp_date, setEpjp_date] = useState<Date | null>( null)
      // is_timeProgressStates_ok ? 
      // timeProgressStates[timeProgressStates.length - 1].epjp_date :
    const [ece_date, setEce_date] = useState<Date | null>(null)
      // is_timeProgressStates_ok ? 
      // timeProgressStates[timeProgressStates.length - 1].ece_date : 
    const [ecp_date, setEcp_date] = useState<Date | null>(null)
      // is_timeProgressStates_ok ? 
      // timeProgressStates[timeProgressStates.length - 1].ecp_date : 
    const [epe_date, setEpe_date] = useState<Date | null>(null)
      // is_timeProgressStates_ok ? 
      // timeProgressStates[timeProgressStates.length - 1].epe_date : 
    const [epp_date, setEpp_date] = useState<Date | null>(null)
      // is_timeProgressStates_ok ? 
      // timeProgressStates[timeProgressStates.length - 1].epp_date : 
    const [eee_date, setEee_date] = useState<Date | null>(null)
      // is_timeProgressStates_ok ? 
      // timeProgressStates[timeProgressStates.length - 1].eee_date : 
    const [eep_date, setEep_date] = useState<Date | null>(null)
      // is_timeProgressStates_ok ? 
      // timeProgressStates[timeProgressStates.length - 1].eep_date : 

    const handleSaveRowEdits: MaterialReactTableProps<ITimeProgressState>['onEditingRowSave'] =
      async ({ exitEditingMode, row, values }) => {
        if(values.plan_replan === null || values.plan_replan === '') {
          toastInfo("را وارد کنید  plan/replan لطفا ابتدا ");
          return;
        }
        if (!Object.keys(validationErrors).length) {
          tableData[row.index] = {
            timeprogressstateid: row.original.timeprogressstateid,
            contractid: row.original.contractid,
            dateid: row.original.dateid,
            year: row.original.year,
            month: row.original.month,
            plan_replan: values.plan_replan,
            eep_date: eep_date !== null ? eep_date : row.original.eep_date,
            eee_date: eee_date !== null ? eee_date : row.original.eee_date,
            epp_date: epp_date !== null ? epp_date : row.original.epp_date,
            epe_date: epe_date !== null ? epe_date : row.original.epe_date,
            ecp_date: ecp_date !== null ? ecp_date : row.original.ecp_date,
            ece_date: ece_date !== null ? ece_date : row.original.ece_date,
            epjp_date: epjp_date !== null ? epjp_date : row.original.epjp_date,
            epje_date: epje_date !== null ? epje_date : row.original.epje_date,
            eep_shamsiDate: eep_date !== null ? format(eep_date!, 'yyyy-MM-dd') : row.original.eep_shamsiDate,
            eee_shamsiDate: eee_date !== null ? format(eee_date!, 'yyyy-MM-dd') : row.original.eee_shamsiDate,
            epp_shamsiDate: epp_date !== null ? format(epp_date!, 'yyyy-MM-dd') : row.original.epp_shamsiDate,
            epe_shamsiDate: epe_date !== null ? format(epe_date!, 'yyyy-MM-dd') : row.original.epe_shamsiDate,
            ecp_shamsiDate: ecp_date !== null ? format(ecp_date!, 'yyyy-MM-dd') : row.original.ecp_shamsiDate,
            ece_shamsiDate: ece_date !== null ? format(ece_date!, 'yyyy-MM-dd') : row.original.ece_shamsiDate,
            epjp_shamsiDate: epjp_date !== null ? format(epjp_date!, 'yyyy-MM-dd') : row.original.epjp_shamsiDate,
            epje_shamsiDate: epje_date !== null ? format(epje_date!, 'yyyy-MM-dd') : row.original.epje_shamsiDate,
            description: ''
          };   
 
          //send/receive api updates here, then refetch or update local table data for re-render
          const request: IRequestTimeProgressState = {
            contractid: row.original.contractid,
            dateid: row.original.dateid,
            plan_replan: values.plan_replan,
            eep_date: eep_date !== null ? FormatDate(eep_date) :  FormatDate(row.original.eep_date),
            eee_date: eee_date !== null ? FormatDate(eee_date) :  FormatDate(row.original.eee_date),
            epp_date: epp_date !== null ? FormatDate(epp_date) :  FormatDate(row.original.epp_date),
            epe_date: epe_date !== null ? FormatDate(epe_date) :  FormatDate(row.original.epe_date),
            ecp_date: ecp_date !== null ? FormatDate(ecp_date) :  FormatDate(row.original.ecp_date),
            ece_date: ece_date !== null ? FormatDate(ece_date) :  FormatDate(row.original.ece_date),
            epjp_date: epjp_date !== null ? FormatDate(epjp_date) :  FormatDate(row.original.epjp_date),
            epje_date: epje_date !== null ? FormatDate(epje_date) :  FormatDate(row.original.epje_date),
            description: ''
          }
          editTimeProgressState(Number(row.original.timeprogressstateid), request)

          setTableData([...tableData]);
          exitEditingMode(); //required to exit editing mode and close modal
        }
      };
  
    // const handleCancelRowEdits = () => {
    //   setValidationErrors({});
    // };
  
    const getCommonEditTextFieldProps = useCallback(
      (
        cell: MRT_Cell<ITimeProgressState>,
      ): MRT_ColumnDef<ITimeProgressState>['muiTableBodyCellEditTextFieldProps'] => {
        return {
          error: !!validationErrors[cell.id],
          helperText: validationErrors[cell.id],
          onBlur: (event) => {
            const isValid = cell.column.id === 'plan_replan' ? validateRequired(event.target.value) : '';
            // console.log('isValid: ', isValid)
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
  
    const columns = useMemo<MRT_ColumnDef<ITimeProgressState>[]>(
        () => [
          {
            accessorKey: 'epje_shamsiDate', //simple recommended way to define a column
            header: 'پایان تخمینی پروژه',
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            size: 80,
            minSize: 60,
            maxSize: 100,
            enableColumnActions: false,
            Edit: ({ cell, column, table }) => 
              <AdapterJalali 
                date={new Date(cell.row.original.epje_date)} 
                dateChangeHandler={(date: Date | null) => {
                  setEpje_date(date);
                }}
                label='پایان تخمینی پروژه'
              />,
          },
          {
            accessorKey: 'epjp_shamsiDate', //simple recommended way to define a column
            header: 'پایان برنامه ای پروژه',
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            size: 80,
            minSize: 60,
            maxSize: 100,
            enableColumnActions: false,
            Edit: ({ cell, column, table }) => 
              <AdapterJalali 
                date={new Date(cell.row.original.epjp_date)} 
                dateChangeHandler={(date: Date | null) => { setEpjp_date(date); }}
                label='پایان برنامه ای پروژه'
              />,
          },
          {
            accessorKey: 'ece_shamsiDate', //simple recommended way to define a column
            header: 'پایان تخمینی اجرا',
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            size: 80,
            minSize: 60,
            maxSize: 100,
            enableColumnActions: false,
            Edit: ({ cell, column, table }) => 
              <AdapterJalali 
                date={new Date(cell.row.original.ece_date)} 
                dateChangeHandler={(date: Date | null) => { setEce_date(date); }}
                label='پایان تخمینی اجرا'
              />,
            },
          {
            accessorKey: 'ecp_shamsiDate', //simple recommended way to define a column
            header: 'پایان برنامه ای اجرا',
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            size: 80,
            minSize: 60,
            maxSize: 100,
            enableColumnActions: false,
            Edit: ({ cell, column, table }) => 
              <AdapterJalali 
                date={new Date(cell.row.original.ecp_date)} 
                dateChangeHandler={(date: Date | null) => { setEcp_date(date); }}
                label='پایان برنامه ای اجرا'
              />,
            },

          {
            accessorKey: 'epe_shamsiDate', //simple recommended way to define a column
            header: 'پایان تخمینی تدارک',

            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            size: 80,
            minSize: 60,
            maxSize: 100,
            enableColumnActions: false,
            Edit: ({ cell, column, table }) => 
              <AdapterJalali 
                date={new Date(cell.row.original.epe_date)} 
                dateChangeHandler={(date: Date | null) => { setEpe_date(date); }}
                label='پایان تخمینی تدارک'
              />,
            },
          {
            accessorKey: 'epp_shamsiDate', //simple recommended way to define a column
            header: 'پایان برنامه ای تدارک',
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            size: 80,
            minSize: 60,
            maxSize: 100,
            enableColumnActions: false,
            Edit: ({ cell, column, table }) => 
              <AdapterJalali 
                date={new Date(cell.row.original.epp_date)} 
                dateChangeHandler={(date: Date | null) => { setEpp_date(date); }}
                label='پایان برنامه ای تدارک'
              />,
          },
          {
            accessorKey: 'eee_shamsiDate', //simple recommended way to define a column
            header: 'پایان تخمینی مهندسی',
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            size: 80,
            minSize: 60,
            maxSize: 100,
            enableColumnActions: false,
            Edit: ({ cell, column, table }) => 
              <AdapterJalali 
                date={new Date(cell.row.original.eee_date)} 
                dateChangeHandler={(date: Date | null) => { setEee_date(date); }}
                label='پایان تخمینی مهندسی'
              />,
          },
          {
            accessorKey: 'eep_shamsiDate', //simple recommended way to define a column
            header: 'پایان برنامه ای مهندسی',
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            size: 80,
            minSize: 60,
            maxSize: 100,
            enableColumnActions: false,
            Edit: ({ cell, column, table }) => 
              <AdapterJalali 
                date={new Date(cell.row.original.eep_date)} 
                dateChangeHandler={(date: Date | null) => { setEep_date(date); }}
                label='پایان برنامه ای مهندسی'
              />,
          },
          {
            accessorKey: 'plan_replan', //simple recommended way to define a column
            header: 'Plan Replan',
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            size: 40,
            minSize: 30,
            maxSize: 50,
            enableColumnActions: false,
            muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
              ...getCommonEditTextFieldProps(cell),
            }),
          },
          {  
            id: 'year',
            header: 'سال',
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            size: 35,
            minSize: 25,
            maxSize: 45,
            columnDefType: 'display', 
            enableColumnActions: false,
            Cell: ({ cell }) => cell.row.original.year,
          },
          {  
            id: 'month',
            header: 'ماه منتهی به',
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            size: 40,
            minSize: 30,
            maxSize: 50,
            columnDefType: 'display', 
            enableColumnActions: false,
            Cell: ({ cell }) => cell.row.original.month,
          } 
        ],
        [getCommonEditTextFieldProps],
    );    

    return (
      <Box sx={{direction:'ltr'}}>
        <MaterialReactTable
          columns={columns}
          data={tableData}
        
          muiTableProps={{
            sx: {
              tableLayout: 'fixed',
            },
          }}
          displayColumnDefOptions={{
            'mrt-row-actions': {
              header: 'ویرایش',
              muiTableHeadCellProps: {
                align: 'center',
              },
              size: 90,
            },
            'mrt-row-numbers': {
              size: 10,
            },
          }}

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
            // columnVisibility: { progressstateid: false, contractid: false, dateid: false } 
          }}
          enableRowNumbers
          enableColumnOrdering={false}
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
          //     // (row.index === timeProgressStates.length - 1) &&
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
  
  const validateRequired = (value: string) => !!value.length;

  const mapStateToProps = (state: RootState) => ({
    currentContractId: state.contracts.currentContractId,
    currentReportDateId: state.reportDates.currentReportDateId
  });
  
  const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    getTimeProgressState: (contractId: number, dateId: number) => 
      dispatch(GetTimeProgressState(contractId, dateId)),
    editTimeProgressState: (id: number, request: IRequestTimeProgressState) => 
      dispatch(EditTimeProgressState(id, request)),
  }); 
  
  const connector = connect(mapStateToProps, mapDispatchToProps);
  
  type ProgressStateProps = ConnectedProps<typeof connector>;
  
  export default connector(TimeProgressState)