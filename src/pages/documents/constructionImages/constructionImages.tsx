import { FC, ReactElement } from 'react';
// import { Dispatch } from 'redux';
// import { 
//   ConnectedProps, 
//   connect, 
// } from 'react-redux';
import { 
  Box, 
  Grid, 
} from '@mui/material';

// import { RootState } from '../../../redux/store/store';
// import { AddZoneImage, DeleteZoneImage, EditZoneImage, GetZoneImage, PartialEditZoneImage } from '../../../redux/actionCreators/zoneImageActions';
// import { IRequestZoneImage, IRequestPartialZoneImage } from '../../../models/zoneImage';
import ZoneImage from './components/ZoneImage';


const ZoneImages: FC = (
//     { 
//   currentContractId, 
//   currentReportDateId, 
//   getZoneImage,
//   addZoneImage,
//   editZoneImage,
//   partialEditZoneImage,
//   deleteZoneImage,
// }
): ReactElement => {

  return (
    <Grid container fontFamily='B Nazanin' rowSpacing={{ xs: 1, sm: 2, md: 3, lg: 3, xl:2.5 }} columnSpacing={{ xs:1,sm:2,md:3,lg:5,xl:7 }} px={{ xs:1,sm:2,md:3,lg:5,xl:7, direction:'ltr'}}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} px='auto'>
        <Box display="flex" flexDirection="column" mx='auto' pt={5} pb={4} px={{ xs:1,sm:2,md:3,lg:4,xl:5 }} borderRadius={2} boxShadow={3} >
        <Box display="flex" justifyContent='center' borderRadius={2} boxShadow={3} mb={5} pt={5} pb={5}>
            <ZoneImage 
            //   currentContractId={currentContractId} 
            //   currentDateId={currentReportDateId}
            //   getZoneImage={getZoneImage}
            //   addZoneImage={addZoneImage}
            //   editZoneImage={editZoneImage}
            //   partialEditZoneImage={partialEditZoneImage}
            //   deleteZoneImage={deleteZoneImage}            
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ZoneImages;
// const mapStateToProps = (state: RootState) => ({
//   currentContractId: state.contracts.currentContractId,
//   currentReportDateId: state.reportDates.currentReportDateId
// });

// const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
//   getZoneImage: (contractId: number, dateid: number) => 
//     dispatch(GetZoneImage(contractId, dateid)),
//   addZoneImage: (request: IRequestZoneImage) => 
//     dispatch(AddZoneImage(request)),
//   editZoneImage: (id: number, request: IRequestZoneImage) => 
//     dispatch(EditZoneImage(id, request)),
//   partialEditZoneImage: (id: number, request: IRequestPartialZoneImage) => 
//     dispatch(PartialEditZoneImage(id, request)),
//   deleteZoneImage: (id: number) => 
//     dispatch(DeleteZoneImage(id)),
//   });

// const connector = connect(mapStateToProps, mapDispatchToProps);

// type ZoneImagesProps = ConnectedProps<typeof connector>;

// export default connector(ZoneImages)
