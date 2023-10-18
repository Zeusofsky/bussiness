import React, { useMemo, useState } from 'react';
import {
  MaterialReactTable,
  type MaterialReactTableProps,
  type MRT_ColumnDef,
} from 'material-react-table';
// import { data, type Person } from './makeData';


export type Person = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    state: string;
  };

export const data: Person[] = [
    {
      id: '9s41rp',
      firstName: 'Kelvin',
      lastName: 'Langosh',
      email: 'Jerod14@hotmail.com',
      age: 19,
      state: 'Ohio',
    },
    {
      id: '08m6rx',
      firstName: 'Molly',
      lastName: 'Purdy',
      email: 'Hugh.Dach79@hotmail.com',
      age: 37,
      state: 'Rhode Island',
    },
    {
      id: '5ymtrc',
      firstName: 'Henry',
      lastName: 'Lynch',
      email: 'Camden.Macejkovic@yahoo.com',
      age: 20,
      state: 'California',
    },
    {
      id: 'ek5b97',
      firstName: 'Glenda',
      lastName: 'Douglas',
      email: 'Eric0@yahoo.com',
      age: 38,
      state: 'Montana',
    },
    {
      id: 'xxtydd',
      firstName: 'Leone',
      lastName: 'Williamson',
      email: 'Ericka_Mueller52@yahoo.com',
      age: 19,
      state: 'Colorado',
    },
    {
      id: 'wzxj9m',
      firstName: 'Mckenna',
      lastName: 'Friesen',
      email: 'Veda_Feeney@yahoo.com',
      age: 34,
      state: 'New York',
    },
    {
      id: '21dwtz',
      firstName: 'Wyman',
      lastName: 'Jast',
      email: 'Melvin.Pacocha@yahoo.com',
      age: 23,
      state: 'Montana',
    },
    {
      id: 'o8oe4k',
      firstName: 'Janick',
      lastName: 'Willms',
      email: 'Delfina12@gmail.com',
      age: 25,
      state: 'Nebraska',
    },
  ];

const Example = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      //column definitions...
      {
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },

      {
        accessorKey: 'email',
        header: 'Address',
      },
      {
        accessorKey: 'age',
        header: 'City',
      },

      {
        accessorKey: 'state',
        header: 'State',
      }, //end
    ],
    [],
  );

  const [tableData, setTableData] = useState<Person[]>(() => data);

  const handleSaveRow: MaterialReactTableProps<Person>['onEditingRowSave'] =
    async ({ exitEditingMode, row, values }) => {
      //if using flat data and simple accessorKeys/ids, you can just do a simple assignment here.
      tableData[row.index] = values;
      //send/receive api updates here
      setTableData([...tableData]);
      exitEditingMode(); //required to exit editing mode
    };

  return (
    <MaterialReactTable
      columns={columns}
      data={tableData}
      editingMode="row"
      enableEditing
      onEditingRowSave={handleSaveRow}
    />
  );
};

export default Example;
