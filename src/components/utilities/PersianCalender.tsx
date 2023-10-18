import { FC, ReactElement } from "react";
import { Box, Typography } from "@mui/material";
// import DatePicker from "react-datepicker2";
import { Moment } from "moment";
// import { InputDatePicker } from "jalaali-react-date-picker";


interface PersianCalenderProps {
    label: string,
    value?: Moment | undefined,
    changeDateHandler: ((date: Moment) => void) | undefined,
}
export const PersianCalender: FC<PersianCalenderProps> = ({ label, value, changeDateHandler }): ReactElement => {
    return (
        <Box display='flex' mt={.7}>
            <Box flex={1} >
                {/* <DatePicker
                    isGregorian={false}
                    persianDigits={false}
                    timePicker={false}                
                    value={value}
                    onChange={changeDateHandler}
                /> */}
            </Box>
            <Box width={120} pl={.5}>
                <Typography variant='caption'>
                    {label}
                </Typography>
            </Box>
        </Box>
    )
}