import React, { useState, useEffect } from 'react'
import { MainTitle, SmallTitle } from '../../../../components/common/Titles'
import { InputText } from '../../../../components/Inputs/InputText'
import { LocalComerical as FormFields } from '../../../../resources/formInputJson'
import RadioStatus from '../RadioStatus'
//import Select from 'react-select'
import { PrimaryButton, SecondryButton } from '../../../../components/common/Buttons'
import { css } from 'goober'
import { useForm } from 'react-hook-form';
//import { useLocation } from 'react-router-dom'
import { getStatusOptions, getFolioUsersSupplier, postAssignUserSupplierMaterial, postchangeFolioStatusMaterial, getSupplierHistoryExportData } from '../../../../services/folioTracking/folioTrackingService'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom'
import RoutesConstants from '../../../../resources/route-constants'
import { getLoginStatus, getLoginType, getLoginUser } from '../../../../store/authReducer'
import { useAppSelector, useAppDispatch } from '../../../../store/hooks'
import { POPUP_TYPE_ERROR, POPUP_TYPE_SUCCESS, USER_INTERNAL } from './../../../../resources/project-constants';
import { getSupplierFolioDetail } from '../../../../services/folioTracking/folioTrackingService'
// import FileDownload from '../../../../components/common/FileDownload'
import CollapsibleFolio from './../../../../components/common/CollapsibleFolio';
import { canChangeUser, canChangeStatus, renderYesNo } from '../../../../utility/commonFunctions'
//import ExportExcel from '../../../../components/common/ExcelExport'
import FolioHistory from '../FolioHistory'
import XLSX from 'sheetjs-style'
import { InputTextbox } from '../../../../components/common/InputTextbox'
import axios from 'axios';
import { uploadFiles1 } from '../../../../resources/api-constants';
import { FOLIO_STATUS, SUBTYPE_MAT, TYPE_SUPP } from '../constants'
import { setLoader, getLoader } from '../../../../store/loaderReducer'
import PopupModel from '../../../../components/popups/PopupModel'
import Image from "./../../../../components/common/Image";
import PopupContentCustom from '../../../../components/popups/PopupContentCustom'

const btnWidth = css`
    max-width: 250px;
    display: inline-block;
    
`

interface Props {
    folio: any
}

type FormValues = {
    content: string;
    image: string;
};

//const exportExcelName = 'sheet-local-history';

