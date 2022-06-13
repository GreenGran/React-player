
import React ,{useEffect,  useState} from "react";
import redBall from "../images/redMarker.png";


function Marker(props){

 const [markerPlace,setMarkerPlace] = useState("0%");

    const markerStyle={ //makes the marker stay in the middle of where it needs to be

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

//this is called ever 0.1 of a sec and moves the marker
    useEffect(() => {
      const interval = setInterval(() => markerMover(), 10);
      return () => {
        clearInterval(interval);
      };
    }, []);

// function for moving the marker
function markerMover(){ 
    const newWidth = (100*props.getVideoTime())+"%";
    setMarkerPlace(newWidth);
}
return <div  style={markerStyle}>
<img src={redBall} alt="img of the marker that show current place in the video timeLine" style={ball} />
</div>
}
export default Marker;