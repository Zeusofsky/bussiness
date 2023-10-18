import React, { FC } from 'react';
import { TextField } from '@mui/material';


export const AddEuroCommas = (num: string) => {
  const amount = num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return '€ ' + amount;
}
export const AddMRCommas = (num: string) => {
  const amount = num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return 'MR ' + amount;
}

export const RemoveNonNumeric = (num: string) => num.replace(/[^0-9]/g, "");

interface MoneyTextFieldProps {
  mt?: number,
  name: string,
  label: string,
  value: string,
  disabled?: boolean
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void,
}
export const MoneyTextField: FC<MoneyTextFieldProps> = ({ 
  mt=1,
  name, 
  label, 
  value, 
  disabled=false,
  onChangeHandler,
}) => {
  return (
      <TextField
        name={name}
        label={label}
        value={value}
        onChange={onChangeHandler}
        disabled={disabled}
        sx={{
          py:0, 
          mt:mt, 
          bgcolor: disabled ? 'rgba(115, 126, 147, 0.5)' : 'inherit',
          width:{xs:170, sm:170, md:160, lg:170, xl:170},
          borderRadius:2,
          "& .MuiOutlinedInput-input": {fontWeight:'400  !important', fontSize: '10pt !important'},
          "& .MuiInputLabel-root": disabled ? {color: 'rgb(0, 0, 0, .3)', fontWeight:'600  !important', fontSize: '12pt !important'}
                                            : {color: 'rgb(0, 0, 0, .3)', fontSize: '11pt !important'},
          "& .MuiOutlinedInput-root": {
            "& > fieldset": { borderColor: "rgb(0, 0, 0, .3)" },
          },
          "& .MuiOutlinedInput-root.Mui-focused": {
            "& > fieldset": { borderColor: "rgb(48, 171, 212, .6)" }
          },
          "& .MuiOutlinedInput-root:hover": {
            "& > fieldset": { borderColor: "rgb(211, 211, 211, .6)" }
          },
        }}
        inputProps={{
          style: { height: "0px", },
        }}
        variant="outlined"
      />
  );
}
