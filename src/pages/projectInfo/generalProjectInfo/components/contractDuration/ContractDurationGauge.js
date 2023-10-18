// import React, { FC, ReactElement } from 'react';
import { Box } from "@mui/material";
import GaugeChart from 'react-gauge-chart';
import { useColorModeContext } from "../../../../../hooks";
import ContractDurationLegends from "./ContractDurationLegends";
// import ReactSpeedometer from "react-d3-speedometer"
// import { Button } from '@storybook/react/demo'
// import { storiesOf } from '@storybook/react'

// PRODUCTION: switch to dist for checking production version
// import ReactSpeedometer from "../../dist/index"

// import SpeedoButton from './speedo-button'
// import MultiSpeedoMeters from './multi-speedometers'
// import AutoRefresh from './auto-refresh'

// const textColor = '#AAA'

// const chartStyle = {
//     height: 300,
//   }   style={chartStyle}

// type CustomSegmentLabelPosition = "OUTSIDE" | "INSIDE"
// type CustomSegmentLabel = {
//     text?: string,
//     position?: CustomSegmentLabelPosition ,
//     fontSize?: string,
//     color?: string,
//   }

const ContractDurationGauge = ({projectDuration, passedDuration, addendumDuration}) => {
    // console.log('totalDuration: ', totalDuration)
    // console.log('passedDuration: ', passedDuration)
    const { colorMode } = useColorModeContext();

    // console.log('colorMode: ', colorMode)
    const totalDuration = projectDuration + addendumDuration
    return (
        (addendumDuration === 0 ?
            <Box display='flex' >
                <GaugeChart id="gauge-chart1" 
                    nrOfLevels={totalDuration}
                    arcsLength={[1]}
                    colors={['rgb(32, 227, 51, .8)']}
                    percent={passedDuration/totalDuration}
                    arcPadding={0.01} 
                    needleColor="rgb(2, 140, 110, .9)" 
                    needleBaseColor = "rgb(0, 110, 86, .9)" 
                    textColor = {colorMode === 'dark' ? "rgb(250, 250, 250, .9)" : "rgb(0, 0, 0, .9)"}
                />
                <ContractDurationLegends projectDuration={projectDuration}/>
            </Box>            :
            <Box display='flex' >
                <GaugeChart id="gauge-chart1" 
                    nrOfLevels={totalDuration}
                    arcsLength={[projectDuration / totalDuration, addendumDuration / totalDuration]}
                    colors={['rgb(32, 227, 51, .8)', 'rgba(255, 99, 132, 0.8)']}
                    percent={passedDuration/totalDuration}
                    arcPadding={0.01}   
                    needleColor="rgb(2, 140, 110, .9)" 
                    needleBaseColor = "rgb(0, 110, 86, .9)" 
                    textColor = {colorMode === 'dark' ? "rgb(250, 250, 250, .9)" : "rgb(0, 0, 0, .9)"}
                />
                <ContractDurationLegends projectDuration={projectDuration} addendumDuration={addendumDuration}/>
            </Box>
        )
        //   '#5BE12C'   '#EA4228'
        // <GaugeChart id="gauge-chart1" 
        //     // nrOfLevels={3} 
        //     // colors={["rgb(245, 200, 203)", "rgb(244, 190, 129)"]} 
        //     // arcWidth={0.3} 
        //     // percent={0.37} 

        //     // nrOfLevels={10} 
        //     // arcPadding={0.02} 
        //     // cornerRadius={10} 
        //     // percent={0.6} , '#F5CD19'

        //     nrOfLevels={totalDuration}
        //     arcsLength={[projectDuration / totalDuration, addendumDuration / totalDuration]}
        //     colors={['#5BE12C', '#EA4228']}
        //     percent={passedDuration/totalDuration}
        //     arcPadding={0.01}

            // animate={false} 
            // nrOfLevels={15} 
            // percent={0.56} 
            // needleColor="#345243" 
        // />
        // <ReactSpeedometer 
        //     maxValue={totalDuration}
        //     value={passedDuration}
        //     needleColor="red"
        //     startColor="lightblue"
        //     segments={1}
            // endColor="blue"

            // value={333}
            // segments={5}
            // segmentColors={[
            //   "#bf616a",
            //   "#d08770",
            //   "#ebcb8b",
            //   "#a3be8c",
            //   "#b48ead",
            // ]}
            // startColor will be ignored
            // endColor will be ignored
        //     />

            // <div>
            //   <div>
            //     <ReactSpeedometer
            //       width={400}
            //       needleHeightRatio={0.7}
            //       value={value}
                  // customSegmentStops={[0, 250, 750, 1000]}
                  // segmentColors={['#9399ff', '#14ffec', '#00bbf0']}
            //       currentValueText="مدت زمان پروژه"
            //       customSegmentLabels={[
            //         {
            //           text: 'مدت زمان پروژه',
            //           position: 'INSIDE',
            //           color: '#555',
            //         },
                    // {
                    //   text: 'Bad',
                    //   position: 'INSIDE',
                    //   color: '#555',
                    // },
                    // {
                    //   text: 'Ok',
                    //   position: 'INSIDE',
                    //   color: '#555',
                    //   fontSize: '19px',
                    // },
                    // {
                    //   text: 'Good',
                    //   position: 'INSIDE',
                    //   color: '#555',
                    // },
                    // {
                    //   text: 'Very Good',
                    //   position: 'INSIDE',
                    //   color: '#555',
                    // },
            //       ]}
            //       ringWidth={47}
            //       needleTransitionDuration={3333}
            //       needleTransition="easeElastic"
            //       needleColor={'rgb(10, 48, 53, .8)'}
            //       textColor={'#d8dee9'}
            //     />
            //   </div>
            // </div>
    )
}

export default ContractDurationGauge;
