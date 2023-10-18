import React, { FC } from 'react';
import { TextField } from '@mui/material';


interface NumberTextFieldProps {
  name: string,
  label: string,
  value: string,
  disabled?: boolean
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void,
}
export const NumberTextField: FC<NumberTextFieldProps> = ({ 
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
          mt:1, 
          bgcolor: disabled ? 'rgb(77, 90, 114, .5)' : 'inherit',
          width:{xs:50, sm:50, md:50, lg:50, xl:50},
          fontFamily:'B Nazanin',
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
