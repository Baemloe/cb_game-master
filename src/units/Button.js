import React from "react";
class Button extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            mount: this.buttonMount.bind(this),
            show: []
        };
    }
    render()
    {

        return <div style={{display:"flex", gridArea: "control", alignItems: "center", justifyContent: "center"}}>
            {this.state.show.map((elem, index)=><button style={{margin: "5px"}} key={index} onClick={elem.click}>{elem.text}</button>)}
        </div>
    }
    buttonMount(jsxButtonsElements)
    {
        this.setState({show: jsxButtonsElements});
    }
}
export default Button;