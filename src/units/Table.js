import React from "react";
import TextUnits from "./TextUnits";
import List from "./List";
import Input from "./Input";
class ListTable extends React.Component
{
    constructor(props)
    {
        super(props);
        this.listsArray = new Map();
        this.createList = this.getList.bind(this);
        this.state = 
        {
            lArr: []
        }
    }
    componentDidMount()
    {
        this.props.start.up.current.state.set(<TextUnits textValue={this.props.data.taskText}/>);
        this.props.start.control.current.state.mount([{click: this.check.bind(this), text: "Проверить"}]);
    }
    render() {
        // Задаем стиль для таблицы
        const tableStyle = {
          maxWidth: "800px", // Максимальная ширина таблицы
          margin: "0 auto", // Автоматические отступы для центрирования
          background: "white", // Фон для таблицы, если нужно
        };

            return (
              <div className="TableContainer" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <table className="TableWithGradient">
                  <tbody>
                    {this.props.data.table.map((row, index) => {
                      return (
                        <tr key={index}>
                          {row.map((cell, index_2) => {
                            return (
                              <td key={index + "_" + index_2}>
                                {cell.includes("check")
                                  ? this.createList(cell, index + "_" + index_2)
                                  : cell}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            );
          }

    getList(cell, key)
    {
        
        let cellName = cell.split("_");      
        let buff = React.createRef();
        let jsx;
        switch(cellName[1])
        {
            case "list":
                jsx = <List index={cellName[2]} listArr={this.props.data.list} ref={buff}/>
                break;
            case "input":
                jsx = <Input index ={cellName[2]} listArr={this.props.data.list} ref={buff}/>;
                break;
        }  
        if(!this.listsArray.has(key))
        {
            this.listsArray.set(key, buff);
        }
        return jsx;
    }
    check() {
        let mistakes = 0;
        let points = this.props.data.points || 0; // Получаем максимальные баллы из данных
        const deduction = this.props.data.deduction || 2; // Штраф за ошибку из данных
        let message = { text_1: [] };

        // Проходим по каждому элементу списка и проверяем ответы
        for (let [key, buff] of this.listsArray) {
            if (buff.current.state.result == null) {
                message.text_1.push("Введи все ответы!");
                this.props.start.up.current.state.set(<TextUnits textValue={message} />, true, 2000);
                return; // Прекращаем выполнение, если есть незаполненные ответы
            } else if (buff.current.state.result == 0) {
                mistakes++;
            }
        }

        // Если две или более ошибки, баллы устанавливаются в 0
        if (mistakes >= 2) {
            points = 0;
        } else {
            // Начисляем баллы на основе количества ошибок
            points = Math.max(points - mistakes * deduction, 0);
        }

        message.text_1.push(`Ты набрал ${points} очков!`);
        // Обновляем состояние и показываем результат
        this.props.start.up.current.state.pointsUpdate(points);
        this.props.start.up.current.state.set(<TextUnits textValue={message} />, true, 2000);
        this.props.start.control.current.state.mount([{ click: this.props.start.next, text: "Дальше" }]);
    }

}
export default ListTable;