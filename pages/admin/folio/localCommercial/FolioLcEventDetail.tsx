import React, { useState, useEffect } from 'react'
import { MainTitle, SmallTitle } from '../../../../components/common/Titles'
import { InputText } from '../../../../components/Inputs/InputText'
import { LocalComerical as FormFields } from '../../../../resources/formInputJson'
//import { InputTextBox } from '../../../../components/Inputs/InputTextBox'
// import { RadioBtn } from '../../../../components/Inputs/RadioBtn'
//import Select from 'react-select'
import { useForm  } from 'react-hook-form';
import { PrimaryButton, SecondryButton } from '../../../../components/common/Buttons'
import { css } from 'goober'
// import FileDownload from '../../../../components/common/FileDownload'
// import { useLocation } from 'react-router-dom'
import { getStatusOptions, getFolioUsersLocalCommercial, /*postFormData,*/   postAssignUserLc, postchangeFolioStatus, getLcHistoryExportData } from '../../../../services/folioTracking/folioTrackingService'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom'
import RoutesConstants from '../../../../resources/route-constants'
import { getLoginStatus, getLoginType, getLoginUser } from '../../../../store/authReducer'
import { useAppSelector } from '../../../../store/hooks'
import {  POPUP_TYPE_ERROR, POPUP_TYPE_SUCCESS,USER_INTERNAL } from './../../../../resources/project-constants';
import CollapsibleFolio from './../../../../components/common/CollapsibleFolio';
import { canChangeUser, canChangeStatus } from '../../../../utility/commonFunctions'
import ExportExcel from '../../../../components/common/ExcelExport'
// import DataTable2 from '../../../../components/datatable/DataTable2'
// import Image from '../../../../components/common/Image'
import FolioHistory from '../FolioHistory'
import RadioStatus from '../RadioStatus'
import {uploadFiles} from '../../../../resources/api-constants';
import { InputTextbox } from '../../../../components/common/InputTextbox'
import axios from 'axios';
import { useAppDispatch } from '../../../../store/hooks'
import { setLoader, getLoader  } from '../../../../store/loaderReducer'
import { FOLIO_STATUS, TYPE_LC } from '../constants';
import PopupModel from '../../../../components/popups/PopupModel'
import PopupContentCustom from '../../../../components/popups/PopupContentCustom'

const btnWidth = css`
    max-width: 250px;
    display: inline-block;
    
`


interface Props {
    lcData: any
}

type FormValues = {
    descriptionComments: string;
    document: string;
    AdditionalDescription: string;
};


// const gridColumns = [
//     {'label': 'ACTIVO', 'key' : 'active', 'type' : 'cellRenderer', 'cellRenderer': renderTableActiveColumn2},
//     {'label': '', 'key' : 'active', 'type' : 'cellRenderer', 'cellRenderer': renderTableActiveColumn},
//     {'label': 'ESTATUS', 'key' : 'status', 'type' : 'text' },
//     {'label': 'FECHA ', 'key' : 'reqModDate', 'type' : 'text'},
//     {'label': 'Comentario', 'key' : 'comment', 'type' : 'text'},
//     {'label': 'Adjuntos', 'key' : 'docName', 'type' : 'text'},
   
// ]


const exportExcelName= 'sheet-local-history';



