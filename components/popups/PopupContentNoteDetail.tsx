import React, {} from "react"
import { MainTitle } from "../common/Titles"



interface Props {
  closePopup: any
  selectedNote:any
}

// 

const PopupContentNoteDetail: React.FC<Props> = (props) => {

    
  
    return (
        
        <>
              <div className='row '>
                <div className='col s12'>
                  <MainTitle text={props.selectedNote.title} className="popup-title" />
                </div>
                
              </div>
              <div className='row m-0'>
              <div className='col s4'>
                  <img src={props.selectedNote.imgUrl} className='note-popup-img' />
                </div>
                <div className='col s8 '>
                  {props.selectedNote.noteDs}
                </div>
              </div>
              
              
              




           
        </>
         
                                        
    )
}


export default PopupContentNoteDetail