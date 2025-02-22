import React, { useState } from "react";
import { css } from 'goober';
import { Rating } from 'react-simple-star-rating'
import Image from './Image';
import { postFrequentQuestionScore } from '../../services/common/commonService'





const titleDiv = css`

`
const openCollapse = css`
background: #007dc6;
color: #fff;
`
const titleDivBtn = css`
display: block;
position: absolute;
width: 26px;
height: 26px;
background: url(../img/icon_desplegable.png) no-repeat -30px -2px;
right: 20px;
top: 20px;
`


interface IProps {
    open?: boolean;
    title: string;
    children: any;
    id: any;
}

const Collapsible: React.FC<IProps> = (props) => {
    const [isOpen, setIsOpen] = useState<any>(props.open);
    const [rating, setRating] = useState(0)

    
    const handleFilterOpening = () => {
        setIsOpen((prev: any) => !prev);
    };

    
        
    
        // other logic
      

      const onPointerEnter = () => console.log('Enter')
      const onPointerLeave = () => console.log('Leave')
      const onPointerMove = (value: number, index: number) => console.log(value, index)

    const handleRating = (rate: number) => {
        setRating(rate)

        let data = {
            scoreNbr:rate,
            questionId:props.id
        }
        postFrequentQuestionScore(data).then(() => {
            

        })
        .catch((error:any) => {
            //alert('Something went wrong')
            //setSelectStateOptions([])
            console.log('getStateList error', error)
            
        })

    }

    return (
    <>
        <div className="card">
            <div >
                <div className={`titleBar   ${isOpen ? openCollapse : ''}`}  onClick={handleFilterOpening}>
                    <div className={titleDiv}>
                        <h6 className="font-weight-bold">{props.title}</h6>
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
                        <div className="freq-rating-container">
                            <div>¿Le ha sido útil esta respuesta?</div>
                            <Rating
                                onClick={handleRating}
                                onPointerEnter={onPointerEnter}
                                onPointerLeave={onPointerLeave}
                                onPointerMove={onPointerMove}
                                initialValue={rating} 
                                size={24}
                                /* Available Props */
                            />
                        </div>
                    </div>
                )}</div>
                
                
            </div>
        </div>
    </>
  );
};

export default Collapsible;