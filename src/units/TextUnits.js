import React from "react";

class TextUnits extends React.Component
{
    constructor(props)
    {
        super(props);
        this.index = 0;
    }
    render()
    {
        return <div style={{overflowY: "auto", paddingInline: "7px"}} className="Scroll">
            {Object.keys(this.props.textValue).map(key=>this.findType(key))}
        </div>
    }
    findType(key)
    {
        switch(key.split("_")[0]){
            case "text":
                return this.props.textValue[key].map((element, index)=> <p key={key + "_" + index}>{element}</p>);
            case "i":
                return this.props.textValue[key].map((element, index)=> <p key={key + "_" + index}><i>{element}</i></p>);
            case "b":
                return this.props.textValue[key].map((element, index)=> <p key={key + "_" + index}><b>{element}</b></p>);
            case "uls":
                return <ul key={key}>{this.props.textValue[key].map((element, index)=> <li key={key + "_" + index}>{element}</li>)}</ul>
            case "table":
                return <table className="FullBlock" key={key}>{this.props.textValue[key].map((row, index)=> <tr key={key + "_" + index}>{row.map((cell, index2)=>{return <td style={{background: "white", color: "var(--textColor)", padding: "1vh"}} key={index+index2}>{cell}</td>})}</tr>)}</table>
        }
    }
}
export default TextUnits;