import React, { } from 'react'
import Image from '../components/common/Image'
import FolioTracking from '../components/common/FolioTracking'
import { MainTitle } from '../components/common/Titles'
import ImageSection from '../components/common/ImageSection'
import { SECTION_ID_IMAGES } from '../resources/project-constants'


export const Promotions: React.FC = () => {
    if (false) {
        return (
            <div className='page-container page-suppliers'>
                <div className="banner-img">
                    <Image name='promotions-banner1.png' className="supplier-banner-img" />
                </div>
                <FolioTracking />

                <div className='container main-container  mb-20'>
                    <div className='page-content'>
                        <section>
                            <div className="title-wrapper  mb-20">
                                <MainTitle text='Promociones' />
                            </div>
                            <div className="row">
                                <div className="col offset-s3 s6 text-center">
                                    <Image name='under-const-icon.png' className="icon-under-const" />
                                    <MainTitle text='En Construccion' />
                                </div>



                            </div>
                        </section>


                    </div>
                </div>


            </div>
        )
    } else {
        return (
            <>
                <ImageSection section={SECTION_ID_IMAGES.SECTION_PROMOTION} />

                <div className='container main-container  mb-20'>
                    <div className='page-content'>

                        <section>
                            <div className="title-wrapper  mb-20">
                                <MainTitle text='Promociones' />
                            </div>
                            <div className="row text-center">
                                En esta sección usted podrá ver las promociones que tenemos en los distintos locales comerciales.


                            </div>
                        </section>


                    </div>
                </div>
            </>
        )
    }
}
