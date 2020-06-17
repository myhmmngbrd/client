import React from 'react';

class Test extends React.Component {
    render() {
        return(
            <div>Test page</div>
        )
    }
}

export default  {
    id: 'test',
    name: 'Test page',
    element: <Test />,
}