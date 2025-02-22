import React, {useEffect} from "react";

interface  Props  {
  field:any
  register:any
  error:any
  setValue: any
  watch: any
  setError? : any
  clearErrors? : any
  showZero? : boolean
  onBlur? : any
  maxLength?:any
  value?: any
}

// export const Input = ({ label, type, id, placeholder, register, validation= {} }) => {
export const InputNumber = (props:Props) => {

   

    let showZero = typeof props.showZero === 'undefined'  ? true : props.showZero;
    

    const validateField = (value:any, formValues:any) => {
      
      console.log('formValues', formValues)
      if((value == '0.00' || value == '' || value == '0') && props.field.validation.required.value){
        return props.field.validation.required.message
      }

      return true
    }

    
    useEffect(() => {
      props.field.validation.validate =  validateField
    }, [])


    useEffect(() => {
      props.setValue(props.field.id, "")
    },[props.maxLength])

   

    props.field.validation.onChange = (e:any) => {
      e.preventDefault();
      let val = props.watch(props.field.id)
      
      let lastchar = ''
      if(val)
        lastchar = val.slice(-1)

     
      if(  !/^\d+$/.test(lastchar) && !/[.]/.test(lastchar))  
      {
        if(val)
          props.setValue(props.field.id, val.substring(0, val.length - 1))
        
      }
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

    const formatNumberToCurrency = (number: any) => {

        let filtered = number.replace(/[^\d.-]/g,'');

        let currencyString =  formatter.format(filtered)
        let removedDollarSign = currencyString.replace('$','');
        //isFormatted = true

        if(!showZero)
          removedDollarSign = removedDollarSign.replace('.00','');
        return removedDollarSign
    } 

    props.field.validation.onBlur = (e:any) => {
      let number = formatNumberToCurrency(e.target.value)
      
      if(number == '0.00' && props.field.validation.required.value){
        
        props.setError(props.field.id, {
          type: "manual",
          message: props.field.validation.required.message,
        })
      }
      else{
        props.clearErrors(props.field.id)
      }
      
      props.setValue(props.field.id, number)

      if(props.onBlur)
        props.onBlur()

      
    }


    
    

    return (
        // <>
        // </>
      <div className="form-input input-container">
        <div className="">
          <label htmlFor={props.field.id} className={(props.field.label ? 'input-label' : 'input-label no-label')} >
            {props.field.label ? props.field.label : '1'} 
          </label>
        </div>
        <input
          id={props.field.id}
          type="text"
          className="input-text"
          placeholder={props.field.placeholder}
          {...props.register(props.field.id, props.field.validation)}
          //onBlur={ () => handleOnBlur()}
          maxLength={props.maxLength}
          
        />
        <div className="input-error">{props.error && props.error.message}</div>
      </div>
      
    )
  }