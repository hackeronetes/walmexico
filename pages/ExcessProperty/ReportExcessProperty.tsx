import { MainTitle } from "../../components/common/Titles"
import { ExcessPropertyTable } from "./components/ExcessPropertyTable"

export const ReportExcessProperty: React.FC = () => {



    return(
        <div className='page-container type-filter'>
            <div className='container main-container'>
                <div className='page-content '>
                    <div className='desc-container'>
                        <div className="title-wrapper">
                            <MainTitle text={"Consulta de Immuebles Excess Property"} />
                        </div>
                       
                    </div>
                    <ExcessPropertyTable readOnly={true}  />
                </div>
            </div>
        </div>
           
        
    )



}


