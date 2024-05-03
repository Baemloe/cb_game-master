import React from "react";
class UpPanel extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            display: "None",
            points: 0,
            pointsBuff: 0,
            pointsUpdate: this.updatePoints.bind(this),
            update: this.updateVisibility.bind(this),
            inside: {text: "", time: 0},
            set: this.setHint.bind(this),
            auto_click: this.autoClick.bind(this),
        }
        this.but = React.createRef();
    }

    render()
    {
        return(
            <div style={{gridArea: "points", justifyContent: "space-between"}}  className={this.state.display}>
                <p>{"Набрано очков: "}{this.state.points}</p>
                <button style={{width: "6vh", height: "6vh", maxWidth: "50px", maxHeight: "50px", borderRadius: "50%"}} ref={this.but}
                onClick={this.getInfo.bind(this)}>?</button>
            </div>)
    }
    updateVisibility(className)
    {
        this.setState({display: className});
    }
    setHint(text, alarm = false, time = 0, closable = true) {
        this.setState(prevState => ({
            oldInside: alarm ? prevState.inside : prevState.oldInside,
            inside: {text: text, time: time},
            alarm: alarm,
            closable: closable
        }));

        if (!closable) {
            return;
        }
    }

    componentDidUpdate(props, state)
    {
    if (this.state.alarm) {
        this.setState({ alarm: false });
        this.but.current.click();
        this.setState({ inside: this.state.oldInside });
        }
    }
    getInfo()
    {
        this.props.showPopup(this.state.inside.text, this.state.inside.time);
    }
    autoClick()
    {
        this.but.current.click();
    }
    updatePoints(pts)
    {
        this.setState({pointsBuff: this.state.points + pts});
        let interval = setInterval(()=>{
            if(this.state.points < this.state.pointsBuff)
            {
                this.setState({points: this.state.points + 1});
            }
            else
            {
                clearInterval(interval);
            }
        }, 50);
    }
}
export default UpPanel;