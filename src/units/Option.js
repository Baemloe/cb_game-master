import React from "react";
class Option extends React.Component
{
    constructor(props)
    {
        super(props);
    }
    render()
    {
        return <option value={this.props.option.val}>{this.props.option.name}</option>
    }
}