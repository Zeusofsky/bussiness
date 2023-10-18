import { Box, useTheme } from "@mui/material";
import { ReactBingmaps } from 'react-bingmaps';

const BingMap = () => {
    const theme = useTheme();
    const callBackMethod = () => {
      return 'information'
    }
    return (
        <Box sx={{height:330, minWidth:{xs:450,sm:500,md:420,lg:430,xl:430}, backgroundColor:theme.palette.background.paper, borderRadius:4, boxShadow:4}}>
            {/* <BingMapsReact 
                bingMapsKey="Aplc-JxZzfcRPXiddH0vKWiy5-lTqETE9XCV7HeL3qb0H7zRoXDt1paxa_ox9nAr"
                height="350px"
                mapOptions={{
                  navigationBarMode: "square",
                }}
                width="350px"
                viewOptions={{
                  center: { latitude: 42.360081, longitude: -71.058884 },
                  mapTypeId: "grayscale",
                }}
              />  */}
            <ReactBingmaps 
              bingmapKey = "Aplc-JxZzfcRPXiddH0vKWiy5-lTqETE9XCV7HeL3qb0H7zRoXDt1paxa_ox9nAr" 
              navigationBarMode = {"compact"}
              // supportedMapTypes = {["road","canvasDark"]}
              center = {[34.42216, 56.58427]}
              zoom = {4.5}
              // showZoomButtons= {false}
              // disableZooming= {true}
              // showHeadingCompass={false}
              showZoomButtons={false}
              pushPins = {
                [
                  {
                    "location":[33.02216, 56.58427], 
                    "option":{ 
                      color: 'red',
                      title: 'معدن چادرملو', 
                      description: 'معدن آهن چادرملو'
                    },
                    "addHandler": {"type" : "click", callback: callBackMethod }
                  },
                ]
              }

              // infoboxes = {
              //   [
              //     {
              //       "location":[13.0827, 80.2707], "option":{ title: 'Chennai', description: '...' }, "addHandler": {"type" : "click", callback: callBackMethod}
              //     },
              //   ]
              // }

              // regularPolygons = {
              //   [
              //     {
              //       "center":[13.0827, 80.2707],
              //       "radius":5,
              //       "points":3,
              //       "option": {fillColor: "green", strokeThickness: 2}
              //     },
              //   ]
              // }

              // heading = {180}
              // infoboxesWithPushPins = {[
              //   {
              //     "location":[33.02216, 56.58427], 
              //     "addHandler":"mouseover", //on mouseover the pushpin, infobox shown
              //     "infoboxOption": { title: 'Infobox Title', description: 'Infobox' },
              //     "pushPinOption":{ title: 'Pushpin Title', description: 'Pushpin' },
              //     "infoboxAddHandler": {"type" : "click", callback: callBackMethod },
              //     "pushPinAddHandler": {"type" : "click", callback: callBackMethod }
              //   },
              // ]
              // }
            > 
            </ReactBingmaps>
        </Box>
    )
}

export default BingMap;