import React, {useState} from "react";
import TextUnits from "./TextUnits";
import funnyboy from '../images/funnyboy.svg';
import badboy from '../images/badboy.svg';
class Scum extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            months: [],
            number: 0,
            total: 0, 
            message: "",
            messageVisibility: "None",
            messageStyle: {gridArea: "4/1/4/7"},
            pointsAddedForMay: false,
        }
    }
    render()
    {
        return <div className="Grid" style={{gridTemplateColumns: "repeat(6, 1fr)", gridTemplateRows: "repeat(3, auto)"}}>
            <div style={{gridArea: "1/1/1/7", alignSelf: "center", justifySelf: "center", marginBottom: "10px"}}>Всего накоплений: {this.state.total}</div>
            {this.state.months.map((element)=> element[1])}
            <div className={this.state.messageVisibility} style={this.state.messageStyle}>{this.state.message}</div>
        </div>
    }   
    componentDidMount()
    {
        this.props.start.up.current.state.set(<TextUnits textValue={this.props.data.taskText}/>);
        this.props.start.control.current.state.mount([{click: ()=>{
            this.setState({total: this.state.total + 2000});
            this.state.months[this.state.number][0].current.state.changeMode();
            this.props.start.control.current.state.mount([{click:this.next.bind(this), text: "Продолжить накопление"}]);
        }, text: "Начать накопление"}]);
        this.createMonth();
    }
    createMonth()
    {
        let buffArray = [];
        for(let month of this.props.data.months)
        {
            let insideArray = [];
            let buff = React.createRef();
            let jsx = <Month month={month} key={month.name} ref={buff}/>
            insideArray.push(buff, jsx);
            buffArray.push(insideArray);
        }
        this.setState({months: buffArray});
    }
    next() {
        let num = this.state.number;
        this.setState({number: num + 1, total: this.state.total + 2000}, ()=>{
            if(this.props.data.months[this.state.number].name === "Май" && this.state.total >= 24000) {
                this.props.start.up.current.state.pointsUpdate(5);
            setTimeout(() => {
                            if(this.props.start.up.current.state.points > 21) {
                                this.goodEnd();
                            } else {
                                this.badEnd();
                            }
                        }, 0);
                        return;
                    }
            if(this.props.data.months[this.state.number].buy) {
                this.props.start.control.current.state.mount([{click:this.buy.bind(this), text: "Купить сейчас"},{click:this.next.bind(this), text: "Продолжить накопление"}]);
                this.setState({message: this.props.data.months[this.state.number].message, messageVisibility: "Banner"});
            } else if(this.props.data.months.length == this.state.number + 1) {
                this.props.start.control.current.state.mount([{click:this.buy.bind(this), text: "Купить сейчас"}]);
            } else {
                this.props.start.control.current.state.mount([{click:this.next.bind(this), text: "Продолжить накопление"}]);
                this.setState({message: "", messageVisibility: "None"});
            }
            this.state.months[num][0].current.state.changeMode();
            this.state.months[this.state.number][0].current.state.changeMode();
        });
    }
    goodEnd() {
        const successMessage = (
            <div style={{ textAlign: 'center' }}>
                <p>Поздравляем! <br/>Квест пройден, и ты помог Марку достичь поставленной финансовой цели!</p>
                <img src={funnyboy} alt="Congratulations" style={{ maxWidth: '60%', height: '60%' }} />
            </div>
        );
        this.props.showPopup(successMessage, 0, false);
    }
    badEnd() {
        const badMessage = (
            <div style={{ textAlign: 'center' }}>
                <p>К сожалению, в этот раз достичь финансовой цели не удалось...</p>
                <img src={badboy} alt="Mistakes" style={{ maxWidth: '60%', height: '60%' }} />
            </div>
        );
        this.props.showPopup(badMessage, 0, false);
    }
    buy() {
        if(this.state.total !== 24000) {
            this.badEnd();
        } else {
            this.goodEnd();
        }
    }
}
class Month extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            mode: 0,
            onoff: ["FlexCenter Banner", "FullBlock FlexCenter"],
            changeMode: this.change.bind(this)
        }
    }
    render()
    {
        return <div className={this.state.onoff[this.state.mode]}>{this.props.month.name}</div>
    }
    change()
    {
        if(this.state.mode == 0)
        {
            this.setState({mode: 1});
        }
        else
        {
            this.setState({mode: 0});
        }
    }
}

export default Scum;