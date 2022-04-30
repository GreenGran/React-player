
import React ,{useEffect, useRef, useState} from "react";
import redBall from "../images/redMarker.png";


function Marker(props){

 const [markerPlace,setMarkerPlace] = useState("0%");

    const lineStyle={ //maybe add later

        // background:" linear-gradient(#000, #000) no-repeat center/3px 100%",
        width:"3px",
        height:"10px",
        transform:'translateX(-50%)',
        position:"relative",
        marginLeft:markerPlace,

    }

    const ball={

        width:"30px",
        height:"30px",
        transform:'translateX(-45%)', //dont know why -45% works to center it and -50% is a little off but it looks good,
        position:"relative",
        
        bottom:"20px",
    }



    useEffect(() => {
      const interval = setInterval(() => markerMover(), 10);
      return () => {
        clearInterval(interval);
      };
    }, []);
function markerMover(){

    const newWidth = (100*props.getVideoTime())+"%";
    //console.log(newWidth);
    setMarkerPlace(newWidth);
}
return <div  style={lineStyle}>

<img src={redBall} style={ball} />
</div>

}
export default Marker;