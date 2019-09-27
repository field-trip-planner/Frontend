// import React, { useState, useEffect } from "react";
// import { Button, Modal, Container, Input, Dropdown } from "semantic-ui-react";
// import api from "../../api/index.js";
// import { useGlobal } from "reactn";

// const getParentList = () => {
//     const [parent, setParent] = useGlobal("parent")
//     const [parentList, setParentList] = useState([])

//     useEffect( async() => {
//         try{
//             const list = await api.get("users/parents/4187269f-d1fa-41fe-ad34-2e7d74a9031a")
//         console.log(list)
//     } catch(err){
//         console.log("failed to get list")
//     }
        
//     })

// }

// export default getParentList;