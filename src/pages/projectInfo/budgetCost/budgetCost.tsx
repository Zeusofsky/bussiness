import { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  type MaterialReactTableProps,
  // type MRT_Cell,
  type MRT_ColumnDef,
  // type MRT_Row,
  // type MRT_RowSelectionState,
} from 'material-react-table';
import {
  Box,
  // IconButton,
  // Tooltip,
  // Typography,
} from '@mui/material';
// import { Edit, } from '@mui/icons-material';
import { ConnectedProps, connect, useSelector } from 'react-redux';
import { GetBudgetCost, EditBudgetCost } from '../../../redux/actionCreators/budgetCostActions';
import { Dispatch } from 'redux';
import { IBudgetCost, IRequestBudgetCost } from '../../../models/budgetCost';
import { RootState } from '../../../redux/store/store';
import { IBudgetCostsState } from '../../../redux/reducers/budgetCostReducer';


const BudgetCost: FC<BudgetCostProps> = ({ 
    currentContractId, 
    currentReportDateId, 
    getBudgetCost,
    editBudgetCost,
  }): ReactElement => {
    // const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
    // const [selectedRow, setSelectedRow] = useState<string>('');

    useEffect(() => {
      if (currentContractId < 1) return
  
      getBudgetCost(currentContractId, currentReportDateId);
    }, [getBudgetCost, currentContractId, currentReportDateId]);

    
    const budgetCostState: IBudgetCostsState = useSelector((state: RootState) => state.budgetCosts)
    const budgetCosts: IBudgetCost[] = budgetCostState.budgetCosts
    // console.log('budgetCosts: ', budgetCosts)

    const [tableData, setTableData] = useState<IBudgetCost[]>(() => budgetCosts);
    const [validationErrors] = useState<{
      [cellId: string]: string;
    }>({});

    useEffect(() => {
      if(tableData !== budgetCosts){
        setTableData(budgetCosts)
      }
    }, [tableData, budgetCosts]);
  
    const handleSaveRowEdits: MaterialReactTableProps<IBudgetCost>['onEditingRowSave'] =
      async ({ exitEditingMode, row, values }) => {
        if (!Object.keys(validationErrors).length) {
          tableData[row.index] = {
            budgetcostid: row.original.budgetcostid,
            contractid: row.original.contractid,
            dateid: row.original.dateid,
            year: values.year,
            month: values.month,
            ac_r: values.ac_r,
            ac_fc: values.ac_fc,
            bac_r: values.bac_r,
            bac_fc: values.bac_fc,
            eac_r: values.eac_r,
            eac_fc: values.eac_fc,
            ev_r: values.ev_r,
            ev_fc: values.ev_fc,
            description: ''
          };
          //send/receive api updates here, then refetch or update local table data for re-render
          const request: IRequestBudgetCost = {
            contractid: row.original.contractid,
            dateid: row.original.dateid,
            ac_r: values.ac_r,
            ac_fc: values.ac_fc,
            bac_r: values.bac_r,
            bac_fc: values.bac_fc,
            eac_r: values.eac_r,
            eac_fc: values.eac_fc,
            ev_r: values.ev_r,
            ev_fc: values.ev_fc,
            description: ''
          }
          // console.log('budgetCosts: ', budgetCosts)

          editBudgetCost(Number(row.original.budgetcostid), request)
          setTableData([...tableData]);
          exitEditingMode(); //required to exit editing mode and close modal
        }
      };
  
    // const handleCancelRowEdits = () => {
    //   setValidationErrors({});
    // };
  
    // const getCommonEditTextFieldProps = useCallback(
    //   (
    //     cell: MRT_Cell<IBudgetCost>,
    //   ): MRT_ColumnDef<IBudgetCost>['muiTableBodyCellEditTextFieldProps'] => {
    //     return {
    //       error: !!validationErrors[cell.id],
    //       helperText: validationErrors[cell.id],
    //       onBlur: (event) => {
    //         // const isValid =
    //         //   cell.column.id === 'budgetCost' ? validateRequired(event.target.value) : '';
    //         // if (!isValid) {
    //         //   //set validation error for cell if invalid
    //         //   setValidationErrors({
    //         //     ...validationErrors,
    //         // [cell.id]: `${cell.column.columnDef.header} الزامی است`,
    //         //   });
    //         // } else {
    //         //   //remove validation error for cell if valid
    //         //   delete validationErrors[cell.id];
    //         //   setValidationErrors({
    //         //     ...validationErrors,
    //         //   });
    //         // }
    //       },
    //     };
    //   },
    //   [validationErrors],
    // );
  
    const columns = useMemo<MRT_ColumnDef<IBudgetCost>[]>(
        () => [
          {
            id: "ev",
            header: "EV",
            muiTableHeadCellProps: {
              align: 'center',
            },
            enableColumnActions: false,
            columns: [
              {
                accessorKey: 'ev_fc', //simple recommended way to define a column
                header: "ارزی(Euro)",
                muiTableHeadCellProps: {
                  align: 'center',
                },
                muiTableBodyCellProps: {
                  align: 'center',
                },
                size: 50,
                minSize: 20,
                maxSize: 80,
                enableColumnActions: false,
              },
              {
                accessorKey: 'ev_r', //simple recommended way to define a column
                header: "ریالی(میلیون ریال)",
                muiTableHeadCellProps: {
                  align: 'center',
                },
                muiTableBodyCellProps: {
                  align: 'center',
                },
                size: 50,
                minSize: 20,
                maxSize: 80,
                enableColumnActions: false,
              },
            ]
          },
          {
            id: "ac",
            header: "AC",
            muiTableHeadCellProps: {
              align: 'center',
            },
            enableColumnActions: false,
            columns: [
              {
                accessorKey: 'ac_fc', //simple recommended way to define a column
                header: "ارزی(Euro)",
                muiTableHeadCellProps: {
                  align: 'center',
                },
                muiTableBodyCellProps: {
                  align: 'center',
                },
                size: 50,
                minSize: 20,
                maxSize: 80,
                enableColumnActions: false,
              },
              {
                accessorKey: 'ac_r', //simple recommended way to define a column
                header: "ریالی(میلیون ریال)",
                muiTableHeadCellProps: {
                  align: 'center',
                },
                muiTableBodyCellProps: {
                  align: 'center',
                },
                size: 50,
                minSize: 20,
                maxSize: 80,
                enableColumnActions: false,
              },
            ]
          },
          {
            id: "eac",
            header: "EAC",
            muiTableHeadCellProps: {
              align: 'center',
            },
            enableColumnActions: false,
            columns: [
              {
                accessorKey: 'eac_fc', //simple recommended way to define a column
                header: "ارزی(Euro)",
                muiTableHeadCellProps: {
                  align: 'center',
                },
                muiTableBodyCellProps: {
                  align: 'center',
                },
                size: 50,
                minSize: 20,
                maxSize: 80,
                enableColumnActions: false,
              },          
              {
                accessorKey: 'eac_r', //simple recommended way to define a column
                header: "ریالی(میلیون ریال)",
                muiTableHeadCellProps: {
                  align: 'center',
                },
                muiTableBodyCellProps: {
                  align: 'center',
                },
                size: 50,
                minSize: 20,
                maxSize: 80,
                enableColumnActions: false,
              },
            ]
          },
          {
            id: "bac",
            header: "BAC",
            muiTableHeadCellProps: {
              align: 'center',
            },
            enableColumnActions: false,
            columns: [
              {
                accessorKey: 'bac_fc', //simple recommended way to define a column
                header: "ارزی(Euro)",
                muiTableHeadCellProps: {
                  align: 'center',
                },
                muiTableBodyCellProps: {
                  align: 'center',
                },
                size: 50,
                minSize: 20,
                maxSize: 80,
                enableColumnActions: false,
              },          
              {
                accessorKey: 'bac_r', //simple recommended way to define a column
                header: "ریالی(میلیون ریال)",
                muiTableHeadCellProps: {
                  align: 'center',
                },
                muiTableBodyCellProps: {
                  align: 'center',
                },
                size: 50,
                minSize: 20,
                maxSize: 80,
                enableColumnActions: false,
              },
            ]
          },
          {
            id: "date",
            header: "تاریخ",
            muiTableHeadCellProps: {
              align: 'center',
            },
            enableColumnActions: false,
            columns: [
              {  
                id: 'year',
                header: 'سال',
                muiTableHeadCellProps: {
                  align: 'center',
                },
                muiTableBodyCellProps: {
                  align: 'center',
                },
                size: 15,
                minSize: 10,
                maxSize: 20,
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
                size: 35,
                minSize: 25,
                maxSize: 45,
                columnDefType: 'display', 
                enableColumnActions: false,
                //Header: <i style={{ color: 'red' }}>Age</i>, //plain jsx with no function
                Cell: ({ cell }) => cell.row.original.month,
              }
            ]
          }
        ],
        [],
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
            'mrt-row-numbers': {
              muiTableHeadCellProps: {
                align: 'center',
              },
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
              //stripe the rows, make odd rows a darker color
              '& tr:nth-of-type(odd)': {
                backgroundColor: 'rgb(245, 245, 245, .1)',
              },
            },
          }}

          // enableMultiRowSelection={false} //use radio buttons instead of checkboxes
          // enableRowSelection
          getRowId={(row) => String(row.budgetcostid)} //give each row a more useful id
          muiTableBodyRowProps={({ row }) => ({
            //implement row selection click events manually
            // onClick: () =>
            //   setRowSelection((prev) => ({
            //     ...prev,
            //     [row.id]: !prev[row.id],
            //   })),
            // onClick: () => setSelectedRow(row.id),
            // selected: (selectedRow !== ''),
            sx: {
              // cursor: 'pointer',
              height: '32px',
              // bgcolor: rowSelection[row.id] ? 'rgba(153, 102, 255, 0.6)' : 'transparent'
            },
          })}
          // onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
          // state={{ rowSelection }} //pass our managed row selection state to the table to use

          columns={columns}
          data={tableData}

          initialState={{ 
            density: 'compact', 
            columnPinning: { right: ['mrt-row-select', 'mrt-row-numbers'] },
            // columnVisibility: { budgetcostid: false, contractid: false, dateid: false },
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

          enableEditing
          editingMode="row" //default   
          onEditingRowSave={handleSaveRowEdits}
          // onEditingRowCancel={handleCancelRowEdits}
          // renderRowActions={({ row, table }) => (
          //   <Box sx={{ display: 'flex', gap: '1rem', width:'10%'}}>
          //     {
          //     // (row.index === budgetCosts.length - 1) &&
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

          // renderRowActions={({ row, table }) => (
          //   <Box sx={{ display: 'flex', gap: '1rem', width:'10%'}}>
          //     {(row.index === budgetCosts.length - 1) ? 
          //       !editSaveMode ? 
          //         <Tooltip arrow placement="left" title="ویرایش">
          //           <IconButton onClick={() => {
          //               table.setEditingRow(row)
          //               setEditSaveMode(true)
          //             }}>
          //             <Edit sx={{size:'small'}}/>
          //           </IconButton>
          //         </Tooltip>
          //       :
          //       <>
          //         <Tooltip arrow placement="left" title="ذخیره">
          //           <IconButton onClick={() => 
          //             handleSaveRowEdits
          //           }>
          //             <Save sx={{size:'small'}}/>
          //           </IconButton>
          //         </Tooltip>
          //         <Tooltip arrow placement="left" title="انصراف">
          //         <IconButton onClick={() => {
          //           handleCancelRowEdits()
          //           setEditSaveMode(false)
          //         }}>
          //           <Cancel sx={{size:'small'}}/>
          //         </IconButton>
          //       </Tooltip>
          //     </>
          //     :''
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
    getBudgetCost: (contractId: number, dateId: number) => 
    dispatch(GetBudgetCost(contractId, dateId)),
    editBudgetCost: (id: number, request: IRequestBudgetCost) => 
      dispatch(EditBudgetCost(id, request)),
  }); 
  
  const connector = connect(mapStateToProps, mapDispatchToProps);
  
  type BudgetCostProps = ConnectedProps<typeof connector>;
  
  export default connector(BudgetCost)