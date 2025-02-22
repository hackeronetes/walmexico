import React, { useEffect, useState } from 'react'
import DataTable2 from '../../../components/datatable/DataTable2';
import Select from 'react-select'
import { getStateOptions, getMunicipilaty} from '../../../services/userRole/userRoleService'
import { PrimaryButtonSpan } from '../../../components/common/Buttons';
import { styled, css } from 'goober'
import { FaSearch } from "react-icons/fa";


// import { Jsxlement } from 'typescript'
const MuniciDiv = styled('div')`
    height: 200px;
    overflow-y: scroll;
    background-color: #ccc;
`
const tr = css`
    border-bottom: 0;
    padding : 6px;
`
const td = css`
    padding : 5px 30px;
`

const allTd = css`
    padding : 5px 25px;
    font-weight: bold;
`




const config: any = {
    stateLabel: 'state',
    stateValue: 'id', 
    municipalityLabel: 'townDesc',
    municipalityValue: 'townCode', 
    stateGridColumns: [
        { 'label': 'ESTADO', 'key': 'state', 'type': 'text' },
        { 'label': 'MUNICIPIOS', 'key': 'municipalitiesLabel', 'type': 'text', 'className':'text-break-word' },
        { 'label': '', 'key': '', 'type': 'rowDelete' },
    ]
}


 export default function useStateMunicipilaty() {

    const [stateOptions, setStateOptions] = useState<any>([])
    const [checkedAll, setCheckedAll] = useState(false);

    const [municipalityList, setMunicipalityList] = useState<any>([])
    const [searchMunicipalityList, setSearchMunicipalityList] = useState<any>([])

    const [selected, setSelected] = useState<any>('')
    
    const [inputState, setInputState] = useState<any>()

    const [states, setStates] = useState<any>([])
    const [searchStates, setSearchStates] = useState<any>([])

    const [searchInput, setSearchInput] = useState<any>('')
    const [searchInputCheckbox, setSearchInputCheckbox] = useState<any>('')

    

    

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

    function getMunicipilatyList(id:any){
        
        getMunicipilaty(id).then((res:any) => {
                    if(res.data)
                        setMunicipalityList(res.data)
                    else
                        setMunicipalityList(res.data)
                })
                .catch((error:any) => {
                    //alert('Something went wrong')
                    //setSelectStateOptions([])
                    setMunicipalityList([])
                    console.log('getStateList error', error)
                })
            } 

    useEffect(() => {
        getDropdownState()
       
        
    }, [])

    useEffect(() => {
        setSearchStates(states)
       
    }, [states])

    useEffect(() => {
        setSearchMunicipalityList(municipalityList)
       
    }, [municipalityList])

    const getSelectedStatesMunicipality = () => {
        return states;
    }

    const selectAll = (value:boolean) => {
        setCheckedAll(value);
        let resetMunici = municipalityList.map((item: any) => {
            item.checked = value
            return item
        });
        setMunicipalityList(resetMunici)
    };
    
    const resetInputState = () => {
        setSearchInputCheckbox('')
        setInputState('');
        selectAll(false)
    }

    const handleDeleteState = (deletedState: any) => {
        setStates((prev: any) => prev.filter((state: any) => state.id !== deletedState.id));
    }
    const handleSelectState = ( ) => {
       if(inputState)
        {
            let selectedMunici = municipalityList.filter((item: any) => item.checked == true);
            let municipalitiesNames = selectedMunici.map((item: any) => {
                return item[config.municipalityLabel];
            });
            let municipalitiesLabel = municipalitiesNames.toString()

            let stateWithMunici = {
                ...inputState,
                municipalities : selectedMunici,
                municipalitiesLabel : municipalitiesLabel
            }
           
            setStates((prev:any) => [...prev, stateWithMunici]);
        }
        

        resetInputState()
    }


    const handleStateChange = (state:any) => {

        setInputState(state);
        if(state)
            getMunicipilatyList(state.id)
    }
   

    const toggleCheck = (inputName:any) => {
        setMunicipalityList((prev:any) => 
            prev.map((item: any) => {
                if(item[config.municipalityValue] === inputName)
                {
                    item.checked = !item.checked
                }
                
                return item
            })
        )
    };
    
    const renderSelectAllCheckbox = () => {
        return (
            <tr key={'cehckbox-all' } className={'input-checkbox-wrapper mb-20 ' + tr }>
                <td className={'input-checkbox-label ' + td  + ' ' + allTd}>Todos</td>
                <td className={'input-checkbox-label ' + td}>
                    <input 
                        type="checkbox" 
                        name={'checkbox-all'} 
                        className='simple-checkbox'
                        onChange={(e) => selectAll(e.target.checked)}
                        checked={checkedAll}
                    />
                </td>
            </tr>
        )
    }

    const renderMunicipalityList = searchMunicipalityList.map((item:any, index:number) => {
        return (
            <tr key={'cehckbox-' + item.id + index} className={'input-checkbox-wrapper mb-20 ' + tr}>
                <td  className={'input-checkbox-label ' + td}>{item[config.municipalityLabel]}</td>
                <td className={'input-checkbox-label ' + td}>
                    <input 
                        type="checkbox" 
                        name={item[config.municipalityValue]} 
                        className='simple-checkbox'
                        onChange={() => toggleCheck(item[config.municipalityValue])} 
                        checked={item.checked}
                    />
                </td>
            </tr>
        )
    })

    const setSelectedStatesMunicipality = (selectedStates:any) => {
        setSelected(selectedStates)
    }

    useEffect(() => {

        if(selected)
        {
            let stateWithMuniciTemp:any = []
            for(let i=0; i < selected.length; i++) {
               
                

                let selectedMunici = selected[i].towns;
                let municipalitiesNames = selected[i].towns.map((item: any) => {
                    return item.townDescription;
                });
                
                let municipalitiesLabel = municipalitiesNames.toString()

                stateWithMuniciTemp.push( {
                    id : selected[i].stateId,
                    state : selected[i].stateDescription,
                    municipalities : selectedMunici,
                    municipalitiesLabel : municipalitiesLabel
                })

            }  
           
             setStates(stateWithMuniciTemp);
        }

        
       
        
    }, [stateOptions])

    const handleSearchInputChange = (inputValue:any) => {
        setSearchInput(inputValue.target.value)
        
    }
    const handleSearchCheckboxInputChange = (inputValue:any) => {
        setSearchInputCheckbox(inputValue.target.value)
        
    }
    const searchList = () => {
        if(searchInput)
        {
            let result = states.filter((item:any) => {
                return (item.municipalitiesLabel.includes(searchInput.toUpperCase()) || item.state.includes(searchInput.toUpperCase()) )
            })
            setSearchStates(result)
        }
        else {
            setSearchStates(states)
        }
      
    }
    const searchMuniciList = () => {
        if(searchInputCheckbox)
        {
            let result = municipalityList.filter((item:any) => {
                return (item.description.includes(searchInputCheckbox.toUpperCase())  )
            })
            setSearchMunicipalityList(result)
        }
        else {
            setSearchMunicipalityList(municipalityList)
        }
      
    }


    const renderStatesMunicipality = () => {
        return (
            <>
                <div className='row user-states-container'>
                    <div className='col s12 m6 l4 offset-m3 offset-l4'>
                        <div>
                            <label htmlFor='format' className="input-label">Estado</label>
                            <Select
                                classNamePrefix='input-select-react'
                                id='tienda'
                                className='input-select-react'
                                value={inputState}
                                onChange={(e:any) => handleStateChange(e)} 
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
                    {  inputState && (
                    <div className='col s12 m6 l3'>
                        <div className='datepicker-container'>
                            <input
                                type="text"
                                className="input-text"
                                value={searchInputCheckbox}
                                onChange={(e) => handleSearchCheckboxInputChange(e)} 
                            />
                            <span className="search-img"  onClick={searchMuniciList}><FaSearch className='icon-color-main' /></span>
                        </div>
                        
                        <div>
                            Municipios
                            <MuniciDiv>
                                <table className=''>
                                    <tbody>
                                        {renderSelectAllCheckbox()}
                                        {renderMunicipalityList}
                                    </tbody>
                                </table>
                               
                            </MuniciDiv>
                        </div>
                        <div className=''>
                            <PrimaryButtonSpan onClick={() => handleSelectState()} >Agregar</PrimaryButtonSpan>
                        </div>
                    </div>
                    )}
                    
    
                </div>
                <div className='row'>
                    <div className='col s12 m10 l8 offset-m2 offset-l1 '>
                        <div className='munici-search-input datepicker-container'>
                            <input
                                type="text"
                                className="input-text"
                                //placeholder={placeholder}
                                value={searchInput}
                                onChange={(e) => handleSearchInputChange(e)} 
                            />
                            <span className="search-img"  onClick={searchList}><FaSearch className='icon-color-main' /></span>
                        </div>
                        
        
                        <DataTable2 rows={searchStates}
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
        renderStatesMunicipality,
        getSelectedStatesMunicipality,
        setSelectedStatesMunicipality
    }




    

}

