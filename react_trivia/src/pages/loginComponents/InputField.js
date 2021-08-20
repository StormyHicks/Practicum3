import React from 'react';
import styles from '../styles/Style.css'

class InputField extends React.Component {

    render() {
        return (
            <div className="input-container">

                <input
                    className="regInput"
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onChange={(e) => this.props.onChange(e.target.value)}
                    disabled={this.props.disabled}
                />


            </div>
        );
    }
}

export default InputField;