import React, {useState, useEffect} from 'react'
import { Input } from '../common/Input';
import { InputSelect } from '../common/InputSelect';
import { useForm  } from 'react-hook-form';
import {getStateList, getTownsList, getPropertyType} from '../../services/localCommercial/localCommercialService'
import { SecondryButton } from '../common/Buttons';
import PopupContentMapLatLong from '../popups/PopupContentMapLatLong'
import PopupContentError from '../popups/PopupContentError'
import PopupModel from '../popups/PopupModel'
import Image from '../common/Image';


// const guyOptions = [
//     { value: 'Terreno', label: 'Terreno' },
//     { value: 'Local comercial', label: 'Local comercial' },
// ]


const countryOptions = [
    { value: 'MEXICO', label: 'MEXICO'},  
]


type FormValues = {
    country: string;
    state: string;
    municipality: string;
    cityDs: string;
    street: string;
    streetNumber: string;
    colony: string;
    postalCode: string;
    betweenOneStreet: string;
    betweenTwoStreet: string;
    propertyType: string;
    latitude: string;
    longitude: string;
};

const FormFields = {
    country: {
        id: 'country',
        placeholder: 'Seleccione',
        label: 'Pais',
        validation: {
            required: {
                value: true,
                message: 'Debe seleccionar Pais',
            },
            maxLength: {
                value: 50,
                message: '50 characters máximo',
            },
        }
    },
    state: {
        id: 'state',
        placeholder: 'Seleccione',
        label: 'Estado',
        validation: {
            required: {
                value: true,
                message: 'Debe seleccionar Estado',
            },
            maxLength: {
                value: 50,
                message: '50 characters máximo',
            },
        }
    },
    municipality: {
        id: 'municipality',
        placeholder: 'Seleccione',
        label: 'Delegación o Municipio',
        validation: {
            required: {
                value: true,
                message: 'Debe seleccionar Municipio o delegación.',
            },
            maxLength: {
                value: 50,
                message: '50 characters máximo',
            },
        }
    },
    cityDs: {
        id: 'cityDs',
        placeholder: 'Ingrese',
        label: 'Ciudad',
        validation: {
            required: {
                value: false,
                message: '',
            },
            maxLength: {
                value: 150,
                message: '150 characters máximo',
            },
        }
    },
    street: {
        id: 'street',
        placeholder: 'Ingrese',
        label: 'Calle',
        validation: {
            required: {
                value: true,
                message: 'Debe capturar Calle',
            },
            maxLength: {
                value: 100,
                message: '100 characters máximo',
            },
        }
    },
    streetNumber: {
        id: 'streetNumber',
        placeholder: 'Ingrese',
        label: 'Número',
        validation: {
            pattern: {
                value: /^[a-zA-Z0-9]+$/,
                message: 'Debe ingresar letras número',
            },
            required: {
                value: true,
                message: 'Debe capturar Número',
            },
            maxLength: {
                value: 20,
                message: '20 characters máximo',
            },
        }
    },
    colony: {
        id: 'colony',
        placeholder: 'Ingrese',
        label: 'Colonia',
        validation: {
            pattern: {
                value: /^[A-Za-zÀ-ÿñáéíóúüÑ \s]+$/,
                message: 'Debe ingresar letras número',
            },
            required: {
                value: true,
                message: 'Debe capturar Colonia',
            },
            maxLength: {
                value: 20,
                message: '20 characters máximo',
            },
        }
    },
    postalCode: {
        id: 'postalCode',
        placeholder: 'Ingrese',
        label: 'Código Postal',
        validation: {
            required: {
                value: true,
                message: 'Debe capturar Código Postal',
            },
            maxLength: {
                value: 5,
                message: '5 characters máximo',
            },
            pattern: {
                value: /^[0-9]+$/,
                message: 'Debe ingresar un número',
            },
        }
    },
    betweenOneStreet: {
        id: 'betweenOneStreet',
        placeholder: 'Ingrese',
        label: 'Entre la calle',
        validation: {
            required: {
                value: true,
                message: 'Debe capturar Entre calles',
            },
            maxLength: {
                value: 100,
                message: '100 characters máximo',
            },
        }
    },
    betweenTwoStreet: {
        id: 'betweenTwoStreet',
        placeholder: 'Ingrese',
        label: 'y la calle',
        validation: {
            required: {
                value: true,
                message: 'Debe capturar Calle',
            },
            maxLength: {
                value: 100,
                message: '100 characters máximo',
            },
        }
    },
    propertyType: {
        id: 'propertyType',
        placeholder: 'Seleccione',
        label: 'Tipo',
        validation: {
            required: {
                value: true,
                message: 'Debe seleccionar Tipo.',
            },
            maxLength: {
                value: 50,
                message: '50 characters máximo',
            },
        }
    },
    latitude: {
        id: 'latitude',
        placeholder: 'Latitud',
        label: 'Ubicación',
        validation: {
            required: {
                value: true,
                message: 'Debe seleccionar Latitud',
            },
            maxLength: {
                value: 50,
                message: '50 characters máximo',
            },
        }
    },
    longitude: {
        id: 'longitude',
        placeholder: 'Longitud',
        label: '',
        validation: {
            required: {
                value: true,
                message: 'Debe seleccionar Longitud',
            },
            maxLength: {
                value: 50,
                message: '50 characters máximo',
            },
        }
    },

}

