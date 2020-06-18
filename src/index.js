import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Test from './pages/test.js'
import Clock from './pages/clock.js'
import DSA from './pages/DSA.js'

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: props.menu,
            selected: null
        }
        this.selectMenu = this.selectMenu.bind(this);
        this.getSelected = this.getSelected.bind(this);
    }

    selectMenu(e) {
        // 같은 메뉴를 클릭하더라도, 새로고침 하려는 의도일 수 있으므로 무시하지 않음
        if (this.state.selected) {
            document.getElementById(this.state.selected.id).classList.remove('selected');
        }
        const selectedId = e.currentTarget.id;
        const selectedItem = this.getSelected(selectedId);

        e.currentTarget.classList.add('selected');
        this.setState({
            selected: selectedItem,
        });
    }

    getSelected(id) {
        let i = 0;
        while (this.state.menu[i].id !== id) {
            i++
        }
        return this.state.menu[i];
    }

    render() {
        return (
            <>
                <Header menu={this.state.menu} onClick={this.selectMenu} />
                <Contents contents={this.state.selected} />
            </>
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
        <li id={item.id} className="item" onClick={props.onClick} key={item.key}>{item.name}</li>
    );

    return (
        <ul className="menu">{items}</ul>
    )
}

class Contents extends React.Component {
    render() {
        if (!this.props.contents) {
            return null;
        }
        return(
            this.props.contents.element
        );
    }
}


const Interface = {
    windowsList: [],
    index: 0,
    push: function(id, name, element) {
        this.windowsList.push({
            key: this.index,
            id: id,
            name: name,
            element: element,
        });
        this.index++;
    }
}

Interface.push(Test.id, Test.name, Test.element);
Interface.push(Clock.id, Clock.name, Clock.element);
Interface.push(DSA.id, DSA.name, DSA.element);

const domElement = <Main menu={Interface.windowsList}/>

ReactDOM.render(
    domElement,
    document.getElementById('root')
);