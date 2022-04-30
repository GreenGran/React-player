import React, { useState } from "react";

    function LoopingToggle(props) {
      const [toggle,setToggle] = useState(false);
      function temp(event){
        setToggle(!toggle);
        props.loopToggleChanger()
        //console.log("toggleing "+toggle);
      }
      return (<div >
        <p><b> Video looping</b></p>
          <label  className="switch" >
           <input onChange={temp} type="checkbox" />
            <span className="slider round"></span>
            </label> 
        </div>);
    }
  
export default LoopingToggle;