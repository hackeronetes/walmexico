import React, {  useState, useEffect  } from 'react'
import {MainTitle} from '../components/common/Titles'
import {TextP} from '../components/common/TextP'
import Select from 'react-select'
import MicrosoftMap from '../components/common/MicrosoftMap'
// import { InputSelectSimple } from '../components/common/InputSelectSimple'
import DataTable2 from '../components/datatable/DataTable2'
// import { useNavigate } from "react-router-dom";
import PopupModel from '../components/popups/PopupModel'
import PopupContentLandSale from '../components/popups/PopupContentLandSale'
import { StateDropdown2 } from '../components/dataComponents/StateDropdown2'
import { getMeterSquare, getNegotiation, getLandSalesList, LandSaleTableSearchParams } from '../services/landSale/landSaleService'
import { useNavigate } from 'react-router-dom'
import PopupContentErrorMessage from '../components/popups/PopupContentErrorMessage'
import FolioTracking from '../components/common/FolioTracking'
import { setLoader } from '../store/loaderReducer';
import { useAppDispatch } from '../store/hooks'
import { POPUP_TYPE_ERROR, SECTION_ID_IMAGES} from '../resources/project-constants'
import PopupContentCustom from '../components/popups/PopupContentCustom'
import ImageSection from '../components/common/ImageSection'
// import News from '../components/common/News'
//import { InputSelect } from '../components/Inputs/InputSelect'

// const m2Options = [
//     {select: '', label: 'Select'},
//     { value: '1', label: '0 to 1000'},
//     { value: '2', label: '1001 to 2500'},
//     { value: '3', label: '2501 to 5000'},
//     { value: '4', label: '2501 to 10000'},
//     { value: '5', label: '10001 to 20000'},
//     { value: '6', label: '20001 to 100000'},     
// ]

// const negotiationOptions = [
//     {select: '', label: 'Select'},
//     { value: '1', label: 'Sale'},
//     { value: '2', label: 'Income'},
//     { value: '3', label: 'Sale / Rent'},
// ]



const countryOptions = [
    { value: 'MEXICO', label: 'MEXICO'},  
]

const config:any = {
    meterSquareValue: 'meterId',
    meterSquareLabel: 'lastValue',
    negotiationValue: 'transactionId',
    negotiationLabel: 'transactionName',
    gridColumns : [
        {'label': '', 'key' : '', 'type' : 'checkbox' },
        {'label': 'CLAVE', 'key' : 'key', 'type' : 'text' },
        {'label': 'NOMBRE', 'key' : 'name', 'type' : 'text'},
        {'label': 'ESTADO', 'key' : 'state', 'type' : 'text'},
        {'label': 'DIRECCIÓN', 'key' : 'address', 'type' : 'text'},
        {'label': 'M²', 'key' : 'sqmtr', 'type' : 'text'},
        {'label': 'NEGOCIACIÓN', 'key' : 'transaction', 'type' : 'text'},
        {'label': '', 'key' : '', 'type' : 'rowClick'},
    ]
}



// const allStores = [
//     {Latitude: 39.824647, Longitude: -99.524267, Name: 'abc', State: 'fdsf', Address: '132 ABC street'},
//     {Latitude: 47.61005, Longitude: -100.652252, Name: 'ddd', State: 'fsdfasfsd', Address: '132 ABC street'},
//     {Latitude: 46.9926, Longitude: -105.013988 , Name: 'abc', State: 'fdsf', Address: '132 ABC street'},
// ]


