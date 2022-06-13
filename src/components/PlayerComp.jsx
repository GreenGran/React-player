import React ,{ useEffect, useRef, useState,useCallback} from "react";
import ReactPlayer from "react-player";
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUp from "@mui/icons-material/VolumeUp";
import { findDOMNode } from 'react-dom'
import screenfull from 'screenfull'
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import Forward5Icon from '@mui/icons-material/Forward5';
import Replay5Icon from '@mui/icons-material/Replay5';
import fileSaver from 'file-saver';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


function PlayerComp(props){
const compRef = useRef();
const playRef = useRef(false);
const muteRef = useRef(false);
const [volume,setVolume] = useState(0.5);
const [speed,setSpeed] = useState(1);
const [count,setCount]= useState(0);

const [playing,setPlaying]= useState(false);
const [looping,setLooping]= useState(false);
const [mute,setMute]= useState(false);
const imgRef = useRef();


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#14171A",
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: "none",
  borderRadius: "0px"
 


}));


const ChangeVolume =(newVolume)=>{
    setVolume(newVolume);
};
const ChangeSpeed =(newVolume)=>{
  setSpeed(newVolume);
};

const Changelooping =(newLooping)=>{

  setLooping(newLooping);
};

const onClickFullscreen = () => {
  screenfull.request(findDOMNode(compRef.current))
}


    useEffect(() => {
     
      props.valRef.current = ChangeVolume;
      props.speedRef.current = ChangeSpeed;

      props.looping.current = Changelooping;
    
   
      document.addEventListener("keydown", onKeyDown);
      return () => {
        document.removeEventListener("keydown", onKeyDown);
    

      };
    }, [])





//fucntion for the event keypress lisener
     const onKeyDown = useCallback((event) => { 
    if(event.key ===" "){ 
      playingBtn();
    }
    if(event.key ==="m"){
      muteFunction();
    } 
    if(event.key ==="f"){
      screenfull.toggle(findDOMNode(compRef.current))
    }
  
    if(event.key ==="ArrowLeft"){
      console.log("-5");
      move5secs(-5);
    }
    if(event.key ==="ArrowRight"){
      console.log("+5");
      move5secs(5);
    }
    setCount(count+1);// basic force update
    }, []);


function move5secs(direction){
    compRef.current.seekTo(compRef.current.getCurrentTime()+ direction,'seconds');
}

function videoEnd(){
  console.log("set to false");
  playRef.current = false;
  setPlaying(playRef.current);
}

function playingBtn(){
  playRef.current = !playRef.current;
  setPlaying(playRef.current);
  
}

// --------------------------------------------------------------------------------------------------------------------

function captureVideoFrame(video, format, quality) {
  if (typeof video === 'string') {
      video = document.getElementById(video);
  }

  format = format || 'jpeg';
  quality = quality || 0.92;

  if (!video || (format !== 'png' && format !== 'jpeg')) {
      return false;
  }

  var canvas = document.createElement("CANVAS");

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  canvas.getContext('2d').drawImage(video, 0, 0);

  var dataUri = canvas.toDataURL('image/' + format, quality);
  var data = dataUri.split(',')[1];
  var mimeType = dataUri.split(';')[0].slice(5)

  var bytes = window.atob(data);
  var buf = new ArrayBuffer(bytes.length);
  var arr = new Uint8Array(buf);

  for (var i = 0; i < bytes.length; i++) {
      arr[i] = bytes.charCodeAt(i);
  }

  var blob = new Blob([ arr ], { type: mimeType });
  return { blob: blob, dataUri: dataUri, format: format };
};

// --------------------------------------------------------------------------------------------------------------------


const centerDivStyle ={
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "auto",
  alignContent: "center",
  padding:"0px"
  
}
const buttonsStyle ={

  justifyContent: "center",
  marginLeft: "0.5%",
  marginRight: "0.5%",
  alignContent: "center",
  
}

function captureFrame(){
  const frame = captureVideoFrame(compRef.current.getInternalPlayer())
  imgRef.current = frame.dataUri;
   return frame.dataUri;
 
}
//function for saving file
const saveimage = () => {
  fileSaver.saveAs(
    captureFrame(),
    "VideoFrame"
  );
  };
  
function muteFunction(){
  muteRef.current = !muteRef.current;
  setMute(muteRef.current);
}
//set video loaded when the video is fully loaded
  function onVideoReady(){
    props.playerRef.current = compRef.current;
    props.didVideoLoad(true);
    setCount(count+1);// basic force update
 
  }
  function fullScreenFunc(){
  screenfull.toggle(findDOMNode(compRef.current))
  }

const config = {
        attributes: {
          controls: false,
          crossOrigin: 'anonymous'
        }
      };
return <div style={{borderStyle: "double", backgroundColor: "#14171A"}} >
<ReactPlayer   onDoubleClick={fullScreenFunc} config={config} style={{padding:"0px"}} playing={playing} playbackRate={speed}  onReady={onVideoReady} 
 ref={compRef} onEnded={videoEnd}  muted={mute} volume={volume} loop={looping} url={props.videoFilePath}  width="100%" height="75vh" controls={true} />
<div style={centerDivStyle} >


<Box  sx={{ flexGrow: 1 }} >
      <Grid container spacing={0}>
        <Grid item xs={2}>
          <Item >
            <Button  style={ buttonsStyle} onClick={() => move5secs(-5)} title='move backwards 5 seconds(right arrow key)' variant='contained'  color="inherit" >
              <Replay5Icon/>
            </Button>
          </Item>
      </Grid>
      <Grid item xs={2}>
        <Item >  
          <Button  style={ buttonsStyle} variant="contained"  color="inherit" title='play(space)' onClick={playingBtn}>
            {playing ?<StopIcon/>:<PlayArrowIcon/> }
          </Button>
        </Item>
      </Grid>
      <Grid item xs={2}>
        <Item> 
          <Button  style={ buttonsStyle} onClick={() => move5secs(5)} title='fast farward 5 seconds(left arrow key)' variant='contained'  color="inherit" >
            <Forward5Icon/>
          </Button>
        </Item>
      </Grid>
      <Grid item xs={2}>
        <Item> 
          <Button  style={ buttonsStyle}  onClick={muteFunction} title='mute(m)' variant='contained'  color="inherit" >
            {mute ?<VolumeOffIcon /> :<VolumeUp/>}
          </Button>
        </Item>
      </Grid>
      <Grid item xs={2}>
        <Item> 
          <Button   style={ buttonsStyle} onClick={()=> saveimage()} title='download a the current frame' variant="contained" color="inherit"  >
            <AddPhotoAlternateIcon/>
          </Button>
        </Item>
      </Grid>
      <Grid item xs={2}>
        <Item>  
          <Button  style={ buttonsStyle}  onClick={onClickFullscreen} title='fullscreen(f)' variant='contained'  color="inherit" >
            <FullscreenIcon/>
          </Button>
        </Item>
      </Grid>  
      </Grid>
      
    </Box>
</div>
</div>

}
export default PlayerComp;