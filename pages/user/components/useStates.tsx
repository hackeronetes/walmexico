import React, { useEffect, useState } from 'react'
import DataTable2 from '../../../components/datatable/DataTable2';
import Select from 'react-select'
import { getStateOptions} from '../../../services/userRole/userRoleService'
import { PrimaryButtonSpan } from '../../../components/common/Buttons';

// import Image from '../../../components/common/Image';


// import { Jsxlement } from 'typescript'


const config: any = {
    stateLabel: 'state',
    stateValue: 'id', 
    stateGridColumns: [
        { 'label': 'ESTADO', 'key': 'state', 'type': 'text' },
        { 'label': '', 'key': '', 'type': 'rowDelete' },
    ]
}


 export default function useStates() {

    const [stateOptions, setStateOptions] = useState<any>([])

    const [inputState, setInputState] = useState<any>()

    const [states, setStates] = useState<any>([])

    const [selected, setSelected] = useState<any>('')

  

    function getDropdownState(){

        getStateOptions().then((res:any) => {
            if(res.data)
                setStateOptions(res.data)
            else
                setStateOptions(res.data)
        })
        .catch((error:any) => {
            //alert('Something went wrong')
            //setSelectStateOptions([])
            setStateOptions([])
            console.log('getStateList error', error)
        })
    } 

    useEffect(() => {
        getDropdownState()
       
        
    }, [])


    useEffect(() => {
        if(selected)
        {
            
            let result:any = []
            let selectedArray = selected.split(',')
            
            for(let i=0; i < selectedArray.length; i++)
            {
                for(let x=0; x<stateOptions.length; x++)
                {
                    if(selectedArray[i] == stateOptions[x].state)
                    {
                        result.push(stateOptions[x])
                    }
                }
            }

            setStates(result)
           
            
        }
       
        
    }, [stateOptions])

    const getSelectedStates = () => {
        return states;
    }

    const setSelectedStates = (selectedStates:any) => {
         setSelected(selectedStates)
    }


    const resetInputState = () => {
        setInputState('');
    }

    const handleDeleteState = (deletedState: any) => {
         setStates((prev: any) => prev.filter((state: any) => state.id !== deletedState.id));
    }
    const handleSelectState = ( ) => {
        if(inputState)
            setStates((prev:any) => [...prev, inputState]);

        resetInputState()
    }

    const renderStates = () => {
        return (
            <>
                <div className='row user-states-container'>
                    <div className='col s12 m6'>
                        <div className='row'>
                            <div className='col s12 m8'>
                                <div>
                                    <label htmlFor='format' className="input-label">Estado</label>
                                    <Select
                                        classNamePrefix='input-select-react'
                                        id='tienda'
                                        className='input-select-react'
                                        value={inputState}
                                        onChange={setInputState}
                                        options={stateOptions}
                                        getOptionLabel={(option: any) => option[config.stateLabel]}
                                        getOptionValue={(option: any) => option[config.stateValue]}
                                        isSearchable={false}
                                        //noOptionsMessage={( inputValue: string ) => inputValue}
                                        defaultInputValue={''}
                                        isClearable
                                    />
                                </div>
                            </div>
                            <div className='col s12 m4'>
                                <div className=''>
                                    <PrimaryButtonSpan onClick={() => handleSelectState()} >Agregar</PrimaryButtonSpan>
                                </div>
                            </div>
                        </div>
                        
    
                    </div>
                    <div className='col s12 m6'>
    
                        <DataTable2 rows={states}
                            totalRows={-1}
                            columns={config.stateGridColumns}
                            callbackRefreshRows={() => void 0}
                            callbackDeleteRow={(row: any) => handleDeleteState(row)}
                        />
    
                    </div>
    
                </div>
    
                
    
            </>
        )
    }

    return {
        renderStates,
        getSelectedStates,
        setSelectedStates
    }




    

}

