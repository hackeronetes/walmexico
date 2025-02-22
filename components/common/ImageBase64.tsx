import React from 'react'

interface Props {
    url: string,
    alt?: string,
    className?: string,
    id?: string,
}

const ImageBase64: React.FC<Props> = (Props) => {

    const convertBase64ToImage = () => {
        return 'data:image/png;base64,' +Props.url
    }

    return (
        <img src={convertBase64ToImage()} alt={Props.alt} className={Props.className ? Props.className : ''} id={Props.id ? Props.id : ''}/>
    )
}

export default ImageBase64