import moment from 'moment';
import { USER_INTERNAL} from '../resources/project-constants'

export function removeEmptyKeys(params:any){
    let o = Object.keys(params)
    .filter((k) => params[k] != null && params[k] != '')
    .reduce((a, k) => ({ ...a, [k]: params[k] }), {});

    return o;
}



const validateEmail = (email:string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};


export function getDomainFromEmail  (email: string)  {

    if(!validateEmail(email))
        return false


    //var ind=email.indexOf("@");
    var domain=email.split('@').pop()
    if(domain)
    {
        var fullDomain= domain.split('.')
        domain =  fullDomain[0]


        return domain
    }
    
    

};



export function formatDate  (date: string)  {
    
    return date

}

// /** If you parsed a date without time zone, you may need to shift it to UTC time */
// function datetimeToUTC(fromDate:any) {
//     return new Date(
//         fromDate.getUTCFullYear(),
//         fromDate.getUTCMonth(),
//         fromDate.getUTCDate(),
//         fromDate.getUTCHours(),
//         fromDate.getUTCMinutes(),
//         fromDate.getUTCSeconds(),
//         fromDate.getUTCMilliseconds(),
//       )
// }

export function formatDateHyphen  (dateStr: string)  {
    if(!dateStr)
        return ''
        

    const momentObject = moment(dateStr, 'YYYY-MM-DD')
    const momentStr = momentObject.format('YYYY-MM-DD')

    return momentStr

    
    

}

export function formatDateNotes  (dateStr: string)  {
        var date = new Date(dateStr);
        let datetemp:any = ("0" + (date.getDate())).slice(-2)
        let month:any = ("0" + (date.getMonth() + 1)).slice(-2)
        let dateFinal = date.getFullYear() + '-' + month + '-' + datetemp  + 'T00:00:00'
        return dateFinal

       
        
    };

    export function formatDateNotesImages  (dateStr: string)  {
        var date = new Date(dateStr);
        let datetemp:any = ("0" + (date.getDate())).slice(-2)
        let month:any = ("0" + (date.getMonth() + 1)).slice(-2)
        let dateFinal = date.getFullYear() + '-' + month + '-' + datetemp  + ' ' + '00:00:00'
        return dateFinal

       
        
    };

export function formatDateNews (dateStr: string)  {
        var date = new Date(dateStr);
        let dateFinal = date.getFullYear() + '/' + (date.getMonth()+1) + '/' +date.getDate() 
        return dateFinal

       
        
    };

    export function formatDateImages (dateStr: string)  {
//         const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
//   "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
// ];
     const day = (dt:any) => {
        if(dt.getDate() < 10){
            return ('0' + dt.getDate())
        }else{
            return dt.getDate() 
        } 
     } 
        var date = new Date(dateStr);
        let month:any = ("0" + (date.getMonth() + 1)).slice(-2)
        let dateFinal = day(date) + '/' + month  +'/' + date.getFullYear() 
        
        return dateFinal

       
        
    };


    export function formatPriceNumber  (str: string)  {
       return parseFloat(str.replace(/,/g, ''))

       
        
    };


    export function formatYesNo  (value: any)  {
        
        return((value ==  '1' || value ==  1)  ? 'Si' : 'NO')
    
    }



    export const canChangeUser = (loginUser:any) => {
        if (loginUser.boss) {
            return true
        }

        return false
    }
    export const canChangeStatus = (loginUser:any) => {
        if (loginUser.boss) {
            return false
        }

        return true
    }
    export const canChangeFolioActiveStatus = (loginType:any) => {
        if (loginType == USER_INTERNAL) {
            return true
        }

        return false
    }


    export const renderYesNo = (value:any) => {
        return value == 1 ? 'Si' : 'No';
    }


    const formatter = new Intl.NumberFormat(
        'en-US', {
        style: 'currency',
        currency: 'USD',
      
        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
      }
      );


    export  const formatNumberToCurrency = (number: any, showZero: any) => {
        let numberString = number.toString()
        let filtered = numberString.replace(/[^\d.-]/g,'');

        let currencyString =  formatter.format(filtered)
        let removedDollarSign = currencyString.replace('$','');
        //isFormatted = true

        if(!showZero)
          removedDollarSign = removedDollarSign.replace('.00','');
        return removedDollarSign
    } 