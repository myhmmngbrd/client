import React from 'react';
import './DSA.css';

class Table extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            values: props.values,
            selected: [],
            compared: [],
            chosen: [],
            key:[],
        }
        this.sortState = [];
        this.selectionSort = this.selectionSort.bind(this);
        this.InsertionSort = this.InsertionSort.bind(this);
        this.bubbleSort = this.bubbleSort.bind(this);
        this.shellSort = this.shellSort.bind(this);
        this.mergeSort = this.mergeSort.bind(this);
    }

    update() {
        this.sortState.push()
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
            selected: [a2],
            compared: key ? []: [a1],
            key: key ? [a1]: [],
        });
    }
    
    insert(ary, a1, a2, gap=1, chosen=[]) {
        //insert a1 to a2
        const tmp = ary[a1];
        for (let i = a1; i>a2; i = i - gap) {
            ary[i] = ary[i-gap];
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
            selected: [a2],
            compared: [],
            chosen:chosen,
            key: [a1],
        });
    }
    
    clear(interval) {
        clearInterval(interval);
        this.setState({
            selected:[],
            compared:[],
            key:[],
        });
    }

    power(x, n) {
        for (let i=0; i<n; i++) {
            x *= x;
        }
        return x;
    }

    selectionSort() {
        const ary = this.state.values.map(v => v.value);
        let [min, i, j] = [0,0,0];
        
        this.sort = setInterval(() => {
            if(j < ary.length) {
                j++
                if (ary[j] < ary[min]) min = j;
                this.setState({
                    selected: [i],
                    compared: [j],
                    key: [min],
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
        }, 100);
    }

    InsertionSort() {
        const ary = this.state.values.map(v => v.value);
        let [i, j, index] = [1,1,1];

        this.sort = setInterval(() => {
            j--;
            if (ary[i] < ary[j]) {
                index = j;
                this.setState({
                    selected:[i],
                    compared:[j],
                    key:[index],
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
        }, 100);
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
                            selected: [i],
                            compared: [i+1],
                        })
                        return;
                    }
                    this.swap(ary,i,i+1,0);
                    this.change=0;
                } else {
                    this.setState({
                        selected: [i],
                        compared: [i+1],
                    })
                }
                i++;
            } else if (j > 0){
                j--
                i=0;
            } else {
                this.clear(this.sort);
            }
        }, 100);
    }

    shellSort() {
        const ary = this.state.values.map(v => v.value);
        let gap = Math.floor(ary.length/2);
        gap = gap % 2 ? gap : gap + 1;
        let n=0;
        let [i,j,index] = [1,1,1];
        this.sort = setInterval(() => {
            let chosen = [];
            for (let k=n; k<ary.length; k = k+gap) {
                chosen.push(k);
            }
            j--
            if (ary[i * gap + n] && (ary[i * gap + n] < ary[j * gap + n])) {
                index = j;
                this.setState({
                    selected: [i * gap + n],
                    compared: [j * gap + n],
                    chosen: chosen,
                    key: [index * gap + n],
                })
            } else {
                if (index < i) {
                    //인덱스가 i보다 작다면 삽입
                    this.insert(ary,i * gap + n, index * gap + n, gap, chosen);   
                } else {
                    //인덱스가 i라면 그냥 갱신만
                    this.setState({
                        selected: [i * gap + n],
                        compared: [j * gap + n],
                        chosen: chosen,
                        key: [index * gap + n],
                    });
                }

                if ((++i * gap + n) >= ary.length) {
                    if (++n === gap) {
                        if (gap !== 1) {
                            gap = Math.floor(gap/2);
                            gap = gap % 2 ? gap : gap + 1;
                            n = 0;
                        } else {
                            this.clear(this.sort);
                            return;
                        }
                    }
                    i = 1;
                }
                j = i;
                index = i;
            }
            
        }, 200);
    }

    mergeSort() {
        const ary = this.state.values.map(v => v.value);
        console.log(ary);
        for (let i=0; i<ary.length-1; i++) {
            let min = i;
            for (let j=i+1; j<ary.length; j++) {
                if (ary[j] < ary[min]) min = j;
            }
            let tmp = ary[i];
            ary[i] = ary[min];
            ary[min] = tmp;
        }
        console.log(ary);
    }

    componentWillUnmount() {
        if (this.sort)
            clearInterval(this.sort);
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
                        chosen={this.state.chosen}
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
                <button onClick={this.shellSort}>Shell sort</button>
                <button onClick={this.mergeSort}>Merge sort</button>
            </div>
        )
    }
}

function Bars(props) {
    const output = props.values.map(val => {
        let color = props.selected.indexOf(val.key) > -1 ?
            'black' : props.compared.indexOf(val.key) > -1 ?
            'red' : props.keyVal.indexOf(val.key) > -1 ?
            'blue' : props.chosen.indexOf(val.key) > -1 ?
            'orange' : '';
        return (
            <li 
                className="DSA-bar"
                key={val.key} 
                style={{
                    height: val.value*2 + 'px',
                    backgroundColor: color,
                }}
            ></li>
            )
        }
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
