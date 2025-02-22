import React, { } from 'react'
import Image from '../components/common/Image'
import FolioTracking from '../components/common/FolioTracking'
import { MainTitle } from '../components/common/Titles'
import { TextP } from '../components/common/TextP'
import { NavLink } from 'react-router-dom'
import RoutesConstants from '../resources/route-constants';
import ImageSection from '../components/common/ImageSection'
import { SECTION_ID_IMAGES } from '../resources/project-constants'
// import News from '../components/common/News'
// import { SECTION_ID } from '../resources/project-constants'

export const Proveedores: React.FC = () => {



    return (
        <div className='page-container page-suppliers'>
            <ImageSection section={SECTION_ID_IMAGES.SECTION_SUPPLIER} />
            {/* <div className="banner-img">
                <Image name='suplier-banner.jpg' className="supplier-banner-img" />
            </div> */}
            <FolioTracking />
            <div className='container main-container'>
                <div className='page-content'>
                    
                    <section className='section-suppliers'>

                        <div className="title-wrapper">
                            <MainTitle text='Proveedores' />
                        </div>
                        <div className="page-desc-wrapper">
                            <TextP >Construcciones es el equipo que está en búsqueda de expandir nuestro padrón de proveedores de construcción y materiales para la construcción. Buscamos proveedores comprometidos con el crecimiento y profesionalismo de la organización.</TextP>
                        </div>
                    </section>
                </div>
            </div>
            {/* <section>
                <News section={SECTION_ID.SECTION_SUPPLIER}/>
            </section> */}
            <section className='bg-grey supplier-construction'>
                <div className="title-wrapper">
                    <MainTitle text='Proveedores de la industria de la Construcción' />
                </div>
                <div className='main-container container'>
                    <div className="page-desc-wrapper">
                        
                       
                    </div>
                    <div className="row">
                        <div className="col s12 m6">
                            <div >
                                <Image name='supplier-mat.jpg' className="suppliers-module-img" />
                            </div>
                            <div className="module-title">
                                <div className="module-title-icon module-title-item">
                                    
                                    <NavLink to={RoutesConstants.Construction}>
                                        <Image name='icon_construction.png' className="suppliers-icon-img" />
                                    </NavLink>
                                </div>
                                <div className="module-title-text module-title-item">
                                    <NavLink to={RoutesConstants.Construction}>
                                        Construcciones
                                    </NavLink>

                                </div>
                            </div>
                            <div>
                                <TextP>Buscamos proveedores (Contratistas de obra, Supervisión de obra y Laboratorios de materiales) comprometidos con el crecimiento de nuestra empresa que cumplan con los más altos estándares de precio, calidad, servicio e integridad dentro de la industria de la construcción.Para iniciar el proceso de ingreso a nuestro padrón de proveedores siendo Constructor, Supervisor, Proyectista, Laboratorio de Materiales, Acometida Eléctrica o Especialista de Obra de clic en el botón “Construcciones”.</TextP>
                            </div>
                        </div>
                        <div className="col s12 m6">
                            <div >
                                <Image name='supplier-const.jpg' className="suppliers-module-img" />
                            </div>
                            <div className="module-title">
                                <div className="module-title-icon module-title-item">
                                    <NavLink to={RoutesConstants.Materials} >
                                        <Image name='icon_material.png' className="suppliers-icon-img" />
                                    </NavLink>
                                </div>
                                <div className="module-title-text module-title-item">
                                    <NavLink to={RoutesConstants.Materials} >
                                        Materiales para la Construcción
                                    </NavLink>
                                </div>
                            </div>
                            <div>
                                <TextP>Buscamos proveedores (Contratistas de obra, Supervisión de obra y Laboratorios de materiales) comprometidos con el crecimiento de nuestra empresa que cumplan con los más altos estándares de precio, calidad, servicio e integridad dentro de la industria de la construcción.Para proponer el uso de nuevas tecnologías y sistemas para la construcción de clic en el botón “Materiales para la construcción”.</TextP>
                            </div>
                        </div>
                    </div>

                </div>

            </section>


        </div>
    )
}
