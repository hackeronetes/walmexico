import React, {useState, useEffect  } from 'react'

import FolioTracking from '../../../components/common/FolioTracking'
import {MainTitle} from '../../../components/common/Titles'
import DataTable2 from '../../../components/datatable/DataTable2'
import { getContactsList } from '../../../services/adminGeneral/adminGeneralService'
import RoutesConstants from '../../../resources/route-constants'
import { useNavigate } from 'react-router-dom';
import { setLoader } from '../../../store/loaderReducer';
import { useAppDispatch } from '../../../store/hooks'

const config:any = {
  gridColumns : [
      {'label': 'Sección', 'key' : 'section', 'type' : 'text' },
      {'label': 'Correo electrónico', 'key' : 'mail', 'type' : 'text'},
      {'label': '', 'key' : '', 'type' : 'rowEdit'},
      
  ]
}


export const ContactIndex: React.FC = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const [tableRows, setTableRows] = useState<any>([])
  const [tableTotalRows] = useState(0)

  //alert('fds')
 
  const getTableRows = () => { 
    dispatch(setLoader(true));
      getContactsList().then((res:any) => {
        dispatch(setLoader(false));
          if(res.data)
              setTableRows(res.data)
          else
              setTableRows([])
      })
      .catch((error:any) => {
          //alert('Something went wrong')
          //setSelectStateOptions([])
              setTableRows([])
          console.log('getStateList error', error)
          dispatch(setLoader(false));
      })
  } 


  useEffect(() => {
     
      getTableRows()
  }, [])

  const handleEditState = (row: any) => {
      navigate(RoutesConstants.ContactForm, {state: row})
  }


  return (
    <div className='page-container page-suppliers'>
      <FolioTracking />
      
      <div className='container main-container  mb-20'>
          <div className='page-content'>
              <section>
                  <div className="title-wrapper  mb-20">
                      <MainTitle text='Contact Area Management' />
                  </div>
                  
              </section>

              <section>
                  <div className='datatable-container'>
                      <DataTable2 
                          columns={config.gridColumns} 
                          rows={tableRows} 
                          totalRows={tableTotalRows} 
                          getSelectedRows={() => void 0}
                          callbackClickRow={() => void 0}
                          callbackRefreshRows={() => void 0}
                          callbackEditRow={(row: any) => handleEditState(row)}
                          sort={true}
                      />
                  </div>
              </section>
              
              
          </div>
      </div>


    </div>
  )
}
