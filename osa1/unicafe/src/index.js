import React from 'react';
import ReactDOM from 'react-dom';
const round = require('round-to')

class App extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0
        }
    }

    lisaa = (where) => {
        console.log(where)
        return (
            () => {
                this.setState({where: this.state[where] + 1})
            }
        )
    }

    render(){
        const lisaaHyva = () => this.setState({hyva: this.state.hyva + 1})
        const lisaaNeutraali = () => this.setState({neutraali: this.state.neutraali + 1})
        const lisaaHuono = () => this.setState({huono: this.state.huono + 1})

        if (this.state.hyva === 0 && this.state.neutraali === 0 && this.state.huono === 0){
            return (
                <div>
                    <Title text="Anna palautetta" />
                    <Button onClick={this.lisaa('hyva')} name="Hyvä" />
                    <Button onClick={this.lisaa('neutraali')} name="Neutraali" />
                    <Button onClick={this.lisaa('huono')} name="Huono" />

                    <Title text="Statistiikka" />
                    <p>ei yhtään palautetta annettu</p>
                </div>
            )
        }
        return (
            <div>
                <Title text="Anna palautetta" />
                <Button onClick={lisaaHyva} name="Hyvä" />
                <Button onClick={lisaaNeutraali} name="Neutraali" />
                <Button onClick={lisaaHuono} name="Huono" />

                <Title text="Statistiikka" />
                <Statistics state={this.state} />
            </div>
        )
    }
}

const Statistics = (props) => {
    return (
        <div>
            <Statistic name="Hyvä" value={props.state.hyva} />
            <Statistic name="Neutraali" value={props.state.neutraali} />
            <Statistic name="Huono" value={props.state.huono} />
            <Statistic name="Keskiarvo" value={round((props.state.hyva - props.state.huono)/3,1)} />
            <Statistic name="Positiivisia" value={round(props.state.hyva*100/(props.state.hyva + props.state.neutraali + props.state.huono),1)} unit="%"/>
        </div>
    )
}

const Statistic = (props) => {
    return (
        <div>
            <p>{props.name} {props.value} {props.unit}</p>
        </div>
    )
}

const Button = (props) => {
    return (
        <div>
            <button onClick={props.onClick}>{props.name}</button>
        </div>
    )
}

const Title = (props) => {
    return (
        <h1>{props.text}</h1>
    )
}

const render = () => {
    ReactDOM.render(
        <App />,
        document.getElementById('root')
    );
}

render()