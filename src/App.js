import React from 'react';
import './App.css';
import Button from './units/Button';
import Scene from './Scene';
import UpPanel from "./units/UpPanel";

class App extends React.Component
{
  constructor(props)
  {
    super(props);
    this.nextButton = React.createRef();
    this.state = {
      pointWords: "",
      pointCounts: null,
      nextResult: false,
      popup: "None",
      popup_inside: null
    };
    this.buttonInstance = React.createRef();
    this.scene = React.createRef();
    this.up = React.createRef();
  }
  render()
  {
    return <div className='App'>
            <div className='WorkWindow'>
              <UpPanel ref={this.up} showPopup={this.showPopup.bind(this)}/>
              <div className={this.state.popup} style={{backdropFilter: "blur(1px)", background: "rgba(255, 255, 255, 0.3)", zIndex:"450", gridArea: "1/1/4/1"}} onClick={this.closePopup.bind(this)}>
                <div className='Banner'>{this.state.popup_inside}</div>
              </div>
              <Scene  
                ref={this.scene}
                control={this.buttonInstance}
                up={this.up}
                showPopup={this.showPopup.bind(this)}
              />
              <Button 
                  ref={this.buttonInstance}/>
            </div>
           </div>
  }
  showPopup(text, time, closable = true) {
    this.setState({popup: "FlexCenter", popup_inside: text, closablePopup: closable});
    if (time > 0) {
      setTimeout(() => {
        if (this.state.closablePopup) {
          this.closePopup();
        }
      }, time);
    }
  }

  closePopup() {
    if (this.state.closablePopup) {
      this.setState({popup: "None", popup_inside: null});
    }
  }
}

export default App;
