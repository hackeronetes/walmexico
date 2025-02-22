import React from "react";
import * as FileSaver from 'file-saver'
import XLSX from 'sheetjs-style'
import Image from "./Image";

interface Props {
    //excelData:any,
    //fileName:any
    exportExcel?: any
}


const ExportExcel = (props: Props) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset-UTF-8'
    const fileExtension = '.xlsx'
    const exportToExcel = async (excelData: any, fileName: string,fileExtenProps?:any) => {
        const transformToUpper = (arrObj: any) => {
            let newObj = [];
            for (let obj of arrObj) {
                let temp: any = new Object();
                let keys = Object.keys(obj);
                let values:any = Object.values(obj);
                let i = 0;
                keys.forEach(key => {
                    key = key.toUpperCase();
                    
                    temp[`${key}`] = values[i++];
                    
                });
                newObj.push(temp);
            }
            return newObj;
        };
        let transformedExcelData = transformToUpper(excelData);
        const ws: any = XLSX.utils.json_to_sheet(transformedExcelData);
        
        ws['!cols'] = [{ width: 25 },{ width: 25 },{ width: 25 },{ width: 24},{ width: 24 },{ width: 30 },{ width: 28 },{ width: 29 },{ width: 29 },{ width: 28 },{ width: 30 },{ width: 30 },{ width: 30 },{ width: 34 },{ width: 34 },{ width: 35 },{ width: 54 },{ width: 34 },{ width: 29 },{ width: 30 },{ width: 33 },{ width: 32 },{ width: 32 },{ width: 33 },{ width: 33 },{ width: 33 },{ width: 33 },{ width: 33 },{ width: 33 },{ width: 33 },{ width: 33 },{ width: 33 },{ width: 33 },{ width: 30 },{ width: 30 },{ width: 30 },{ width: 30 },{ width: 30 },{ width: 30 },{ width: 30 },{ width: 30 },{ width: 30 },{ width: 30 },{ width: 30 },{ width: 30 },{ width: 30 },{ width: 30 },{ width: 30 },{ width: 30 },{ width: 30 },{ width: 30 },{ width: 30 },{ width: 30 },{ width: 30 },{ width: 30 },{ width: 30 }];
        const headerRange = XLSX.utils.decode_range(ws['!ref']);
        
        
        
       
        for(let row = headerRange.e.r; row >= 0; row--){
            for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
            const rowCell3 = XLSX.utils.encode_cell({ r: row, c: col });
            
           

            
            
            ws[rowCell3].s = {  alignment: { horizontal: 'left' } };
            }
            

        }

        for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
            const headerCell = XLSX.utils.encode_cell({ r: headerRange.s.r, c: col });

           

            
            
            ws[headerCell].s = { font: { bold: true }, alignment: { horizontal: 'center' } };
        }

        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] }
        if(fileExtenProps === '.csv'){
       
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
            const data = new Blob([excelBuffer], { type: fileType })
           
                FileSaver.saveAs(data, fileName + fileExtenProps)
        
        }else {
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
            const data = new Blob([excelBuffer], { type: fileType })
           
                
        FileSaver.saveAs(data, fileName + fileExtension)
        }
    }

    const renderExcelButton = () => {

        return (
            <div>
                <button className="export-btn" style={{cursor:'pointer'}}  onClick={() => props.exportExcel()}>
                    Exportar reporte <Image name="export-img.png" />
                </button>
            </div>
        )
    }



    return { exportToExcel, renderExcelButton }
}

export default ExportExcel