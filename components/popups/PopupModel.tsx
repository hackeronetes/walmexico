import React, {useEffect, useState} from "react"
import Modal from "react-modal"
import Image from "../common/Image"
import "./popup.css"



interface Props {
    isOpen: any
    closePopup: any
    children: any
    height?: string
    width?: string
    hideCloseIcon?:any
    hideScroll?:any
    className?:any
}



let customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      height: '95%',
      width: '45%',
      zIndex: 100,
    },
  };

Modal.setAppElement('#root');

const PopupModel: React.FC<Props> = (props) => {

    const [modalIsOpen, setIsOpen] = useState(props.isOpen);
    const [hideSCrollBar, setHideSCrollBar] = useState(true);
   
    const hideCloseBtnTemp =  (props.hideCloseIcon == false) ? props.hideCloseIcon : true
   

    if(props.height)
      customStyles.content.height = props.height
    else{
      customStyles.content.height = '95%'
    }
    // if(hideSCrollBar){
    //  customStyles.content.overflowY = "hidden"
    // }
    // else {
    //   customStyles.content.overflowY = "scroll"
    // }
    if(props.width)
      customStyles.content.width = props.width
    else
      customStyles.content.width = '45%'
    

    function afterOpenModal() {
    
    }

    function closeModal() {
        props.closePopup()
    }

    useEffect(() => {
        setIsOpen(props.isOpen)
       
    }, [props.isOpen])

    useEffect(() => {
      const hideSCrollBarTemp =  (props.hideScroll == false) ? props.hideScroll : true
      setHideSCrollBar(hideSCrollBarTemp)
       
    }, [props])

   
    
    return (
        <div>
        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            className={hideSCrollBar ? 'model-container ' : 'model-container show-scroll'}
            portalClassName={(props.className) ? 'ReactModalPortal  ' + props.className : 'ReactModalPortal '} 
          >
          <div className="popup-model-content-cotainer">
            <div className='row popup-btn-wrapper'>
              <div className='col s12'>
               {!hideCloseBtnTemp && (<div className='model-close-btn-wrapper'>
                  <span className='model-close-btn' onClick={closeModal}>
                  <Image name="btn_close.png" />
                  </span>
                </div>)}
              </div>
            </div>

              {props.children}
          </div>

            
          </Modal>
          </div>
                                        
    )
}


export default PopupModel