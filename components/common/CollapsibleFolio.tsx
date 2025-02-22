import React, { useState } from "react";
import { css } from 'goober';

import Image from './Image';





const titleDiv = css`

`
const titleBar =css`
    padding: 5px 32px 5px 15px;
    color: #fff;
    background: #004c91;
    
    position: relative;
`

const openCollapse = css`
background: #004c91;
color: #fff;
`
const titleDivBtn = css`
display: block;
position: absolute;
width: 26px;
height: 26px;
background: url(../img/icon_desplegable.png) no-repeat -30px -2px;
right: 20px;
top: 14px;
`



interface IProps {
    //open?: boolean;
    //title: string;
    children: any;
    //id: any;
}

const CollapsibleFolio: React.FC<IProps> = (props) => {
    const [isOpen, setIsOpen] = useState<any>(true);

    
    const handleFilterOpening = () => {
        setIsOpen((prev: any) => !prev);
    };

    
    return (
    <>
        <div className="">
            <div >
                <div className={titleBar + ` bg-blue-row   ${isOpen ? openCollapse : ''}`}  onClick={handleFilterOpening}>
                    <div className={titleDiv}>
                        <h6 className="font-weight-bold">Detalles</h6>
                    </div>
                    <div className={titleDivBtn}>
                        <span className="" >
                            {!isOpen ? (
                               <Image name="icon-plus-collapse.png" />
                            ) : (
                                <Image name="icon-close-collapse.png" />
                                )}
                        </span>
                    </div>



                </div>
            </div>

            <div className="border-bottom">
                <div>{isOpen &&  (
                    <div className="p-10">
                        <div className="">
                            {props.children}
                        </div>
                       
                    </div>
                )}</div>
                
                
            </div>
        </div>
    </>
  );
};

export default CollapsibleFolio;