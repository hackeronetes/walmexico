import React, {} from "react"
import MicrosoftMap from '../common/MicrosoftMap';
import { MainTitle } from "../common/Titles"
import Image from "../common/Image"
import {  getLoginType } from '../../store/authReducer'
import { useAppSelector } from '../../store/hooks'
import DataTable2 from './../datatable/DataTable2';
import { USER_INTERNAL } from "../../resources/project-constants";

// const data = {
//   title: 'Whale Tail',
//   subTitle: "Walmart, Sam's Club",
//   address: 'Av. agustin Olchea S/N Carretera Transpeninsular Col. El Zacatal Baja California Sur',
//   state: 'BAJA CALIFORNIA SUR',
//   feedback: 'Abc test',
//   image: '',
//   latitude: '',
//   longitude: '',
//   tableData: [
//       {key: 'VTB05', combo: "Walmart, Sam's Club", m2: "16258", negotiation: "Sale", condition: "Land in Breña"},
      
//     ],
// }


interface Props {
  store: any
  onClickRequestPremises:  any
  showDownloadError:any
}


const gridColumns = [
  {'label': 'CLAVE', 'key' : 'key', 'type' : 'text'},
  {'label': 'COMBO', 'key' : 'comboName', 'type' : 'text'},
  {'label': 'M²', 'key' : 'sqmtr', 'type' : 'text'},
  {'label': 'NEGOCIACIÓN', 'key' : 'transaction', 'type' : 'text'},
  {'label': 'CONDICIÓN', 'key' : 'conditionText', 'type' : 'text'},
 
]

// 

const PopupContentLandSale: React.FC<Props> = (props) => {
  const loginType = useAppSelector(getLoginType);

  let pushpinData = []
  let latLong = {
    latitude: '',
    longitude: '',
    state: '',
    address: '',
    name: '',
  }

  let data:any = props.store
  

  if(props.store.latitude && props.store.longitude)
  {
    latLong.latitude = props.store.latitude;
    latLong.longitude = props.store.longitude;
    latLong.state = props.store.state;
    latLong.address = props.store.address;
    latLong.name = props.store.name;
  }
  pushpinData.push(latLong)

  const handleClickRequestPremises = () => {
    props.onClickRequestPremises(props.store )
  }


  const handleTableCallback = () => {

  }

  function download(dataurl:any, filename:any) {
    const link = document.createElement("a");
    link.href = dataurl;
    link.target = "_blank"
    link.download = filename;
    link.click();
  }
  
  

  const handlePdfBtnClick = () => {
    if(loginType == USER_INTERNAL && props.store.dataSheet)
      download(props.store.dataSheet, "landsale.pdf");
    else
      props.showDownloadError()
  }



    return (
        
        <>
              <div className='row m-0'>
                <div className='col s12'>
                  <MainTitle text={data.name} className="popup-title" />
                </div>
              </div>
              <div className='row mb-20'>
                <div className='col s12'>
                  <div className="popup-title-2">{data.comboName} </div>
                </div>
              </div>
              <div className='row '>
                <div className='col s12 m6'>
                  
                  <img src= {data.imageOne} width="250" height="300"/>
                  
                </div>
                <div className='col s12 m6'>
                 
                  <div className='block-title'>
                    Dirección
                  </div>
                  <div className='block-desc'>
                  {data.address}
                  </div>
                  <div className='block-title'>
                    Estado
                  </div>
                  <div className='block-desc'>
                  {data.state}
                  </div>
                  <div className='block-title'>
                    Comentarios
                  </div>
                  <div className='block-desc'>
                  {data.comment}
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col s12'>
                    <div className='tbl-container'>
                    {/* <DataTable 
                        data={[data]} 
                        pageType="landSale" 
                        callbackOne={handleTableCallback}
                        callbackTwo={handleTableCallback}
                        columns={[]}
                      /> */}
                    <div className='data-grid-container'>
                            <DataTable2 
                                columns={gridColumns} 
                                rows={[data]} 
                                totalRows={999} 
                                getSelectedRows={handleTableCallback}
                                callbackClickRow={handleTableCallback}
                                sort={true}
                                pagination={false}
                            />
                        </div>
                      
                      
                    </div>
                </div>
              </div>
              
              <div className='row'>
                <div className='col s12'>
                  <div className='side-map map-wrapper'>
                    <MicrosoftMap id='model-map'  pushpinData={pushpinData} module="landSale" />
                  </div>
                </div>
              </div>

              <div className='row'>
                <div className='col offset-s4 s4'>
                  <button type="button" className="submit-btn full-width" value="Siguiente" onClick={() => handleClickRequestPremises()}>
                      Generar Solicitud
                  </button>
                </div>
                <div className='col  s4 text-center pdf-down-btn'>
                  <span onClick={handlePdfBtnClick}><Image name="pdf_download_ls.png" /></span>
                </div>
              </div>





           
        </>
         
                                        
    )
}


export default PopupContentLandSale