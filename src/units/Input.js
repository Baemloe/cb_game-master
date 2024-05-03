import React from "react";
class Input extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            result: null,
            end: this.trueShow.bind(this)
        }
        this.value = React.createRef();
    }
    render()
    {
        return <input type="number" className="Banner" style={{fontSize: "1rem", fontFamily: "Inter-V", fontWeight: "600"}} ref={this.value} onChange={this.check.bind(this)}/>
    }
    check()
    {
        let res = 0;
        if(this.value.current.value == this.props.listArr[this.props.index]){
            res = 1;
        }
        else if(this.value.current.value.length <= 0){
            res = null;
        }
        this.setState({result: res});
    }
    trueShow()
    {
        this.value.current.value = this.props.listArr[this.props.index];
    }
}
export default Input;