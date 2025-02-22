import React from 'react'
import { NavLink } from 'react-router-dom'
import './HeaderFooter.css';
import RoutesConstants from '../resources/route-constants'
import walmartCorpImg from '../../src/footer-images/Walmart-Corporativo-Text-Logo-Black.png'
import walmartMexicoImg from '../../src/footer-images/Walmart-Mexico-Text-Logo-Black.png'
import walmartBodegaImg from '../../src/footer-images/Bodega-Aurrera-texto-logo-negro.png'
import walmartSamsImg from '../../src/footer-images/Sams-Club-texto-logo-negro.png'
import walmartCentroImg from '../../src/footer-images/Walmart-Centroamerica-Text-Logo-Black.png'
import walmartExpressImg from '../../src/footer-images/Walmart-Express-texto-logo-negro.png'
import walmartSuperImg from '../../src/footer-images/Walmart-Supercenter-Text-Logo-Black.png'
import xIcon from '../../src/footer-images/X-glyph-black-sm.png'
import { TermsConditionsFileLink } from './common/TermsConditionsFileLink';

export const Footer: React.FC = () => (
    <div className="footer">
        <div className="footer-container container main-container footer-parent-gap-align">
            <div className="social-container social-container-padding">
                <div className='walmart-img-center-align'>
                    <img style={{cursor: 'pointer'}} onClick={()=>window.location.assign("https://www.walmartmexico.com/")} src='https://www.walmartmexico.com/content/walmart-mexico/es_mx/tools/footer/_jcr_content/footer.img.png' height="45"></img>
                </div>
            </div>
            <div className="social-container social-container-padding first-link-set-center">
                <div  className='first-link-set app-page-links'>
                    <a><NavLink to={RoutesConstants.LocalesComerciales}><span className='first-link-set-text'>Locales Comerciales</span></NavLink></a>
                    <a><NavLink to={RoutesConstants.Terrenos}><span className='first-link-set-text'>Ofrécenos tu Terreno</span></NavLink></a>
                    <a><NavLink to={RoutesConstants.Proveedores}><span className='first-link-set-text'>Proveedores</span></NavLink></a>
                    <a><NavLink to={RoutesConstants.ExcessP}><span className='first-link-set-text'>Venta de Terreno</span></NavLink></a>
                    <a><NavLink to={RoutesConstants.ParkingLots}><span className='first-link-set-text'>Interés</span></NavLink></a>
                </div>
            </div>
            <div className="social-container social-container-padding first-link-set-center">
                <div style={{width: '700px', justifyContent: 'center'}} className='link-set-container'>
                    <a target="_blank" href="https://www.walmartmexico.com/conocenos/unete-al-equipo" className='second-link-set-text'>Únete al equipo |</a>
                    <a target="_blank" href="https://facturacion.walmartmexico.com.mx/" className='second-link-set-text'>Factura Electrónica |</a>
                    <a target="_blank" href="https://www.walmartmexico.com/terminos-de-uso-y-condiciones" className='second-link-set-text'>Términos de Uso y Condiciones |</a>
                    {/* <a target="_blank" href="https://bienesraices.walmartmexico.com.mx/Shared%20Documents/aviso.pdf" className='second-link-set-text'>Aviso de Privacidad |</a> */}
                    <TermsConditionsFileLink className="second-link-set-text"/> <span> |</span>
                    <a target="_blank" href="https://www.walmex.mx/" className='second-link-set-text'>Inversionistas |</a>
                    <a target="_blank" href="https://www.walmartmexico.com/propiedad-intelectual" className='second-link-set-text'>Propiedad Intelectual |</a>
                    <a target="_blank" href="https://www.walmartmexico.com/preguntas-frecuentes" className='second-link-set-text'>Preguntas frecuentes |</a>
                    <a target="_blank" href="https://www.walmartmexico.com/contactanos" className='second-link-set-text'>Contáctanos</a>
                </div>
            </div>

            <div className="social-container social-container-padding first-link-set-center">
                <div style={{width: '700px', justifyContent: 'center'}} className='link-set-container'>
                    <a href="https://corporate.walmart.com/" target="_blank">
                        <img src={walmartCorpImg} alt="logs corp" className='third-link-img-height'></img>
                    </a>
                    <a href="https://www.walmartmexico.com/" target="_blank">
                        <img className="third-link-img-height" src={walmartMexicoImg} alt="logs mexico"></img>
                    </a>
                    <a href="https://www.walmartcentroamerica.com/" target="_blank">
                        <img className="third-link-img-height" src={walmartCentroImg} alt="logs roamerica"></img>
                    </a>
                    <a href="https://www.bodegaaurrera.com.mx" target="_blank">
                        <img className="third-link-img-height" src={walmartBodegaImg} alt="logs gaaurrera"></img>
                    </a>
                    <a href="https://www.sams.com.mx/" target="_blank">
                        <img className="third-link-img-height" src={walmartSamsImg} alt="logs sams"></img>
                    </a>
                    <a href="https://www.walmart.com.mx/" target="_blank">
                        <img className="third-link-img-height" src={walmartExpressImg} alt="logs super"></img>
                    </a>
                    <a href="https://super.walmart.com.mx/" target="_blank">
                        <img className="third-link-img-height" src={walmartSuperImg} alt="logs mart"></img>
                    </a>
                </div>
            </div>
            <div style={{justifyContent: 'center'}} className="social-container social-container-padding">
                <div style={{width: '700px', justifyContent: 'center'}} className='link-set-container'>
                    <div style={{display:'none'}} className='right-border-style'>
                        <a href="/conocenos/directorio-de-tiendas">
                            <i className="fa fa-map-marker icon-style"></i>
                        </a>
                    </div>
                    <div className='icon-align-center'>
                        <a href="https://www.facebook.com/WalmartdeMexicoyCentroamerica" target="_blank">
                            <i className="fa fa-facebook-f icon-style"></i>
                        </a>
                    </div>
                    <div className='icon-align-center'>
                        <a href="https://www.instagram.com/walmartmexicoycam/" target="_blank">
                            <i className="fa fa-instagram icon-style"></i>
                        </a>
                    </div>
                    
                    <div className='icon-align-center'>
                        <a href="https://www.linkedin.com/company/walmartmexico" target="_blank">
                            <i  className="fa fa-linkedin icon-style"></i>
                        </a>
                    </div>
                    <div className='icon-align-center'>
                        <a href="https://twitter.com/walmartmxycam" target="_blank">
                            <img src={xIcon} className="x-icon-align"></img>
                        </a>
                    </div>
                    <div className='icon-align-center'>
                        <a href="https://www.youtube.com/user/WalmartMexicoyCAM" target="_blank">
                            <i className="fa fa-youtube-play icon-style"></i>
                        </a>
                    </div>
                </div>
            </div>

        </div>

        <div className='copyright-container'>
            <div className='content copyright-text'> © 2024 Walmart, Inc.</div>
        </div>

    </div>
)

