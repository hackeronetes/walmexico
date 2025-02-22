import React, { useState, useEffect } from 'react'
// import RoutesConstants from '../../resources/route-constants'
// import { Link } from 'react-router-dom'
// import { Link } from 'react-router-dom'
// import RoutesConstants from '../../resources/route-constants'
import {getImageBySection} from '../../services/adminContent/adminContentService'
import ImageBase64 from './ImageBase64'
// import { formatDateHyphen } from '../../utility/commonFunctions'

interface Props {
  section: any
}
const ImageSection: React.FC<Props> = (props) => {
  const [newList, setNewsList] = useState<any>([])
 
  const getNews = () => {
    let paramsTemp = {
      sectionId: props.section,
    }
    getImageBySection(paramsTemp)
      .then((res: any) => {
        if (res.data) {
          setNewsList(res.data)
        } 
      })
      .catch((error: any) => {
        
        console.log('get images error', error)
        
      })
  }

  useEffect(() => {
    getNews()
  }, [])

  const renderItem = (item: any) => {
    return (
      <div className="section-images-item ">
        <ImageBase64 url={item.imageData} className='section-image' />
        
      </div>
    )
  }

  const renderNewsList = () =>
    newList.map((item: any) => {
      return renderItem(item)
    })
  return (
    <div className="section-img-container">
      
      <div className="section-images-inner">{renderNewsList()}</div>
    </div>
    
  )
}

export default ImageSection
