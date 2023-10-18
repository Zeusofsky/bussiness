
import { ReactElement, FC } from "react";
import { 
  Box, 
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  SelectChangeEvent,
} from "@mui/material";
import type {} from '@mui/x-data-grid/themeAugmentation';
import Flags from 'country-flag-icons/react/3x2'

interface PhoneNumberBoxProps{
    countryCode: string;
    handleSelectChange: (e: SelectChangeEvent<unknown>) => void;
    id: string;
    name: string;
    title: string;
    value: any;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    errorCondition: boolean;
    errorMessage: string;
}
const PhoneNumberBox: FC<PhoneNumberBoxProps> = ({
    countryCode,
    handleSelectChange,
    id,
    name,
    title,
    value,
    handleInputChange,
    errorCondition,
    errorMessage
}): ReactElement => {
    return(
        <Box sx={{display:"grid", gridAutoColumns:'1fr', gap:0}}>
        <Select 
            value={countryCode} 
            sx={{ gridRow:'1', gridColumn:'span 1', height:'40px'}} 
            onChange={(e) => handleSelectChange(e)}
            >
            <MenuItem value={"+98"}><Flags.IR/></MenuItem>
            <MenuItem value={"+01"}><Flags.US/></MenuItem>
            <MenuItem value={"+57"}><Flags.CH/></MenuItem>
            <MenuItem value={"+45"}><Flags.DE/></MenuItem>
            <MenuItem value={"+48"}><Flags.RU/></MenuItem>
        </Select>
        <FormControl 
            fullWidth variant="outlined" size='small' 
            sx={{ gridRow:'1', gridColumn:'span 4', fontSize: {xs:'9pt', sm:'9pt', md:'10pt'}}}>
            <InputLabel htmlFor={id} sx={{fontSize:{xs:'9pt', sm:'10pt', md:'11pt'}}}>{title}</InputLabel>
            <OutlinedInput 
                id={id} 
                name={name}
                type='text'
                aria-describedby="my-helper-text" 
                value={value}
                onChange={(e) => handleInputChange(e)}
                error={errorCondition}
            />
            {
                errorCondition ?
                <FormHelperText id="my-helper-text" color="red">{errorMessage}</FormHelperText>
                : ''
            }
        </FormControl>
        </Box>
    )
}

export default PhoneNumberBox;