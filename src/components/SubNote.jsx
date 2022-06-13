import React ,{ useState} from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


function SubNode(props){

    const [width,setwidth]= useState(TextSizeChangerFunction());
    const Item = styled(Paper)(({ theme }) => ({
        
        backgroundColor: "rgba(0,0,0,0)",
        ...theme.typography.body2,
        padding: theme.spacing(0),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        boxShadow: "none"
        
      }));

    const lineStyle={
        background:" linear-gradient(#000, #000) no-repeat center/1px 100%"
    }

    const textSize ={
        fontSize: width,
        border: '2px solid black',
        margin:"0px",
        borderHight: "100%",
        wordWrap: "elipse",
        padding: "2px",
        backgroundColor: "white"
    }
    function TextSizeChangerFunction(){
        let newWidth = props.width.slice(0, -1);
        newWidth = parseInt(newWidth);
        newWidth -= 100;
        newWidth = 10 + (newWidth / 6);
        newWidth = newWidth.toString() +"%";
        if(parseInt(newWidth.slice(0, -1))<=100) {
            return newWidth;
        }else{
            return "100%";
        }
      }
    function inComponentDurationAtPoint(point){
        let durationAtPointVar = props.durationAtPoint(point);
        durationAtPointVar = durationAtPointVar.toString();
        while(durationAtPointVar.length < 8){//add space so it will allways have the same box size no matter number of digits
            if(durationAtPointVar.length % 2 === 0){
                durationAtPointVar=durationAtPointVar+"\u00A0";
            }else{
                durationAtPointVar= "\u00A0"+durationAtPointVar;
            } 
        }
        
         return durationAtPointVar;
    }


    return <div>
  <Box sx={{ flexGrow: 1 }} >
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <Item style={textSize} >{inComponentDurationAtPoint( (props.start - 0.5 ))}</Item>
        </Grid>
        <Grid item xs={6}>
          <Item style={textSize}>{inComponentDurationAtPoint(props.start+ +0.5 )}</Item>
        </Grid>
      </Grid>
    </Box>

    <Box sx={{ flexGrow: 1 }} >
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <Item style={lineStyle}> | </Item>
        </Grid>
        <Grid item xs={6}>
          <Item style={lineStyle}>|</Item>
        </Grid>
      </Grid>
    </Box>

    </div>



}

export default SubNode;