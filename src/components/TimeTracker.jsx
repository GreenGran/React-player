
import React ,{useEffect, useRef, useState} from "react";


const trackerStyle = {
wordWrap: "break-word",
fontSize:"1.25rem",
position:"absolute",
bottom: "0px",
width:"100%",
display: "flex",
alignItems: "center",
justifyContent: "center",
alignContent: "center",
}
function TimeTracker(props){

 const  [currentPlayTime,setCurrentPlayTime] = useState("");

 function timePlacer(){


    setCurrentPlayTime(props.PlayerRef.current.getCurrentTime())   
 }


    useEffect(() => {
      const interval = setInterval(() =>   timePlacer()  , 100);
      return () => {
        clearInterval(interval);
      };
    }, [currentPlayTime]);

return <div  style={trackerStyle}>

<p style={{border: '2px solid black',height:"100%",width:"80%"}}><b>{ Number(currentPlayTime).toFixed(4)
}/{Number(props.PlayerRef.current.getDuration()).toFixed(4)}
</b></p></div>

}
export default TimeTracker;