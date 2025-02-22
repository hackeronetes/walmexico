import React from "react";
import { styled, setup } from 'goober'

setup(React.createElement)

interface Props {
    text: string,
    className?: string
}

const H1 = styled('h1')`
    font-size: 25px;
    color: #0b59a1;
    margin: 25px auto;
    padding: 5px;
    text-align: center;
    font-weight: 500;
`


export const MainTitle = (Props: Props) => {
    let className = Props.className ? Props.className : ''
    return <H1 className={"main-title " + className}>{Props.text}</H1>

}


const H4 = styled('h4')`
font-size: 20px;
color: #0b59a1;
margin: 0px auto;
padding: 5px;
text-align: center;
font-weight: 500;
`
export const SmallTitle = (Props: Props) => {
    let className = Props.className ? Props.className : ''
    return <H4 className={"small-title " + className}>{Props.text}</H4>
}