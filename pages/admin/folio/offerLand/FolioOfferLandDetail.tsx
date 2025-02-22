import React, { useState, useEffect } from 'react'
import { MainTitle, SmallTitle } from '../../../../components/common/Titles'
import { InputText } from '../../../../components/Inputs/InputText'
import { LocalComerical as FormFields } from '../../../../resources/formInputJson'
import { InputTextbox } from '../../../../components/common/InputTextbox'
import { InputTextBox } from '../../../../components/Inputs/InputTextBox'
import RadioStatus from '../RadioStatus'
//import Select from 'react-select'
import { PrimaryButton, SecondryButton } from '../../../../components/common/Buttons'
import { css } from 'goober'
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom'
import { getStatusOptions, getFolioUsersOfferLand, getTerrenoFolioDetail, postAssignUserLc, postchangeFolioStatusOfferLand, getOfferLandHistoryExportData } from '../../../../services/folioTracking/folioTrackingService'
import Select from 'react-select'
import { uploadFiles1 } from '../../../../resources/api-constants';
import { useNavigate } from 'react-router-dom'
import RoutesConstants from '../../../../resources/route-constants'
import { getLoginStatus, getLoginType, getLoginUser } from '../../../../store/authReducer'
import { useAppSelector, useAppDispatch } from '../../../../store/hooks'
import { POPUP_TYPE_ERROR, POPUP_TYPE_SUCCESS, USER_INTERNAL } from './../../../../resources/project-constants';
// import FileDownload from '../../../../components/common/FileDownload'
import CollapsibleFolio from './../../../../components/common/CollapsibleFolio';
import { canChangeUser, canChangeStatus } from '../../../../utility/commonFunctions'
import { setLoader, getLoader } from '../../../../store/loaderReducer'
import ExportExcel from '../../../../components/common/ExcelExport'
import FolioHistory from '../FolioHistory'
import axios from 'axios';
import { FOLIO_STATUS, TYPE_TERR } from '../constants'
import PopupModel from '../../../../components/popups/PopupModel'
import PopupContentCustom from '../../../../components/popups/PopupContentCustom'

const btnWidth = css`
    max-width: 250px;
    display: inline-block;
    
`


const exportExcelName = 'sheet-local-history';
type FormValues = {
    content: string;
    image: string;
    AdditionalDescription: string;
};

