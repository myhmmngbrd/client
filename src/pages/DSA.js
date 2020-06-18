import React from 'react';
import './DSA.css';

class Table extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            values: props.values,
            selected: null,
            compared: null,
            current: null,
        }
        this.sequential = this.sequential.bind(this);
    }

    sequential() {

    }

    render() {
        return (
            <div className="DSA">
                <ul className="DSA-items">
                    <Bars 
                        values={this.state.values} 
                        selected={this.state.selected} 
                        compared={this.state.compared} 
                        currend={this.state.current} 
                    />
                </ul>
                <ul className="DSA-items">
                    <Vars 
                        values={this.state.values} 
                        selected={this.state.selected} 
                        compared={this.state.compared}
                        currend={this.state.current} 
                    />
                </ul>
                <button onClick={this.sequential}>Sequential sort</button>
            </div>
        )
    }
}

function Bars(props) {
    const output = props.values.map(val =>
        <li 
            className="DSA-bar"
            key={val.key} 
            style={{
                height: val.value*2 + 'px',
                backgroundColor: (
                    props.selected === val.key ?
                        'black':
                        props.compared === val.key ?
                        'red' : ''
                )
            }}
        ></li>
    )
    return output
}

function Vars(props) {
    const output = props.values.map(val =>
        <li
            className="DSA-var" 
            key={val.key}
        >
            {val.value}
        </li>    
    )
    return output
}


let values = new Array(20);
for (let i=0; i<values.length; i++) {
    let value;
    while(1) {
        let newVal = Math.floor((Math.random() * 50) %50) + 10
        if (!values.find(e => e === newVal)) {
            value = newVal;
            break;
        }
    };
    values[i] = value;
}

values = values.map((val,index) => {
    return {
        key: index,
        value: val,
    }
});

export default {
    id: 'dsa',
    name: 'Data Structures Algorithms',
    element: <Table values={values}/>,
}
