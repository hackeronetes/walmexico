import React, { } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from './Image';
import {  registerLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';

registerLocale('es', es)

interface Props {
    label: string,
    handleDateChange:any,
    value: any
    className?: string,
    error?:any
    minDate?:any
}



const DatePickerInput: React.FC<Props> = (props) => {

   
    let value = props.value ? props.value : '';

    const handleDateChange = (dateStr:string) => {
       props.handleDateChange(dateStr);
    }
    
    return (
        <div className=''>
            <div>
                <label className={(props.className ? 'input-label ' + props.className : 'input-label' )} >{props.label}</label>
            </div>
            <div className='datepicker-container'>
                <DatePicker 
                    dateFormat="dd/MM/yyyy" 
                    selected={value}
                    onChange={(date:any) => handleDateChange( date)} 
                    minDate={props.minDate ? props.minDate : ''}
                    locale="es"
                    formatWeekDay={nameOfDay => nameOfDay.substr(0,3)}
                    calendarStartDay={0}
                />
                <Image className="datepicker-img" name="icon_calendar.png" />
            </div>
            <div className="input-error">{props.error && props.error.message}</div>
        </div>
    
    )
}

export default DatePickerInput



