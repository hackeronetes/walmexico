import React, { useEffect } from 'react'

import FolioTracking from '../components/common/FolioTracking'
// import News from '../components/common/News'
import {MainTitle} from '../components/common/Titles'
import {TextP} from '../components/common/TextP'
import {useSearchParams} from 'react-router-dom';
import { SECTION_ID, SECTION_ID_IMAGES } from '../resources/project-constants'
import Notes from '../components/common/Notes'
import Image from '../components/common/Image'
import ImageSection from '../components/common/ImageSection';
//import { useNavigate } from 'react-router-dom'

export const Home: React.FC = () => {

   //// const navigate = useNavigate()
     const [searchParams] = useSearchParams();

    const removeErrorParam = () => {
        if (searchParams.has('id_token')) {
        //   searchParams.delete('id_token');
        //   setSearchParams(searchParams);
        }
        if(searchParams.has('code'))
        {
            // searchParams.delete('code');
            // setSearchParams(searchParams);
           // navigate('/');
        }
    }

    useEffect(() => {
        removeErrorParam() 
    }, [])

    return (
        <div className='page-container page-suppliers'>
        <ImageSection section={SECTION_ID_IMAGES.SECTION_HOME} />
        <FolioTracking />
        
            <div className='container main-container'>
                <div className='page-content'>
                    <section>
                        <div className="title-wrapper">
                            <MainTitle text='Bienes Raíces' />
                        </div>
                        <div className="page-desc-wrapper">
                            <TextP >Bienvenido a Walmart de México, Bienes Raíces. En esta página encontrará todo lo relacionado con ofertas de terrenos, renta de locales comerciales, proveedores relacionados con la construcción y remodelación de tiendas y renta de terrenos en exceso (Excess property), además de poder obtener información con respecto a promociones, estacionamientos y vacantes.</TextP>
                        </div>
                    </section>
                    <section>
                        {/* <News section={SECTION_ID.SECTION_GENERAL}/> */}
                        <div className="news-images">
                            <div className="news-item basicQuadImg ">
                                <Image name='news-1.jpg' className='news-img' />
                                {/* <img src="https://7d25b4b71astg.blob.core.windows.net/land-images/evento b.png?sv=2023-08-03&amp;st=2024-10-30T16%3A51%3A50Z&amp;se=2024-10-31T16%3A51%3A50Z&amp;sr=c&amp;sp=r&amp;sig=N45lWSZTAdXaI2d%2F43wQLHvCdpJuYPauUj9t4uw0TkM%3D" className="news-img"> */}

                                <div className="leyendaBasicImg caption caption-num4 Big_BG">
                                    <a target="_blank" className="btn_link" href="https://bienesraices.walmartmexico.com.mx/Proveedores"><Image name="hover_icon.png" /></a>
                                    <p className="textoProyecto">Buscamos proveedores de construcción, remodelación, diseño, entre otros. Da click en el link</p>
                                </div>
                            </div>
                            <div className="news-item basicQuadImg ">
                                <Image name='news-2.jpg' className='news-img' />
                                {/* <img src="https://7d25b4b71astg.blob.core.windows.net/land-images/evento c.png?sv=2023-08-03&amp;st=2024-10-30T16%3A51%3A50Z&amp;se=2024-10-31T16%3A51%3A50Z&amp;sr=c&amp;sp=r&amp;sig=N45lWSZTAdXaI2d%2F43wQLHvCdpJuYPauUj9t4uw0TkM%3D" className="news-img"> */}

                                <div className="leyendaBasicImg caption caption-num4 Big_BG">
                                    <a target="_blank" className="btn_link" href="https://www.walmartmexico.com/unete-al-equipo"><Image name="hover_icon.png" /></a>
                                    <p className="textoProyecto">Buscamos gente talentosa y comprometida como tú, conoce las vacantes en el link</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <Notes section={SECTION_ID.SECTION_GENERAL}/>
                    </section>  
                
                </div>
            </div>
            <div className="hide appversion">1.1</div>


        </div>
    )
}
