import React, {  } from 'react'
import FolioTracking from '../components/common/FolioTracking'
import {MainTitle} from '../components/common/Titles'
import {TextP} from '../components/common/TextP'
import { NavLink } from 'react-router-dom'
import {  styled, css } from 'goober';
import Image from '../components/common/Image'
import ImageSection from '../components/common/ImageSection'
import { SECTION_ID_IMAGES } from '../resources/project-constants'
// import { SECTION_ID } from '../resources/project-constants'
// import News from '../components/common/News'

// const img = css`
    
//         width: 100%;
    
// `

const img = css`
    
        width: 100%;
    
`

const DivButton = styled('span')`
    border: 1px solid #fdbb30;
    text-decoration: none;
    color: #fff !important;
    background: #fdbb30;
    padding: 5px 55px 5px 55px;
    display: block;
    width: 100%;
    text-align: center;
    margin: 20px auto;
    float: left;
    display: inline-block;
    cursor: pointer;
    text-align: center;
    margin: 20px auto;
`


export const Terrenos: React.FC = () => {

    

    return (
        <div className='page-container page-suppliers'>
            <ImageSection section={SECTION_ID_IMAGES.SECTION_OFFERLAND} />
            <FolioTracking />
            <div className='container main-container'>
                <div className='page-content'>
                    
                    <section className='section-suppliers'>
                        
                        <div className="title-wrapper">
                            <MainTitle text='Ofrécenos tu Terreno' />
                        </div>
                        <div className="page-desc-wrapper">
                            <div className='row'>
                                <div className='col s12 m6 text-left'>
                                    Localizadores es el equipo que está en búsqueda de terrenos en los cuales nos podamos expandir, construyendo un Supercenter, Walmart Express, Sam´s Club y/o Bodega Aurrera.
                                </div>
                                <div className='col s12 m6 text-left'>
                                    <TextP >En caso de querer que su terreno pase por nuestro análisis, de clic en el botón “Ofrécenos tu terreno” para llenar el formulario correspondiente.</TextP>
                                   
                                </div>
                            </div>
                           
                        </div>
                        <div className='row'>
                            <div className='col s12 m4 offset-m4'>
                                <NavLink to="/Terreno">
                                    <DivButton >Ofrécenos tu terreno</DivButton>
                                </NavLink>
                            </div>
                        </div>
                    </section>
                    {/* <section>
                        <News section={SECTION_ID.SECTION_OFFERLAND}/>
                    </section> */}
                    <section>
                        <div className="title-wrapper">
                            <MainTitle text='Noticias' />
                        </div>
                        <div className="row">
                            <div className='col s12 m6 offset-m3'>
                                <Image name="offer-land.jpg" className={img}/>
                            </div>
                            
                        </div>
                    </section>
                </div>
            </div>
            

        </div>
    )
  }
  