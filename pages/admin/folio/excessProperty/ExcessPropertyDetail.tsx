import React, { useState, useEffect } from 'react'
import { MainTitle, SmallTitle } from '../../../../components/common/Titles'
import { InputText } from '../../../../components/Inputs/InputText'
import { LocalComerical as FormFields }  from '../../../../resources/formInputJson'
import { InputTextBox } from '../../../../components/Inputs/InputTextBox'
import RadioStatus from '../RadioStatus'
import { useForm  } from 'react-hook-form';
//import Select from 'react-select'
import { PrimaryButton, SecondryButton } from '../../../../components/common/Buttons'
import { css } from 'goober'
import { InputTextbox } from '../../../../components/common/InputTextbox'
import { useLocation } from 'react-router-dom'
import { getStatusOptions, getFolioUsersExcess, getLsFolioDetail, postAssignUserLc, postchangeFolioStatusExcessProperty, getLandSaleHistoryExportData } from '../../../../services/folioTracking/folioTrackingService'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom'
import RoutesConstants from '../../../../resources/route-constants'
import { getLoginStatus, getLoginType, getLoginUser } from '../../../../store/authReducer'
import { useAppSelector } from '../../../../store/hooks'
import { POPUP_TYPE_ERROR, POPUP_TYPE_SUCCESS, USER_INTERNAL } from './../../../../resources/project-constants';
import CollapsibleFolio from './../../../../components/common/CollapsibleFolio';
import { canChangeUser, canChangeStatus } from '../../../../utility/commonFunctions'
import ExportExcel from '../../../../components/common/ExcelExport'
import FolioHistory from '../FolioHistory'
import axios from 'axios';
import {uploadFiles1} from '../../../../resources/api-constants';
import { FOLIO_STATUS, TYPE_EP } from '../constants'
import { setLoader, getLoader  } from '../../../../store/loaderReducer'
import { useAppDispatch } from '../../../../store/hooks'
import PopupModel from '../../../../components/popups/PopupModel'
import PopupContentCustom from '../../../../components/popups/PopupContentCustom'

const btnWidth = css`
    max-width: 250px;
    display: inline-block;
    
`
// const lcDataDefault:any = {
//     folioCd: '',
//     rfc:'',
//     name: '',
//     firstName: '',
//     lastName: '',
//     telephone: '',
//     cellPhoneNumber: '',
//     email: '',
//     lineBusinessOtherDs: '',
//     comment: '',
//     adress: '',
//     isWalmartLocation: '',
//     requestStatusId: ''

// }


// const selectStateOptions = [
//     {select: '', label: 'Select'},
//     { value: 'AGUASCALIENTES', label: 'AGUASCALIENTES'},
//     { value: 'BAJA CALIFORNIA', label: 'BAJA CALIFORNIA'},
//     { value: 'CAMPECHE', label: 'CAMPECHE'},
//     { value: 'CHIHUAHUA', label: 'CHIHUAHUA'},
//     { value: 'MEXICO CITY', label: 'MEXICO CITY'},
//     { value: 'DURANGO', label: 'DURANGO'},
// ]

type FormValues = {
    content: string;
    image: string;
    AdditionalDescription: string;
               

};

const exportExcelName= 'sheet-local-history';

