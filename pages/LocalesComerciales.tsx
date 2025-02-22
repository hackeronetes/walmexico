import React, {  useState, useEffect  } from 'react'
import {MainTitle} from '../components/common/Titles'
import {TextP} from '../components/common/TextP'
import Select from 'react-select'
import MicrosoftMap from '../components/common/MicrosoftMap'
// import { InputSelectSimple } from '../components/common/InputSelectSimple'
import { useNavigate } from "react-router-dom";
import PopupModel from '../components/popups/PopupModel'
import PopupContentLocalComercial from '../components/popups/PopupContentLocalComercial'
import { getDescriptionList } from '../services/adminContent/adminContentService'

// import { getStates } from '../resources/api-constants'
import { StateDropdown2 } from '../components/dataComponents/StateDropdown2'
import { getStoreList, getStoreByStateList, getStoreByStateFormatList, getFormatOptions } from '../services/localCommercial/localCommercialService'
import FolioTracking from '../components/common/FolioTracking'
import DataTable2 from './../components/datatable/DataTable2';
import { setLoader } from '../store/loaderReducer';
import { useAppDispatch } from '../store/hooks'
import { SECTION_ID_IMAGES } from '../resources/project-constants'
import ImageSection from '../components/common/ImageSection'
// import News from '../components/common/News'
// import { SECTION_ID } from '../resources/project-constants'



const countryOptions = [
    { value: 'MEXICO', label: 'MEXICO'},  
]


const gridColumns2= [
    {'label': 'DETERMINANTE', 'key' : 'determinantId', 'type' : 'text' },
    {'label': 'FORMATO', 'key' : 'formatDS', 'type' : 'text' },
    {'label': 'TIENDA', 'key' : 'storeDs', 'type' : 'text' },
    {'label': 'ESTADO', 'key' : 'stateDs', 'type' : 'text' },
    {'label': 'DIRECCIÓN', 'key' : 'addressDs', 'type' : 'text' },
    {'label': 'M²', 'key' : 'm2', 'type' : 'text' },
    { 'label': 'EVENTO', 'key': '', 'type': 'imageCallback', 'image': 'event.png' },
    { 'label': 'VER LOCALES', 'key': '', 'type': 'rowClick' },
]


const formatfirstObject = {
    formatDs: "Seleccione"
}

