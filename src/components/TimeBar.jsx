import React, {useEffect, useState} from "react";
import BarWithTimeOnHover from "./BarWithTimeOnHover.jsx";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Node from "./Node";

export function TimeBar(props) {

    window.addEventListener("wheel", e => e.preventDefault(), { passive:false })
    window.addEventListener("keydown", function(e) {
      if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
          e.preventDefault();
      }
  }, false);
    const [duration, setDuration] = useState();
    const [count, setCount] = useState(0);
    const [timeFormat, setTimeformat] = useState(false)
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: "#657786",
        ...theme.typography.body2,
        padding: theme.spacing(0),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        boxShadow: "none"
       
    

      }));


  useEffect(() => {
    
    props.toggleRef.current = timeFormatToggle;
  }, [])
  
  
function timeFormatToggle(status){
  console.log("inside!"+status);
  setTimeformat(status);
}
const lineStyle={
    background:" linear-gradient(#000, #000) no-repeat center/3px 100%",
    backGroundColor: "#F5FFCB"
}

function timeFormetter(timeInSeconds){
    
    const secs = (timeInSeconds % 60).toFixed(3);
    const mins = Math.trunc(timeInSeconds / 60); 
    return (mins +":"+ secs);
  }
 
function DurationAtPoint(point){

     const onePercent = props.playerRef.current.getDuration() / 100;

     if(timeFormat){
      return (point * onePercent).toFixed(3);
     }else{
      return (timeFormetter((point * onePercent)));
     }
    
    
}

const textSize ={
    // fontSize: width,
    border: '2px solid black',
    textAlign: 'center',
    margin:"0px",
    borderRadius: "5px",
    wordWrap: "elipse",
    padding:" 0px 5px 2px 5px",
    backgroundColor: "#FFF",
    zIndex:10
}


  return<div > 
 
  <Box  sx={{ flexGrow: 1 }} >
      <Grid container spacing={0}>
        <Grid item xs={1.2}>
          <Item ><span style={textSize}> {DurationAtPoint(5)}</span> </Item>
        </Grid>
        <Grid item xs={1.2}>
          <Item > <span style={textSize}> {DurationAtPoint(15)} </span> </Item>
        </Grid>
        <Grid item xs={1.2}>
          <Item> <span style={textSize}>{DurationAtPoint(25)} </span> </Item>
        </Grid>
        <Grid item xs={1.2}>
          <Item> <span style={textSize}>{DurationAtPoint(35)} </span> </Item>
          </Grid>
        <Grid item xs={1.2}>
          <Item> <span style={textSize}>{DurationAtPoint(45)} </span> </Item>
        </Grid>
        <Grid item xs={1.2}>
          <Item> <span style={textSize}>{DurationAtPoint(55)} </span> </Item>
        </Grid>
        <Grid item xs={1.2}>
          <Item> <span style={textSize}>{DurationAtPoint(65)} </span> </Item>
        </Grid>
        <Grid item xs={1.2}>
          <Item> <span style={textSize}>{DurationAtPoint(75)} </span> </Item>
        </Grid>
        <Grid item xs={1.2}>
          <Item> <span style={textSize}>{DurationAtPoint(85)} </span> </Item>
        </Grid>
        <Grid item xs={1.2}>
          <Item> <span style={textSize}>{DurationAtPoint(95)} </span> </Item>
        </Grid>
      </Grid>
    </Box>

    <Box sx={{ flexGrow: 1 }} >
      <Grid container spacing={0}>
        <Grid item xs={1.2}>
          <Item style={lineStyle}> <Node durationAtPoint = {DurationAtPoint}  start = {0} width = {props.width}/> </Item>
        </Grid>
        <Grid item xs={1.2}>
          <Item style={lineStyle}> <Node durationAtPoint = {DurationAtPoint}  start = {10} width = {props.width}/></Item>
        </Grid>
        <Grid item xs={1.2}>
          <Item style={lineStyle}> <Node durationAtPoint = {DurationAtPoint}  start = {20} width = {props.width}/></Item>
        </Grid>
        <Grid item xs={1.2}>
          <Item style={lineStyle}> <Node durationAtPoint = {DurationAtPoint}  start = {30} width = {props.width}/></Item>
          </Grid>
        <Grid item xs={1.2}>
          <Item style={lineStyle}> <Node durationAtPoint = {DurationAtPoint}  start = {40} width = {props.width}/></Item>
        </Grid>
        <Grid item xs={1.2}>
          <Item style={lineStyle}> <Node durationAtPoint = {DurationAtPoint}  start = {50} width = {props.width}/></Item>
        </Grid>
        <Grid item xs={1.2}>
          <Item style={lineStyle}> <Node durationAtPoint = {DurationAtPoint}  start = {60} width = {props.width}/></Item>
        </Grid>
        <Grid item xs={1.2}>
          <Item style={lineStyle}> <Node durationAtPoint = {DurationAtPoint}  start = {70} width = {props.width}/></Item>
        </Grid>
        <Grid item xs={1.2}>
          <Item style={lineStyle}> <Node durationAtPoint = {DurationAtPoint}  start = {80} width = {props.width}/></Item>
        </Grid>
        <Grid item xs={1.2}>
          <Item style={lineStyle}> <Node durationAtPoint = {DurationAtPoint}  start = {90} width = {props.width}/></Item>
        </Grid>
      </Grid>
    </Box>
    <BarWithTimeOnHover    ToggleStatus={timeFormat}   duration= {props.playerRef.current.getDuration()} seekTo = {props.seekTo} playerRef = {props.playerRef.current} /> 
  </div>;
}
  