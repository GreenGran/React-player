import { TimeBar } from './components/TimeBar';
import TimeTracker from "./components/TimeTracker";
import React, { useRef, useState,useEffect, useMemo, useCallback } from "react"; 
import  ReactDOM from 'react-dom';
import BarWithTimeOnHover from "./components/BarWithTimeOnHover.jsx";
import TimeFormatToggle  from './components/TimeFormatToggle';
import { AppBar, duration } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import { Container } from "@mui/material";
import ReactPlayer from "react-player";
import Marker from "./components/Marker";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import VolumeSlider from "./components/VolumeSlider";
import SpeedRadioButtonsGroup from "./components/SpeedRadioButtonsGroup";
import UploadFileIcon from '@mui/icons-material/UploadFile';

import PlayerComp from './components/PlayerComp';
import LoopingToggle from "./components/LoopingToggle";
import LoadingButton from '@mui/lab/LoadingButton';
import "./app.css";
import { debounce } from 'lodash';


import Button from '@mui/material/Button';
import { textAlign } from '@mui/system';



function App() {


  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#657786",
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: "none",
    lineHeight:"1",
    height:"100%",
    borderRadius: "0px"
    

  }));



  const Input = styled('input')({
    display: 'none',
  });

  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  window.addEventListener("wheel", event => event.preventDefault(), { passive:false })
  window.addEventListener('keydown', function(event) {
    if(event.keyCode === 32 && event.target === document.body) {
      event.preventDefault();
    }
  });

 
  const playerRef = useRef(null)
  var _ = require('lodash');
  
  const [jumpTo,setJumpTo] = useState("");
  const [VideoState,setVideoState] =useState({
    videoFilePath: null,
    videoSpeed: 1,
    videoTimer: 0
  })
  const [width,setwidth] = useState("100%");
  const [playing,setPlaying] = useState(false);
  const [volume,setVolume] = useState(0.50);
  const [speed,setSpeed] = useState(1);
  const [videoLoaded,setVideoLoaded] = useState(false);
  const timeFormatRef = useRef(null);
  const valRef = useRef(null);
  const speedRef = useRef(null);
  const playingRef = useRef(null);
  const loopingRef = useRef(null);
 

  // const ReactPlayerComponent = ReactDOM.render(<ReactPlayer/>)
  
  // const [videoFilePath, setVideoFilePath] = useState(null);
  // const [videoSpeed, setVideoSpeed] = useState(1);
  // const [videoTimer, setVideoTimer] = useState("load video to see timer");

  
  
  const handleVideoUpload = (event) => {
    setVideoLoaded(false);
    
    setVideoState(preV => {
      return {
        ...preV,
        videoFilePath: URL.createObjectURL(event.target.files[0])

        
      }
     
    });
  

 
    };
 
  function videoSpeedChanger(speed){
    setVideoState(preV => {
      return {
        ...preV,
        videoSpeed:speed
      }
    });
  }
 
  // function useInterval(callback, delay) {
  //   const savedCallback = useRef();
  
  //   // Remember the latest callback.
  //   useEffect(() => {
  //     savedCallback.current = callback;
  //   }, [callback]);
  
  //   // Set up the interval.
  //   useEffect(() => {
  //     function tick() {
  //       savedCallback.current();
  //     }
  //     if (delay !== null) {
  //       let id = setInterval(tick, delay);
  //       return () => clearInterval(id);
  //     }
  //   }, [delay]);
  // }

  // useInterval(()=>{
  //   setVideoState(preV => {

  //           return {
  //             ...preV,
  //             videoTimer :playerRef.current.getCurrentTime()
  //           }

  //         });
  // },100);



 function VideoTimerHandler(){//display time of video fucntion

    

    if(VideoState.videoFilePath !== null){
      return <p style={{textAlign: "center",margin:"0px"}} >{VideoState.videoTimer}/{playerRef.current.getDuration()}</p>;
    }else{
      return <p></p>
    }
   
  }
 
function getVideoTime(){
  
  //console.log("durr:"+playerRef.current.getDuration() + " curr:"+playerRef.current.getCurrentTime());
  return   playerRef.current.getCurrentTime() / playerRef.current.getDuration() ;
}

  function renderBar(){
  
      return(
        <BarWithTimeOnHover 
          duration= {playerRef.current.getDuration()}
          seekTo = {MouseClickSeek}
          playerRef = {playerRef}
       />
      )
    
}

