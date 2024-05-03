import React from "react";
import PreviosType from "./PreviosType";
import DragNDrop from "./units/DragNDrop";
import Table from "./units/Table";
import Scum from "./units/Scum";
import Data from "./data/scenes.json";
import funnyboy from './images/funnyboy.svg';
import badboy from './images/badboy.svg';

class Scene extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            number: 0, 
            show: "",
            next: this.nextShow.bind(this),
            startInfo: {control: this.props.control, up: this.props.up, next: this.nextShow.bind(this)}
        };
    }
    render()
    {
        return <div
            style={{gridTemplateColumns: this.state.cols, gridTemplateRows: this.state.rows, gridArea: "main-window"}}>
                {this.state.show}
        </div>
    }
    componentDidMount()
    {
        this.types = {
            "previos": (data, start)=>{return <PreviosType data={data} start={start}/>},
            "dragNDrop": (data, start)=>{return <DragNDrop data={data} start={start}/>},
            "list": (data, start)=>{return <Table data={data} start={start} showPopup={this.props.showPopup}/>},
            "scum":(data, start)=>{return <Scum data={data} start={start} showPopup={this.props.showPopup}/>}
        };
        this.showScene();
    }
    showScene()
    {
        this.setState({show: null}, ()=>{
            this.setState({show: this.types[Data[this.state.number].type](Data[this.state.number], this.state.startInfo)})
        });
    }
    nextShow() {
        if (this.state.number < Data.length - 1) {
            // Если нет, переход к следующей сцене
            this.setState({number: this.state.number + 1}, () => {this.showScene()});
        } else {
            // Если это последняя сцена
            console.log("Это была последняя сцена");
            // Здесь нужно добавить проверку очков и показать соответствующий попап
            this.checkPointsAndShowPopup();
        }
    }

    checkPointsAndShowPopup() {
        const points = this.props.up.current.state.points; // Получение текущего количества очков
        const greatScore = 30; // Условие для `greatEnd`
        const goodScore = 29; // Условие для `goodEnd`

        if (points >= greatScore) {
            this.greatEnd(); // Вызов метода для "отличного" конца
        } else if (points <= goodScore && points > 0) {
            this.goodEnd(); // Вызов метода для "хорошего" конца
        } else {
            this.badEnd(); // Вызов метода для "плохого" конца
        }
    }
    greatEnd() {
    const points = this.props.up.current.state.points; // Получение текущего количества очков
        const greatMessage = (
            <div style={{ textAlign: 'center' }}>
                <p>Отлично! Ты набрал максимальное количество баллов: {points}!</p><p>С твоей помощью бюджет семьи Глеба стал сбалансированным!</p>
                <img src={funnyboy} alt="Great!" style={{ maxWidth: '40%', height: '40%' }} />
            </div>
        );
        this.props.showPopup(greatMessage, 0, false);
    }
    goodEnd() {
    const points = this.props.up.current.state.points; // Получение текущего количества очков
            const successMessage = (
                <div style={{ textAlign: 'center' }}>
                    <p>Твои старания не прошли даром! Ты заработал {points} баллов.</p><p>Продолжай изучать финансовую грамотность и у тебя всё получится!</p>
                    <img src={funnyboy} alt="Congratulations" style={{ maxWidth: '40%', height: '40%' }} />
                </div>
            );
            this.props.showPopup(successMessage, 0, false);
    }
    badEnd() {
    const points = this.props.up.current.state.points; // Получение текущего количества очков
            const badMessage = (
                <div style={{ textAlign: 'center' }}>
                    <p>Попробуй пройти игру ещё раз. У тебя всё получится!</p>
                    <img src={badboy} alt="Mistakes" style={{ maxWidth: '40%', height: '40%' }} />
                </div>
            );
            this.props.showPopup(badMessage, 0, false);
    }

}
export default Scene;