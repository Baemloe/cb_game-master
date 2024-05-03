import React from "react";
import {ReactComponent as SVG} from "./images/prev.svg";
class PreviosType extends React.Component{ 
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data,
            start: this.props.start
        }
    }
    render(){
            return <div className = "Grid" style={{gridTemplateColumns: "1.7fr .8fr"}}>
                        <div className="Banner" style={{alignSelf:"center", justifySelf: "center"}}>
                            <p>{this.state.data.taskText}</p>
                            <p style={{fontWeight: 500}}><b>{this.state.data.taskText2}</b></p>
                        </div>
                        <SVG/>
                    </div> 
    }
    componentDidMount()
    {
        this.props.start.control.current.state.mount([{click: this.state.start.next, text: "Начать"}]);
    }

}
export default PreviosType;