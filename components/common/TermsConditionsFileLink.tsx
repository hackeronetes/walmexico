import React from "react";


interface Props {
    className?: string
}

export const TermsConditionsFileLink = (Props: Props) => {
    let className = Props.className ? Props.className : ''
    return (
        <a className={" " + className} target="_blank" href="/docs/aviso.pdf" >Aviso de Privacidad</a>
    )

}