export const LocalesComerciales: React.FC = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    // const [map, setMap] = useState<any>()
    const [stores, setStores] = useState<any>([])
    const [stateFormats, setStateFormats] = useState<any>([])
    const [format, setFormat] = useState<any>({select: '', label: 'Select'})
    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedStore, setSelectedStore] = useState();
    const [selectedState, setSelectedState] = useState<any>();
    const [description,setDescription] = useState<any>();



    const getPageDescription = () => {
        let paramsTemp = {
            name: '',
            active: '',
            section: 1,
        }
        dispatch(setLoader(true));
        getDescriptionList(paramsTemp).then((res: any) => {
            if (res.data){
               setDescription(res.data[0]);
                dispatch(setLoader(false));
            }
            
        })
            .catch((error: any) => {
                dispatch(setLoader(false));
                console.log('getStateList error', error)
            })
    }

    const getFormatOptionsList = () => {
        getFormatOptions().then((res: any) => {
            if (res.data){
               setStateFormats([formatfirstObject, ...res.data])
               
               
            }
            
        })
            .catch((error: any) => {
                
                console.log('getStateList error', error)
            })
    }
    
    useEffect(() => {

        getPageDescription()
        getFormatOptionsList()


    },[]);
    

   

   
    function getStores(stateId:any, formatDs: string){

        dispatch(setLoader(true));
        if(stateId && !formatDs)
        {
            getStoreByStateList(stateId).then((res:any) => {
                dispatch(setLoader(false));

                if(res.data.storeDescription)
                    setStores(res.data.storeDescription)
                else
                    setStores([])
            })
            .catch((error:any) => {
                //alert('Something went wrong')
                //setSelectStateOptions([])
                setStores([])
                dispatch(setLoader(false));

                console.log('getStateList error', error)
            })
            
        }
        else if(stateId && formatDs) {
            getStoreByStateFormatList(stateId, formatDs).then((res:any) => {
                dispatch(setLoader(false));
                if(res.data.storeDescription)
                    setStores(res.data.storeDescription)
                else
                    setStores([])
            })
            .catch((error:any) => {
                //alert('Something went wrong')
                //setSelectStateOptions([])
                setStores([])
                dispatch(setLoader(false));

                console.log('getStateList error', error)
            })
            
        }
        else {
            getStoreList().then((res:any) => {
                dispatch(setLoader(false));

                if(res.data.storeDescription)
                    setStores(res.data.storeDescription)
                else
                    setStores([])
            })
            .catch((error:any) => {
                //alert('Something went wrong')
                //setSelectStateOptions([])
                setStores([])
                console.log('getStateList error', error)
                dispatch(setLoader(false));

            })
        }

    }

    useEffect(() => {
        getStores('', '')
        
    }, [])
    
    
    


    // function getFormats(){
    //     setStateFormats(selectFormatOptions)
    //     setFormat({select: '', label: 'Select'})
    // }
    
   

    function handleStateChange(stateId: any){

        if(setSelectedState)
            setSelectedState(stateId)

        

        //getFormats()
        setFormat(formatfirstObject)
        getStores(stateId, '')
    }

    function handleFormatChange(selected: any){
        setFormat(selected)
        let formatTemp = selected.formatDs ==   'Seleccione' ? '' : selected.formatDs
        getStores(selectedState, formatTemp)
    }

    function handleClickGridEvent(item: any){
        navigate('/LocalescomercialesEvent', {state: item})
       
    }

    function handleClickGridPremises(item: any){
        
        setSelectedStore(item)
        setIsOpen(true)
        
    }

    function handleModelClose(){
        setIsOpen(false)
    }

    const goToGenerateEvent = (store:any, selectedCsCommercials:any) => {
        let passData = { 
            name: store.storeDs,
            commercialId: '',
            stateId: '',
            determinantId: '',
            storeDs: '',
        }
        if(selectedCsCommercials.length > 0)
        {
            passData.commercialId = selectedCsCommercials[0].commercialId
            passData.determinantId = store.determinantId
            passData.stateId = store.stateId
            passData.storeDs = store.storeDs
           
        }
        selectedCsCommercials.forEach((item:any) => {
            passData.name +=  ',' + item.nomenclature
        });
        navigate('/Commercial', {state: passData})
    }

    const renderpopupContent = () => {
        return (
            <PopupContentLocalComercial store={selectedStore} onClickRequestPremises={goToGenerateEvent}/>
        )
    }
    
    function getPopupContent(){
        if(selectedStore)
            return renderpopupContent()
        else
            return <></>
    }
    

    

    return (
        <div className='page-container page-local-commercial'>
            <ImageSection section={SECTION_ID_IMAGES.SECTION_LOCALCOMMERCIAL} />
            <FolioTracking />
            <div className='container main-container'>
                <div className='page-content'>
                    <div className='desc-container'>
                        <div className="title-wrapper">
                            <MainTitle text={description?.descriptionTitle} />
                        </div>
                        <div className="page-desc-wrapper">
                            <div className='row'>
                                <div className='col s12 m6 text-left  mbl-pb-2'>
                               {description?.descriptionDs?.split('||')[0]}

                                </div>
                                <div className='col s12 m6 text-left  mbl-pb-2'>
                                    <TextP >{description?.descriptionDs?.split('||')[1]}</TextP>
                                    
                                </div>
                            </div>
                           
                        </div>
                        {/* <section>
                            <News section={SECTION_ID.SECTION_LOCALCOMMERCIAL}/>
                        </section> */}
                       
                        <div className='map-select-container'>
                            <div className='row'>
                                <div className='col s12 m3 mbl-pb-2'>
                                    <div className='selects-wrapper mb-20'>
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
                                        <StateDropdown2 onChange={(stateId: string | number) => handleStateChange(stateId)}/>
                                        { selectedState && (
                                            <div>
                                                <label htmlFor='format' className="input-label">
                                                    Formato
                                                </label>
                                                <Select  
                                                    classNamePrefix='input-select-react'
                                                    id='format' className='input-select-react' 
                                                    options={stateFormats} 
                                                    onChange={(e) => handleFormatChange(e)} 
                                                    value={format} 
                                                    getOptionLabel={(option:any) => option.formatDs}
                                                    getOptionValue={(option:any) => option.formatDs}
                                                />
                                            </div>

                                        ) }
                                        
                                       
                                        
                                    </div>
                                </div>
                                <div className='col s12 m9 mbl-pb-2'>
                                    <div className='map-wrapper'>
                                        <MicrosoftMap pushpinData={stores} id="main-map" module="localCommercial"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        
                        <div className='data-grid-container'>
                            <DataTable2
                                rows={stores}
                                callbackClickRow={handleClickGridPremises}
                                //callbackClickRow={handleClickGridPremises}
                                callbackImageCallback={(row: any) => handleClickGridEvent(row)}
                                columns={gridColumns2}
                                callbackRefreshRows={() => void 0}
                                totalRows={0} 
                                
                            />
                        </div>
                        
                    </div>
                    
                </div>
            </div>

            <PopupModel  hideCloseIcon={false} hideScroll={false}  isOpen={modalIsOpen} closePopup={handleModelClose}>
                {getPopupContent()}
            </PopupModel>

        </div>
    )
  }
  