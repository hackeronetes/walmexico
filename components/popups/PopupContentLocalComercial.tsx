import React, {useState} from "react"
import MicrosoftMap from '../common/MicrosoftMap';
import { MainTitle } from "../common/Titles"
import { getLCPropertyImage } from "../../resources/api-constants";
import DataTable2 from './../datatable/DataTable2';
import CustomAxios from "../../utility/customAxios";
import ImageBase64 from "../common/ImageBase64";

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

const gridColumns = [
  {'label': '', 'key' : '', 'type' : 'checkbox' },
  {'label': 'NOMENCLATURA', 'key' : 'nomenclature', 'type' : 'text' },
  {'label': 'TIPO', 'key' : 'commercialTypeDs', 'type' : 'text'},
  {'label': 'TOTAL M²', 'key' : 'squareMeter', 'type' : 'text'},
  {'label': 'M FRENTE', 'key' : 'squareMeterFront', 'type' : 'text'},
  {'label': 'M FONDO', 'key' : 'squareMeterBackground', 'type' : 'text'},
  {'label': '', 'key' : '', 'type' : 'rowClick'},
]


interface Store {
  determinantId: string | number
  stateId: string | number
  addressDs: string 
  storeDs: string 
  formatDs: string 
  nomenclatureDs: string
  latitude: string
  longitude: string

}

interface Props {
  store: Store | any
  onClickRequestPremises:  any
  
}

// const gridColumns= [
//   {'label': 'DETERMINANTE', 'key' : 'determinantId'},
//   {'label': 'FORMATO', 'key' : 'formatDs'},
//   {'label': 'TIENDA', 'key' : 'storeDs'},
//   {'label': 'ESTADO', 'key' : 'stateDs'},
//   {'label': 'DIRECCIÓN', 'key' : 'addressDs'},
//   {'label': 'M²', 'key' : 'nomenclatureDs'},
// ]


// 

const PopupContentLocalComercial: React.FC<Props> = (props) => {

  const [error, setError] = useState('')
  const [showImage, setShowImage] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [selectedRows, setSelectedRows] = useState([])

  // let selectedRows:any = [];

  
  let data:any = props.store
  
  let pushpinData = []
  let latLong = {
    latitude: '',
    longitude: '',
    stateDs: '',
    addressDs: '',
  }

  if(props.store.latitude && props.store.longitude)
  {
    latLong.latitude = props.store.latitude;
    latLong.longitude = props.store.longitude;
    latLong.stateDs = props.store.stateDs
    latLong.addressDs = props.store.addressDs
  }

  pushpinData.push(latLong)
  
    
  const handleTableCallback = (items:any ) => {
    if(items.length > 0)
      setSelectedRows(items)
    
  }

  const handleClickRequestPremises = () => {
   
    if(selectedRows.length > 0 )
    {
      setError('')
      props.onClickRequestPremises(props.store, selectedRows )
    }
    else{
      
      setError('Para generar una solicitud debe seleccionar por lo menos un local')
    }
    
  }

 

  const handleRowClick = (row:any) => {
    CustomAxios.get(getLCPropertyImage(), {params: {id:row.commercialId}}).then((response) => {
        setShowImage(true)
        if(response.data)
        setImageUrl(response.data)
        
          
        //resolve(response)
        //setPost(response.data);
    })
    .catch((err) => {
        console.log('errorApiTest', err)
        //reject(error)
    });
  }

    return (
        
        <>
              <div className='row m-0'>
                <div className='col s12'>
                  <MainTitle text={props.store.storeDs} className="popup-title" />
                </div>
              </div>
              <div className='row mb-20'>
                <div className='col s12'>
                  <div className="popup-title-2">{props.store.formatDS} </div>
                </div>
              </div>
              <div className='row '>
                <div className='col s12 m6'>
                  
                  <div className={  showImage ? 'side-map map-wrapper  hide' : 'side-map map-wrapper '}>
                    <MicrosoftMap id='model-map' pushpinData={pushpinData} module="localCommercial"/>
                  </div>
                  <div className={ + showImage ? 'lc-popup-side-img text-center' : 'lc-popup-side-img  hide'}>
                    <ImageBase64 url={imageUrl}/>
                  </div>
                </div>
                <div className='col s12 m6'>
                  <div className='block-title'>
                  Determinante
                  </div>
                  <div className='block-desc'>
                  {props.store.determinantId}
                  </div>
                  <div className='block-title'>
                  Dirección
                  </div>
                  <div className='block-desc'>
                  {props.store.addressDs}
                  </div>
                  <div className='block-title'>
                  Estado
                  </div>
                  <div className='block-desc'>
                  {props.store.stateDs}
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col s12'>
                    <div className='tbl-container'>
                      {/* <DataTable 
                        data={data.csCommercial} 
                        pageType="localComercial" 
                        callbackOne={handleTableCallback}
                        callbackTwo={handleTableCallback}
                        columns={gridColumns}
                      />
                       */}

                        <DataTable2 
                                columns={gridColumns} 
                                rows={data.csCommercial} 
                                totalRows={999} 
                                getSelectedRows={handleTableCallback}
                                callbackClickRow={handleRowClick}
                                sort={false}
                                pagination={false}
                            />
                      
                    </div>
                </div>
              </div>
              <div className='row'>
                <div className='col s12'>
                  <div className="input-error">{error}</div>
                </div>
              </div>
              <div className='row'>
                <div className='col s12 offset-m4 m4'>
                  <button type="button" className="submit-btn full-width" value="Siguiente" onClick={() => handleClickRequestPremises()}>
                      Generar Solicitud
                  </button>
                </div>
              </div>





           
        </>
         
                                        
    )
}


export default PopupContentLocalComercial