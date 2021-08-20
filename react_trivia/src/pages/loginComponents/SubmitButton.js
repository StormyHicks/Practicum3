import React from 'react';
import UserStore from '../stores/UserStore';
//import '.react_trivia/src/app.css';

class SubmitButton extends React.Component {

    render() {
        return (
            <div>

                <button
                    className='submit'
                    disabled={this.props.disabled}
                    onClick={() => this.props.onClick()}
                >
                    {this.props.text}
                </button>


            </div>
        );
    }
}

export default SubmitButton;