export const FolioSupplierDetailMaterial: React.FC<Props> = (props) => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()

    const [lcData, setLcData] = useState<any>(props.folio)
    // const [files, setFiles] = useState<any>([])
    //const [paramStatus, setParamStatus] = useState<any>()
    const [fileName, setFileName] = useState('');
    const [fileUpload, setFileUpload] = useState<any>({});
    const [files] = useState<File[]>([])
    const [uploadError, setUploadError] = useState<any>({});
    const [statusList, setStatusList] = useState<any>([])
    const [users, setUsers] = useState<any>([])
    const navigate = useNavigate();

    const loginStatus = useAppSelector(getLoginStatus);
    const loginType = useAppSelector(getLoginType);
    const loginUser = useAppSelector(getLoginUser);
    const loader = useAppSelector(getLoader);

    const dispatch = useAppDispatch();

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


    const renderFileExtensionsEror = () => {
        let text = ['kmz', 'bmp', 'jpg', 'jpeg', 'pdf', 'ppt', 'pptx', 'xls', 'xlsx', 'doc', 'docx'].join(", .");
        text = '.' + text;
        return text
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

    function handleModelClose() {

        setModelOpen(false)
        navigate(RoutesConstants.FolioSupplier)
    }


    const getFolioUsersList = () => {

        let temp = {
            folioId: lcData.folio,
        }

        getFolioUsersSupplier(temp).then((response: any) => {
            setUsers(response.data)
        })
            .catch((error: any) => {
                console.log('getStateList error', error)
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
        //checkRequiredParams()
        // getFiles()

        if (canUpdateFolio()) {
            getStatusDropdowns()
            getFolioUsersList()
        }

    }, [])


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
    const sendFormData = async (data: any) => {
        dispatch(setLoader(true));


        let dataTemp: any = {
            folioId: lcData.folio,
            userId: lcData?.assignedUser?.internalUserId,
            requestStatusId: FOLIO_STATUS.INFO_SENT,
            comment: data.AdditionalDescription,
            email: lcData.email,
            form: 1,
            externalUserId: lcData.externalUserId,
        }

        const formData = new FormData();



        try {


            const response: any = await postchangeFolioStatusMaterial(dataTemp);

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
                dispatch(setLoader(false))
            }
            dispatch(setLoader(false));
        } catch (error) {
            console.log('error while uploading files bulk upload is: ', error);
            openModel(POPUP_TYPE_ERROR)
            dispatch(setLoader(false));
        }

    }




    const postChangeUser = () => {
        dispatch(setLoader(true));
        let dataTemp: any = {
            folioId: lcData.folio,
            userId: selectedUser?.internalUserId,
            email: lcData.email,
        }

        postAssignUserSupplierMaterial(dataTemp).then(() => {
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
    const postChangeStatus = () => {
        dispatch(setLoader(true));
        let dataTemp: any = {
            folioId: lcData.folio,
            //userId: loginUser.id,
            requestStatusId: changedRadioStatus,
            comment: userComment,
            email: lcData.email,
            form: 2,
        }

        postchangeFolioStatusMaterial(dataTemp).then(() => {
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

    const postForm = () => {
        if (canChangeUser(loginUser)) {
            postChangeUser()
        }
        if (canChangeStatus(loginUser)) {

            postChangeStatus()
        }
    }


    const handleCancelBtn = () => {
        navigate(RoutesConstants.FolioSupplier)
    }

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



    const getFolioDetails = () => {

        let data = {
            folioId: props.folio.folio,
            form: 2
        }

        getSupplierFolioDetail(data).then((response: any) => {
            if (response.data.length > 0)
                setLcData(response.data[0])
        })
            .catch((error: any) => {
                console.log('getStateList error', error)
                openModel(POPUP_TYPE_ERROR)
                //setModalErrorIsOpen(true)
            })

    }


    useEffect(() => {
        // if(props.folio)
        getFolioDetails()
    }, [props])

    useEffect(() => {
        if (lcData && lcData.assignedUser) {
            if (lcData.assignedUser.internalUserId) {
                let user = users.filter((obj: any) => {
                    return obj.internalUserId === lcData.assignedUser.internalUserId
                })

                if (user && user.length > 0)
                    setSelectedUser(user[0])

            }
        }
        if (lcData) {
            setSelectedStatus(lcData.requestStatusId)
            setChangedRadioStatus(lcData.requestStatusId)
        }


    }, [lcData, users])


    const handleUserChange = (user: any) => {

        setSelectedUser(user)
    }

    const handleOnStatusChange = (status: any) => {


        setChangedRadioStatus(status)
    }

    const RenderExportExcelWithLinks = () => {

        const exportFunc = async () => {
            let paramsTemp = {
                folioId: lcData.folio,
                export: 1,
                form: 1
            }

            let responseData: any = await getSupplierHistoryExportData(paramsTemp);

            //keeping basic logic
            if (responseData.data.length == 1) {

                let arry = [["PICTFOLIO", "ESTATUS", "FECHA", "ADJUNTOS", "USUARIO_INTERNO", "COMENTARIO"]];
                let arry1 = [];
                let links = [];

                for (let i = 0; i < responseData.data.length; i++) {
                    if (responseData.data[i].documents.length > 0) {
                        for (let j = 0; j < responseData.data[i].documents.length; j++) {
                            arry1.push(responseData.data[i].documents[j].docName.substr(responseData.data[i].documents[j].docName.lastIndexOf('/') + 1).split('?')[0]);
                            links.push(responseData.data[i].adjuntos[j].docName)
                        }
                    }
                }

                for (let i = 0; i < responseData.data.length; i++) {
                    arry.push([responseData.data[i].pictFOLIO, responseData.data[i].estatus, responseData.data[i].fecha, arry1[0], responseData.data[i].usuario_INTERNO, responseData.data[i].comentario]);
                }

                if (arry1 && arry1.length > 1) {
                    for (let i = 1; i < arry1.length; i++) {
                        arry.push(['', '', '', arry1[i], '', '']); //pushing only ADJUNTOS present casess
                    }
                }



                let ws = XLSX.utils.aoa_to_sheet([...arry]);
                ws['!cols'] = [{ width: 25 }, { width: 25 }, { width: 25 }, { width: 24 }, { width: 24 }, { width: 30 }, { width: 28 }, { width: 29 }, { width: 29 }, { width: 28 }, { width: 30 }, { width: 30 }, { width: 30 }, { width: 34 }, { width: 34 }, { width: 35 }, { width: 54 }, { width: 34 }, { width: 29 }, { width: 30 }, { width: 33 }, { width: 32 }, { width: 32 }, { width: 33 }, { width: 33 }, { width: 33 }, { width: 33 }, { width: 33 }, { width: 33 }, { width: 33 }, { width: 33 }, { width: 33 }, { width: 33 }, { width: 30 }, { width: 30 }, { width: 30 }, { width: 30 }, { width: 30 }, { width: 30 }, { width: 30 }, { width: 30 }, { width: 30 }, { width: 30 }, { width: 30 }, { width: 30 }, { width: 30 }, { width: 30 }, { width: 30 }, { width: 30 }, { width: 30 }, { width: 30 }, { width: 30 }, { width: 30 }, { width: 30 }, { width: 30 }, { width: 30 }];



                if (links.length > 1) {//links

                    for (let i = 0; i < links.length; i++) {
                        console.log(i);
                        ws[XLSX.utils.encode_cell({
                            c: 3,
                            r: i + 1,
                        })].l = { Target: links[i] };

                    }
                }

               let wb = XLSX.utils.book_new();

                XLSX.utils.book_append_sheet(wb, ws, "data");
                XLSX.writeFile(wb, "sheet-local-history.xlsx");
            } else {
                let arry = [["PICTFOLIO", "ESTATUS", "FECHA", "ADJUNTOS", "USUARIO_INTERNO", "COMENTARIO"]];
                let links = [];
                for (let i = 0; i < responseData.data.length; i++) {
                    if (responseData.data[i].documents.length === 0) {
                        arry.push([responseData.data[i].pictFOLIO, responseData.data[i].estatus, responseData.data[i].fecha, '', responseData.data[i].usuario_INTERNO, responseData.data[i].comentario]);
                        links.push(" ");
                    } else {
                        arry.push([responseData.data[i].pictFOLIO, responseData.data[i].estatus, responseData.data[i].fecha, responseData.data[i].documents[0].docName.substr(responseData.data[i].documents[0].docName.lastIndexOf('/') + 1).split('?')[0], responseData.data[i].usuario_INTERNO, responseData.data[i].comentario]);
                        links.push(responseData.data[i].documents[0].docName);
                        for (let j = 1; j < responseData.data[i].documents.length; j++) {
                            arry.push(['', '', '', responseData.data[i].documents[j].docName.substr(responseData.data[i].documents[j].docName.lastIndexOf('/') + 1).split('?')[0], '', '']);
                            links.push(responseData.data[i].documents[j].docName);
                        }
                    }
                }
                let ws = XLSX.utils.aoa_to_sheet([...arry]);
                if (links.length > 1) { //links

                    for (let i = 0; i < links.length; i++) {

                        if (links[i] !== " ") {
                            ws[XLSX.utils.encode_cell({
                                c: 3,
                                r: i + 1,
                            })].l = { Target: links[i] };
                        }

                    }
                }

                ws['!cols'] = [{ width: 25 }, { width: 25 }, { width: 25 }, { width: 24 }, { width: 24 }, { width: 30 }, { width: 28 }, { width: 29 }, { width: 29 }, { width: 28 }, { width: 30 }, { width: 30 }, { width: 30 }, { width: 34 }, { width: 34 }, { width: 35 }, { width: 54 }, { width: 34 }, { width: 29 }, { width: 30 }, { width: 33 }, { width: 32 }, { width: 32 }, { width: 33 }, { width: 33 }, { width: 33 }, { width: 33 }, { width: 33 }, { width: 33 }, { width: 33 }, { width: 33 }, { width: 33 }, { width: 33 }, { width: 30 }, { width: 30 }, { width: 30 }, { width: 30 }, { width: 30 }, { width: 30 }, { width: 30 }, { width: 30 }, { width: 30 }, { width: 30 }, { width: 30 }, { width: 30 }, { width: 30 }, { width: 30 }, { width: 30 }, { width: 30 }, { width: 30 }, { width: 30 }, { width: 30 }, { width: 30 }, { width: 30 }, { width: 30 }, { width: 30 }];
                let wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "data");
                XLSX.writeFile(wb, "sheet-local-history.xlsx");
            }
        }

        return (<button className="export-btn" style={{ cursor: 'pointer' }} onClick={() => exportFunc()} >Exportar reporte <Image name="export-img.png" /> </button>);
    }







    //const { renderExcelButton } = ExportExcel({ exportExcel: startExcel })

    const onSubmit = handleSubmit((data) => {


        if (fileUpload.length > 0 && Object.keys(uploadError).length === 0) {


            sendFormData(data);
        } else {
            setUploadError({
                message: "wrong file format or No File",
            })
        }



    });



    return (
        <div className='page-container'>
            <div className='container main-container'>
                <div className='page-content'>
                    <div className='desc-container'>
                        <div className="title-wrapper">
                            <MainTitle text={"Seguimiento de Proveedores"} />
                        </div>
                        <div className="title-wrapper text-center">
                            <SmallTitle text={"Folio de atención " + lcData.folioCd} className='main-clr' />
                        </div>
                    </div>

                    <div className='forms-container'>
                        <CollapsibleFolio>
                            <div className='row'>
                                <div className='col s12 m6 '>
                                    <InputText field={FormFields.companyNameSupplier} value={lcData.businessName} disabled={true} />
                                </div>
                                <div className='col s12 m6 '>
                                    <InputText field={FormFields.contactName} value={lcData.contactNAme} disabled={true} />
                                </div>

                            </div>




                            <div className='row'>

                                <div className='col s12 m6 '>
                                    <InputText field={FormFields.phoneNumber} value={lcData.phoneNumber} disabled={true} />
                                </div>
                                <div className='col s12 m6 '>
                                    <InputText field={FormFields.phone} value={lcData.cellPhoneNmb} disabled={true} />
                                </div>


                            </div>


                            <div className='row'>
                                <div className='col s12 m6 '>
                                    <InputText field={FormFields.email} value={lcData.email} disabled={true} />
                                </div>

                                <div className='col s12 m6 '>
                                    <InputText field={FormFields.productName} value={lcData.productName} disabled={true} />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col s12 m6 '>
                                    <InputText field={FormFields.manufacturer} value={lcData.providerMaterialDs} disabled={true} />
                                </div>

                                <div className='col s12 m6 '>
                                    <InputText field={FormFields.saleExclusivity} value={renderYesNo(lcData.exclusiveSales)} disabled={true} />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col s12 m6 '>
                                    <InputText field={FormFields.coverLetter} value={lcData.presentationLetterDoc} disabled={true} />
                                </div>

                                <div className='col s12 m6 '>
                                    <InputText field={FormFields.technical} value={lcData.techSpecification} disabled={true} />
                                </div>
                            </div>
                            <div className='row'>


                                <div className='col s12'>
                                    <InputText field={FormFields.comment} value={lcData.comments} disabled={true} />
                                </div>
                            </div>






                        </CollapsibleFolio>

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
                                        module={TYPE_SUPP}
                                        subModule={SUBTYPE_MAT}
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
                    <div className={loader ? 'loader-app-container ' : 'loader-app-container hide'} >
                        <div className='loader-app'></div>
                    </div>


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

                    {canUpdateFolio() && (<div className='export-container'>
                        <div className='row'>
                            <div className='col s12 text-right'>
                                {RenderExportExcelWithLinks()}
                            </div>
                        </div>

                    </div>)}




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
                                    
                                            <td>{lcData.dxRequestStatusDs}</td>
                                            <td>{lcData.createDate  }</td>
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
                            type="supplier"
                            folioId={lcData.folio}
                            activeStatus={lcData.activeCd}
                            subType="material"
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
