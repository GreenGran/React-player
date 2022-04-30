import React ,{useEffect,useState} from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import SubNote from "./SubNote"


function Node(props){

   
  
    const [width,setwidth]= useState(TextSizeChangerFunction());
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: "#657786",
        ...theme.typography.body2,
        padding: theme.spacing(0),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        boxShadow: "none",
        lineHeight:"1",
     

      }));

    const lineStyle={
        background:" linear-gradient(#000, #000) no-repeat center/1px 100%",
       
    }


    const textSize ={
        fontSize: width,
        border: '2px solid black',
        textAlign: 'center',
        margin:"0px",
        borderRadius: "5px",
        wordWrap: "elipse",
        padding: "5px",
        backgroundColor: "white"

    }


      function TextSizeChangerFunction(){
        let newWidth = props.width.slice(0, -1);
        newWidth = parseInt(newWidth);
        newWidth -= 100;
        newWidth = 15 + (newWidth / 2);
        newWidth = newWidth.toString() +"%";
        if(parseInt(newWidth.slice(0, -1))<=100) {
            return newWidth;
        }else{
            return "100%";
        }
       
      }

    function inComponentDurationAtPoint(point){
        
        let durationAtPointVar = props.durationAtPoint(props.start + point);
        durationAtPointVar = durationAtPointVar.toString();
        while(durationAtPointVar.length < 8){//add space so it will allways have the same box size no matter nomber of digits
            if(durationAtPointVar.length % 2 === 0){
                durationAtPointVar=durationAtPointVar+"\u00A0";
            }else{
                durationAtPointVar= "\u00A0"+durationAtPointVar;
                
            }
            
        }
        
         return durationAtPointVar;
    }

    return <div >
        <Box sx={{ flexGrow: 1 }} >
      <Grid container spacing={0}>
        <Grid item xs={2.4}>
          <Item  > <span style={textSize}>{inComponentDurationAtPoint(1)} </span> </Item>
        </Grid>
        <Grid item xs={2.4}>
          <Item  > <span style={textSize}>{inComponentDurationAtPoint(3)}  </span> </Item>
        </Grid>
        <Grid item xs={2.4}>
          <Item  style={lineStyle}>|</Item>
        </Grid>
        <Grid item xs={2.4}>
          <Item > <span style={textSize}>{inComponentDurationAtPoint(7)}  </span></Item>
          </Grid>
        <Grid item xs={2.4}>
          <Item > <span style={textSize}>{inComponentDurationAtPoint(9)}  </span></Item>
        </Grid>
  
     
      </Grid>
    </Box>
    {/* <SubNote durationAtPoint={props.durationAtPoint} start = {0} /> */}
    <Box sx={{ flexGrow: 1 }} >
      <Grid container spacing={0}>
        <Grid item xs={2.4}>
          <Item style={lineStyle}> |<SubNote durationAtPoint={props.durationAtPoint} start = {props.start + 1} width ={props.width} />  </Item>
        </Grid>
        <Grid item xs={2.4}>
          <Item style={lineStyle}> | <SubNote durationAtPoint={props.durationAtPoint} start = { props.start +3} width ={props.width} /> </Item>
        </Grid>
        <Grid item xs={2.4}>
          <Item style={lineStyle}>| </Item>
        </Grid>
        <Grid item xs={2.4}>
          <Item style={lineStyle}>| <SubNote durationAtPoint={props.durationAtPoint} start = { props.start +7} width ={props.width} /> </Item>
          </Grid>
        <Grid item xs={2.4}>
          <Item style={lineStyle}>|  <SubNote durationAtPoint={props.durationAtPoint} start = { props.start +9} width ={props.width} /></Item>
        </Grid>
       
    
      </Grid>
    </Box>


    {/* <Box sx={{ flexGrow: 1 }} > NEED SUBNOTE COMPONANT
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <Item > {inComponentDurationAtPoint(0.5)} </Item>
        </Grid>
        <Grid item xs={6}>
          <Item >{inComponentDurationAtPoint(1.5)}</Item>
        </Grid>
        </Grid>
        </Box> */}

    </div>



}

export default Node;