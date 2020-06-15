import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            windows: ['a'],
        }
        this.state.current  = this.state.windows[0];
    }

    render() {
        return (
            <>
                <Header options={this.state.windows}/>
                <Window className={this.state.windows[0]} />
                <Footer />
            </>
        )
    }
}

class Header extends React.Component {
    render() {
        const listItems = this.props.options.map((window) =>
            <li key={window}>{window}</li>);

        return(
            <div className="header">
                <ul>{listItems}</ul>
            </div>
        )
    }
}

class Footer extends React.Component {
    render() {
        return(
            <div className="footer">
                footer
            </div>
        )
    }
}

class Window extends React.Component {
    render() {
        return (
            <div 
                className={this.props.className}
            >
                {this.props.className}
            </div>
        )
    }
}



ReactDOM.render(
    <Main />,
    document.getElementById('root')
)