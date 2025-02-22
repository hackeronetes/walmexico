import React, { useEffect, useState } from 'react'
import { MainTitle } from './Titles'
import { getNoteList } from '../../services/adminContent/adminContentService'
import { formatDateHyphen } from '../../utility/commonFunctions'
import PopupModel from '../popups/PopupModel'
import PopupContentNoteDetail from '../popups/PopupContentNoteDetail'
import ImageBase64 from './ImageBase64'


interface Props {
    section :any
}
const Notes: React.FC<Props> = (props) => {

    const [notesList, setNotesList] = useState<any>([])
    const [modaletailIsOpen, setModaletailIsOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState() 

    const getNews = () => {
        let date = new Date().toDateString()
        let paramsTemp = {
            active: 1,
            status: 1,
            dateBegin: formatDateHyphen(date),
            dateEnd: formatDateHyphen(date),
            section: props.section,
            sectionId: props.section,
        }
       // dispatch(setLoader(true));

       getNoteList(paramsTemp).then((res: any) => {
            
            if (res.data){
                setNotesList(res.data)
                // dispatch(setLoader(false));
            }
            else{
                // dispatch(setLoader(false))
            }
        })
        .catch((error: any) => {
            //alert('Something went wrong')
            //setSelectStateOptions([])
            console.log('getStateList error', error)
            // dispatch(setLoader(false))
        })
    }
    
    useEffect(() => {
        getNews()
    }, [])

    const openNoteDetailPopup = (item:any) => {
        setSelectedNote(item)
        setModaletailIsOpen(true)
    }

    
    const renderItem = (item:any) => {
        return (
            <div className='note-item '>
                <div className='note-item-inner'>
                    {/* <Image name='home-new.jpg' className='news-img' /> */}
                    <ImageBase64 url={item.imgData} className='note-img' />
                    <div className="note-text-container">
                    
                        <div className="title note-text">
                            {item.title}
                        </div>
                        
                        
                        <div className="note-text">{item.noteDs}</div>
                        <div className="cl-effect-1">
                        <span onClick={() => openNoteDetailPopup(item)} className="detail-btn">Leer más</span>
                        </div>
                    </div>
                </div>
            </div>
    
            
    
            
        )
    }

    const renderNewsList = () => notesList.map((item:any) => {
        return renderItem(item)
    })
    return (
        <div className="notes-container">
            <MainTitle text='Notas' />
            <div className='notes-item'>
               {renderNewsList()}

            </div>

            <PopupModel className="notes-detail-popup" hideCloseIcon={false} isOpen={modaletailIsOpen} closePopup={() => setModaletailIsOpen(false)} height='auto' width='80%'>
                <PopupContentNoteDetail selectedNote={selectedNote}  closePopup={() => setModaletailIsOpen(false)}/>
            </PopupModel>

        </div>
    )
}

export default Notes