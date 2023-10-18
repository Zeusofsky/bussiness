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
  Typography,
} from '@mui/material';
// import { Edit,} from '@mui/icons-material';
import { ConnectedProps, connect, useSelector } from 'react-redux';
import GaugeChart from 'react-gauge-chart';
import { useColorModeContext } from "../../../hooks";

import { GetProgressState, EditProgressState } from '../../../redux/actionCreators/progressStateActions';
import { Dispatch } from 'redux';
import { IProgressState, IRequestProgressState } from '../../../models/progressState';
import { RootState } from '../../../redux/store/store';
import { IProgressStatesState } from '../../../redux/reducers/progressStateReducer';
import { ColorModeContextType } from '../../../context';
import { toastInfo } from '../../../services/toasters';


const ProgressState: FC<ProgressStateProps> = ({ 
    currentContractId, 
    currentReportDateId, 
    getProgressState,
    editProgressState,
  }): ReactElement => {
    const { colorMode } = useColorModeContext() as ColorModeContextType;

    useEffect(() => {
      if (currentContractId < 1) return
  
      getProgressState(currentContractId, currentReportDateId);
    }, [getProgressState, currentContractId, currentReportDateId]);

    const progressStateState: IProgressStatesState = useSelector((state: RootState) => state.progressStates)
    const progressStates: IProgressState[] = progressStateState.progressStates

    const [tableData, setTableData] = useState<IProgressState[]>(() => progressStates);
    const [validationErrors, setValidationErrors] = useState<{
      [cellId: string]: string;
    }>({});

    useEffect(() => {
      if(tableData !== progressStates){
        setTableData(progressStates)
      }
    }, [tableData, progressStates]);
  
    const handleSaveRowEdits: MaterialReactTableProps<IProgressState>['onEditingRowSave'] =
      async ({ exitEditingMode, row, values }) => {
        if(values.plan_replan === null || values.plan_replan === '') {
          toastInfo("را وارد کنید  plan/replan لطفا ابتدا ");
          return;
        }

        if (!Object.keys(validationErrors).length) {
          tableData[row.index] = {
            progressstateid: row.original.progressstateid,
            contractid: row.original.contractid,
            dateid: row.original.dateid,
            year: row.original.year,
            month: row.original.month,
            plan_replan: values.plan_replan,
            pp_e: values.pp_e,
            ap_e: values.ap_e,
            pp_p: values.pp_p,
            ap_p: values.ap_p,
            pp_c: values.pp_c,
            ap_c: values.ap_c,
            pp_t: values.pp_t,
            ap_t: values.ap_t,
            pr_t: values.pr_t,
            pfc_t: values.pfc_t,
            description: ''
          };             
          //send/receive api updates here, then refetch or update local table data for re-render
          const request: IRequestProgressState = {
            contractid: row.original.contractid,
            dateid: row.original.dateid,
            plan_replan: values.plan_replan,
            pp_e: values.pp_e,
            ap_e: values.ap_e,
            pp_p: values.pp_p,
            ap_p: values.ap_p,
            pp_c: values.pp_c,
            ap_c: values.ap_c,
            pp_t: values.pp_t,
            ap_t: values.ap_t,
            pr_t: values.pr_t,
            pfc_t: values.pfc_t,
            description: ''
          }
          // console.log('progressStates: ', progressStates)

          editProgressState(Number(row.original.progressstateid), request)
          setTableData([...tableData]);
          exitEditingMode(); //required to exit editing mode and close modal
        }
      };
  
    // const handleCancelRowEdits = () => {
    //   setValidationErrors({});
    // };
  
    const getCommonEditTextFieldProps = useCallback(
      (
        cell: MRT_Cell<IProgressState>,
      ): MRT_ColumnDef<IProgressState>['muiTableBodyCellEditTextFieldProps'] => {
        return {
          error: !!validationErrors[cell.id],
          helperText: validationErrors[cell.id],
          onBlur: (event) => {
            const isValid = cell.column.id === 'plan_replan' ? validateRequired(event.target.value) : '';
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
  
    const columns = useMemo<MRT_ColumnDef<IProgressState>[]>(
        () => [
          {
            accessorKey: 'pfc_t', //simple recommended way to define a column
            header: 'پیشرفت ارزی',
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            size: 80,
            minSize: 60,
            maxSize: 100,
            enableColumnActions: false,
            muiTableBodyCellEditTextFieldProps: {
              required: true,
              type: 'number',
              variant: 'outlined',
              size:'small',
            },
          },
          {
            accessorKey: 'pr_t', //simple recommended way to define a column
            header: 'پیشرفت ریالی	',
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            size: 80,
            minSize: 60,
            maxSize: 100,
            enableColumnActions: false,
            muiTableBodyCellEditTextFieldProps: {
              required: true,
              type: 'number',
              variant: 'outlined',
              size:'small',
            },
          },
          {
            accessorKey: 'ap_t', //simple recommended way to define a column
            header: 'پیشرفت واقعی کل پروژه',
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            size: 80,
            minSize: 60,
            maxSize: 100,
            enableColumnActions: false,
            muiTableBodyCellEditTextFieldProps: {
              required: true,
              type: 'number',
              variant: 'outlined',
              size:'small',
            },
          },

          {
            accessorKey: 'pp_t', //simple recommended way to define a column
            header: 'پیشرفت برنامه ای کل پروژه',

            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            size: 80,
            minSize: 60,
            maxSize: 100,
            enableColumnActions: false,
            muiTableBodyCellEditTextFieldProps: {
              required: true,
              type: 'number',
              variant: 'outlined',
              size:'small',
            },
          },
          {
            accessorKey: 'ap_c', //simple recommended way to define a column
            header: 'پیشرفت واقعی بخش اجرا',
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            size: 80,
            minSize: 60,
            maxSize: 100,
            enableColumnActions: false,
            muiTableBodyCellEditTextFieldProps: {
              required: true,
              type: 'number',
              variant: 'outlined',
              size:'small',
            },
          },
          {
            accessorKey: 'pp_c', //simple recommended way to define a column
            header: 'پیشرفت برنامه ای بخش اجرا',
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            size: 80,
            minSize: 60,
            maxSize: 100,
            enableColumnActions: false,
            muiTableBodyCellEditTextFieldProps: {
              required: true,
              type: 'number',
              variant: 'outlined',
              size:'small',
            },
          },

          {
            accessorKey: 'ap_p', //simple recommended way to define a column
            header: 'پیشرفت واقعی بخش تدارک',

            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            size: 80,
            minSize: 60,
            maxSize: 100,
            enableColumnActions: false,
            muiTableBodyCellEditTextFieldProps: {
              required: true,
              type: 'number',
              variant: 'outlined',
              size:'small',
            },
          },
          {
            accessorKey: 'pp_p', //simple recommended way to define a column
            header: 'پیشرفت برنامه ای بخش تدارک',
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            size: 80,
            minSize: 60,
            maxSize: 100,
            enableColumnActions: false,
            muiTableBodyCellEditTextFieldProps: {
              required: true,
              type: 'number',
              variant: 'outlined',
              size:'small',
            },
          },
          {
            accessorKey: 'ap_e', //simple recommended way to define a column
            header: 'پیشرفت واقعی بخش مهندسی',
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            size: 80,
            minSize: 60,
            maxSize: 100,
            enableColumnActions: false,
            muiTableBodyCellEditTextFieldProps: {
              required: true,
              type: 'number',
              variant: 'outlined',
              size:'small',
            },
          },
          {
            accessorKey: 'pp_e', //simple recommended way to define a column
            header: 'پیشرفت برنامه ای بخش مهندسی',
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            size: 80,
            minSize: 60,
            maxSize: 100,
            enableColumnActions: false,
            muiTableBodyCellEditTextFieldProps: {
              required: true,
              type: 'number',
              variant: 'outlined',
              size:'small',
            },
          },
          {
            accessorKey: 'plan_replan', //simple recommended way to define a column
            header: 'Plan Replan',
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            size: 60,
            minSize: 50,
            maxSize: 70,
            enableColumnActions: false,
            muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
              required: true,
              type: 'number',
              variant: 'outlined',
              size:'small',
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
            //Header: <i style={{ color: 'red' }}>Age</i>, //plain jsx with no function
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
            //Header: <i style={{ color: 'red' }}>Age</i>, //plain jsx with no function
            Cell: ({ cell }) => cell.row.original.month,
          } 
        ],
        [getCommonEditTextFieldProps],
      );    

    return (
      <Box sx={{direction:'ltr'}}>
        <MaterialReactTable
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

          enableExpanding
          renderDetailPanel={({ row }) => (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}
              >
                <Box width={150}>
                  <GaugeChart id="gauge-chart1" 
                      nrOfLevels={100}
                      arcsLength={[1]}
                      colors={['rgb(32, 227, 51, .8)']}
                      percent={row.original.ap_e/100}
                      arcPadding={0.01} 
                      needleColor="rgb(2, 140, 110, .9)" 
                      needleBaseColor = "rgb(0, 110, 86, .9)" 
                      textColor = {colorMode === 'dark' ? "rgb(250, 250, 250, .9)" : "rgb(0, 0, 0, .9)"}
                  />
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" fontFamily='B Nazanin' fontWeight={600} color='error'>پیشرفت واقعی بخش مهندسی</Typography>
                  <Typography variant="caption" fontFamily='B Nazanin'>
                    {row.original.year + '/' + row.original.month} تا ماه منتهی به 
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}
              >
                <Box width={150}>
                  <GaugeChart id="gauge-chart1" 
                      nrOfLevels={100}
                      arcsLength={[1]}
                      colors={['rgb(32, 227, 51, .8)']}
                      percent={row.original.ap_p/100}
                      arcPadding={0.01} 
                      needleColor="rgb(2, 140, 110, .9)" 
                      needleBaseColor = "rgb(0, 110, 86, .9)" 
                      textColor = {colorMode === 'dark' ? "rgb(250, 250, 250, .9)" : "rgb(0, 0, 0, .9)"}
                  />
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" fontFamily='B Nazanin' fontWeight={600} color='error'>پیشرفت واقعی بخش تدارک</Typography>
                  <Typography variant="caption" fontFamily='B Nazanin'>
                    {row.original.year + '/' + row.original.month} تا ماه منتهی به 
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}
              >
                <Box width={150}>
                  <GaugeChart id="gauge-chart1" 
                      nrOfLevels={100}
                      arcsLength={[1]}
                      colors={['rgb(32, 227, 51, .8)']}
                      percent={row.original.ap_c/100}
                      arcPadding={0.01} 
                      needleColor="rgb(2, 140, 110, .9)" 
                      needleBaseColor = "rgb(0, 110, 86, .9)" 
                      textColor = {colorMode === 'dark' ? "rgb(250, 250, 250, .9)" : "rgb(0, 0, 0, .9)"}
                  />
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" fontFamily='B Nazanin' fontWeight={600} color='error'>پیشرفت واقعی بخش اجرا</Typography>
                  <Typography variant="caption" fontFamily='B Nazanin'>
                    {row.original.year + '/' + row.original.month} تا ماه منتهی به 
                  </Typography>
                </Box>
              </Box>            
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}
              >
                <Box width={150}>
                  <GaugeChart id="gauge-chart1" 
                      nrOfLevels={100}
                      arcsLength={[1]}
                      colors={['rgb(32, 227, 51, .8)']}
                      percent={row.original.ap_t/100}
                      arcPadding={0.01} 
                      needleColor="rgb(2, 140, 110, .9)" 
                      needleBaseColor = "rgb(0, 110, 86, .9)" 
                      textColor = {colorMode === 'dark' ? "rgb(250, 250, 250, .9)" : "rgb(0, 0, 0, .9)"}
                  />
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" fontFamily='B Nazanin' fontWeight={600} color='error'>پیشرفت واقعی کل پروژه</Typography>
                  <Typography variant="caption" fontFamily='B Nazanin'>
                    {row.original.year + '/' + row.original.month} تا ماه منتهی به 
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}

          enableEditing
          editingMode="row" //default 
          onEditingRowSave={handleSaveRowEdits}
          // onEditingRowCancel={handleCancelRowEdits}
          // renderRowActions={({ row, table }) => (
          //   <Box sx={{ display: 'flex', gap: '1rem', width:'10%'}}>
          //     {
          //     // (row.index === progressStates.length - 1) &&
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
    getProgressState: (contractId: number, dateId: number) => 
      dispatch(GetProgressState(contractId, dateId)),
    editProgressState: (id: number, request: IRequestProgressState) => 
      dispatch(EditProgressState(id, request)),
  }); 
  
  const connector = connect(mapStateToProps, mapDispatchToProps);
  
  type ProgressStateProps = ConnectedProps<typeof connector>;
  
  export default connector(ProgressState)