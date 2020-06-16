import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: props.menu,
            selected: null
        }
        this.selectMenu = this.selectMenu.bind(this);
        this.getSelectedElement = this.getSelectedElement.bind(this);
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

    getSelectedElement() {
        if (!this.state.selected) {
            return null;
        }
        const currentId = this.state.selected.id
        let i = 0;
        console.log(this.state.menu[i].name);
        while (this.state.menu[i].name !== currentId) {
            i++
        }
        return this.state.menu[i].element;
    }

    render() {
        console.log(this.getSelectedElement());
        return (
            <Header menu={this.state.menu} onClick={this.selectMenu} />
        )
    }
}


class Header extends React.Component {
    render() {
        return (
            <div id="header">
                <Menu items={this.props.menu} onClick={this.props.onClick} />
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
    push: function(name, element) {
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


const domElement = <Main menu={Interface.windowsList}/>

ReactDOM.render(
    domElement,
    document.getElementById('root')
);