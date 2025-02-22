import React, {useState, useEffect} from "react";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { getAllMenu } from "../../services/adminRole/adminRoleService";



// const nodes = [
//     {
//         value: "1",
//         label: "Commercial Premises"
//     },
//     {
//         value: "2",
//         label: "Offer us your land"
//     },
//     {
//       value: "3",
//       label: "Interest",
//       children: [
//         {
//           value: "4",
//           label: "Interest"
//         },
//         { value: "5", label: "Parking Lot" }
//       ]
//     },
//     {
//       value: "saturn",
//       label: "Satrun"
//     },
//     {
//       value: "jupitor",
//       label: "Jupitor"
//     }
//   ];


interface Props {
    isDisabled: boolean
    selectedPermissions?: any,
    setSelectedPermissions? : any
}

const Permissions:React.FC<Props> = (Props) => {

    const [checked, setChecked] = useState<any[]>([]); // ['saturn', '3', '2']
    const [expanded, setExpanded] = useState([]);
    const [treeNodes, setTreeNodes] = useState([]);
    const [nodeDup,setNodeDup] = useState<any[]>([])
    


    

   
   
    const getAllMenuStructure = () => { 
      getAllMenu().then((res:any) => {
         
          if(res.data)
            setTreeNodes(res.data)
            setNodeDup(res.data)
          
      })
      .catch((error:any) => {
          //alert('Something went wrong')
          //setSelectStateOptions([])
              // setTableRows([])
          console.log('getStateList error', error)
      })


  } 




  useEffect(() => {
      getAllMenuStructure()
      
  }, [])
  
  useEffect(() => {
    if(Props.selectedPermissions)
      setChecked(Props.selectedPermissions)
      
  }, [Props.selectedPermissions])

    const handlCheckboxChange = (checked2:any[]) => {

       

        


        let arry2:any[] = [];
        
        for(let i  = 0; i < nodeDup.length; i++){
            if([12,1,46].includes(nodeDup[i].value)){
              if(nodeDup[i].children.length > 0){
                for(let j = 0; j < nodeDup[i].children.length; j++){
                    arry2 = [];
                    if(nodeDup[i].children[j].children?.length > 0){
                     for(let k = 0; k < nodeDup[i].children[j].children.length; k++){
                        arry2.push(String(nodeDup[i].children[j].children[k].value));
                        
                     }
                   
                       if(!arry2.some(v => checked2.includes(String(v)))){
                        
                       let index = checked2.indexOf(String(nodeDup[i].children[j].value));
                         if(index > -1){
                         checked2.splice(index, 1);
                         }
                      } else{
                        let index2 = checked2.indexOf(String(nodeDup[i].children[j].value));
                        
                        if(index2 == -1){
                            
                            checked2.push(String(nodeDup[i].children[j].value));
                            
                        }
                      }   
                    }
                }
              }
            }
        }
       
        setChecked(checked2)
        Props.setSelectedPermissions(checked2)
    }

    const getCheckboxTree = () => {
        let result:any = ''
        try{
            result = <CheckboxTree
                nodes={treeNodes}
                checked={checked}
                expanded={expanded}
                onCheck={(checked2) => handlCheckboxChange(checked2)}
                onExpand={(expanded2:any) => setExpanded(expanded2)}
                showNodeIcon={false}
                disabled={Props.isDisabled}
                //showNodeTitle={false}
                icons={{
                    check: <span className="rct-icon rct-icon-check" />,
                    uncheck: <span className="rct-icon rct-icon-uncheck" />,
                    halfCheck: <span className="rct-icon rct-icon-half-check" />,
                    expandClose: <span className="rct-icon rct-icon-expand-close" />,
                    expandOpen: <span className="rct-icon rct-icon-expand-open" />,
                    expandAll: <span className="rct-icon rct-icon-expand-all" />,
                    collapseAll: <span className="rct-icon rct-icon-collapse-all" />,
                    parentClose: <span className="rct-icon rct-icon-parent-close" />,
                    parentOpen: <span className="rct-icon rct-icon-parent-open" />,
                    leaf: <span className="rct-icon rct-icon-leaf" />,
                }}
            />
        } catch(e:any) {
            return <></>
        }
        
        return result
    }


   

        
        return (
            getCheckboxTree()
        )

    

   

}

export default Permissions