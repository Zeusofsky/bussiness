import BingMapsReact from "bingmaps-react";
import { Box, useTheme } from "@mui/material";


const BingMap1 = () => {
    const theme = useTheme();
    return (
        <Box sx={{height:330, minWidth:{xs:450,sm:500,md:420,lg:430,xl:430}, backgroundColor:theme.palette.background.paper, borderRadius:8, boxShadow:5}}>
            <BingMapsReact 
                bingMapsKey="Aplc-JxZzfcRPXiddH0vKWiy5-lTqETE9XCV7HeL3qb0H7zRoXDt1paxa_ox9nAr"
                // height="330px"
                // mapOptions={{
                //   navigationBarMode: "square",
                // }}
                // width="400px"
                // viewOptions={{
                //   center: { latitude: 42.360081, longitude: -71.058884 },
                //   mapTypeId: "grayscale",
                // }}
            />
        </Box>
    )
}

export default BingMap1