import { TimeBar } from './components/TimeBar';
import TimeTracker from "./components/TimeTracker";
import React, { useRef, useState} from "react"; 
import  ReactDOM from 'react-dom';
import TimeFormatToggle  from './components/TimeFormatToggle';
import { Container } from "@mui/material";
import Marker from "./components/Marker";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import VolumeSlider from "./components/VolumeSlider";
import SpeedRadioButtonsGroup from "./components/SpeedRadioButtonsGroup";
import PlayerComp from './components/PlayerComp';
import LoopingToggle from "./components/LoopingToggle";
import LoadingButton from '@mui/lab/LoadingButton';
import "./app.css";
import Button from '@mui/material/Button';



function App() {

//--------------------------------------------------------------------------------------------STYLES------------------------------------------------------------------------------
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
  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  window.addEventListener("wheel", event => event.preventDefault(), { passive:false })
  window.addEventListener('keydown', function(event) {
    if(event.keyCode === 32 && event.target === document.body) {
      event.preventDefault();
    }
  });

 
  const playerRef = useRef(null)// refrence for the react player componant will be initialized upon loading a video

  const [videoFilePath,setVideoFilePath] =useState(null)
  const [width,setwidth] = useState("100%");
  const [volume,setVolume] = useState(0.50);
  const [speed,setSpeed] = useState(1);
  const [videoLoaded,setVideoLoaded] = useState(false);
  const [looping,setLooping] = useState(false);
  const [timeformat,setTimeformat] = useState(false);
  const timeFormatRef = useRef(null);
  const valRef = useRef(null);
  const speedRef = useRef(null);
  const loopingRef = useRef(null);
 

  
  //fucntion being call when one of the upload buttons are pressed, after a video is selected the videoFilePath state is changed
  const handleVideoUpload = (event) => {
    setVideoLoaded(false);
    setVideoFilePath(URL.createObjectURL(event.target.files[0]))  
    };
 


 
  //fucntion returns the current time of the video by percent this is used to move the red marker
function getVideoTime(){
  return   playerRef.current.getCurrentTime() / playerRef.current.getDuration() ;
}
//function to more the video when a user click on the timeLine
function MouseClickSeek(timeValue){
 playerRef.current.seekTo(timeValue,'fraction');
}


//function for growing the timeLine set to 5 width growth/shrink upon mouse wheel could be changed if slower or faster change is needed by changing the changeRate var
const changeRate = 5;
function TableResize(e){
    if(e.deltaY > 0){
      let newWidthString = width;
     newWidthString =  newWidthString.substring( 0,newWidthString.length -1 );
     newWidthString =  parseInt(newWidthString)+changeRate;
     newWidthString = newWidthString.toString();
     newWidthString = newWidthString + "%";
     setwidth(newWidthString);
      
    }else{
      let newWidthString = width;
      newWidthString =  newWidthString.substring( 0,newWidthString.length -1 );
      if(newWidthString>100){
        newWidthString =  parseInt(newWidthString)-changeRate;
        newWidthString = newWidthString.toString();
        newWidthString = newWidthString + "%";
        setwidth(newWidthString);
      }
    }
  }

//fucntion that changed the timeLine time points display from normal to seconds only

const timeFormatToggleChanger=()=>{
setTimeformat(!timeformat) ;
timeFormatRef.current(timeformat);

}

//fucntion that toggles if the video should loop upon ending or not
const loopToggleChanger=(newLoop)=>{
  //setLooping(!looping);
  
  loopingRef.current(newLoop);

}
//fucntion that is being called when the volume slider changes and changed the volume
  const ChangeVolume =(newVolume)=>{
    valRef.current(newVolume);

  }
  //fucntion that is being called when the volume slider commit(mouse up) and changed the volumeState so its not reset about rerendering,
  //this is for performance issues saving state 100 times per-second when mouse is held couses lag
  const onCommitVolume =(newVolume)=>{
    setVolume(newVolume);
   
  }
//fucntion that is being called when the a radio speed button what changed and changes the speed
  const speedChanger= (newSpeed)=>{
    speedRef.current(newSpeed);
    setSpeed(newSpeed);

  }

//fucntion that renders the timebar if the video is fully loaded and the filePath is not null other wise a upload button will show if file path is null and a loading icon
//ill show if filePath is not null but videoLoaded is false
  function timeBarRenderer(){
    if(videoLoaded){
      return(<div>
        <TimeBar  playerRef= {playerRef} width = {width}  toggleRef = {timeFormatRef} seekTo = {MouseClickSeek} /> 
        <Marker  getVideoTime={getVideoTime} duration= {playerRef.current.getDuration()} />
      </div>
       )
    }
  }

//sets videoLoaded to true, resets bakc to false when i new file is selected
function OnVideoLoad(){
  setVideoLoaded(true);
 
}

  return (<>
    <div > 
   <Box sx={{ flexGrow: 1 }}  >
      <Grid container spacing={0}> 
        <Grid item xs={2} > 
        <Item style={{position: "relative",border: '2px solid #E1E8ED',boxSizing: "border-box"}} >

        <div >
          <label htmlFor="contained-button-file" style={beforUploadStyle}>
            <Input accept="video/*" id="contained-button-file"  onChange={handleVideoUpload} multiple type="file" />
            <Button variant="contained"  color="inherit" component="span">
              <b>Upload</b>
            </Button>
          </label>
        </div>
      

        <TimeFormatToggle 
        timeFormatChanger ={timeFormatToggleChanger} checked={timeformat}
         />
        <LoopingToggle
          loopToggleChanger={loopToggleChanger} checked={looping}
        />
   {videoLoaded ? <TimeTracker PlayerRef = {playerRef} timeformat={timeformat}  /> :<p style={trackerStyle}><b>load a video to see video duration</b></p> }



         </Item>
        </Grid>
        <Grid item xs={8} style={{position: "relative",border: '2px solid #E1E8ED',boxSizing: "border-box", backgroundColor: "#657786"}}> 
      <Container maxWidth="xl"  justify="center" style={divStyle} > 
      {videoFilePath ?<PlayerComp         videoFilePath = {videoFilePath}
       looping = {loopingRef} speedRef={speedRef} valRef={valRef}  playerRef = {playerRef} didVideoLoad={OnVideoLoad} /> : null}
    </Container>
        </Grid>
        <Grid item xs={2}>
          
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
        {videoFilePath  && videoLoaded ?  timeBarRenderer() :
        videoFilePath ? <LoadingButton loading loadingIndicator="Loading..."  size="large"  variant='contained'  style={{width:"100%",height:"100px"}}>
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

    


