import React from "react";
class List extends React.Component
{
    constructor(props)
    {
        super(props);
        this.defaultValue = ["Не выбрано"];
        this.state = {
            result: null,
            trueAnswer: this.props.index,
            selectValue: this.defaultValue,
            showStyle: {position: "absolute", top: 0, left: 0},
            openListClass: "None",
            on: true,
            end: this.trueShow.bind(this)
        };
        this.closedList = React.createRef();

    }
    render()
    {
        return <div className="Banner Pointer" style={{background: "#f4f4f4", textAlign: "center"}} ref={this.closedList} onClick={this.openList.bind(this)}>
            {this.state.selectValue}
            <div className={this.state.openListClass} style={this.state.showStyle}>
                {this.defaultValue.concat(this.props.listArr).map((element, index)=>{
                    return <div key={index}
                                className="Hov FlexCenter"
                                style={{textAlign:"center", borderBlockEnd: "1px solid var(--mainCol)", minHeight: "50"}}
                                onClick={this.closeList.bind(this)}>
                            {element}
                        </div>
                })}
            </div>
    </div>
    }
    openList(e)
    {
        if(this.state.on){
            let rect = this.closedList.current.getBoundingClientRect();
            this.setState({
                openListClass: "Banner", 
                showStyle:{position: "absolute",
                padding: "0",
                width: rect.width, 
                top: rect.top, 
                left: rect.left
            }});
        }
    }
    closeList(e)
    {
        let res;
        if(e.target.innerHTML == this.props.listArr[this.state.trueAnswer])
        {
            res = 1;
        }
        else if(e.target.innerHTML == "Не выбрано")
        {
            res = null;
        }
        else
        {
            res = 0;
        }
        this.setState({
            result: res,
            openListClass: "None",
            selectValue: [e.target.innerHTML],
        });
        e.stopPropagation();
    }
    trueShow()
    {
        this.setState({selectValue: [this.props.listArr[this.state.trueAnswer]], on: false});
    }
}
export default List;