import { TextP } from "../../../../components/common/TextP"
import { MainTitle } from "../../../../components/common/Titles"
import { useNavigate } from 'react-router-dom'
import { ExcessPropertyTable } from "./components/ExcessPropertyTable"
import RoutesConstants from "../../../../resources/route-constants"
import { useAppDispatch } from "../../../../store/hooks"
import { setExcessPRopertyRow } from "../../../../store/excessPropertyReducer"
import Image from '../../../../components/common/Image';
// import axios from "axios";
// import CustomAxios from "../../../../utility/customAxios"

export const CatalogueExcessProperty: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    
    const handleEditRow = (row:any) => {
        dispatch(setExcessPRopertyRow(row));
        navigate(`${RoutesConstants.ExcessPropCatalog}?newCatlog=0`, row); 
    }
    
    function goToNewUser() {
        dispatch(setExcessPRopertyRow(undefined));
        navigate(`${RoutesConstants.ExcessPropCatalog}?newCatlog=1`)
    }

    return(
        <div className='page-container type-filter'>
            <div className='container main-container'>
                <div className='page-content '>
                    <div className='desc-container mb-20'>
                        <div className="title-wrapper">
                            <MainTitle text={"Consulta de Immuebles Excess Property"} />
                        </div>
                        <div className="title-wrapper">
                            <TextP>En esta sección puedes administrar la propiedades con excedentes disponibles; añadir (+), editar (lápiz eliminar (bote de basura) los mismos. Te recordamos que todos los campos serán visibles por los usuarios externos.</TextP>
                        </div>
                       
                    </div>
                    <div className='row'>
                        <div className='col s12 m4 offset-m4 '>
                            <div className="text-center main-color-text">
                            Nueva Propiedad <span onClick={() => goToNewUser()}> <Image name='new-user.png' className="vertical-middle" /></span>
                            </div>
                        </div>

                            
                    </div>
                    <ExcessPropertyTable readOnly={false} handleEditRow={handleEditRow}  />
                </div>
            </div>
        </div>
           
        
    )


}