export const ExcessPropertyDetail: React.FC = () => {

    const {register, handleSubmit, formState: { errors }    } = useForm<FormValues>()

    const location = useLocation()

    const [params, setParams] = useState<any>()
    const [lcData, setLcData] = useState<any>({})
    const [files] = useState<File[]>([])
    const [fileName, setFileName] = useState('');
    const [fileUpload,setFileUpload] = useState<any>({});
    const [paramStatus, setParamStatus] = useState<any>()
    const [statusList, setStatusList] = useState<any>([])
    const[uploadError,setUploadError] = useState<any>({});
    const [users, setUsers] = useState<any>([])
    
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const loginStatus = useAppSelector(getLoginStatus);
    const loginType = useAppSelector(getLoginType);
    const loginUser = useAppSelector(getLoginUser);
    const loader = useAppSelector(getLoader);

    const [selectedUser, setSelectedUser] = useState<any>('')
    const [selectedStatus, setSelectedStatus] = useState<any>('')
    const [changedRadioStatus, setChangedRadioStatus] = useState<any>('')
    const [userComment, setUserComment] = useState<any>('')

    const [modelOpen, setModelOpen] = useState(false);
    const [popupType, setPopupType] = useState<any>('')

    function openModel(type:any){
        setPopupType(type)
        setModelOpen(true)
        dispatch(setLoader(false));  
    }

  
    
    const checkRequiredParams = () => {
        let status = true
        if(location.hasOwnProperty('state'))
        {
            if(!location.state)
                status = false
            else
            {
                
                // Object.keys(lcDataDefault).forEach(function(key) {
                //     lcDataDefault[key] = location.state[key];
                // });
                setParams(location.state)
                setLcData(location.state)
                
            }
                
        }

        if(!status)
        {
            console.log('Error, Params not send ')
        }

        setParamStatus(status)
    }


     const getStatusDropdowns = () => {

        getStatusOptions().then((response:any) => {
             setStatusList(response.data)
        })
        .catch((error:any) => {
            console.log('getStateList error', error)
            openModel(POPUP_TYPE_ERROR)
            //setModalErrorIsOpen(true)
        })

    }
    const renderFileExtensionsEror = () => {
        let text = ['kmz' ,'bmp' ,'jpg','jpeg' ,'pdf' ,'ppt' ,'pptx', 'xls', 'xlsx', 'doc', 'docx' ].join(", .");
        text = '.' + text ;
        return text
      }
    const getFolioUsersList = (folioTemp:any) => {
        let paramsUsers = {
            folioId: folioTemp.folio,
        }

        getFolioUsersExcess(paramsUsers).then((response:any) => {
            setUsers(response.data)

            
        })
        .catch((error:any) => {
            console.log('getStateList error', error)
            //setModalErrorIsOpen(true)
        })

    }

    
    const canUpdateFolio = () => {
            
        if (loginStatus && loginType == USER_INTERNAL) {
            return true
        }

        return false
    }

    const getFolioDetails = () => {
        
        getLsFolioDetail(params.folio).then((response:any) => {
            if(response.data.length > 0)
                setLcData(response.data[0])
                if (canUpdateFolio()) 
                    getFolioUsersList(response.data[0])
        })
        .catch((error:any) => {
            console.log('getStateList error', error)
            openModel(POPUP_TYPE_ERROR)
            //setModalErrorIsOpen(true)
        })

    }


    

  
  
    useEffect(() => {
        checkRequiredParams()
        if (canUpdateFolio()) {
            getStatusDropdowns()
            //getFolioUsersList()
        }
    },[])
    

    useEffect(() => {
        if(params)
            getFolioDetails()
    }, [params])

    useEffect(() => {
        
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
        if(lcData)
        {
            setSelectedStatus(lcData.requestStatusId)
            setChangedRadioStatus(lcData.requestStatusId)
        }
        
    }, [lcData, users])

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
        setFileName(e.target.files[0]?.name);
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

        try{
        const response:any =    await postchangeFolioStatusExcessProperty(dataTemp);
        const formData = new FormData();
        if(response && fileUpload && fileUpload.length){
            
            for(let i = 0; i< fileUpload.length; i++){
                formData.append('files', fileUpload[i]);
                //formData.append('comments', data.twistDescription);
                //formData.append('folioId', lcData.folio);
                formData.append('uploadToken', lcData?.uploadToken);
                // formData.append('requestRecordId', response?.data.requestRecordId);
            }
            await axios.post(uploadFiles1(), formData);
            openModel(POPUP_TYPE_SUCCESS)
        }else{
            dispatch(setLoader(false));  
            openModel(POPUP_TYPE_ERROR)
        } 
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
       
    
    
    });
    
    //const paramStatus = checkRequiredParams()
    
    if(!paramStatus)
    {
        return (
            <>Not Found</>
        )
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
    })
    .catch((error: any) => {
        //alert('Something went wrong')
        //setSelectStateOptions([])
        openModel(POPUP_TYPE_ERROR)
        console.log('getStateList error', error)
    })

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
    }

    postchangeFolioStatusExcessProperty(dataTemp).then(() => {
       openModel(POPUP_TYPE_SUCCESS)
    })
        .catch((error: any) => {
            //alert('Something went wrong')
            //setSelectStateOptions([])
            openModel(POPUP_TYPE_ERROR)
            console.log('getStateList error', error)
        })

}
const renderFileExtensions = () => {
    let text = ['kmz' ,'bmp' ,'jpg','jpeg' ,'pdf' ,'ppt' ,'pptx', 'xls', 'xlsx', 'doc', 'docx' ].join(", .");
    text = '.' + text + ' - Max. weight 6 MB';
    return text
  }
    
    
    const handleCancelBtn = () => {
        navigate(RoutesConstants.FolioExcessProperty)
    }
    const externalUserCommentUpload = () => {

        if(selectedStatus === 2) {return (<>     
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
   

  
    const postForm = () => {
        if(canChangeUser(loginUser))
        {
            postChangeUser()
        }
        if(canChangeStatus(loginUser)){
            
            postChangeStatus()
        }
    }

    function handleModelClose(){
    
        setModelOpen(false)
        navigate(RoutesConstants.FolioExcessProperty)
    }


    const handleUserChange = (user: any) => {
        setSelectedUser(user)
    }
    
    const handleOnStatusChange = (status: any) => {
        setChangedRadioStatus(status)
    }

    const { exportToExcel, } = ExportExcel({}) 
    
    
    const startExcel = () => {
        
        let paramsEx:any = {
            folioId: lcData.folio,
            export: 1
        }

        getLandSaleHistoryExportData(paramsEx).then((response:any) => {
            if(response.data)
                exportToExcel(response.data, exportExcelName)
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
                            <MainTitle text={"Seguimiento de Excess Properties"} />
                        </div>
                        <div className="title-wrapper text-center">
                            <SmallTitle text={"Folio de atención " + lcData.folioCd} className='main-clr'/>
                        </div>
                    </div>
                   
                    <div className='forms-container'>
                        <CollapsibleFolio>

                            {lcData.moralPerson && (<><div className='row'>
                                <div className='col s12 m6'>
                                    <InputText field={FormFields.contactName2} value={lcData?.names}  disabled={true} />
                                </div>
                                
                                <div className='col s12 m6'>
                                    <InputText field={FormFields.razonSocial} value={lcData.companyName}  disabled={true} />
                                </div>

                            </div>
                           </>)}  

                           {!lcData.moralPerson && (
                                <div className='row'>
                                    <div className='col s12 m6'>
                                        <InputText field={FormFields.firstNames} value={lcData.names}  disabled={true} />
                                    </div>
                                    <div className='col s12 m6'>
                                        <InputText field={FormFields.lastName} value={lcData.lastName} disabled={true}  /> 
                                    </div>
                                    
                                </div>
                           )}
                            {/* <div className='row'>
                                <div className='col s12 m6'>
                                    <InputText field={FormFields.firstNames} value={lcData.names}  disabled={true} />
                                </div>
                                <div className='col s12 m6'>
                                    <InputText field={FormFields.lastName} value={lcData.lastName} disabled={true}  /> 
                                </div>

                            </div> */}

                        
                            <div className='row'>
                                {/* <div className='col s12 m6'>
                                    <InputText field={FormFields.motherLastName} value={lcData.mothersLastName}  disabled={true} />
                                </div> */}
                                {lcData.moralPerson && (
                                    <div className='col s12 m6'>
                                        <InputText field={FormFields.companyNameSupplier} value={lcData.businessName} disabled={true}  /> 
                                    </div>
                                )}
                                {!lcData.moralPerson && (
                                    <div className='col s12 m6'>
                                        <InputText field={FormFields.motherLastName} value={lcData.mothersLastName} disabled={true}  /> 
                                    </div>
                                )}
                                <div className='col s12 m6'>
                                    <InputText field={FormFields.rfc} value={lcData.rfc}  disabled={true} /> 
                                </div>

                            </div>

                        
                            <div className='row'>
                                
                                <div className='col s12 m6'>
                                    <InputText field={FormFields.phoneNumber} value={lcData.telephone} disabled={true}  />
                                </div>
                                <div className='col s12 m6'>
                                    <InputText field={FormFields.phone} value={lcData.cellPhoneNumber}  disabled={true} /> 
                                </div>
                                

                            </div>

                        
                            <div className='row'>
                                <div className='col s12 m6'>
                                    <InputText field={FormFields.email} value={lcData.email}  disabled={true} /> 
                                </div>
                            
                                <div className='col s12 m6'>
                                    <InputText field={FormFields.lineBusiness} value={lcData.businessDs} disabled={true}  />
                                </div>
                                

                            </div>

                    
                            
                        
                            

                        
                            <div className='row'>
                                <div className='col s12 m6'>
                                    <InputText field={FormFields.addressInterest} value={lcData.direction} disabled={true}  /> 
                                </div>
                                <div className='col s12 m6'>
                                    <InputText field={FormFields.comment} value={lcData.comments} disabled={true}  /> 
                                </div>

                            </div>

                            <div className='row'>
                                <div className='col s12'>
                                    <InputTextBox field={FormFields.excessDescription} value={lcData.useDs} disabled={true}  />
                                </div>
                            </div>


                        
                        </CollapsibleFolio >

                    </div>


                    {/* {canUpdateFolio() && (
                    <>
                    <div className='row'>
                        <div className='col s12'>
                            <RadioBtn 
                                field={FormFields.status} 
                                radioOptions={statusList} 
                                selected={lcData.requestStatusId}
                                radioLabel={'statusName'}
                                radioValue={'statusId'}
                            />
                        </div>

                    </div>
                    <div className='row'>
                        <div className='col s4'>
                        <div>
                        <label htmlFor='format' className="input-label">Usuario</label>
                        <Select  
                            classNamePrefix='input-select-react'
                            id='tienda' 
                            className='input-select-react' 
                            options={users} 
                            //onChange={(e) => handleInputChange(e, 'public')} 
                            getOptionLabel={(option: any) => option.userName}
                            getOptionValue={(option: any) => option.internalUserId}
                            isSearchable={false}
                            
                        />
                    </div>  
                        </div>

                    </div>
                    </>
                    )} */}

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
                                module={TYPE_EP}
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
                    {!canUpdateFolio() && (
                    externalUserCommentUpload()
                      
              )} 
               <div className={ loader  ? 'loader-app-container ' : 'loader-app-container hide'} >
              <div className='loader-app'></div>
            </div>
                    
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
               {canUpdateFolio() && (
                    <div className='export-container'>
                        <div className='row'>
                            <div className='col s12 text-right'>
                            {renderExcelButton()}
                                </div>
                        </div>

                    </div>)}

                    {!canUpdateFolio() && (
                    <div className='status-container'>
                        <div className='row'>
                            <div className='col s12 m4 offset-m2 text-center'>
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
                                           
                                        </tr>
                                        <tr>
                                        
                                            <td>{lcData.statuss}</td>
                                            <td>{lcData.date}</td>
                                            <td>{lcData.comments}</td>
                                           
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div> */}

                <div >
                    <FolioHistory
                        type="excessProperty"
                        folioId={lcData.folio}
                        activeStatus={lcData.activeCd}
                        folioCd={lcData.folioCd}
                    />
                </div>


                    
                    
                   

                    
                </div>
           </div>

           <PopupModel  isOpen={modelOpen} closePopup={handleModelClose} height='260px' width='30%'>
                <PopupContentCustom closePopup={handleModelClose} type={popupType}  />
            </PopupModel>
            
        </div>
    )
  }
  
