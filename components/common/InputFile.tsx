import React, { useState, useEffect} from "react";
import Image from "./Image";
import { setUploadFiles, setUploadFilesComercial2, setUploadFilesComercial3, 
  setUploadFilesConstructionOne, setUploadFilesConstructionTwo, setUploadFilesConstructionThree,
  setUploadFilesMaterialsOne, setUploadFilesMaterialsTwo } from '../../store/fileUploadReducer';
import { useAppDispatch } from '../../store/hooks'
import PopupModel from "../popups/PopupModel";
import PopupContentFileError from "../popups/PopupContentFileError";

interface  Props  {
  field:any
  register:any
  error:any
  getValues? : any
  setValue? : any
  setError? : any
  clearErrors? : any
  fileExtensions? : string[],
  fromName?: string
  
}

const maxFileSizeKb = 6000000 
// const maxFileSizeKb = 100 
const defaultFileExtensions = ['kmz' ,'bmp' ,'jpg','jpeg' ,'pdf' ,'ppt' ,'pptx', 'xls', 'xlsx', 'doc', 'docx' ] 

// export const Input = ({ label, type, id, placeholder, register, validation= {} }) => {
export const InputFile = (props:Props) => {

    const [files, setFiles] = useState<File[]>([])
    const [modalErrorIsOpen, setErrorIsOpen] = useState(false);
    const [extensionError, setExtensionError] = useState('');

    const fileExtensions = props.fileExtensions ? props.fileExtensions : defaultFileExtensions

    
    const dispatch = useAppDispatch();



    useEffect(() => {

      
      props.setValue(props.field.id, files);
      

      
        
    }, [files]);

    useEffect(()=>{
      dispatch(setUploadFiles([]));
    }, []);

    useEffect(()=>{
      
      if(props.getValues(props.field.id) && props.getValues(props.field.id).length > 0)
        setFiles(props.getValues(props.field.id))
    }, [props]);

    

    const renderFileExtensionsEror = () => {
      let text = fileExtensions.join(", .");
      text = '.' + text ;
      return text
    }

    const validateFiles = (filesDiff: File[]) => {

      let result = true
      
      filesDiff.forEach(function(file) {
          
          
          if(  file.size > maxFileSizeKb )
          {
            

            props.setError(props.field.id, {
              type: "manual",
              message: "Max file size error",
            })

            result =  false
          }

          let fileExtension:any = file.name.split('.').pop();
          
          if (!(fileExtensions.indexOf(fileExtension) > -1))
          {
            
            //alert('No puede seleccionar un archivo de extensión exe. Intente nuevamente...')
            props.setError(props.field.id, {
              type: "manual",
              message: "Debe seleccionar archivos con formato" +  renderFileExtensionsEror(),
            })
            result =  false

            setErrorIsOpen(true)
            setExtensionError(fileExtension)
          }

          let sameFileUploaded:any = [...files].filter((x:any )=> x.name === file.name)
          
          if(sameFileUploaded.length > 0)
          {
            
            props.setError(props.field.id, {
              type: "manual",
              message: "El archivo ya ha sido seleccionado: " + file.name,
            })
            result =  false
          }

          

      });

      if(result)
        props.clearErrors(props.field.id)

      return  result

    }

    const onChangeHandler = (e:any) => {
        
       

        let differenceFiles:File[] = [...e.target.files].filter((x:any )=> !files.includes(x));
        

        let validationResult = validateFiles(differenceFiles)
        
        if(!validationResult)
        {
          e.preventDefault()
          return false 
        }


        let oldFiles = files
        oldFiles.concat(e.target.files)
        
        if(props.field.multiple && props.fromName === 'comercial2'){
          // await setFiles(existing => [...existing, ...e.target.files]);
          setFiles(prev => {
            //end point call upload files.
           
            dispatch(setUploadFilesComercial2([...prev, ...e.target.files]));
            return [...prev, ...e.target.files]
          });
        }
        else if(props.field.multiple && props.fromName === 'comercial3'){
          // await setFiles(existing => [...existing, ...e.target.files]);
          setFiles(prev => {
            //end point call upload files.
            dispatch(setUploadFilesComercial3([...prev, ...e.target.files]));
            return [...prev, ...e.target.files]
          });
        }
        else if(props.field.multiple && props.fromName === 'construction1'){
          // await setFiles(existing => [...existing, ...e.target.files]);
          setFiles(prev => {
            //end point call upload files.
            dispatch(setUploadFilesConstructionOne([...prev, ...e.target.files]));
            return [...prev, ...e.target.files]
          });
        }
        else if(props.field.multiple && props.fromName === 'construction2'){
          // await setFiles(existing => [...existing, ...e.target.files]);
          setFiles(prev => {
            //end point call upload files.
            dispatch(setUploadFilesConstructionTwo([...prev, ...e.target.files]));
            return [...prev, ...e.target.files]
          });
        }
        else if(props.field.multiple && props.fromName === 'construction3'){
          // await setFiles(existing => [...existing, ...e.target.files]);
          setFiles(prev => {
            //end point call upload files.
            dispatch(setUploadFilesConstructionThree([...prev, ...e.target.files]));
            return [...prev, ...e.target.files]
          });
        }
        else if(props.field.multiple && props.fromName === 'materials1'){
          // await setFiles(existing => [...existing, ...e.target.files]);
          setFiles(prev => {
            //end point call upload files.
            dispatch(setUploadFilesMaterialsOne([...prev, ...e.target.files]));
            return [...prev, ...e.target.files]
          });
        } 
        else if(props.field.multiple && props.fromName === 'materials2'){
          // await setFiles(existing => [...existing, ...e.target.files]);
          setFiles(prev => {
            //end point call upload files. 
            dispatch(setUploadFilesMaterialsTwo([...prev, ...e.target.files]));
            return [...prev, ...e.target.files]
          });
        } 
        else if(props.field.multiple){
          // await setFiles(existing => [...existing, ...e.target.files]);
          setFiles(prev => {
            //end point call upload files.
            dispatch(setUploadFiles([...prev, ...e.target.files]));
            return [...prev, ...e.target.files]
          });
        }
        else{
          // we are using same method name because we can add multiple files/ one file in same enpoint named "/upload"
          if(props.fromName === 'comercial2'){
            dispatch(setUploadFilesComercial2([...e.target.files]));
            setFiles([...e.target.files]);
          }
          else if(props.fromName === 'comercial3'){
            dispatch(setUploadFilesComercial3([...e.target.files]));
            setFiles([...e.target.files]);
          }
          else if(props.fromName === 'construction1'){
            dispatch(setUploadFilesConstructionOne([...e.target.files]));
            setFiles([...e.target.files]);
          }
          else if(props.fromName === 'construction2'){
            dispatch(setUploadFilesConstructionTwo([...e.target.files]));
            setFiles([...e.target.files]);
          }
          else if(props.fromName === 'construction3'){
            dispatch(setUploadFilesConstructionThree([...e.target.files]));
            setFiles([...e.target.files]);
          }
          else if(props.fromName === 'materials1'){
            dispatch(setUploadFilesMaterialsOne([...e.target.files]));
            setFiles([...e.target.files]);
          }
          else if(props.fromName === 'materials2'){
            dispatch(setUploadFilesMaterialsTwo([...e.target.files]));
            setFiles([...e.target.files]);
          }
          else{
            dispatch(setUploadFiles([...e.target.files]));
            setFiles([...e.target.files]);
          }      
        }
        
        

        

        
    }

    const deleteFile = (file:File) => {
       
        let newArray = files.filter(function( obj ) {
          return obj !== file;
        });
       
        setFiles(newArray)


    }

    const renderFileItems = () => {
      
      let list : any[] = []
      if (files) {
        for (var i = 0; i < files.length; i++) {
          let item = files[i]
          
          list.push(<div key={item.name + i}>{item.name}<span className="trash-file-icon" onClick={() => deleteFile(item)}><Image name="trash.png" /></span></div>)
        }
      }


      return (
        <>
          {list}
        </>
      )
    }

    const renderFileExtensions = () => {
      let text = fileExtensions.join(", .");
      text = '.' + text + ' - Max. weight 6 MB';
      return text
    }

    
    return (
        // <>
        // </>
      <div className="form-input input-container">
        <div className="">
          <label htmlFor={props.field.id} className="input-label">
            {props.field.label}
          </label>
        </div>
        <div className="">
          <label htmlFor={props.field.id} className="btn-fileupload">
           Seleccionar archivo
          </label>
        </div>
        <input
          id={props.field.id}
          type="file"
          multiple={props.field.multiple}
          
          className="input-file hide"
          placeholder={props.field.placeholder}
          {...props.register(props.field.id,props. field.validation)}
          onChange={(e:any) => onChangeHandler(e)}
          
        />
        <div className="input-document-types">{renderFileExtensions()}</div>
        <div className="uploaded-files-list js-upload-files" >
          {renderFileItems()}
         
        </div>
        <div className="input-error">{props.error && props.error.message}</div>

        <PopupModel  isOpen={modalErrorIsOpen} closePopup={() => setErrorIsOpen(false)} height='300px' width='50%'>
            <PopupContentFileError extension={extensionError} closePopup={() => setErrorIsOpen(false)}/>
        </PopupModel>
        
      </div>
      
    )
  }