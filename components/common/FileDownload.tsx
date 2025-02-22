import React from "react";
import * as FileSaver from 'file-saver'
//import XLSX from 'sheetjs-style'

interface  Props  {
   
    files:Array<any>
}


const FileDownload = (props:Props) => {
   
   


    const b64toBlob = (b64Data:any, contentType:any, sliceSize=512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];
      
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          const slice = byteCharacters.slice(offset, offset + sliceSize);
      
          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }
      
          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }
          
        const blob = new Blob(byteArrays, {type: contentType});
        return blob;
    }

     const downloadFile = async (file:any) => {
        let fileNameArr = file.requestDocumentName.split('.')
        let fileName = fileNameArr[0]
        let fileExtension =  '.' + fileNameArr[fileNameArr.length-1]
        let fileType = ''
        const blob = b64toBlob(file.documentData, '')
        const data = new Blob([blob], {type: fileType})
        FileSaver.saveAs(data, fileName + fileExtension) 
    }
      
   


    return (

        <div>
            {props.files.map((file, x) => (
                <div key={x} onClick={() => downloadFile(file)}> <a className="cursor-hand">{file.requestDocumentName}</a> </div>
            ))}
        </div>
    )


    

    
}

export default FileDownload