export const TerranoStep2: React.FC<any> = (props) => {

    const[selectStateOptions, setSelectStateOptions] = useState<any[]>([])
    const[propertyType, setPropertyType] = useState<any[]>([])
    const[towns, setTowns] = useState<any[]>([])
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalErrorIsOpen, setModalErrorIsOpen] = React.useState(false);
    const { register, handleSubmit, formState: { errors }, getValues, reset, setValue } = useForm<FormValues>()


    // const setDropDownValues = () => {
    //     if(props.formValues.hasOwnProperty('state'))
    //         setValue('state', props.formValues.state)
    //     if(props.formValues.hasOwnProperty('cityDs'))
    //         setValue('cityDs', props.formValues.cityDs)
    // }

    
    const handleStateChange = (id:any) => {

        if(!id)
            return false;
        
        getTownsList(id).then((res:any) => {
            setTowns(res.data)

        })
        .catch((error:any) => {
            //alert('Something went wrong')
            //setSelectStateOptions([])
            console.log('getStateList error', error)
            setTowns([])
            setModalErrorIsOpen(true)
        })

    }


    useEffect(() => {
        //setDropDownValues()
        // if(props.formValues.hasOwnProperty('state'))
        //     handleStateChange(props.formValues.state)
    })

    useEffect(() => {
        getStateList().then((res:any) => {
            setSelectStateOptions(res.data)
        })
        .catch((error:any) => {
            //alert('Something went wrong')
            //setSelectStateOptions([])
            console.log('getStateList error', error)
        })

        getPropertyType().then((res:any) => {
            setPropertyType(res.data)
        })
        .catch((error:any) => {
            //alert('Something went wrong')
            //setSelectStateOptions([])
            console.log('getStateList error', error)
        })

        if(props.formValues.hasOwnProperty('state'))
            handleStateChange(props.formValues.state)
        
        
    }, [])


    useEffect(() => {
        console.log('props', props)
        if(props.formValues)
        {
            reset({
                state: props.formValues.state,
                municipality: props.formValues.municipality,
                cityDs: props.formValues.cityDs,
                street: props.formValues.street,
                streetNumber: props.formValues.streetNumber,
                colony: props.formValues.colony,
                postalCode: props.formValues.postalCode,
                betweenOneStreet: props.formValues.betweenOneStreet,
                betweenTwoStreet: props.formValues.betweenTwoStreet,
                propertyType: props.formValues.propertyType,
                latitude: props.formValues.latitude,
                longitude: props.formValues.longitude,
            });
        }
        
    }, [])

    

    const onSubmit = handleSubmit((data) => {
        props.saveFormValues(data);
        props.handleNextClick()
       
    })

    
    function handlePreviousClick()  {
        props.saveFormValues(getValues())
        props.handlePreviousClick()
       
    }

    function handleModelClose(){
        console.log('handleClose')
        setIsOpen(false)
       
    }
    function handleModelErrorClose(){
        console.log('handleClose')
        setModalErrorIsOpen(false)
       
    }

    const openMap = () => {
        setIsOpen(true)
    }

    const setLatLong = (clickInfo:any) => {
        console.log('setLatLong', clickInfo)
        setValue('latitude', clickInfo.latitude)
        setValue('longitude', clickInfo.longitude)
    }


    return (
        <div className='form-container'>
            <form onSubmit={onSubmit} >
                <div className='row'>
                    <div className='cols 12'>
                        <InputSelect 
                            field={FormFields.country} 
                            register={register} 
                            error={errors.country} 
                            selectOptions={countryOptions}
                            optionLabel='label'
                            optionValue='value'
                            
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col s12 m4'>

                        

                        <InputSelect 
                            field={FormFields.state} 
                            register={register} 
                            error={errors.state} 
                            selectOptions={selectStateOptions}
                            optionLabel='state'
                            optionValue='id'
                            onChange={(id:any) => handleStateChange(id)}
                        />
                    </div>
                    <div className='col s12 m4'>
                        <InputSelect 
                            field={FormFields.municipality} 
                            register={register} 
                            error={errors.municipality} 
                            selectOptions={towns}
                            optionLabel='townDesc'
                            optionValue='id'
                        />
                    </div>
                    <div className='col s12 m4'>
                        <Input field={FormFields.cityDs} register={register} error={errors.cityDs}/>
                    </div>
                </div>

                <div className='row'>
                    <div className='col s12 m4'>
                        <Input field={FormFields.street} register={register} error={errors.street}/>
                    </div>
                    <div className='col s12 m4'>
                        <Input field={FormFields.streetNumber} register={register} error={errors.streetNumber}/>
                    </div>
                    <div className='col s12 m4'>
                        <Input field={FormFields.colony} register={register} error={errors.colony}/>
                    </div>
                </div>

                <div className='row'>
                    <div className='col s12 m4'>
                        <Input field={FormFields.postalCode} register={register} error={errors.postalCode}/>
                    </div>
                    <div className='col s12 m4'>
                        <Input field={FormFields.betweenOneStreet} register={register} error={errors.betweenOneStreet}/>
                    </div>
                    <div className='col s12 m4'>
                        <Input field={FormFields.betweenTwoStreet} register={register} error={errors.betweenTwoStreet}/>
                    </div>
                </div>

                <div className='row'>
                    <div className='col s12 m4'>
                        <InputSelect 
                            field={FormFields.propertyType} 
                            register={register} 
                            error={errors.propertyType} 
                            selectOptions={propertyType}
                            optionLabel='propertyTypeDs'
                            optionValue='propertyTypeId'
                        />
                    </div>
                    <div className='col s12 m4 relative-div'>
                        <Input field={FormFields.latitude} disabled="true" register={register} error={errors.latitude}/>
                        <span onClick={openMap} className='map-btn'><Image name='dots.png' /></span>
                    </div>
                    <div className='col s12 m4'>
                        <Input field={FormFields.longitude} disabled="true" register={register} error={errors.longitude}/>
                    </div>
                </div>
                
                <div className='row'>
                    <div className='col offset-m2 s12 m4'>
                        <SecondryButton onClick={handlePreviousClick} className='submit-btn full-width'>Regresar</SecondryButton>
                    </div>
                    <div className='col s12 m4'>
                        <input type="submit" className='submit-btn full-width' value='Siguiente'/>
                    </div>

                    
                </div>

            </form>
            
            <PopupModel className="map-popup" hideCloseIcon={true} isOpen={modalIsOpen} closePopup={handleModelClose} >
                <PopupContentMapLatLong   setLatLong={(clickInfo:any) => setLatLong(clickInfo)} closePopup={handleModelClose} />
            </PopupModel>

            <PopupModel  isOpen={modalErrorIsOpen} closePopup={handleModelErrorClose} width='40%' height='250px' >
                <PopupContentError closePopup={handleModelErrorClose}/>
            </PopupModel>
            
        </div>
    )
}