export const ExcessP: React.FC = () => {

    // const [map, setMap] = useState<any>()
    
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [selectedStore, setSelectedStore] = useState();
    const [selectedTableRows, setSelectedTableRows] = useState<any>([]);

    const [tableRows, setTableRows] = useState<any>([])
    const [tableTotalRows, setTableTotalRows] = useState(0)

    //const [format, setFormat] = useState({select: '', label: 'Select'})
    const [meterSquareOptions, setMeterSquareOptions] = useState<any>([])
    const [negotiationOptions, setNegotiationOptions] = useState<any>([])
    
    const [searchParams, setSearchParams] = useState<LandSaleTableSearchParams>({
        stateId: '',
        transactionId: '',
        sqmtrId: '',
    } )

    

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalErrorIsOpen, setModalErrorIsOpen] = React.useState(false);

    const [modalDownloadError, setModalDownloadError] = useState(false);
    const [popupType, setPopupType] = useState<any>('')
    const popupMessage = 'Por favor inicie sesión para ver el archivo'

   
   
    
    function getMeterSquareOptions(){

        getMeterSquare().then((res:any) => {
             if(res.data)
                setMeterSquareOptions(res.data)
            else
                setMeterSquareOptions([])
        })
        .catch((error:any) => {
            //alert('Something went wrong')
            //setSelectStateOptions([])
            setMeterSquareOptions([])
            console.log('getStateList error', error)
        })


    }   

    function getNegotiationOptions(){

        getNegotiation().then((res:any) => {
             if(res.data)
            {
                setNegotiationOptions(res.data)
            }
            else
                setNegotiationOptions([])
        })
        .catch((error:any) => {
            //alert('Something went wrong')
            //setSelectStateOptions([])
                setNegotiationOptions([])
            console.log('getStateList error', error)
        })


    }   

    const getTableRows = () => { 

        dispatch(setLoader(true));
        
        getLandSalesList(searchParams).then((res:any) => {
            dispatch(setLoader(false));

             if(res.data)
                setTableRows(res.data)
            else
                setTableRows([])
        })
        .catch((error:any) => {
            //alert('Something went wrong')
            //setSelectStateOptions([])
                setTableRows([])
            dispatch(setLoader(false));

            console.log('getStateList error', error)
        })


    } 
      
   

    useEffect(() => {
        getMeterSquareOptions()
        getNegotiationOptions()
        // getTableRows()
        //getTableTotalRows()
        setTableTotalRows(15) // JsTodo: Static for now. Remove after pagination is added 
    }, [])



    useEffect(() => {
        getTableRows()
        //getTableTotalRows()
        
    }, [searchParams])
    


    function handleStateChange(stateId: number | String){
        setSearchParams((prevState:any) => {
            return {
                ...prevState,
                stateId: stateId
            }
        })
        
        
        //getFormats()
       // getStores()
    }

    function handleMetetSquareChange(selected: any){
        setSearchParams((prevState:any) => {
            return {
                ...prevState,
                sqmtrId: selected[config.meterSquareValue]
            }
        })
        
    }
    function handleFormatChange(selected: any){
       // setFormat(selected)
       setSearchParams((prevState:any) => {
            return {
                ...prevState,
                transactionId: selected[config.negotiationValue]
                
            }
        })
      
       // getStores()
    }

    function handleClickRow(item: any){
        setSelectedStore(item)
        setIsOpen(true)
        // navigate('/LocalescomercialesEvent')
       
    }

    

    function handleCheckboxRow(item: any){
        setSelectedTableRows(item)
    }

    function handleModelClose(modelType: String){
        if(modelType == 'detail')
            setIsOpen(false)
        if(modelType == 'error')
            setModalErrorIsOpen(false)
    }


    const goToGenerateEvent = (store:any) => {
        let passData = { 
            address: store.address,
            selectedItems: [store.requestId]
        }
       
        navigate('/ExcessPRegisteration', {state: passData})
    }

    const handleDownloadError = () => {
        setPopupType(POPUP_TYPE_ERROR)
        setModalDownloadError(true)
    }

    const renderpopupContent = () => {
        return (
            <PopupContentLandSale store={selectedStore} onClickRequestPremises={goToGenerateEvent} showDownloadError={handleDownloadError} />
        )
    }

    function getPopupContent(){
        if(selectedStore)
            return renderpopupContent()
        else
            return <></>
    }

    const renderpopupErrorContent = () => {
        return (
            <PopupContentErrorMessage message={"Debe seleccionar al menos un registro para realizar la solicitud"} closePopup={() => handleModelClose('error')} />
        )
    }

    function getPopupContentErrorMessage(){
        return renderpopupErrorContent()
    }

    function handleClickButtonSubmit(){
        if(selectedTableRows.length == 0)
        {
            setModalErrorIsOpen(true)
            return false;   
        }

        let passData:any = { 
            address: '',
            selectedItems: []
        }
        
        let firstRow = true
        selectedTableRows.forEach((item:any) => {
            
            if(!firstRow)
                passData.address +=   ',' 

            passData.address +=  item.address

            firstRow = false;
            
            passData.selectedItems.push(item.requestId)


        })
       
        navigate('/ExcessPRegisteration', {state: passData})

        //goToGenerateEvent(selectedTableRows[0])

    }


    return (
        <div className='page-container'>
            <ImageSection section={SECTION_ID_IMAGES.SECTION_LANDSALE} />
            <FolioTracking />
        
            <div className='container main-container'>
                <div className='page-content'>
                    <div className='desc-container'>
                        <div className="title-wrapper">
                            <MainTitle text={"Venta de Terrenos"} />
                        </div>
                        <div className="page-desc-wrapper">
                            <div className='row'>
                                <div className='col s12 text-left'>
                                    <TextP>Excess Property es el equipo que está en búsqueda de vender y rentar Terrenos, mismos que se pueden encontrar cerca de alguna de nuestras tiendas. Si está interesado en alguno de nuestros terrenos, abajo podrá consultar nuestra cartera.</TextP>
                                </div>
                               
                            </div>
                           
                        </div>

                        <div className="title-wrapper">
                            <MainTitle text={"Búsqueda de propiedades con excedente"} />
                        </div>
                        <div className="page-desc-wrapper">
                            <div className='row'>
                                <div className='col s12  text-left'>
                                    <TextP>Consulte por medio de los siguientes filtros nuestra cartera de inmuebles que tenemos disponibles para venderle o rentarle.</TextP>
                                </div>
                               
                            </div>
                           
                        </div>
                        {/* <section>
                            <News section={SECTION_ID.SECTION_LANDSALE}/>
                        </section> */}

                        <div className='map-select-container'>
                            <div className='row'>
                                <div className='col s12 m3'>
                                    <div className='selects-wrapper'>
                                        <div className="mb-20">
                                            <label htmlFor='format' className="input-label">
                                                País
                                            </label>
                                            <Select 
                                                classNamePrefix='input-select-react' 
                                                id='format' 
                                                className='input-select-react' 
                                                options={countryOptions} 
                                            />
                                        </div>
                                        <div className="input-select-react-wrapper">
                                           <StateDropdown2 onChange={(stateId: string | number) => handleStateChange(stateId)}/>
                                        </div>
                                        <div className="input-select-react-wrapper">
                                            <label htmlFor='format' className="input-label">
                                                M<sup>2</sup>
                                            </label>
                                            <Select  
                                                classNamePrefix='input-select-react'
                                                id='meter-square' 
                                                className='input-select-react' 
                                                options={meterSquareOptions} 
                                                onChange={(e) => handleMetetSquareChange(e)} 
                                                getOptionLabel={(option:any) => option[config.meterSquareLabel]}
                                                getOptionValue={(option:any) => option[config.meterSquareValue]}
                                                isSearchable={false}
                                               
                                            />
                                        </div>
                                        {/* <InputSelect 
                                            onChange={(e:any) => handleMetetSquareChange(e)} 
                                            options={meterSquareOptions} 
                                            label={"M²"}
                                            optionLabel={config.meterSquareLabel}
                                            optionValue={config.meterSquareValue}
                                        /> */}
                                        <div className="input-select-react-wrapper">
                                            <label htmlFor='format' className="input-label">
                                                Negociación
                                            </label>
                                            <Select  
                                                classNamePrefix='input-select-react' 
                                                id='format' 
                                                className='input-select-react' 
                                                options={negotiationOptions} 
                                                onChange={(e) => handleFormatChange(e)} 
                                                getOptionLabel={(option:any) => option[config.negotiationLabel]}
                                                getOptionValue={(option:any) => option[config.negotiationValue]}
                                                isSearchable={false}
                                                
                                            />
                                        </div>
                                        {/* <Select options={stateFormats} onChange={(e) => handleFormatChange(e)} value={format}  /> */}
                                        <div>
                                        
                                            {/* <InputSelectSimple field={fields.state} selectOptions={selectFormatOptions} onchange={handleStateChange} />
                                            <InputSelectSimple field={fields.format} selectOptions={selectStateOptions} onchange={handleFormatChange} /> */}
                                            
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className='col s12 m9'>
                                    <div className='map-wrapper'>
                                        <MicrosoftMap pushpinData={tableRows} id='main-map' module="landSale" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='data-grid-container'>
                            <DataTable2 
                                columns={config.gridColumns} 
                                rows={tableRows} 
                                totalRows={tableTotalRows} 
                                getSelectedRows={handleCheckboxRow}
                                callbackClickRow={handleClickRow}
                                sort={true}
                                
                            />
                        </div>

                        <div className='row'>
                            <div className='col offset-m4 s12 m4'>
                            <button type="button" className="submit-btn full-width" value="Siguiente" onClick={() => handleClickButtonSubmit()}>
                                Generar Solicitud
                            </button>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
            </div>

            <PopupModel className="land-sale-popup" hideCloseIcon={false} hideScroll={false}   isOpen={modalIsOpen} closePopup={() => handleModelClose('detail')}  width='45%' height='95%'>
                {getPopupContent()}
            </PopupModel>

            <PopupModel  isOpen={modalErrorIsOpen} closePopup={() => handleModelClose('error')} width='40%' height='250px'>
                {getPopupContentErrorMessage()}
            </PopupModel>

            <PopupModel  isOpen={modalDownloadError} closePopup={() => setModalDownloadError(false)}  width='40%' height='261px'>
                <PopupContentCustom closePopup={() => setModalDownloadError(false)} type={popupType} message={popupMessage} />
            </PopupModel>


        </div>
    )
  }
  