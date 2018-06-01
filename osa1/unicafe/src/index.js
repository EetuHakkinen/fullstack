import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    let hyva = {
        "value": 0,
        "add": function() {
            this.value += 1
            console.log("Hyvän arvoa kasvatettu, ", this.value)
        }
    }

    let neutraali = {
        "value": 0,
        "add": function () {
            this.value += 1
            console.log("neutraalin arvoa kasvatettu, ", this.value)
        }
    }

    let huono = {
        "value": 0,
        "add": function() {
            this.value += 1
            console.log("huonoa arvoa kasvatettu, ", this.value)
        }
    }

    return (
        <div>
            <Title text="Anna palautetta" />
            <button onClick={hyva.add()}>Hyvä</button>
            <button onClick={neutraali.add()}>Neutraali</button>
            <button onClick={huono.add()}>Huono</button>
        </div>
    )
}

const Title = (props) => {
    return (
        <div>
            <h1>{props.text}</h1>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
