import { ReactElement, FC } from "react";
import { 
  FormControl, 
  InputLabel, 
  OutlinedInput, 
  FormHelperText,
} from "@mui/material";

interface TextBoxProps{
    id: string;
    name: string;
    title: string;
    value: any;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    errorCondition: boolean;
    errorMessage: string;
}
const TextBox: FC<TextBoxProps> = ({
    id,
    name,
    title,
    value,
    handleInputChange,
    errorCondition,
    errorMessage
}): ReactElement => {
    return(
        <FormControl fullWidth variant="outlined" size='small' sx={{ fontSize: {xs:'9pt', sm:'9pt', md:'10pt'}}}>
        <InputLabel htmlFor={id} sx={{fontSize:{xs:'9pt', sm:'10pt', md:'11pt'}}}>{title}</InputLabel>
        <OutlinedInput 
            id={id} 
            name={name}
            type='text'
            aria-describedby="my-helper-text" 
            value={value}
            onChange={(e) => handleInputChange(e)}
            error={errorCondition}
            data-testid="text-box"
            />
        {
            errorCondition ?
            <FormHelperText id="my-helper-text" color="red">{errorMessage}</FormHelperText>
            : ''
        }
        </FormControl>
    )
}

export default TextBox;