function renderTimeBar(){
  
    return(
      <TimeBar    
      duration= {playerRef.current.getDuration()} width = {width}
       />
    )
  
}
function renderMarker(){

  return <Marker  getVideoTime={getVideoTime} duration= {playerRef.current.getDuration()} />;
}

function MouseClickSeek(timeValue){
 
 playerRef.current.seekTo(timeValue,'fraction');
 console.log(timeValue);

}

  function changeJumpTo(event){
    setJumpTo(event.target.value);
  }
  function Seek(num){
    let floatnum = parseFloat(jumpTo)
    console.log(floatnum);
    playerRef.current.seekTo(floatnum,'fraction');
  }
  
  function TableResize(e){
    //console.info('y' + e.deltaY);
    if(e.deltaY > 0){
      let newWidthString = width;
     newWidthString =  newWidthString.substring( 0,newWidthString.length -1 );
     newWidthString =  parseInt(newWidthString)+5;
     newWidthString = newWidthString.toString();
     newWidthString = newWidthString + "%";
     setwidth(newWidthString);
      
    }else{
      
      let newWidthString = width;
      newWidthString =  newWidthString.substring( 0,newWidthString.length -1 );
      if(newWidthString>100){
        newWidthString =  parseInt(newWidthString)-5;
        newWidthString = newWidthString.toString();
        newWidthString = newWidthString + "%";
        setwidth(newWidthString);
      }
    }
  }

  let ToggleStatus = false;
const timeFormatToggleChanger=()=>{

  console.log("toggle function called");
  ToggleStatus = !ToggleStatus;
  timeFormatRef.current(ToggleStatus);

}


let loopStatus = false;
const loopToggleChanger=()=>{

  console.log("toggleloop function called");
  loopStatus = !loopStatus;
  loopingRef.current(loopStatus);

}
  const ChangeVolume =(newVolume)=>{

    //valRef.current= newVolume;
    valRef.current(newVolume);
    console.log(valRef.current);
  }
  const onCommitVolume =(newVolume)=>{
    setVolume(newVolume);
   
  }

  const speedChanger= (newSpeed)=>{
    speedRef.current(newSpeed);
    setSpeed(newSpeed);

  }
let playingStatus = false;
function playingBtn(){
  playingStatus = !playingStatus;
  console.log(playingStatus);
  playingRef.current(playingStatus);
}


  

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log('This will run every second!');
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);
  const divStyle ={
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
    alignContent: "center",
    padding:"0px"
    
  }
  const beforUploadStyle ={
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
    alignContent: "center",
    paddingTop: "25px",
    paddingBottom: "0px",
  
    
  }


  function timeBarRenderer(){

    console.log(playerRef.current); 
    if(videoLoaded){
      return(<div>
        <TimeBar  playerRef= {playerRef} width = {width}  toggleRef = {timeFormatRef} seekTo = {MouseClickSeek} /> 
        {/* <BarWithTimeOnHover   ToggleStatus={ToggleStatus}  duration= {playerRef.current.getDuration()} seekTo = {MouseClickSeek} playerRef = {playerRef} />  */}
        <Marker  getVideoTime={getVideoTime} duration= {playerRef.current.getDuration()} />
    
      
      </div>
       )
    }else{
      console.log("playerRef is null"); 
    }

  
   
  }
