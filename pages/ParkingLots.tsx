import React, {  } from 'react'
import Image from '../components/common/Image'
import FolioTracking from '../components/common/FolioTracking'
import {MainTitle} from '../components/common/Titles'
import {TextP} from '../components/common/TextP'


export const ParkingLots: React.FC = () => {
  return (
    <div className='page-container page-suppliers'>
         <div className="banner-img">
                <Image name='parking-banner.png' className="supplier-banner-img" />
            </div>
      <FolioTracking />
      
      <div className='container main-container'>
                <div className='page-content'>
                    <section>
                        <div className="title-wrapper">
                            <MainTitle text='Estacionamientos' />
                        </div>
                        <div className="page-desc-wrapper text-left">
                            <TextP >Estacionamientos es el equipo que se encarga de que su estancia comience y finalice de forma placentera. En caso de algún problema favor de acercarse con el gerente de la tienda o comunicarse al 01 800 925 6278.</TextP>
                            <TextP>Por este medio, hacemos mención de los alcances que tienen nuestros estacionamientos concesionados:</TextP>
                            <ul>
                                <li>- Control de accesos y salidas, mantenimiento preventivo y correctivo de los equipos de control.</li>
                                <li>- Personal encargado de la operación.</li>
                                <li>- Señalización vertical, tarifarios y beneficios.</li>
                                <li>- Licencias de operación y cobro, verificación ante PROFECO y trámite de protección civil para estacionamiento.</li>
                                <li>- Equipo de protección civil.</li>
                                <li>- Seguro contra robo total del auto.</li>
                                <li>- Personal de limpieza.</li>
                                <li>- Botiquín de primeros auxilios.</li>
                                <li>- Kit de primeros auxilios: arrancador de batería, Gato hidráulico,</li>
                                
                            </ul>
                        </div>
                    </section>
                    
                   
                </div>
            </div>


    </div>
  )
}
