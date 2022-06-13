import React from "react"; 
import { Direction, FormattedTime, Slider } from 'react-player-controls'
import PropTypes from 'prop-types';
 




// Create a basic bar that represents time
const TimeBar = ({ children }) => (
  <div
    style={{
      height: 10,
      width: "100%",
      background: '#14171A',
   
    }}
  >
    {children}
  </div>
)

let xTranslate = 'translateX(-50%)';
// Create a tooltip that will show the time
const TimeTooltip = ({ToggleStatus,numSeconds, style = {} }) => (
  <div
    style={{
      display: 'inline-block',
      position: 'absolute',
      transform: xTranslate,
      padding: 5,
      borderRadius: 10,
      background: '#14171A',
      color: '#F5F8FA',
      fontSize: 12,
      fontWeight: 'bold',
      lineHeight: 1,
      textAlign: 'center',
      bottom:10,
      zIndex:1000,
      ...style,
      
    }}
  >
  {/* //changes baseed on time format toggle */}
    { !ToggleStatus ?   <p style={{marginLeft:"5px",marginRight:"5px"}}>{numSeconds.toFixed(5)}</p> : <p style={{marginLeft:"5px",marginRight:"5px"}}> <FormattedTime 
     numSeconds={numSeconds} />  </p>}
  </div>
)

 

// Create a component to keep track of user interactions
class BarWithTimeOnHover extends React.Component {
 
  static propTypes = {
    duration: PropTypes.number,
    
  }

  constructor(props) {
    super(props)
 
    this.state = {
      // This will be a normalised value between 0 and 1,
      // or null when not hovered
      hoverValue: null,
      
    }
 
    this.handleIntent = this.handleIntent.bind(this)
    this.handleIntentEnd = this.handleIntentEnd.bind(this)
  }
 

  handleIntent(value) {
    this.setState({
      hoverValue: value,
      
    })
    
    if(value <= 0.15)   {
      xTranslate = 'translateX(0%)';
    }
     if(value >= 0.85) {
      xTranslate = 'translateX(-100%)';
     
    }
     if(value > 0.15 && value <0.85){
      xTranslate = 'translateX(-50%)';
    }
  }

  
  handleIntentEnd() {
    // Note that this might not be invoked if the user ends
    // a control change with the mouse outside of the slider
    // element, so you might want to do this inside a
    // onChangeEnd callback too.
    this.setState({
      hoverValue: null,
    })
  }
 
    
  render() {
    const { duration } = this.props
    const { hoverValue } = this.state
 
    return (
      <Slider 
        direction={Direction.HORIZONTAL}
        style={{
          position: 'relative',
        }}
        onChange={newValue => this.props.seekTo(newValue)}
        onIntent={this.handleIntent}
        onIntentEnd={this.handleIntentEnd}
      >
      
        <TimeBar   />
       
        {hoverValue   !== null && (
          <TimeTooltip
           ToggleStatus={this.props.ToggleStatus}
            numSeconds={hoverValue * duration}
            style={{
              left: `${hoverValue * 100}%`,
            }}
            

          />
        )}
      </Slider>
    )
  }
}


export default BarWithTimeOnHover;