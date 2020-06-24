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
        this.pushState = this.pushState.bind(this);
        this.updateState = this.updateState.bind(this);
        this.selectionSort = this.selectionSort.bind(this);
        this.InsertionSort = this.InsertionSort.bind(this);
        this.bubbleSort = this.bubbleSort.bind(this);
        this.shellSort = this.shellSort.bind(this);
        this.mergeSort = this.mergeSort.bind(this);
        this.quickSort = this.quickSort.bind(this);
    }

    pushState(ary, selected = [], compared = [], chosen = [], key = []) {
        this.sortState.push({
            values: ary.map((v,i) => {return { value:v, key:i } }),
            selected: selected,
            compared: compared,
            chosen: chosen,
            keyVal:  key,
        })
    }

    updateState() {
        console.log(this.sortState.length);
        let i = 0;
        this.view = setInterval(() => {
            this.setState({
                values: this.sortState[i].values,
                selected: this.sortState[i].selected,
                compared: this.sortState[i].compared,
                chosen: this.sortState[i].chosen,
                key: this.sortState[i].keyVal,
            });
            if (++i >= this.sortState.length) this.clear(this.view);
        }, 200);
    }
    
    clear(interval) {
        clearInterval(interval);
        this.setState({
            selected:[],
            compared:[],
            chosen: [],
            key:[],
        });
        this.sortState = [];
    }

    selectionSort() {
        const ary = this.state.values.map(v => v.value);
        for (let i=0; i<ary.length-1; i++) {
            let min = i;
            for (let j=i+1; j<ary.length; j++) {
                if (ary[j] < ary[min]) min = j;
                this.pushState(ary,[i],[j],[],[min]);
            }
            let tmp = ary[i];
            ary[i] = ary[min];
            ary[min] = tmp;
            this.pushState(ary,[min],[],[],[i]);
        }
        this.updateState();
    }

    InsertionSort() {
        const ary = this.state.values.map(v => v.value);
        for (let i=1; i<ary.length; i++) {
            let index = i;
            for (let j = i-1; j>=0; j--) {
                if (ary[j] > ary[i]) {
                    index = j;
                    this.pushState(ary, [i], [j], [], [index]);
                } else {
                    break;
                }
            }
            let tmp = ary[i];
            for (let k=i; k>index; k--) {
                ary[k] = ary[k-1];
            }
            ary[index] = tmp;
            this.pushState(ary, [index], [], [], [i]);
        }
        this.updateState();
    }

    bubbleSort() {
        const ary = this.state.values.map(v => v.value);
        let tmp;
        for (let i=ary.length-1; i>0; i--) {
            for (let j=0; j<i; j++) {
                if (ary[j] > ary[j+1]) {
                    tmp = ary[j];
                    ary[j] = ary[j+1];
                    ary[j+1] = tmp;
                    this.pushState(ary,[j+1],[j],[],[i]);
                } else {
                    this.pushState(ary,[j],[j+1],[],[i]);
                }
            }
        }
        this.updateState();
    }

    shellSort() {
        const ary = this.state.values.map(v => v.value);
        let gap = Math.floor(ary.length/2);
        let index, tmp, group;
        while (gap > 0) {
            gap = (gap % 2 ? gap : gap + 1);
            for (let n=0; n<gap; n++) {
                group = []
                for (let m = n; m < ary.length; m = m + gap) {
                    group.push(m);
                }
                for (let i=n+gap; i<ary.length; i = i + gap) {
                    index = i;
                    for (let j=i-gap; j >= n; j = j - gap) {
                        if (ary[j] > ary[i]) {
                            index = j;
                            this.pushState(ary,[i],[j],group,[index]);
                        } else {
                            break;
                        }
                    }
                    tmp = ary[i];
                    for (let k = i; k > index; k = k-gap) {
                        ary[k] = ary[k-gap];
                    }
                    ary[index] = tmp;
                    this.pushState(ary,[index],[],group,[i]);
                }
            }
            gap = Math.floor(gap / 2);
        }
        this.updateState();
    }

    mergeSort(e, ary, left, right) {
        if (!ary) {
            ary = this.state.values.map(v => v.value);
            console.log(ary);
            left = 0;
            right = ary.length-1;
        }
        let group = [];
        for( let i = left; i <= right; i++) {
            group.push(i);
        }
        this.pushState(ary,[],[],group,[]);
        if (left < right) {
            let mid = Math.floor((left + right) / 2);
            this.mergeSort(e, ary, left, mid);
            this.mergeSort(e, ary, mid+1, right);
            this.merge(ary, left, mid, right, group);
        }
        if ((left === 0) && (right === ary.length-1)) {
            this.updateState();
        }
    }

    merge(ary,left,mid,right, group) {
        let i,j,k
        if (!this.sorted) {
            this.sorted = new Array(ary.length);
        }
        i = left;
        j = mid +1;
        k = left
        while (i <= mid && j <= right) {
            if (ary[i] <= ary[j]) {
                this.sorted[k++] = ary[i++];
            } else {
                this.sorted[k++] = ary[j++];
            }
        }
        if (i > mid) {
            for (let l = j; l <= right; l++) {
                this.sorted[k++] = ary[l];
            }
        } else {
            for (let l = i;l <= mid; l++) {
                this.sorted[k++] = ary[l];
            }
        }
        for (let l = left; l <= right; l++) {
            ary[l] = this.sorted[l];
            this.pushState(ary, [l], [], group, []);
        }
    }

    quickSort(e, ary, left, right) {
        if (!ary) {
            ary = this.state.values.map(v => v.value);
            left = 0;
            right = ary.length-1
        }
        if (left < right)  {
            let q = this.partition(ary, left, right);
            this.quickSort(e, ary, left, q - 1);
            this.quickSort(e, ary, q + 1, right);
        }
        if (left === 0 && right === ary.length-1) {
            this.updateState();
        }
    }

    partition(ary, left, right) {
        let pivot = ary[left];
        let l = left, r = right+1;
        let tmp, group;
        group = [];
        for (let i=left; i<=right; i++) {
            group.push(i);
        }
        do {
            do {
                l++;
                this.pushState(ary,[l],[left],group,[r <= right ? r : '']);
            } while (ary[l] < pivot)
            do {
                r--;
                this.pushState(ary,[r],[left],group,[l]);
            } while (ary[r] > pivot)
            if (l < r) {
                tmp = ary[l];
                ary[l] = ary[r];
                ary[r] = tmp;
                this.pushState(ary,[l],[left],group,[r]);
            }
        } while (l < r)
        ary[left] = ary[r];
        ary[r] = pivot;
        this.pushState(ary,[left],[r],group,[]);
        return r;
    }

    componentWillUnmount() {
        if (this.sort)
            clearInterval(this.sort);
        if (this.view) 
            clearInterval(this.view);
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
                <button onClick={this.quickSort}>Quick sort</button> 
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
