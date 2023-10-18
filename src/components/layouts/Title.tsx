import { FC, ReactElement } from "react";
import { Box, Typography } from "@mui/material";

import { 
    useSidebarContext,
} from "../../hooks";


export const Title: FC = (): ReactElement => {
    const { menuTitle } = useSidebarContext();

    return (
        <Box 
            sx={{
                backgroundColor:'rgba(132, 141, 195, 0.45)',mt:1, mb:6, px:6, py:0
            }}
        >
            <Typography 
                variant='subtitle1' 
                sx={{my:0, py:0, mx:2, fontFamily:'B Nazanin'}} 
                fontWeight={600}
                color='text.secondary'
            >
            {menuTitle}
            </Typography>
        </Box>
    )
}