import React, {useState} from "react"
import MicrosoftMap from '../common/MicrosoftMap';
import { PrimaryButton, SecondryButton } from "../common/Buttons";

// const data = {
//   title: 'SC HAROLD PAPE MONCLOVA',
//   subTitle: 'Determinant',
//   determinant: 1007,
//   address: 'BLVD FRANCISCO I MADERO # 227',
//   state: 'COAHUILA',
//   latitude: '',
//   longitude: '',
//   tableData: [
//       {nomenclatura: 'L01', l01: 'L01', total: 2.05, mFrente: '0.00', mFondo: '0.00'},
//       {nomenclatura: 'L01', l01: 'L01', total: 2.05, mFrente: '0.00', mFondo: '0.00'},
//     ],
// }



// 

const PopupContentMapLatLong: React.FC<any> = (props) => {

    const [searchInput, setSearchInput] = useState<any>('')

    const [location, setLocation] = useState<any>({
        address: '',
        latitude: '',
        longitude: '',
    });
    

    const getLatLong = (locationInfo:any) => {
        //setLocation(locationInfo)
        setSearchInput(locationInfo.address)
        setLocation((prevState:any) => {
            return {
                ...prevState,
                address: locationInfo.address,
                latitude: locationInfo.latitude,
                longitude: locationInfo.longitude,
            }
        })
        
        
    }

    const handleCancel = () => {
      //props.setLatLong()
      props.closePopup()
    }
    const handleSubmit = () => {
      props.setLatLong(location)
      props.closePopup()
    }

    return (
        
        <>

            <div className='row m-0'>
                 <div className='col s12'>
                    <div id='searchBoxContainer'>
                        <input type='text' id='searchBox' value={searchInput} onChange={(e:any) => setSearchInput(e.target.value) } />
                    </div>
                </div>
            </div>
            <div className='row '>
                <div className='col s12'>
                    {location.address && (
                        <div>
                            <div>Dirección: {location.address}</div>
                            <div>Latitude: {location.latitude}</div>
                            <div>Longitude: {location.longitude}</div>
                        </div>
                    )}
                    
                </div>
            </div>
            <div className='row '>
                <div className='col s12'>
                  <div className='side-map map-wrapper'>
                    <MicrosoftMap id='model-map' getLatLong={(clickInfo:any) => getLatLong(clickInfo)}/>
                  </div>
                </div>
            </div>
            <div className='row '>
                <div className='col s12 m4 mbl-pb-2'>
                  <PrimaryButton onClick={handleSubmit} className='submit-btn full-width m-0 mbl-w-100'>Aceptar</PrimaryButton>
                </div>
                <div className='col  s12 m4 offset-m4'>
                  <SecondryButton onClick={handleCancel} className='submit-btn full-width  m-0 mbl-w-100'>Cancelar</SecondryButton>
                </div>
            </div>

           


           
        </>
         
                                        
    )
}


export default PopupContentMapLatLong