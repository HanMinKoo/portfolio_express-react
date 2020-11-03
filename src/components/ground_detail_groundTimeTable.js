import React, {useEffect} from 'react';

function fetchGroundTimeTable(){
    // let path;

    // (id===0) ? path='/reservation' :path=`/reservation/?number=${id}`;
    // const groundInfo = await fetch(path);
    // const groundInfoData = await groundInfo.json();
    
    // setGroundInfo(groundInfoData.groundList);

}

const GroundTimeTable = () =>{
    useEffect(()=>{
        fetchGroundTimeTable();

    },[]);
    return(
        <>
            <h1>test</h1>
        </>
    );
}

export default GroundTimeTable;