import React, { useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { MRT_ColumnDef } from 'material-react-table'; // If using TypeScript (optional, but recommended)
import { darken, useTheme } from '@mui/material';

//If using TypeScript, define the shape of your data (optional, but recommended)
interface Project {
  contractId: number,
  contractNo: string,
  contractType: string,
  contract: string,
  customer: string,
  projectManager: string,
  // coordinator: string,
  // currency: string,
  startOperationDate: string,         
  finishDate: string,
}

//mock data - strongly typed if you are using TypeScript (optional, but recommended)
const data: Project[] = [
  {
    contractId: 1,
    contractNo: '85645',
    contractType: 'نفت و گاز',
    contract: 'Project #1',
    customer: 'شرکت نفت',
    projectManager: 'مهندس 1',
    // coordinator: '1مهندس 1',
    // currency: 'ریال',
    startOperationDate: '2022-04-03',
    finishDate: '2024-04-03',
  },
  {
    contractId: 2,
    contractNo: '85646',
    contractType: 'معدن',
    contract: 'Project #2',
    customer: 'وزارت صنایع',
    projectManager: 'مهندس 2',
    // coordinator: '21',
    // currency: 'ریال',
    startOperationDate: '2022-04-03',
    finishDate: '2024-04-03',
  },
  {
    contractId: 3,
    contractNo: '85647',
    contractType: 'راه سازی',
    contract: 'Project #3',
    customer: 'وزارت راه سازی',
    projectManager: 'مهندس 3',
    // coordinator: '3مهندس 1',
    // currency: 'یورو',
    startOperationDate: '2022-04-03',
    finishDate: '2024-04-03',
  },
  {
    contractId: 4,
    contractNo: '85648',
    contractType: 'معدن',
    contract: 'Project #4',
    customer: 'وزارت صنایع',
    projectManager: 'مهندس 14',
    // coordinator: '4مهندس 1',
    // currency: 'ریال',
    startOperationDate: '2022-04-03',
    finishDate: '2024-04-03',
  },
  {
    contractId: 5,
    contractNo: '85649',
    contractType: 'نفت و گاز',
    contract: 'Project #5',
    customer: 'شرکت نفت',
    projectManager: 'مهندس 5',
    // coordinator: '5مهندس 1',
    // currency: 'ریال',
    startOperationDate: '2022-04-03',
    finishDate: '2024-04-03',
  },
  {
    contractId: 6,
    contractNo: '85650',
    contractType: 'نفت و گاز',
    contract: 'Project #6',
    customer: 'شرکت نفت',
    projectManager: 'مهندس 6',
    // coordinator: '6مهندس 1',
    // currency: 'یورو',
    startOperationDate: '2022-04-03',
    finishDate: '2024-04-03',
  },
  {
    contractId: 7,
    contractNo: '85651',
    contractType: 'معدن',
    contract: 'Project #7',
    customer: 'وزارت صنایع',
    projectManager: 'مهندس 7',
    // coordinator: '7مهندس 1',
    // currency: 'ریال',
    startOperationDate: '2022-04-03',
    finishDate: '2024-04-03',
  },
  {
    contractId: 8,
    contractNo: '85652',
    contractType: 'راه سازی',
    contract: 'Project #8',
    customer: 'وزارت راه سازی',
    projectManager: 'مهندس 8',
    // coordinator: '8مهندس 1',
    // currency: 'ریال',
    startOperationDate: '2022-04-03',
    finishDate: '2024-04-03',
  },
  {
    contractId: 9,
    contractNo: '85653',
    contractType: 'معدن',
    contract: 'Project #9',
    customer: 'وزارت صنایع',
    projectManager: 'مهندس 9',
    // coordinator: '9مهندس 1',
    // currency: 'دلار',
    startOperationDate: '2022-04-03',
    finishDate: '2024-04-03',
  },
  {
    contractId: 10,
    contractNo: '85654',
    contractType: 'نفت و گاز',
    contract: 'Project #10',
    customer: 'شرکت نفت',
    projectManager: 'مهندس 10',
    // coordinator: '10مهندس 1',
    // currency: 'ریال',
    startOperationDate: '2022-04-03',
    finishDate: '2024-04-03',
  },
];

export default function Contract() {
  const theme = useTheme();

  //column definitions - strongly typed if you are using TypeScript (optional, but recommended)
  const columns = useMemo<MRT_ColumnDef<Project>[]>(
    () => [
      {
        accessorKey: 'contractNo', //simple recommended way to define a column
        header: 'شماره قرارداد',
        maxSize: 80,
        enableColumnDragging: false,
        enableResizing: false,
        enableGrouping: false,
        muiTableBodyCellProps: {
          align: 'center',
        },
        },
      // {
      //   accessorFn: (originalRow) => originalRow.contractType, //alternate way
      //   id: 'contractType', //id required if you use accessorFn instead of accessorKey
      //   header: 'نوع قرارداد',
      //   maxSize: 100,
      //   enableColumnDragging: false,
      //   enableResizing: false,
      // },
      {
        accessorKey: 'contract', //simple recommended way to define a column
        header: 'قرارداد',
        maxSize: 100,
        enableColumnDragging: false,
        enableResizing: false,
        enableGrouping: false,
      },
      {
        accessorKey: 'customer', //simple recommended way to define a column
        header: 'کارفرما',
        maxSize: 100,
        enableColumnDragging: false,
        enableResizing: false,
      },
      {
        accessorKey: 'projectManager', //simple recommended way to define a column
        header: 'مدیر گروژه',
        maxSize: 80,
        enableColumnDragging: false,
        enableResizing: false,
        enableGrouping: false,
      },
      // {
      //   accessorKey: 'coordinator', //simple recommended way to define a column
      //   header: 'هماهنگ کننده',
      //   maxSize: 80,
      //   enableColumnDragging: false,
      //   enableResizing: false,
      //   enableGrouping: false,
      // },
      // {
      //   accessorKey: 'currency', //simple recommended way to define a column
      //   header: 'واحد پول',
      //   maxSize: 60,
      //   enableResizing: false,
      //   enableColumnDragging: false,
      // },
      {
        accessorKey: 'startOperationDate', //simple recommended way to define a column
        header: 'تاریخ شروع عملیات',
        maxSize: 80,
        enableColumnDragging: false,
        enableResizing: false,
        enableGrouping: false,
      },
      {
        accessorKey: 'finishDate', //simple recommended way to define a column
        header: 'تاریخ پایان',
        maxSize: 80,
        enableColumnDragging: false,
        enableResizing: false,
        enableGrouping: false,
      },
    ],
    [],
  );

  return (
      <MaterialReactTable
        columns={columns}
        data={data}
        // enableRowSelection //enable some features
        enableColumnOrdering
        // enableGlobalFilter={false} //turn off a feature
        enableColumnResizing
        columnResizeMode="onEnd" //instead of the default "onChange" mode
        enableGrouping
        enableStickyHeader
        enableStickyFooter
        muiTableBodyProps={{
          sx: {
            //stripe the rows, make odd rows a darker color
            '& tr:nth-of-type(odd)': {
              backgroundColor: darken(theme.palette.background.paper, 0.1),
            },
          },
        }}
        muiTableHeadRowProps={{
          sx: {
            backgroundColor: darken(theme.palette.background.paper, 0.6),
          },
        }}
        muiTableHeadCellProps={{
          sx: {
            borderRight: '1px solid #e0e0e0', //add a border between columns
            color: 'rgb(255, 255, 255, 0.9)',
          },
          align: 'center', 
        }}
        muiTableBodyCellProps= {{
          sx: {
            borderRight: '1px solid #e0e0e0', //add a border between columns
          },
          align: 'center',
        }}
      />
  );
}