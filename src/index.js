import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Header extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            menu: props.menu,
            selected: null
        };
        this.selectMenu = this.selectMenu.bind(this);
    }

    selectMenu(e) {
        if (this.state.selected) {
            this.state.selected.classList.remove('selected');
        }
        e.currentTarget.classList.add('selected');
        this.setState({
            selected: e.currentTarget
        });
    }

    render() {
        return (
            <div id="header">
                <Menu items={this.state.menu} onClick={this.selectMenu} />
            </div>
        )
    }
}

function Menu(props) {
    const items = props.items.map(item =>
        <li id={item.name} className="item" onClick={props.onClick} key={item.id}>{item.name}</li>
    );

    return (
        <ul className="menu">{items}</ul>
    )
}

class Contents extends React.Component {
    render() {
        return(
            <></>
        )
    }
}

class A extends React.Component {
    render() {
        return(
            <div>a</div>
        )
    }
}

class B extends React.Component {
    render() {
        return(
            <div>b</div>
        )
    }
}

class C extends React.Component {
    render() {
        return(
            <div>c</div>
        )
    }
}


const Interface = {
    windowsList: [],
    index: 0,
    push: function(element, name) {
        this.windowsList.push({
            id: this.index,
            name: name,
            element: element,
        });
        this.index++;
    }
}

Interface.push('a',<A />);
Interface.push('b',<B />);
Interface.push('c',<C />);


const domElement = <Header menu={Interface.windowsList}/>

ReactDOM.render(
    domElement,
    document.getElementById('root')
);