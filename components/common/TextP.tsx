import React from "react";
import { styled, setup } from 'goober'

setup(React.createElement)

interface Props {
    children: string | JSX.Element
}

const Div = styled('div')`
    color: #333333;
`


export const TextP = (Props:Props) => {
    
    return (
        <Div className="text-para">{Props.children}</Div>
    )

}
