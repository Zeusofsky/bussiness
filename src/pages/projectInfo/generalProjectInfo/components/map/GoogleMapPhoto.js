

const GoogleMapPhoto = (map, request) => {
    const service = new window.google.maps.places.PlacesService(map);
    let mapPhoto;
    let addressName; 
    service.getDetails(request, (place, status) => {
        if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            place &&
            place.geometry &&
            place.geometry.location
        ) {
            const marker = new window.google.maps.Marker({
                map,
                position: place.geometry.location
            });
        }

            mapPhoto = place && place.photos && place.photos.length > 0 ? place.photos[0].getUrl() : '';
            addressName = place && place.formatted_address ? place.formatted_address : '';
    });

    return {
        photo:mapPhoto,
        name: addressName
    }
}
export default GoogleMapPhoto;