export const FolioLcEventDetail: React.FC<Props> = (props) => {
    const {register, handleSubmit, formState: { errors }  } = useForm<FormValues>()

    
    // const location = useLocation()

    const [lcData, setLcData] = useState<any>({})
    // const [files, setFiles] = useState<any>([])
    const [statusList, setStatusList] = useState<any>([])
    const [users, setUsers] = useState<any>([])
    const [fileUpload,setFileUpload] = useState<any>({});
    const [fileName, setFileName] = useState('');
    const[uploadError,setUploadError] = useState<any>({});
    const [files] = useState<File[]>([])
    
    
    // const [tableRows] = useState<any>([])
   
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const loader = useAppSelector(getLoader);

    const loginStatus = useAppSelector(getLoginStatus);
    const loginType = useAppSelector(getLoginType);
    const loginUser = useAppSelector(getLoginUser);

    const [selectedUser, setSelectedUser] = useState<any>('')
    const [selectedStatus, setSelectedStatus] = useState<any>('')
    const [changedRadioStatus, setChangedRadioStatus] = useState<any>('')
    const [userComment, setUserComment] = useState<any>('')
    const [modelOpen, setModelOpen] = useState(false);
    const [popupType, setPopupType] = useState<any>('')

    function openModel(type: any) {
        setPopupType(type)
        setModelOpen(true)
        dispatch(setLoader(false));
    }

    function handleModelClose() {

        setModelOpen(false)
        navigate(RoutesConstants.FolioLocalCommercial)
    }
    
   

    const getStatusDropdowns = () => {

        getStatusOptions().then((response: any) => {
            setStatusList(response.data)
        })
        .catch((error: any) => {
            console.log('getStateList error', error)
            openModel(POPUP_TYPE_ERROR)
            //setModalErrorIsOpen(true)
        })

    }

    const getM2Label = () =>  {
        let field = {
            id: 'ofData',
            placeholder: 'Ingrese',
            label: 'M² Requeridos',
            validation: {
                required: {
                    value: true,
                    message: 'Debe ingresar los metros',
                },
                maxLength: {
                    value: 50,  
                    message: '50 characters max',
                },
                // pattern: {
                //     value: /^[0-9]+$/,
                //     message: 'Debe ingresar números',
                // },
            }
        }

        field.label = lcData.numberRequestCd == 0 ? 'M² Requeridos' : 'Número de cajones requeridos'

        return field
    }

    const sendFormData = async(data: any) => {

        dispatch(setLoader(true));
        
        
        let dataTemp: any = {
            folioId: lcData.folio,
            userId: lcData.assignedUser.internalUserId,
            requestStatusId: FOLIO_STATUS.INFO_SENT,
            comment: data.AdditionalDescription,
            email: lcData.email,
            externalUserId:lcData.externalUserId,
        }
        const formData = new FormData();
       
        
        
        try {
            const response:any = await postchangeFolioStatus(dataTemp);
            if(response && fileUpload && fileUpload.length){
            
                for(let i = 0; i< fileUpload.length; i++){
                    formData.append('files', fileUpload[i]);
                    //formData.append('comments', data.twistDescription);
                    //formData.append('folioId', lcData.folio);
                    formData.append('uploadToken', lcData?.uploadToken);
                    // formData.append('requestRecordId', response?.data.requestRecordId);
                }

                await axios.post(uploadFiles(), formData);
                // setSelectedStatus(3);
                openModel(POPUP_TYPE_SUCCESS)
       
        
            }
            dispatch(setLoader(false));
        
        }catch (error) {
            console.log('error while uploading files bulk upload is: ', error);
            dispatch(setLoader(false));
            openModel(POPUP_TYPE_ERROR)
        }
        
        
    }
    const onSubmit = handleSubmit((data) => {
       
   
   if(fileUpload.length > 0 && Object.keys(uploadError).length === 0){
   
 
    sendFormData(data);
   } else {
    setUploadError({
        message: "wrong file format or No File",
       })
   }
        
       
    })
    

   

    const setSelectedUserDorpdown = () => {
        
        if(lcData && lcData.assignedUser)
        {
            
            if(lcData.assignedUser.internalUserId )
           {
                
                let user =  users.filter((obj:any) => {
                    return obj.internalUserId === lcData.assignedUser.internalUserId
                })

               
                if(user && user.length > 0)
                    setSelectedUser(user[0])
           }
        }
    }


    // const handleToggleChange = (status: any) => {
    //     //setToggleStatus(status)
    //     //postChangeFolioActiveStatus(status)
    // }


    const getFolioUsersList = () => {
        dispatch(setLoader(true))
        let params = {
            stateId : lcData.stateId,
            folioId: lcData.folio,
        }

        getFolioUsersLocalCommercial(params).then((response: any) => {
            setUsers(response.data)
            dispatch(setLoader(false));
            
            //setSelectedUser(227)
        })
        .catch((error: any) => {
            console.log('getStateList error', error)
            dispatch(setLoader(false));
            openModel(POPUP_TYPE_ERROR)
            //setModalErrorIsOpen(true)
        })

    }


    const canUpdateFolio = () => {


        if (loginStatus && loginType == USER_INTERNAL) {
            return true
        }

        return false
    }



    


    useEffect(() => {
      

        if (canUpdateFolio()) {
            getStatusDropdowns()

        }

       
        


        

    }, [])
    

    useEffect(() => {
        //if(params)
        setLcData(props.lcData)

        if(props.lcData && props.lcData.requestStatusId)
        {
            setSelectedStatus(props.lcData.requestStatusId)
            setChangedRadioStatus(props.lcData.requestStatusId)
        }
            
       
        
       
        //setSelectedUserDorpdown()
    }, [props])

    useEffect(() => {
        //if(params)
        
       // getFolioHistory()
        // if(lcData.skRequestId)
        //     getFiles()
        
        setSelectedUserDorpdown()
        // if (canUpdateFolio()) {
            

        //     if(lcData.stateId)
        //     {
        //         console.log('users', users)
        //         if(!Array.isArray(users) || !users.length)
        //         {
        //             dispatch(setLoader(true));
        //             getFolioUsersList()
        //         }
                  
        //     }
                

           
        // }
        
    }, [lcData])

    useEffect(() => {
        if (canUpdateFolio()) {
            

            if(lcData.stateId)
            {
                console.log('users', users)
                // if(!Array.isArray(users) || !users.length)
                {
                    dispatch(setLoader(true));
                    getFolioUsersList()
                }
                  
            }
                

           
        }
    }, [lcData.folioCd])

    useEffect(() => {
        //if(params)
        
        setSelectedUserDorpdown()

        
    }, [users])
    

    //const paramStatus = checkRequiredParams()

    // if (!paramStatus) {
    //     return (
    //         <>Not Found</>
    //     )
    // }

    
    
const handleCancelBtn = () => {
    navigate(RoutesConstants.FolioLocalCommercial)
}

const renderFileExtensionsEror = () => {
    let text = ['kmz' ,'bmp' ,'jpg','jpeg' ,'pdf' ,'ppt' ,'pptx', 'xls', 'xlsx', 'doc', 'docx' ].join(", .");
    text = '.' + text ;
    return text
  }

const postChangeUser = () => {



    dispatch(setLoader(true));
    let dataTemp: any = {
        folioId: lcData.folio,
        userId: selectedUser?.internalUserId,
        email: lcData.email,
    }

    postAssignUserLc(dataTemp).then(() => {
        openModel(POPUP_TYPE_SUCCESS)
        dispatch(setLoader(false));
    })
    .catch((error: any) => {
        //alert('Something went wrong')
        //setSelectStateOptions([])
        openModel(POPUP_TYPE_ERROR)
        dispatch(setLoader(false));
        console.log('getStateList error', error)
    })

}
const validateFiles = (filesDiff: File[]) => {
    
    filesDiff.forEach(function(file) {
        let fileExtension:any = file.name.split('.').pop();
          
        if (!(['kmz' ,'bmp' ,'jpg','jpeg' ,'pdf' ,'ppt' ,'pptx', 'xls', 'xlsx', 'doc', 'docx' ].indexOf(fileExtension) > -1))
        {
            setUploadError({
                message: "Debe seleccionar archivos con formato" +  renderFileExtensionsEror(),
               })
             return false;
        }
    })
   return true;
}

const selectFileBtn = (e: any)=>{
    setUploadError({});
    let differenceFiles:File[] = [...e.target.files].filter((x:any )=> !files.includes(x));
    let validationResult =  validateFiles(differenceFiles);
    if(!validationResult)
        {
          e.preventDefault()
          return false 
        }
    setFileUpload(e.target.files);
    setFileName(e.target.files[0].name);
}
const postChangeStatus = () => {
   dispatch(setLoader(true));
    let dataTemp: any = {
        folioId: lcData.folio,
        // userId: loginUser.id,
        requestStatusId: changedRadioStatus,
        comment: userComment,
        email: lcData.email,
        externalUserId:lcData.externalUserId,
        moduleId:3,
    }

    postchangeFolioStatus(dataTemp).then(() => {
        openModel(POPUP_TYPE_SUCCESS)
        dispatch(setLoader(false));
    })
    .catch((error: any) => {
        //alert('Something went wrong')
        //setSelectStateOptions([])
        dispatch(setLoader(false));
        openModel(POPUP_TYPE_ERROR)
        console.log('getStateList error', error)
    })

}

const postForm = () => {
    if(canChangeUser(loginUser))
    {
        postChangeUser()
    }
    if(canChangeStatus(loginUser)){
        
        postChangeStatus()
    }
}
const renderFileExtensions = () => {
    let text = ['kmz' ,'bmp' ,'jpg','jpeg' ,'pdf' ,'ppt' ,'pptx', 'xls', 'xlsx', 'doc', 'docx' ].join(", .");
    text = '.' + text + ' - Max. weight 6 MB';
    return text
  }
const comment = () => {

    if((selectedStatus === 2 && changedRadioStatus === 2) || changedRadioStatus === 2){

        return (<div className='row'>
                            <div className='col s12'>
                                <div className="">
                                    <label className="input-label">
                                    Comentario
                                    </label>
                                </div>
                                <div>
                                    <input type="text" className="input-text" onChange={(e: any) => setUserComment(e.target.value)} />
                                </div>
                            </div>
                        </div>)

    }
}

const externalUserCommentUpload = () => {

    if(selectedStatus === 2) {
    return (<>     
    <div className='row'>
        <div className='col s12 m12'>
        <InputTextbox field={FormFields.AdditionalDescription} register={register} error={errors}/>
        </div>
    </div>    
    <div className='row'>    
        <div className='col s12 m6'>
        <div style={{ position: 'relative' }}>
            <input type="file" id="bulk_upload" className='input-file-btn-style' onChange={(e)=>selectFileBtn(e)}/>
            <label htmlFor="bulk_upload" className='file-upload-btn-style bulk-upload-button'>Seleccionar archivo</label>
            <span className='file-name-style'>{fileName}</span>
            <div className="input-document-types">{renderFileExtensions()}</div>
            <div className="input-error">{uploadError && uploadError.message}</div>
        </div>
        </div>
    </div>
    </>) 
    }
}


const handleUserChange = (user: any) => {
    
    setSelectedUser(user)
}

const handleOnStatusChange = (status: any) => {
    setChangedRadioStatus(status)
}





const { exportToExcel, } = ExportExcel({}) 
    
    
const startExcel = () => {
    
    let params:any = {
        folioId: lcData.folio,
        export:1
    }

    getLcHistoryExportData(params).then((response:any) => {
        if(response.data){
            let newArry:any[] = [];
          response.data.forEach((item:any) => {
            let newObjOrder = {
                'folio':item.pictFOLIO,
                'Estatus':item.estatus,
                'fecha':item.fecha,
                'COMENTARIO':item.comentario,
                'USUARIO INTERNO':item.usuario_INTERNO,
                'adjuntos':item.adjuntos
              }

              newArry.push(newObjOrder);

          })
          


            exportToExcel(newArry, exportExcelName)
        }    
    })
    .catch((error:any) => {
       console.log(error)
       //setModalErrorIsOpen(true)
    })

    
}
const {renderExcelButton } = ExportExcel({exportExcel: startExcel}) 






return (
    <div className='page-container'>
        <div className='container main-container'>
            <div className='page-content'>
                <div className='desc-container'>
                    <div className="title-wrapper">
                        <MainTitle text={"Seguimiento Locales Comerciales"} />
                    </div>
                    <div className="title-wrapper text-center">
                        <SmallTitle text={"Folio de atención " + lcData.folioCd} className='main-clr' />
                    </div>
                </div>
               
                <div className='forms-container'>
                    
                    <CollapsibleFolio>

                        <div className='row'>
                            <div className='col s12 m6'>
                                <InputText field={FormFields.firstNames} value={lcData.names} disabled={true} />
                            </div>
                            <div className='col s12 m6'>
                                <InputText field={FormFields.lastName} value={lcData.lastName} disabled={true} />
                            </div>

                        </div>


                        <div className='row'>
                            <div className='col s12 m6'>
                                <InputText field={FormFields.motherLastName} value={lcData.mothersLastName} disabled={true} />
                            </div>
                            
                            <div className='col s12 m6'>
                                <InputText field={FormFields.razonSocial} value={lcData.bussinessName} disabled={true} />
                            </div>

                        </div>


                        <div className='row'>
                            <div className='col s12 m6'>
                                <InputText field={FormFields.phoneNumber} value={lcData.telephone} disabled={true} />
                            </div>
                            <div className='col s12 m6'>
                                <InputText field={FormFields.phone} value={lcData.cellPhoneNumber} disabled={true} />
                            </div>
                        

                        </div>


                        <div className='row'>
                            <div className='col s12 m6'>
                                <InputText field={FormFields.email} value={lcData.email} disabled={true} />
                            </div>
                        
                        

                            <div className='col s12 m6'>
                                <InputText field={FormFields.turnOfTheCompanyEvent} value={lcData.turnOrBussiness} disabled={true} />
                            </div>


                        </div>


                        <div className='row'>
                            <div className='col s12 m6'>
                                <InputText field={getM2Label()} value={lcData.squareMeterNbr} disabled={true} />
                            </div>
                            
                        
                            <div className='col s12 m6'>
                                <InputText field={FormFields.dateStartEvent} value={lcData.startDate} disabled={true} />
                            </div>
                        </div>


                        <div className='row'>
                            <div className='col s12 m6'>
                                <InputText field={FormFields.dateEndEvent} value={lcData.finalDate} disabled={true} />
                            </div>
                            <div className='col s12 m6'>
                                <InputText field={FormFields.eventInterest} value={lcData.branchesOfIntrest} disabled={true} />
                            </div>


                        </div>


                        <div className='row'>
                            <div className='col s12 m6'>
                                <InputText field={FormFields.eventDescription} value={lcData.descriptionOfEvent} disabled={true} />
                            </div>
                            <div className='col s12 m6'>
                                <InputText field={FormFields.document} value={lcData.loadOfDocuments} disabled={true} />
                            </div>

                        </div>
                     </CollapsibleFolio>

                   

                </div>

                {canUpdateFolio() && (
                    <>
                    <div className='row'>
                        <div className='col s12'>
                            
                            <RadioStatus
                                field={FormFields.status}
                                radioOptions={statusList}
                                selected={selectedStatus}
                                disabledAfter={lcData.requestStatusId}
                                radioLabel={'statusName'}
                                radioValue={'statusId'}
                                disabled={!canChangeStatus(loginUser)}
                                onChange={handleOnStatusChange}
                                module={TYPE_LC}
                            />
                        </div>
                    </div>
                    {canChangeStatus(loginUser) && (
                       comment() 
                    )}

                    
                    {canChangeUser(loginUser) && (
                        <div className='row'>
                            <div className='col s12 m4'>
                                <div>
                                    <label htmlFor='format' className="input-label">Usuario</label>
                                    <Select
                                        classNamePrefix='input-select-react'
                                        id='tienda'
                                        className='input-select-react'
                                        options={users}
                                        onChange={(e) => handleUserChange(e)} 
                                        getOptionLabel={(option: any) => option.userName}
                                        getOptionValue={(option: any) => option.internalUserId}
                                        isSearchable={false}
                                        value={selectedUser}
                                    />
                                </div>
                            </div>

                        </div>
                    )}
                    </>
                    )}



                    {/* <div className='status-container'>
                        <div className='row'>
                            <div className='col s6'>
                                <div>
                                    Estatus
                                </div>
                                <div>
                                    En revisión		Información adicional		Información enviada Solicitud aceptada	Rechazado
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col s4'>
                                
                            <div className="input-select-react-wrapper">
                                <label htmlFor='state' className="input-label">
                                    Estatus
                                </label>
                                <Select  classNamePrefix='input-select-react' id='state' className='input-select-react' options={selectStateOptions} />
                            </div>
                            </div>
                        </div>

                    </div> */}

                {canUpdateFolio() && (
                    <>
                    <div className='status-container'>
                        <div className='row'>
                            <div className='col s12 m3 offset-m3 text-center'>
                                <SecondryButton className={btnWidth} onClick={() => handleCancelBtn()}>Cancelar</SecondryButton>
                            </div>
                            <div className='col s12 m3 text-center'>
                                <PrimaryButton className={btnWidth} onClick={() => postForm()}>Guardar</PrimaryButton>

                            </div>
                        </div>
                    </div>

                    
                    </>
                )}
                 
                 {!canUpdateFolio() && (
                    externalUserCommentUpload()
                      
              )} 

<div className={ loader  ? 'loader-app-container ' : 'loader-app-container hide'} >
              <div className='loader-app'></div>
            </div>
                
                

                {canUpdateFolio() && (       <div className='export-container'>
                    <div className='row'>
                        <div className='col s12 text-right'>
                        {renderExcelButton()}
                            </div>
                    </div>

                </div>)}

                {!canUpdateFolio() && (
                    <div className='status-container'>
                        <div className='row'>
                            <div className='col s12 m4 offset-m3 text-center'>
                                <SecondryButton className={btnWidth} onClick={() => handleCancelBtn()}>Cancelar</SecondryButton>

                            </div>
                            {(selectedStatus === 2) && (
                            <div className='col s12 m3 text-center'>
                                <PrimaryButton className={btnWidth} onClick={() => onSubmit()}>Guardar</PrimaryButton>

                            </div>)}

                        </div>
                    </div>
                )}


               

                {/* <div className='document-table-container'>
                    <div className='row'>
                        <div className='col s12'>
                            <table className='striped grid-table'>
                                <tbody>
                                    <tr>
                                    
                                        <th>Estatus</th>
                                        <th>Fecha</th>
                                        <th>Comentario</th>
                                        <th>Adjuntos</th>
                                    </tr>
                                    <tr>
                                    
                                        <td>{lcData.statuss}</td>
                                        <td>{lcData.date}</td>
                                        <td>{lcData.comments}</td>
                                        <td>
                                            
                                            <FileDownload files={files}/>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div> */}
                

                <div >
                    <FolioHistory
                        type="localCommercial"
                        folioId={lcData.folio}
                        activeStatus={lcData.activeCd}
                        folioCd={lcData.folioCd}
                    />
                </div>

                {/* <div className='datatable-container'>
                    <DataTable2 
                        columns={gridColumns} 
                        rows={tableRows} 
                        getSelectedRows={() => void 0}
                        //callbackClickRow={handleClickRow}
                        callbackRefreshRows={() => void 0}
                        sort={true}
                    />
                </div> */}








            </div>
        </div>

        <PopupModel isOpen={modelOpen} closePopup={handleModelClose} height='260px' width='30%'>
            <PopupContentCustom closePopup={handleModelClose} type={popupType} />
        </PopupModel>
    </div>
)
  }
