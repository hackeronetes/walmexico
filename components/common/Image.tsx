import React from 'react'

interface Props {
    name: string,
    alt?: string,
    className?: string,
    id?: string,
}

const Image: React.FC<Props> = (Props) => {
    return (
        <img src={'images/' + Props.name} alt={Props.alt} className={Props.className} id={Props.id}/>
    )
}

export default Image