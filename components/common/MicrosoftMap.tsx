import React, {useEffect} from "react"
import { MAP_KEY } from "../../resources/project-constants"

declare const window:any

interface Props {
    id: string
    pushpinData?: any
    getLatLong?: any
    module?:  'localCommercial' | 'landSale'
}


const MicrosoftMap: React.FC<Props> = (props) => {

    // const [map, setMap] = useState<any>()
    const defaultLatitude = 20.521572;
    const defaultLongitude = -99.893952;
    const defaultZoom = 5;
    
    let responseLatLong:any = {
        latitude: '',
        longitude: '',
        address: '',
    }

    let map:any;
    let infobox:any;
    let mgrSearch:any;

   

    

   
    
    
    function validateLongitudeLatitude(value:any){
        return parseFloat(value)
    }

    /* map functions starts here */
    function createPushPin(item: any){
        
        if(item.latitude && item.longitude)
        {
            try {
                var loc = new window.Microsoft.Maps.Location(validateLongitudeLatitude(item.latitude), validateLongitudeLatitude(item.longitude));
                var pushpin = new window.Microsoft.Maps.Pushpin(loc)
                pushpin.metadata = {
                    title: 'Pin Title',
                    description: 'Pin discription'
                };
                //Microsoft.Maps.Events.addHandler(pin, 'click', pushpinClicked);
                return pushpin
            } catch (error) {
                return false
            }
            
        }

        return false
       
    }

    

    function pushpinClicked(e:any) {
        //Make sure the infobox has metadata to display.
        if (e.target.metadata) {
            //Set the infobox options with the metadata of the pushpin.
            infobox.setOptions({
                location: e.target.getLocation(),
                title: ' ',
                description: e.target.metadata.description,
                visible: true
            });
        }
    }


    function getInfoboxTemplate(item:any) {
        let pinDetail = ''
        if(props.module == 'localCommercial')
        {
            pinDetail =  '<b>Estado:</b>' + item.stateDs
            pinDetail += '<br/><b>Dirección:</b> ' + item.addressDs
        }
        else if(props.module == 'landSale') {
            pinDetail =  '<b>' + item.name +'</b><br/>'
            pinDetail +=  '<b>Estado:</b>' + item.state
            pinDetail += '<br/><b>Dirección:</b> ' + item.address
        }

        return pinDetail
    }

    function addPushpins(locationItems:any){
        
        
        map.entities.clear()
        if( locationItems){
           
            locationItems.map((item:any) => {
                let pushpin = createPushPin(item);

                /* If pushpin not created due to lat long error */
                if(!pushpin)
                {
                    return false
                }

                let pinDetail =  getInfoboxTemplate(item)
                pushpin.metadata = {
                    title: 'Estado',
                    description: pinDetail, 
                };
                if(map && pushpin)
                {
                    window.Microsoft.Maps.Events.addHandler(pushpin, 'click', pushpinClicked);
                    map.entities.push(pushpin)
                }
        
                return 
            })
        }
    }

    //addPushpins() 

    function OnMapClick(){
        window.Microsoft.Maps.Events.addHandler(map, 'click', (e:any) => {

            if(props.getLatLong)
            {
               

                let pushpinTemp = {
                    latitude: e.location.latitude,
                    longitude: e.location.longitude,
                }
                addPushpins([pushpinTemp])

                var reverseGeocodeRequestOptions = {
                    location: e.location,
                    callback: function (answer:any, userData:any) {
                        console.log(userData);
                        map.setView({ bounds: answer.bestView });
                        

                        responseLatLong.latitude = e.location.latitude
                        responseLatLong.longitude = e.location.longitude
                        responseLatLong.address = answer.address.formattedAddress
                        
                        props.getLatLong(responseLatLong)

                    //     $('#<%=hidLatitud.ClientID%>').val(location.latitude);
                    //     $('#<%=hidLongitud.ClientID%>').val(location.longitude);
                    //     $('#<%=tbBusqueda.ClientID%>').val(answer.address.formattedAddress);
                    //     document.getElementById('printoutPanel').innerHTML = 'Dirección: ' + answer.address.formattedAddress +
                    //         '<br> Latitud: ' + location.latitude +
                    //         '<br> Longitud: ' + location.longitude;
                     }
                }
        
                mgrSearch.reverseGeocode(reverseGeocodeRequestOptions);


                // let responseLatLong:any = {
                //     latitude: e.location.latitude,
                //     longitude: e.location.longitude,
                    
                // }
                //props.getLatLong(responseLatLong)
            }
           
            
           
            //setSelectedLocation(e.location)
            //let latLongArray = [e.location]
            
            //addPushpins(latLongArray)

            //alert('fdsfds')
        });
       
    }

    const selectedSuggestion = (result:any) => {
        

        //let pushpin = new window.Microsoft.Maps.Pushpin(result.location);
       addPushpins([result.location]);

       
        responseLatLong.latitude = result.location.latitude
        responseLatLong.longitude = result.location.longitude
        responseLatLong.address = result.formattedSuggestion 

        map.setView({ bounds: result.bestView });
        
        props.getLatLong(responseLatLong)

    }

    const addAutoSuggestModule = () => {
        window.Microsoft.Maps.loadModule('Microsoft.Maps.AutoSuggest', function () {
            var options = {
                maxResults: 5,
                addressSuggestions: true,
                autoDetectLocation: true,
                map: map
            };
            let mgrAutoSuggest:any = new window.Microsoft.Maps.AutosuggestManager(options);
            
            mgrAutoSuggest.attachAutosuggest('#searchBox', '#searchBoxContainer', selectedSuggestion);
        });

        window.Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
            mgrSearch = new window.Microsoft.Maps.Search.SearchManager(map);
            
        });



        

    }

    const getMapCenter =  () => {
        var loc = new window.Microsoft.Maps.Location(defaultLatitude, defaultLongitude); 
        if(props.pushpinData)
        {
            if(props.pushpinData.length == 1)
            {
                 loc = new window.Microsoft.Maps.Location(props.pushpinData[0].latitude, props.pushpinData[0].longitude)
            }
        }
        
        return loc
        
    }

    const addBounds = () => {
        
        if(props.pushpinData && props.pushpinData.length > 1)
        {
           
            var viewBoundaries = window.Microsoft.Maps.LocationRect.fromCorners(new window.Microsoft.Maps.Location(32.532593, -117.127276),
                new window.Microsoft.Maps.Location(15.268594, -86.986562)
            );
            map.setView({
                bounds: viewBoundaries
            });
        }
        
    }
    
    function initializeMap() { 

        if(!window.Microsoft)
            return false;

       
        
        var lomapCenter = getMapCenter()
        let mapVar = window.Microsoft.Maps.Map(document.getElementById(props.id), {
            credentials: MAP_KEY,
            center: lomapCenter,
            zoom: defaultZoom,
            disableBirdseye: true,
            enableClickableLogo: false,
            enableSearchLogo: false,
            showDashboard: true,
            showMapTypeSelector: false,
            showLocateMeButton: false,

            showCopyright: false,
            customizeOverlays: true,
            navigationBarMode: window.Microsoft.Maps.NavigationBarMode.compact,
        });

        
        map = mapVar

        infobox = new  window.Microsoft.Maps.Infobox(mapVar.getCenter(), {
            visible: false  ,
            //htmlContent: 'fsdfds'
        });

        addBounds()

        
        

        infobox.setMap(map);
        
        
        addPushpins(props.pushpinData)

        if(props.getLatLong)
        {
            OnMapClick()
            addAutoSuggestModule()
        }
        
        
    }

    

    // function isMapInitlized(){

    //     console.log('window.Microsoft', window.Microsoft)
    //     if(window.Microsoft)
    //     {
    //         return true
    //     }
        
    //     return false
    // }

    function addscript(){
        
        //if(!isMapInitlized()){
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.async = true;
            script.defer = true;
            script.src = 'https://www.bing.com/api/maps/mapcontrol?callback=bingmapsCallback&key=' + MAP_KEY;
            document.getElementsByTagName("head")[0].appendChild(script);

            window.bingmapsCallback = function () {
               
                initializeMap();
                    
            };

        

    }

    
    useEffect(() => {
       addscript();
    }, [props.pushpinData])
    

    return (
        <div id={props.id}></div>
                                        
    )
}


export default MicrosoftMap