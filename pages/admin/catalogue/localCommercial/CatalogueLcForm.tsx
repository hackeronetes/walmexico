import React, { useState, useEffect } from 'react'


import { MainTitle } from '../../../../components/common/Titles'
// import { postContactsEditApi } from '../../services/adminGeneral/adminGeneralService'
import { useLocation } from 'react-router-dom'
import { SecondryButton } from '../../../../components/common/Buttons'
import { getGuyOptions, postCatalogLcApi, getDeterminantData, postCatalogLcImage } from '../../../../services/adminGeneral/adminGeneralService'
import { useNavigate } from 'react-router-dom'
import RoutesConstants from '../../../../resources/route-constants'
import { Input } from '../../../../components/common/Input';
import { InputNumber } from '../../../../components/common/InputNumber';
import { useForm } from 'react-hook-form';
import { InputSelect } from '../../../../components/common/InputSelect';
// import axios from 'axios';
import { getUploadedFiles } from '../../../../store/fileUploadReducer';
import { useAppSelector } from '../../../../store/hooks';
import { TextP } from '../../../../components/common/TextP';
import { InputFile } from '../../../../components/common/InputFile';
// import { uploadFilesCatalog } from '../../../../resources/api-constants'
import Image from '../../../../components/common/Image'
import { POPUP_TYPE_ERROR, POPUP_TYPE_SUCCESS} from '../../../../resources/project-constants'
import PopupModel from '../../../../components/popups/PopupModel'
import PopupContentCustom from '../../../../components/popups/PopupContentCustom'
import { useAppDispatch } from '../../../../store/hooks'
import { setLoader } from '../../../../store/loaderReducer'
import PopupContentDeterminantError from '../../../../components/popups/PopupContentDeterminantError'
import { formatNumberToCurrency } from '../../../../utility/commonFunctions'


type FormValues = {
    determinant: string;
    format: string;
    tienda: string;
    state: string;
    direction: string;
    nomen: string;
    tipo: string;
    m2: string;
    mfront: string;
    mbackground: string;
    photos: string;


};


