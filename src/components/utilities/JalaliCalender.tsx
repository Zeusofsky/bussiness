import React, { FC } from 'react';
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali';
// import { AdapterMomentJalaali } from '@mui/x-date-pickers/AdapterMomentJalaali';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import useTheme from '@mui/system/useTheme';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './jalaliCalender.css'


export function FormatDate(date: any) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

interface AdapterJalaliProps {
    label: string;
    date: Date;
    dateChangeHandler: (date: Date | null) => void;
}
export const AdapterJalali: FC<AdapterJalaliProps> = ({ label, date, dateChangeHandler }) => {
  const existingTheme = useTheme();
  const theme = React.useMemo(
    () => createTheme({ direction: 'rtl' }, existingTheme),
    [existingTheme],
  );

  return (
    <ThemeProvider theme={theme}>
      <div dir="rtl">
        <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
          <DatePicker 
            label={label} 
            value={date} 
            onChange={dateChangeHandler}
            sx={{ mt:1, fontFamily:'B Nazanin' }}
            slotProps={{ textField: { size: 'small' } }}
            className='custom-calendar'
          />
        </LocalizationProvider>
      </div>
    </ThemeProvider>
  );
}
