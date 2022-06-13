
import React ,{useEffect, useState} from "react";

const trackerStyle = {
wordWrap: "break-word",
fontSize:"1rem",
position:"absolute",
bottom: "0px",
width:"100%",
display: "flex",
alignItems: "center",
justifyContent: "center",
alignContent: "center",
}
function TimeTracker(props){

 const  [currentPlayTime,setCurrentPlayTime] = useState(props.PlayerRef.current.getCurrentTime());

 function timePlacer(){

    setCurrentPlayTime(props.PlayerRef.current.getCurrentTime())   
 }

 function timeFormetter(timeInSeconds){
    
  const secs = (timeInSeconds % 60).toFixed(3);
  const mins = Math.trunc(timeInSeconds / 60); //this math function removes data after the .(point) making mins and int and removing the secons
  return (mins +":"+ secs);
}

    useEffect(() => {
      const interval = setInterval(() =>   timePlacer()  , 100);
      return () => {
        clearInterval(interval);
      };
    }, [currentPlayTime]);

return <div  style={trackerStyle}>

{props.timeformat ?<p style={{border: '2px solid black',height:"100%",width:"80%"}}><b>{ Number(currentPlayTime).toFixed(4)
}/{Number(props.PlayerRef.current.getDuration()).toFixed(4)}
</b></p> :<p style={{border: '2px solid black',height:"100%",width:"80%"}}> <b>{ timeFormetter(Number(currentPlayTime))
}/{timeFormetter(props.PlayerRef.current.getDuration())}</b></p>
 }
</div>

}
export default TimeTracker;