import React, { useState } from 'react';
import { MainTitle } from "../../components/common/Titles";
import './styles.css';
import axios from 'axios';
import {catalogUpload} from '../../../src/resources/api-constants';
import { useAppDispatch } from '../../store/hooks';
import { setLoader } from '../../store/loaderReducer';
import { redirectUrl } from '../../resources/project-constants';
import PopupModel from '../popups/PopupModel';
import EmailConfirmationPopup from '../popups/PopupEmailSent';
import ExportExcel from '../../components/common/ExcelExport'


export const BulkUpload: React.FC = () => {
    const dispatch = useAppDispatch();
    const [fileUpload, setFileUpload] = useState<any>({});
    const [fileName, setFileName] = useState('');
    const [openPopup, setOpenPopup] = useState(false);
    const uploadFiles = async(filesParam: any)=>{
        dispatch(setLoader(true));
        if(filesParam && filesParam.length){
            const formData = new FormData();
            for(let i = 0; i< filesParam.length; i++){
                formData.append('file', filesParam[i]);
            }
            try {
                await axios.post(catalogUpload(), formData);
                dispatch(setLoader(false));
                setOpenPopup(true);
            } catch (error) {
                
                dispatch(setLoader(false));
                setOpenPopup(true);
            }
        }
    }

    
    const selectFileBtn = (e: any)=>{
        setFileUpload(e.target.files);
        setFileName(e.target.files[0].name);
    }
    const { exportToExcel, } = ExportExcel({})
    const handleDownload = () => {
        //const filePath = '../../files/Plantilla.csv';
        let result = [{'Nomenclatura':'L14','Determinante':'2079','Tipo':'2','m^2':'25.00','m Frente':'2.34','m Fondo':'x','Imagen1':'','Imagen2':'','Imagen3':'','Imagen4':''}]
        exportToExcel(result,'Plantilla','.csv' )
      };
    
    const handleClosePopup = ()=>{
        setOpenPopup(false);
    }
    return(
        <div className='page-container'>
            <div className="title-wrapper">
                <MainTitle text={"Carga Masiva"} />
            </div>
            <div className='row'>
                <div className='col s2 offset-s5'>
                    <div style={{ position: 'relative' }}>
                        <input type="file" id="bulk_upload" className='input-file-btn-style' onChange={(e)=>selectFileBtn(e)}/>
                        <label htmlFor="bulk_upload" className='file-upload-btn-style bulk-upload-button'>Seleccionar archivo</label>
                        <span className='file-name-style'>{fileName}</span>
                    </div>
                </div>
            </div>
                <div className='row'>
                    <div className='col s4 offset-s4'>
                        <span className='file-formats'>Formatos permitidos:</span>
                        <span className='file-format-names'>csv</span>
                    </div>

                    <div className='col s4 offset-s4'>
                        <span className='file-formats align-file-format-name'>Tamaño máximo permitido:</span>
                        <span className='file-format-names '>500 KB.</span>
                    </div>
                </div>
                <div className='row'>
                    <div className='col s2 offset-s4'><span className='file-upload-btn-style button-eff' onClick={()=>uploadFiles(fileUpload)}>Procesar Locales</span></div>
                    <div className='col s2'><span onClick={()=>handleDownload()} className='file-upload-btn-style button-eff'>Descargar Layout</span></div>
                </div>
                <div className='row'>
                    <div className='col s3 offset-s4'><span className='file-upload-btn-style cancelar-btn button-eff' onClick={()=>window.location.assign(redirectUrl)}>Cancelar</span></div>
                </div>
                <PopupModel  isOpen={openPopup} closePopup={handleClosePopup} height='200px' width='40%'>
                    <EmailConfirmationPopup closePopup={handleClosePopup} content={'File Uploaded Successfully.'}/>
                </PopupModel>
        </div>
    )
}