let FormFields: any = {
    determinant: {
        id: 'determinant',
        placeholder: 'Ingrese',
        label: 'Determinante',
        validation: {
            required: {
                value: true,
                message: 'Debe ingresar Determinante',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    format: {
        id: 'format',
        placeholder: 'Ingrese',
        label: 'Formato',
        validation: {
            required: {
                value: false,
                message: 'Debe seleccionar una página.',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    state: {
        id: 'state',
        placeholder: 'Ingrese ',
        label: 'Estado',
        validation: {
            required: {
                value: false,
                message: 'Debe ingresar el título de la descripción.',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    direction: {
        id: 'direction',
        placeholder: 'Ingrese',
        label: 'Dirección',
        validation: {
            required: {
                value: false,
                message: 'Debe ingresar Fecha de inicio de publicación.',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    nomen: {
        id: 'nomen',
        placeholder: 'Ingrese',
        label: 'Nomenclatura',
        validation: {
            required: {
                value: false,
                message: 'Debe ingresar el contenido de la descripción.',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },


    tipo: {
        id: 'tipo',
        placeholder: 'Ingrese',
        label: 'Tipo',
        validation: {
            required: {
                value: true,
                message: 'Debe seleccionar una opción',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    m2: {
        id: 'm2',
        placeholder: 'Ingrese',
        label: 'm2',
        validation: {
            required: {
                value: false,
                message: 'Debe seleccionar una opción',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    mfront: {
        id: 'mfront',
        placeholder: 'Ingrese',
        label: 'm Frente',
        validation: {
            required: {
                value: false,
                message: 'Debe seleccionar una opción',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    mbackground: {
        id: 'mbackground',
        placeholder: 'Ingrese',
        label: 'm Fondo',
        validation: {
            required: {
                value: true,
                message: 'Debe seleccionar una opción',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    photos: {
        id: 'photos',
        placeholder: 'Ingrese',
        label: 'Fotos',
        validationCustom: {
            validate: '',
            required: {
                value: true,
                message: 'Debe seleccionar el(los) documento(s) adicional(es)',
            },

        },
    },


}

let fileExtensions = ['jpg', 'png', 'jpeg', 'bmp']

export const CatalogueLcForm: React.FC = () => {

    const { register, handleSubmit, formState: { errors }, setValue, reset, watch, getValues, setError, clearErrors } = useForm<FormValues>()
    
    const dispatch = useAppDispatch();
    const location = useLocation()
    const navigate = useNavigate();

    const uploadedFiles = useAppSelector(getUploadedFiles);

    const [description, setDescription] = useState<any>();
    const [editing, setEditing] = useState(false);
    const [determinant, setDeterminant] = useState<any>('');
    const [format, setFormat] = useState<any>('');
    const [tienda, setTienda] = useState<any>('');
    const [state, setState] = useState<any>('');
    const [direction, setDirection] = useState<any>('');
    const [determinantObject, setDeterminantObject] = useState<any>();
    const [modelDeterminant, setModelDeterminant] = useState(false);
    const [modelDeterminantType, setModelDeterminantType] = useState('');
    const [modelOpen, setModelOpen] = useState(false);
    const [popupType, setPopupType] = useState<any>('');
    

    


    const [guyOptions, setGuyOptions] = useState<any>([])


    function getDropdownGuy() {

        getGuyOptions().then((res: any) => {
            if (res.data)
                setGuyOptions(res.data)
            else
                setGuyOptions(res.data)
        })
            .catch((error: any) => {
                //alert('Something went wrong')
                //setSelectStateOptions([])
                //setSectionOptions([])
                console.log('getStateList error', error)
            })
    }

    function openModel(type:any){
        setPopupType(type)
        setModelOpen(true)
       
    }

    function handleModelClose(){
        setModelOpen(false)
        navigate(RoutesConstants.CatalogueLC)
    }
    const setImageObject = (obj: any) => {

        setDescription(obj)
        if(obj.type == 'detailForm' )
        {
            reset({  
                nomen: obj.row.nomenclature,
                tipo: obj.row.tipo,
                m2: obj.row.sqmtr,
                mfront: formatNumberToCurrency(obj.row.sqftFront, true),
                mbackground: formatNumberToCurrency(obj.row.sqftBackground,true)
,            });
        }
        

        setFormat(obj.item.format)
        setTienda(obj.item.store)
        setState(obj.item.state)
        setDirection(obj.item.address)
        setDeterminant(obj.item.department)


       
        //setStartDate(obj.publicationStartDate)
        //setEndDate(obj.publicationEndDate)


    }
    const uploadFiles = async (filesParam: any,catalogid:any) => {
        if (filesParam && filesParam.length) {
            const formData = new FormData();
            for (let i = 0; i < filesParam.length; i++) {
                formData.append('files', filesParam[i]);
                formData.append('id',catalogid);
            }
            try {
                // await axios.post(uploadFilesCatalog(), formData);
                postCatalogLcImage(formData).then(() => {
                   // uploadFiles(uploadedFiles,res.data[0]?.id);
                    // openModel(POPUP_TYPE_SUCCESS)
                    
                })
                    .catch((error: any) => {
                        //openModel(POPUP_TYPE_ERROR)
                        console.log('getStateList error', error)
                })
        
            } catch (error) {
                console.log('error while uploading files from local commercial2 is: ', error);
            }
        }
    }

    const editCallApi = (determinant1:any,data:any,dataTemp:any) => {
       
        let dataTemp1: any = {
            id: description.id ,
            format: dataTemp?.businessFormatId,
            store: dataTemp?.storeNumber,
            state: dataTemp?.stateId.replace(/\D/g,''),
            nomenclature:data.nomen,
            stateName:dataTemp?.stateName,
            Guy: data.tipo,
            m2: data.m2,
            longitude: dataTemp?.longitude,
            latitude: dataTemp?.latitude,
            determinant:determinant1,
            address: dataTemp?.address,
            mFront: data.mfront,
            mBackground:data.mbackground,
            commercialId:location?.state?.row?.commercialId ? location?.state?.row?.commercialId : 0


            
            
        }
        postCatalogLcApi(dataTemp1).then((res: any) => {
            uploadFiles(uploadedFiles,res.data[0]?.id);
            openModel(POPUP_TYPE_SUCCESS)
            
        })
            .catch((error: any) => {
                //alert('Something went wrong')
                //setSelectStateOptions([])
                openModel(POPUP_TYPE_ERROR)

                console.log('getStateList error', error)
        })

    }

    const checkIsEditing = () => {
        
        if (location.hasOwnProperty('state')) {
            if (location.state) {
                setEditing(true)
                setImageObject(location.state)
            }



        }


    }

    useEffect(() => {
        checkIsEditing()

    }, [])




    useEffect(() => {
        getDropdownGuy()


    }, [])

    useEffect(() => {
        
        if(description)
        {
            reset({  
                tipo: description.row.tipoId,
                
            });
        }

    }, [guyOptions, description])


    const validateFile = () => {

        let status = true

        const documents = [FormFields.photos.id]

        documents.forEach(function (file: any) {
            let files: any = getValues(file)
           
            if (FormFields[file].validationCustom.required.value && files.length == 0) {
                setError(file, {
                    type: "manual",
                    message: "Debe seleccionar el(los) documento(s) adicional(es)",
                })
                status = false
            }

        })


        return status

    }
    const resetDeterminant = () => {
        setFormat('')
        setTienda('')
        setState('')
        setDirection('')
    }


    const getDeterminant = (data?:any) => {

        if(!determinant)
        {
            setModelDeterminantType('DETERMINANT_EMPTY')
            setModelDeterminant(true)
            return true;
        }
           

        dispatch(setLoader(true));
        getDeterminantData(determinant).then((res: any) => {
            dispatch(setLoader(false));
            if (res.data) {
                if (res.data.length > 0) {
                    let dataTemp = res.data[0]

                    const isEmpty = Object.values(dataTemp).every(x => x === null || x === '')
                    if(isEmpty)
                    {
                        resetDeterminant()
                        setModelDeterminantType('DETERMINANT_WRONG')
                        setModelDeterminant(true)
                        return false;
                    }
                    if (editing){
                        editCallApi(determinant,data,dataTemp);
                    }
                    setFormat(dataTemp.businessFormat)
                    setTienda(dataTemp.name)
                    setState(dataTemp.stateName)
                    setDirection(dataTemp.address)
                    setDeterminantObject(dataTemp)
                }
                else {
                    resetDeterminant()
                    setModelDeterminant(true)
                    setModelDeterminantType('DETERMINANT_WRONG')
                }

            }
            else {
                resetDeterminant()
                setModelDeterminantType('DETERMINANT_WRONG')
                setModelDeterminant(true)
            }
        })
            .catch((error: any) => {
                //alert('Something went wrong')
                //setSelectStateOptions([])
                //setSectionOptions([])
                resetDeterminant()
                dispatch(setLoader(false)); 
                setModelDeterminantType('DETERMINANT_WRONG')
                setModelDeterminant(true)
                console.log('getStateList error', error)
            })
    }




    


    const postForm = async(data: any) => {
        
        
        if (editing) {
           getDeterminant(data);
            
           // we have call getDeterminant first
           // from form we will not get new values.
           //rest will continue from there 

                
        }
        else {    

        let dataTemp: any = {
            format: determinantObject?.businessFormatId,
            store: determinantObject?.storeNumber,
            state: determinantObject?.stateId.replace(/\D/g,''),
            nomenclature:data.nomen,
            stateName:determinantObject?.stateName,
            Guy: data.tipo,
            m2: data.m2,
            longitude: determinantObject?.longitude,
            latitude: determinantObject?.latitude,
            determinant:determinant,
            address: determinantObject?.address,
            mFront: data.mfront,
            mBackground:data.mbackground,
            commercialId:0
            
            
        }

       

        postCatalogLcApi(dataTemp).then((res: any) => {
            uploadFiles(uploadedFiles,res.data[0]?.id);
            openModel(POPUP_TYPE_SUCCESS)
            
        })
            .catch((error: any) => {
                openModel(POPUP_TYPE_ERROR)
                console.log('getStateList error', error)
        })



    }


    }

    

    const onSubmit = handleSubmit(async(data: any) => {
        

        if (!validateFile())
            return false
         await postForm(data);
        
       


        


    })



    



    const handleCancelClick = () => {
        navigate(RoutesConstants.CatalogueLC)
    }

    
    

    return (
        <div className='page-container page-suppliers'>


            <div className='container main-container  mb-20'>
                <div className='page-content'>
                    <section>
                        <div className="title-wrapper  mb-20">
                            <MainTitle text='Alta Tienda / Local' />
                        </div>
                        <div className="title-wrapper  mb-20">
                            <TextP>Este formulario es para dar de alta o modificar un local comercial. Al ingresar información en el campo Determinante se cargarán de manera automática los campos Formato y Tienda. En caso de que los mismos sean erróneos, por favor contacta con el administrador general.</TextP>
                            <TextP>Te recordamos que todos los campos, exceptuando m2 frente y m2 fondo son obligatorios.</TextP>
                        </div>

                    </section>

                    <div className='form-container'>
                        <form onSubmit={onSubmit}>

                            <div className='row'>
                                <div className='col s12 m4'>
                                <div className="input-container">
                                    <div className="">
                                        <label className="input-label">
                                            Determinante
                                        </label>
                                    </div>
                                    <div>
                                        <input type="text" className="input-text catlg-deter-input" value={determinant} onChange={(e: any) => setDeterminant(e.target.value)} />
                                        <span onClick={() => getDeterminant()}><Image name="dots.png" /></span>
                                    </div>
                                </div>
                                </div>
                                <div className='col s12 m4'>
                                <div className="input-container">
                                    <div className="">
                                        <label className="input-label">
                                            Formato
                                        </label>
                                    </div>
                                    <div>
                                        <input type="text" disabled={true} className="input-text" value={format} onChange={(e: any) => setFormat(e.target.value)} />
                                    </div>
                                </div>
                                </div>
                                <div className='col s12 m4'>
                                <div className="input-container">
                                    <div className="">
                                        <label className="input-label">
                                            Tienda
                                        </label>
                                    </div>
                                    <div>
                                        <input type="text" disabled={true} className="input-text" value={tienda} onChange={(e: any) => setTienda(e.target.value)} />
                                    </div>
                                </div>
                                </div>

                            </div>

                            <div className='row'>
                                <div className='col s12 m4'>
                                <div className="input-container">
                                    <div className="">
                                        <label className="input-label">
                                            Estado
                                        </label>
                                    </div>
                                    <div>
                                        <input type="text" disabled={true} className="input-text" value={state} onChange={(e: any) => setState(e.target.value)} />
                                    </div>
                                </div>
                                </div>
                                <div className='col s12 m4'>
                                <div className="input-container">
                                    <div className="">
                                        <label className="input-label">
                                            Dirección
                                        </label>
                                    </div>
                                    <div>
                                        <input type="text" disabled={true} className="input-text" value={direction} onChange={(e: any) => setDirection(e.target.value)} />
                                    </div>
                                </div>
                                </div>
                                <div className='col s12 m4'>
                                    <Input field={FormFields.nomen} register={register} error={errors.nomen} />
                                </div>
                            </div>


                            <div className='row'>
                                <div className='col s12 m4'>
                                    <InputSelect
                                        field={FormFields.tipo}
                                        register={register}
                                        error={errors.tipo}
                                        selectOptions={guyOptions}
                                        optionLabel='guyName'
                                        optionValue='id'
                                    />
                                </div>

                                <div className='col s12 m4'>
                                    <InputNumber field={FormFields.m2} register={register} error={errors.m2} setValue={setValue} watch={watch} setError={setError} clearErrors={clearErrors} />
                                </div>
                                <div className='col s12 m4'>
                                    <InputNumber field={FormFields.mfront} register={register} error={errors.mfront} setValue={setValue} watch={watch} setError={setError} clearErrors={clearErrors} />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col s12 m4'>
                                    <InputNumber field={FormFields.mbackground} register={register} error={errors.mbackground} setValue={setValue} watch={watch} setError={setError} clearErrors={clearErrors} />
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col s12 m4'>
                                    <InputFile field={FormFields.photos}
                                        register={register}
                                        error={errors.photos}
                                        getValues={getValues}
                                        setValue={setValue}
                                        setError={setError}
                                        clearErrors={clearErrors}
                                        fileExtensions={fileExtensions}
                                    />
                                </div>
                            </div>









                            <div className='row'>
                                <div className='col  s12 m4 offset-m2'>
                                    <SecondryButton onClick={handleCancelClick} className='submit-btn'>Regresar</SecondryButton>
                                </div>
                                <div className='col s12 m4'>
                                    <input type="submit" className='submit-btn full-width' value='Guardar' />
                                </div>
                            </div>

                        </form>


                    </div>

                </div>
                <PopupModel  isOpen={modelOpen} closePopup={handleModelClose} height='260px' width='30%'>
                    <PopupContentCustom closePopup={handleModelClose} type={popupType}  />
                </PopupModel>
                <PopupModel  isOpen={modelDeterminant} closePopup={() => setModelDeterminant(false)} height='260px' width='30%'>
                    <PopupContentDeterminantError closePopup={() => setModelDeterminant(false)} type={modelDeterminantType}  />
                </PopupModel>

            </div>


        </div>
    )
}
