import React from 'react';

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date(),
        }
    }

    componentDidMount() {
        this.timerID = setInterval(() => {
            this.setState({
                time: new Date(),
            })
        }, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        return (
            <div id="clock">{this.state.time.toString()}</div>
        )
    }
}

export default {
    id: 'clock',
    name: 'Clock',
    element: <Clock />,
}