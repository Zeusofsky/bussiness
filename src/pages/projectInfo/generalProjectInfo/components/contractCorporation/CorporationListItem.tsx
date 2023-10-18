import { FC, ReactElement } from "react";
import { Box, Typography, Divider, Badge } from "@mui/material";
import React from "react";


interface CorporationListItemProps {
    company: string;
    e: number;
    p: number;
    c: number;
}
const CorporationListItem: FC<CorporationListItemProps> = ({ company, e, p, c }): ReactElement => {
    return(
        <React.Fragment>
        <Box 
            display='flex' 
            justifyContent='space-between' 
            mx={2}
            pl={2}
            minWidth={{md:260, lg:280, xl:300}}
        >
            <Typography 
                variant="body2" 
                color='text.disabled' 
                mx={2}
                ml={1}
                mt={0.5} 
                mb={1}
                sx={{fontSize:{xs:'8pt', sm:'8pt', md:'9pt', lg:'10pt', fontWeight:'bold'}}}
            >
                <Badge sx={{bgcolor:'aqua', borderRadius:5, px:.4}}>{String(c) + '%'}</Badge>
                
            </Typography>
            <Typography 
                variant="body2" 
                color='text.disabled' 
                mx={4}
                mt={0.5} 
                mb={1}
                sx={{
                    fontSize:{xs:'8pt', sm:'8pt', md:'9pt', lg:'10pt', fontWeight:'bold'}
                }}
            >
                <Badge sx={{bgcolor:'aquamarine', borderRadius:5, px:.4}}>{String(p) + '%'}</Badge>
            </Typography>
            <Typography 
                variant="body2" 
                color='text.disabled' 
                mx={2}
                mt={0.5} 
                mb={1}
                sx={{
                    fontSize:{xs:'8pt', sm:'8pt', md:'9pt', lg:'10pt', fontWeight:'bold'}
                }}
            >
                <Badge sx={{bgcolor:'bisque', borderRadius:5, px:.4}}>{String(e) + '%'}</Badge>
            </Typography>
            <Typography 
                variant="body2" 
                color='darkgreen' 
                mx={2}
                mt={0.5} 
                mb={1}
                sx={{
                    fontSize:{xs:'8pt', sm:'8pt', md:'9pt', lg:'10pt', fontWeight:'bold'}
                }}
            >
                {company}
            </Typography>
        </Box>
        <Divider/>
        </React.Fragment>
    )
}

export default CorporationListItem;