export const FolioOfferLandDetail: React.FC = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()


    const location = useLocation()

    const [lcData, setLcData] = useState<any>({})
    const [files] = useState<File[]>([])
    const [fileUpload, setFileUpload] = useState<any>({});
    const [paramStatus, setParamStatus] = useState<any>()
    const [fileName, setFileName] = useState('');
    // const [files, setFiles] = useState<any>([])
    const [statusList, setStatusList] = useState<any>([])
    const [users, setUsers] = useState<any>([])

    const navigate = useNavigate();
    const [params, setParams] = useState<any>()

    const loginStatus = useAppSelector(getLoginStatus);
    const loginType = useAppSelector(getLoginType);
    const loginUser = useAppSelector(getLoginUser);
    const loader = useAppSelector(getLoader);
    const dispatch = useAppDispatch();

    const [selectedUser, setSelectedUser] = useState<any>('')
    const [selectedStatus, setSelectedStatus] = useState<any>('')
    const [changedRadioStatus, setChangedRadioStatus] = useState<any>('')
    const [userComment, setUserComment] = useState<any>('')
    const [uploadError, setUploadError] = useState<any>({});
    const [modelOpen, setModelOpen] = useState(false);
    const [popupType, setPopupType] = useState<any>('')

    function openModel(type: any) {
        setPopupType(type)
        setModelOpen(true)
        dispatch(setLoader(false));
    }

    function handleModelClose() {

        setModelOpen(false)
        navigate(RoutesConstants.FolioLand)
    }


   

    const checkRequiredParams = () => {
        let status = true
        if (location.hasOwnProperty('state')) {
            if (!location.state)
                status = false
            else {
                setParams(location.state)
                setLcData(location.state)
            }

        }

        if (!status) {
            console.log('Error, Params not send ')
        }

        setParamStatus(status)
    }


    const getStatusDropdowns = () => {

        getStatusOptions().then((response: any) => {
            setStatusList(response.data)
        })
        .catch((error: any) => {
            console.log('getStateList error', error)
            //setModalErrorIsOpen(true)
            openModel(POPUP_TYPE_ERROR)
        })

    }

    const renderFileExtensionsEror = () => {
        let text = ['kmz', 'bmp', 'jpg', 'jpeg', 'pdf', 'ppt', 'pptx', 'xls', 'xlsx', 'doc', 'docx'].join(", .");
        text = '.' + text;
        return text
    }

   

    const getFolioUsersList = (ldDataTemp: any) => {
        dispatch(setLoader(true));
        let temp = {
            stateId: ldDataTemp.stateId,
            townId: ldDataTemp.townId,
            folioId: lcData.folio,
        }
        getFolioUsersOfferLand(temp).then((response: any) => {
            setUsers(response.data)
            dispatch(setLoader(false));
        })
        .catch((error: any) => {
            console.log('getStateList error', error)
            dispatch(setLoader(false));
            openModel(POPUP_TYPE_ERROR)
            //setModalErrorIsOpen(false)
        })

    }


    const validateFiles = (filesDiff: File[]) => {
        filesDiff.forEach(function (file) {
            let fileExtension: any = file.name.split('.').pop();
            
            if (!(['kmz', 'bmp', 'jpg', 'jpeg', 'pdf', 'ppt', 'pptx', 'xls', 'xlsx', 'doc', 'docx'].indexOf(fileExtension) > -1)) {
                setUploadError({
                    message: "Debe seleccionar archivos con formato" + renderFileExtensionsEror(),
                })
                return false;
            }
        })
        return true;
    }

    const selectFileBtn = (e: any) => {
        setUploadError({});
        let differenceFiles: File[] = [...e.target.files].filter((x: any) => !files.includes(x));
        let validationResult = validateFiles(differenceFiles);
        if (!validationResult) {
            e.preventDefault()
            return false
        }
        setFileUpload(e.target.files);
        setFileName(e.target.files[0]?.name);
    }

    const canUpdateFolio = () => {


        if (loginStatus && loginType == USER_INTERNAL) {
            return true
        }

        return false
    }

    const getFolioDetails = () => {
        getTerrenoFolioDetail(params.folio).then((response: any) => {
            if (response.data.length > 0) {
                setLcData(response.data[0])
                if(canUpdateFolio())
                    getFolioUsersList(response.data[0])
            }
            //dispatch(setLoader(false));
        })
        .catch((error: any) => {
            console.log('getStateList error', error)
            //dispatch(setLoader(false));
            //setModalErrorIsOpen(true)
            openModel(POPUP_TYPE_ERROR)
        })

    }

    const sendFormData = async (data: any) => {
        dispatch(setLoader(true));
        let dataTemp: any = {
            folioId: lcData.folio,
            userId: lcData?.assignedUser?.internalUserId,
            requestStatusId: FOLIO_STATUS.INFO_SENT,
            comment: data.AdditionalDescription,
            email: lcData.email,
            externalUserId: lcData.externalUserId,
        }

        const formData = new FormData();



        try {
            const response: any = await postchangeFolioStatusOfferLand(dataTemp)
            if (response && fileUpload && fileUpload.length) {

                for (let i = 0; i < fileUpload.length; i++) {
                    formData.append('files', fileUpload[i]);
                    //formData.append('comments', data.twistDescription);
                    //formData.append('folioId', lcData.folio);
                    formData.append('uploadToken', lcData?.uploadToken);
                    // formData.append('requestRecordId', response?.data.requestRecordId);
                }
                await axios.post(uploadFiles1(), formData);
                // setSelectedStatus(3);
                openModel(POPUP_TYPE_SUCCESS)
            }
            dispatch(setLoader(false));
        } catch (error) {
            openModel(POPUP_TYPE_ERROR)
            console.log('error while uploading files bulk upload is: ', error);
            dispatch(setLoader(false));
        }
       



    }
    const onSubmit = handleSubmit((data) => {


        if (fileUpload.length > 0 && Object.keys(uploadError).length === 0) {


            sendFormData(data);
        } else {
            setUploadError({
                message: "wrong file format or No File",
            })
        }



    });

    const renderFileExtensions = () => {
        let text = ['kmz', 'bmp', 'jpg', 'jpeg', 'pdf', 'ppt', 'pptx', 'xls', 'xlsx', 'doc', 'docx'].join(", .");
        text = '.' + text + ' - Max. weight 6 MB';
        return text
    }
    const externalUserCommentUpload = () => {

        if (selectedStatus === 2) {
            return (<> <div className='row'>
                <div className='col s12 m12'>
                    <InputTextbox field={FormFields.AdditionalDescription} register={register} error={errors} />
                </div>
            </div>
                <div className='row'>
                    <div className='col s12 m6'>
                        <div style={{ position: 'relative' }}>
                            <input type="file" id="bulk_upload" className='input-file-btn-style' onChange={(e) => selectFileBtn(e)} />
                            <label htmlFor="bulk_upload" className='file-upload-btn-style bulk-upload-button'>Seleccionar archivo</label>
                            <span className='file-name-style'>{fileName}</span>
                            <div className="input-document-types">{renderFileExtensions()}</div>
                            <div className="input-error">{uploadError && uploadError.message}</div>
                        </div>
                    </div>
                </div>
            </>
            )
        }
    }
    const comment = () => {
        if ((selectedStatus === 2 && changedRadioStatus === 2) || changedRadioStatus === 2) {
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

    

    useEffect(() => {
        checkRequiredParams()



        if (canUpdateFolio()) {
            getStatusDropdowns()
            // getFolioUsersList()
        }



    }, [])
    // useEffect(() => {
    //     if (lcData && canUpdateFolio()) {
    //         getFolioUsersList()
    //     }

    // },[lcData])

    useEffect(() => {
        if (params) {
            getFolioDetails()
            // getFiles()
        }
    }, [params])

    useEffect(() => {
        if (lcData && lcData.assignedUser) {
            if (lcData.assignedUser.internalUserId) {
                let user = users.filter((obj: any) => {
                    return obj.internalUserId === lcData.assignedUser.internalUserId
                })
                if(user && user.length > 0)
                    setSelectedUser(user[0])
            }
        }
        if (lcData) {
            setSelectedStatus(lcData.requestStatusId)
            setChangedRadioStatus(lcData.requestStatusId)
        }

    }, [lcData, users])

    //const paramStatus = checkRequiredParams()

    if (!paramStatus) {
        return (
            <>Not Found</>
        )
    }



    const handleCancelBtn = () => {
        // alert('dsfds')
        navigate(RoutesConstants.FolioLand)
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
            console.log('getStateList error', error)
            dispatch(setLoader(false));
        })

    }
    const postChangeStatus = () => {
        dispatch(setLoader(true));
        let dataTemp: any = {
            folioId: lcData.folio,
            //userId: loginUser.id,
            requestStatusId: changedRadioStatus,
            comment: userComment,
            email: lcData.email,
            externalUserId: lcData.externalUserId,
        }

        postchangeFolioStatusOfferLand(dataTemp).then(() => {
            dispatch(setLoader(false));
            openModel(POPUP_TYPE_SUCCESS)
        })
        .catch((error: any) => {
            dispatch(setLoader(false));
            openModel(POPUP_TYPE_ERROR)
            console.log('getStateList error', error)
        })

    }

    const postForm = () => {
        if (canChangeUser(loginUser)) {
            postChangeUser()
        }
        if (canChangeStatus(loginUser)) {

            postChangeStatus()
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

        let paramsEx: any = {
            folioId: lcData.folio,
            export: 1
        }

        getOfferLandHistoryExportData(paramsEx).then((response: any) => {
            if (response.data)
                exportToExcel(response.data, exportExcelName)
        })
            .catch((error: any) => {
                console.log(error)
                //setModalErrorIsOpen(true)
            })


    }
    const { renderExcelButton } = ExportExcel({ exportExcel: startExcel })



    return (
        <div className='page-container'>
            <div className='container main-container'>
                <div className='page-content'>
                    <div className='desc-container'>
                        <div className="title-wrapper">
                            <MainTitle text={"Seguimiento de Terrenos"} />
                        </div>
                        <div className="title-wrapper text-center">
                            <SmallTitle text={"Folio de atención " + lcData.folioCd} className='main-clr' />
                        </div>
                    </div>

                    <div className='forms-container'>
                        <CollapsibleFolio>
                            <div className='row'>
                                <div className='col s12'>

                                    <SmallTitle text=" Datos Generales" />
                                </div>

                            </div>
                            <div className='row'>
                                <div className='col s12 m6'>
                                    <InputText field={FormFields.firstNames} value={lcData.name} disabled={true} />
                                </div>
                                <div className='col s12 m6'>
                                    <InputText field={FormFields.lastName} value={lcData.paternalSurname} disabled={true} />
                                </div>

                            </div>


                            <div className='row'>
                                <div className='col s12 m6'>
                                    <InputText field={FormFields.motherLastName} value={lcData.maternalSurname} disabled={true} />
                                </div>
                                <div className='col s12 m6'>
                                    <InputText field={FormFields.razonSocial} value={lcData.businessName} disabled={true} />
                                </div>

                            </div>


                            <div className='row'>

                                <div className='col s12 m6'>
                                    <InputText field={FormFields.profile} value={lcData.profile} disabled={true} />
                                </div>
                                <div className='col s12 m6'>
                                    <InputText field={FormFields.phoneNumber} value={lcData.phoneNumber} disabled={true} />
                                </div>



                            </div>


                            <div className='row'>

                                <div className='col s12 m6'>
                                    <InputText field={FormFields.phone} value={lcData.mobile} disabled={true} />
                                </div>
                                <div className='col s12 m6'>
                                    <InputText field={FormFields.email} value={lcData.email} disabled={true} />
                                </div>




                            </div>


                            <div className='row'>
                                <div className='col s12'>

                                    <SmallTitle text=" Datos del Terreno" />
                                </div>

                            </div>


                            <div className='row'>
                                <div className='col s12 m6'>
                                    <InputText field={FormFields.guy} value={lcData.propertyTypeDs} disabled={true} />
                                </div>
                                <div className='col s12 m6'>
                                    <InputText field={FormFields.state} value={lcData.state} disabled={true} />
                                </div>

                            </div>
                            <div className='row'>
                                <div className='col s12 m6'>
                                    <InputText field={FormFields.city} value={lcData.city} disabled={true} />
                                </div>
                                <div className='col s12 m6'>
                                    <InputText field={FormFields.street} value={lcData.street} disabled={true} />
                                </div>

                            </div>
                            <div className='row'>
                                <div className='col s12 m6'>
                                    <InputText field={FormFields.number} value={lcData.streetNumber} disabled={true} />
                                </div>
                                <div className='col s12 m6'>
                                    <InputText field={FormFields.colony} value={lcData.colony} disabled={true} />
                                </div>

                            </div>
                            <div className='row'>
                                <div className='col s12 m6'>
                                    <InputText field={FormFields.municipilaty} value={lcData.municipality} disabled={true} />
                                </div>
                                <div className='col s12 m6'>
                                    <InputText field={FormFields.zip} value={lcData.postalCode} disabled={true} />
                                </div>

                            </div>
                            <div className='row'>
                                <div className='col s12 m6'>
                                    <InputText field={FormFields.location} value={lcData.location} disabled={true} />
                                </div>
                                <div className='col s12 m6'>
                                    <InputText field={FormFields.betweenStreet} value={lcData.betweenOneStreet} disabled={true} />
                                </div>

                            </div>
                            <div className='row'>
                                <div className='col s12 m6'>
                                    <InputText field={FormFields.and} value={lcData.betweenTwoStreet} disabled={true} />
                                </div>


                            </div>

                            <div className='row'>
                                <div className='col s12'>
                                    <SmallTitle text=" Ficha Técnica" />

                                </div>

                            </div>

                            <div className='row'>
                                <div className='col s12 m6'>
                                    <InputText field={FormFields.surface} value={lcData.areaNumber} disabled={true} />
                                </div>
                                <div className='col s12 m6'>
                                    <InputText field={FormFields.landUse} value={lcData.landUse} disabled={true} />
                                </div>

                            </div>

                            <div className='row'>
                                <div className='col s12'>
                                    <InputTextBox field={FormFields.description} value={lcData.descriptionDS} disabled={true} />
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col s12'>
                                    <SmallTitle text="Datos de la oferta" />

                                </div>

                            </div>

                            <div className='row'>
                                <div className='col s12 m6'>
                                    <InputText field={FormFields.typeOperation} value={lcData.operationType} disabled={true} />
                                </div>
                                <div className='col s12 m6'>
                                    <InputText field={FormFields.price} value={lcData.price} disabled={true} />
                                </div>

                            </div>


                        </CollapsibleFolio>



                    </div>

                    {!canUpdateFolio() && (
                        externalUserCommentUpload()

                    )}
                    <div className={loader ? 'loader-app-container ' : 'loader-app-container hide'} >
                        <div className='loader-app'></div>
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
                                        module={TYPE_TERR}
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
                            type="offerLand"
                            folioId={lcData.folio}
                            activeStatus={lcData.activeCd}
                            folioCd={lcData.folioCd}
                        />
                    </div>

                </div>
            </div>
            <PopupModel isOpen={modelOpen} closePopup={handleModelClose} height='260px' width='30%'>
                <PopupContentCustom closePopup={handleModelClose} type={popupType} />
            </PopupModel>
        </div>
    )
}
