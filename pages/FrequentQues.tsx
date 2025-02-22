import React, { useState, useEffect } from 'react'

import FolioTracking from '../components/common/FolioTracking'
import {MainTitle} from '../components/common/Titles'
import {TextP} from '../components/common/TextP'
import Collapsible from '../components/common/Collapsible'
import { getFrequentQuestions } from '../services/common/commonService'




export const FrequentQues: React.FC = () => {

  
  const [questions, setQuestions] = useState<any>({})

  const  groupByKey = (array:any, key:any) =>  {
    return array
      .reduce((hash:any, obj:any) => {
        if(obj[key] === undefined) return hash; 
        return Object.assign(hash, { [obj[key]]:( hash[obj[key]] || [] ).concat(obj)})
      }, {})
 }

  const getQuestionsList = () => {
    getFrequentQuestions().then((res:any) => {
        if(res.data)
        {
          let groupedQuestions = groupByKey(res.data, 'sectionId')
          setQuestions(groupedQuestions)
        }
          
        
    })
    .catch((error:any) => {
        //alert('Something went wrong')
        //setSelectStateOptions([])
        
        console.log('getStateList error', error)
    })
 } 
 
 useEffect(() => {
  getQuestionsList()
 }, [])

 

 const renderQuestions = (ques:any) => {
  
return ques.map((item:any) => {
      if(item)
      {
        
          return (
            <Collapsible
              //open={collapsStatusArray[0]}
              title={item.questionText}
              id={item.id}
            >
              {item.answerText}
            </Collapsible>
          )
      }
    })
  
 }


 const renderSections = () => {

  let children = [];
  for (const [key, value] of Object.entries(questions)) {
    console.log(key)
    let section = []
    //section.push(<div>{key}</div>) // to show Section name uncomment it 
    section.push(renderQuestions(value))
    children.push (
      section
      
    );

  }
  
  

  return (
    <div>
      {children}
    </div>
  );

   
 
}


  

  return (
    <div className='page-container page-suppliers'>
      <FolioTracking />
      
      
      <div className='container main-container  mb-20'>
                <div className='page-content'>
                    <section>
                        <div className="title-wrapper  mb-20">
                            <MainTitle text='Preguntas Frecuentes' />
                        </div>
                        <div className="page-desc-wrapper text-left mb-20">
                            <TextP >Aquí encontrará un listado de preguntas frecuentes por área, mismas que podrá calificar.</TextP>
                        </div>
                    </section>
                    <section>

                    {renderSections()}

                   
                    
                      
                    </section>
                  
                    
                   
                </div>
            </div>


    </div>
  )
}