function OnVideoLoad(){
  setVideoLoaded(true);
 
}
  const config = {
    attributes: {
      controls: false
    }
  };
  


  return (<>
    <div > 



   <Box sx={{ flexGrow: 1 }} >
      <Grid container spacing={0}> 
        <Grid item xs={2} > 
        <Item style={{position: "relative",border: '2px solid #E1E8ED',boxSizing: "border-box"}} >

        <div >
        {/* <button     onClick={playingBtn}  className="play_btn"  style={{position: 'absolute', right: "0", buttom: "0"}}>play</button> */}
        {/* <button      onClick={handleVideoUpload}  className="play_btn"  style={{ right: "150", buttom: "150"}}>Re-Upload</button> */}
        {/* <input  type="file" title="your text" style={{ color: "transparent"}}  onChange={handleVideoUpload}  accept="mp4, video/*"  /> */}

        <label htmlFor="contained-button-file" style={beforUploadStyle}>
        <Input accept="video/*" id="contained-button-file"  onChange={handleVideoUpload} multiple type="file" />
            <Button variant="contained"  color="inherit" component="span">
            <b>Upload</b>
            </Button>
      </label>
{/* 
        <label htmlFor="files" src={UploadFileIcon} >Select a video file:</label>
        <input  src={UploadFileIcon} onChange={handleVideoUpload} type="file"  id="videoFile" accept="video/*"/> */}
         </div>
      



        <TimeFormatToggle 
        timeFormatChanger ={timeFormatToggleChanger} />
        <LoopingToggle
          loopToggleChanger={loopToggleChanger}
        />


   {videoLoaded ? <TimeTracker PlayerRef = {playerRef} /> :null }

     







         </Item>
        </Grid>
        <Grid item xs={8} style={{position: "relative",border: '2px solid #E1E8ED',boxSizing: "border-box", backgroundColor: "#657786"}}> 
      <Container maxWidth="xl"  justify="center" style={divStyle}> 
      {VideoState.videoFilePath ?<PlayerComp         videoFilePath = {VideoState.videoFilePath}
       playingRef ={playingRef} looping = {loopingRef} speedRef={speedRef} valRef={valRef}  playerRef = {playerRef} didVideoLoad={OnVideoLoad} /> : null}
    {/* <ReactPlayer   config={config} playing ={playing}  style={{padding:"0px"}}   ref={playerRef}   url={VideoState.videoFilePath} playbackRate={VideoState.videoSpeed} width="100%" height="100%"  /> */}
    </Container>
        </Grid>
        <Grid item xs={2}>
          
       
          

        {/* <Box sx={{ flexGrow: 1 } } >
<Grid container spacing={0} >



  <Grid item xs={6} >
    <Item  > 
    <SpeedRadioButtonsGroup  speedFunc= {speedChanger}
      speedState={speed}
    />
</Item>
    </Grid>
    <Grid item xs={6}>
    <Item  >
    <VolumeSlider
      volumeState = {volume}
      volumeFunc={ChangeVolume}
      onCommitVolume={onCommitVolume}
    /> 
    </Item> 
    </Grid>



</Grid>
</Box>
 */}
<Item>

<Box sx={{ flexGrow: 1 } } style={{height:"100%",border: '2px solid #E1E8ED',boxSizing: "border-box"}} >
<Grid container spacing={0}  style={{height:"100%"}}  >
  <Grid item xs={6}   >
    <Item  > 
    <SpeedRadioButtonsGroup  speedFunc= {speedChanger}
      speedState={speed}
      videoLoaded = {videoLoaded}
     
    />
    </Item>
    </Grid>
    <Grid item xs={6}>
    <Item >
    <VolumeSlider
      volumeState = {volume}
      volumeFunc={ChangeVolume}
      onCommitVolume={onCommitVolume}
      videoLoaded = {videoLoaded}
    /> 
    </Item> 
    </Grid>

</Grid>
</Box>










    </Item>






        </Grid>
      </Grid>
    </Box>

   


   <div className={["controlBG divScroll "]} style={{border: '2px solid #E1E8ED',boxSizing: 'border-box' }} onWheel = {(e) => TableResize(e)}   >
  
    <div  style={{width: width,}} className="remaining-height" >
    

    {VideoState.videoFilePath  && videoLoaded ?  timeBarRenderer() :
     VideoState.videoFilePath ? <LoadingButton loading loadingIndicator="Loading..."  size="large"  variant='contained'  style={{width:"100%",height:"100px"}}>
    Fetch data</LoadingButton>:<div   ><label style={beforUploadStyle} htmlFor="contained-button-file">
        <Input accept="video/*" id="contained-button-file"  onChange={handleVideoUpload} multiple type="file" />
            <Button variant="contained"  color="inherit" component="span">
                <b>Upload</b>
            </Button>
      </label> <p style={{textAlign:"center",fontSize:"1.5rem"}}>uploada a video to see the time-line </p></div>}
    
   



  
    
    </div>
 
    </div> 
    

    </div>
  </>
  
  );
}

export default App;

    


