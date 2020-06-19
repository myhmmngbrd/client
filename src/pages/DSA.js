import React from 'react';
import './DSA.css';

class Table extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            values: props.values,
            selected: null,
            compared: null,
            key:null,
        }
        this.selectionSort = this.selectionSort.bind(this);
        this.InsertionSort = this.InsertionSort.bind(this);
        this.bubbleSort = this.bubbleSort.bind(this);
    }

    swap(ary, a1, a2, key=1) {
        // swap a1 with a2
        [ary[a1], ary[a2]] = [ary[a2], ary[a1]];
        const values = ary.map((value,index) => {
            return {
                value: value,
                key: index,
            }
        });
        this.setState({
            values: values,
            selected: a2,
            compared: key ? null: a1,
            key: key ? a1: null,
        });
    }
    
    insert(ary, a1, a2) {
        //insert a1 to a2
        const tmp = ary[a1];
        if (a1 > a2) {
        // right to left
            for (let i = a1; i>a2; i--) {
                ary[i] = ary[i-1];
            }
        } else if (a2 > a1) {
        // left to right
            for (let i = a1; i<a2; i++) {
                ary[i] = ary[i+1];
            }
        } else {
        // same index
            return;
        }
        ary[a2] = tmp;
        const values = ary.map((value,index) => {
            return {
                value: value,
                key: index,
            }
        });
        this.setState({
            values: values,
            selected: a2,
            compared: null,
            key: null,
        });
    }
    
    clear(interval) {
        clearInterval(interval);
        this.setState({
            selected:null,
            compared:null,
            key:null,
        });
    }

    selectionSort() {
        const ary = this.state.values.map(v => v.value);
        let [min, i, j] = [0,0,0];
        
        this.sort = setInterval(() => {
            if(j < ary.length) {
                j++
                if (ary[j] < ary[min]) min = j;
                this.setState({
                    selected: i,
                    compared: j,
                    key: min,
                });
            } else if(i < ary.length-1) {
                this.swap(ary,i,min);
                i++
                min = i;
                j = i;
            } else {
                this.clear(this.sort);
                return;
            }
        }, 200);
    }

    InsertionSort() {
        const ary = this.state.values.map(v => v.value);
        let [i, j, index] = [1,1,1];

        this.sort = setInterval(() => {
            j--
            if (ary[i] < ary[j]) {
                index = j;
                this.setState({
                    selected:i,
                    compared:j,
                    key:index,
                });
            } else {
                this.insert(ary,i,index);
                if (++i === ary.length) {
                    this.clear(this.sort);
                    return;
                }
                j = i;
                index = i;
            }
        }, 200);
    }

    bubbleSort() {
        const ary = this.state.values.map(v => v.value);
        let [i, j] = [0,ary.length-1];

        this.sort = setInterval(() => {
            if (i < j) {
                if (ary[i] > ary[i+1]) {
                    if (!this.change) {
                        this.change = 1;
                        this.setState({
                            selected: i,
                            compared: i+1,
                        })
                        return;
                    }
                    this.swap(ary,i,i+1,0);
                    this.change=0;
                } else {
                    this.setState({
                        selected: i,
                        compared: i+1,
                    })
                }
                i++;
            } else if (j > 0){
                j--
                i=0;
            } else {
                this.clear(this.sort);
            }
        }, 200);
    }



    componentWillUnmount() {
        if (this.select)
            clearInterval(this.select);
    }


    render() {
        return (
            <div className="DSA">
                <ul className="DSA-items">
                    <Bars 
                        values={this.state.values} 
                        selected={this.state.selected} 
                        compared={this.state.compared} 
                        keyVal={this.state.key}
                    />
                </ul>
                <ul className="DSA-items">
                    <Vars 
                        values={this.state.values} 
                    />
                </ul>
                <button onClick={this.selectionSort}>Selection sort</button>
                <button onClick={this.InsertionSort}>Insertion sort</button>
                <button onClick={this.bubbleSort}>Bubble sort</button>
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
                            'red' :
                            props.keyVal === val.key ?
                                'blue' : ''
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
