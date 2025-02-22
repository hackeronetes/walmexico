import React from 'react'
import { styled } from 'goober';

// setup(h);

const PrimaryBtn = styled('button')`

    text-decoration: none;
    color: #fff;
    background: #ffc220;
    padding: 5px 5px;
    display: block;
    text-align: center;
    margin: 20px auto;
    border: none;
    width: 100%;
    cursor: pointer;

    &:focus{
        background: #ffc220;
    }
    &:hover {
        color: #fff;
        background: #0b59a1;
    }

`;

const PrimaryBtnSpan = styled('span')`

    text-decoration: none;
    color: #fff;
    background: #ffc220;
    padding: 5px 5px;
    display: block;
    text-align: center;
    margin: 20px auto;
    border: none;
    width: 100%;
    cursor: pointer;

    &:focus{
        background: #ffc220;
    }
    &:hover {
        color: #fff;
        background: #0b59a1;
    }

`;

interface Props {
    className?: string,
    children: React.ReactNode
    onClick:  ((e: React.MouseEvent<HTMLButtonElement>) => void)

}

export const PrimaryButton: React.FC<Props> = (Props) => {
    return (
        <PrimaryBtn 
            onClick={Props.onClick}
            className={'primary-btns otherClass ' + Props.className
        } >
            {Props.children}
        </PrimaryBtn>
    )
}


export const PrimaryButtonSpan: React.FC<Props> = (Props) => {
    return (
        <PrimaryBtnSpan 
            onClick={Props.onClick}
            className={'primary-btns otherClass ' + Props.className
        } >
            {Props.children}
        </PrimaryBtnSpan>
    )
}


const SecondryBtn = styled('button')`

    text-decoration: none;
    color: #fff;
    background: #ccc;
    padding: 5px 0;
    display: block;
    text-align: center;
    margin: 20px auto;
    border: none;
    width: 100%;
    cursor: pointer;
    
     &:focus,
     &:hover {
        color: #fff;
        background: #ccc;
     }

`;

export const SecondryButton: React.FC<Props> = (Props) => {
    return (
        <SecondryBtn 
            onClick={Props.onClick}
            className={'secondry-btns otherClass ' + Props.className
        } >
            {Props.children}
        </SecondryBtn>
    )
}

