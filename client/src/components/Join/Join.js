import React from 'react';
import {Link} from 'react-router-dom';
import './Join.css';

class Join extends React.PureComponent {

    state = {
        name: '',
        room: ''
    };

    setName = name => this.setState({name: name});

    setRoom = room => this.setState({room: room});

    render() {
        const {name, room} = this.state;
        return (
            <div className="joinOuterContainer">
                <div className="joinInnerContainer">
                    <h1 className="heading">Join</h1>
                    <div><input placeholder="Name" className="joinInput" type="text"
                                onChange={event => this.setName(event.target.value)}/></div>
                    <div><input placeholder="Room" className="joinInput mt-20" type="text"
                                onChange={event => this.setRoom(event.target.value)}/></div>
                    <Link onClick={event => (!name || !room) ? event.preventDefault() : null}
                          to={`/chat?name=${name}&room=${room}`}>
                        <button className="button mt-20" type="submit">Sign In</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Join;
