import React, { useState } from "react";
import PopupModel from "../popups/PopupModel";
import PopupContentFileError from "../popups/PopupContentFileError";

const defaultFileExtensions = ['bmp' ,'jpg','jpeg', 'png' ] 
const maxFileSizeKb = 6000000 

const InputFile = (props: any) => {

    const [modalErrorIsOpen, setErrorIsOpen] = useState(false);
    const [extensionError, setExtensionError] = useState('');
    const [file, setFile] = useState<any>();
    


    const validateFiles = (filesDiff: any) => {

        let result = true

        for (const item of filesDiff) {
        // filesDiff.forEach(function(file:any) {
           
            
            if(  item.size > maxFileSizeKb )
            {
              //alert('File Size Max Alert')
  
                result =  false
            }
  
            let fileExtension:any = item.name.split('.').pop();
            
            if (!(defaultFileExtensions.indexOf(fileExtension) > -1))
            {
              
              //alert('No puede seleccionar un archivo de extensión exe. Intente nuevamente...')
             
              result =  false
  
              setErrorIsOpen(true)
              setExtensionError(fileExtension)
            }
 
  
        };
  
        return  result
  
    }

    const handleOnChange = (e: any) => {
        let validationResult = validateFiles(e.target.files)
        
        if(!validationResult)
        {
          e.preventDefault()
          return false 
        }
        //let files = [...e.target.files]
        if(e.target.files && e.target.files.length > 0)
        {
            let temp = e.target.files[0]
            setFile(temp)    
            props.saveValue(props.rowKey, temp)
        }
       
    }


    const renderFileExtensions = () => {
        let text = defaultFileExtensions.join(", .");
        text = '.' + text + ' - Peso máx. 6 MB';
        return text
    }

    const renderFile = () => {
        if(file)
        {
            return file.name   
        }
    }


    return (


        <div className="form-input input-container">
            
            <div className="">
                <label className="btn-fileupload">
                Seleccionar archivo
                
            <input
                type="file"
                multiple={false}
                
                className="input-file hide"
                
                onChange={(e: any) => handleOnChange(e)}

            />
            </label>
            </div>
            <div className="input-document-types">{renderFileExtensions()}</div>
            {renderFile()}
           
            <div className="input-error">{props.error && props.error.message}</div>

            <PopupModel isOpen={modalErrorIsOpen} closePopup={() => setErrorIsOpen(false)} height='300px' width='50%'>
                <PopupContentFileError extension={extensionError} closePopup={() => setErrorIsOpen(false)} />
            </PopupModel>

        </div>

    )
}

export default InputFile