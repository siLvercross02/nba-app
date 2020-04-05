import React , { Component } from 'react';
import './signin.css';
import FormFields from '../Widgets/Formfields/formfields';

class SignIn extends Component {

    state = {
        registerError: '',
        loading: false,
        formdata: {
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation: {
                    required:true,
                    password:true
                },
                valid:false,
                touched:false,
                validationMessage: ''
            },
            password: {}
        }
    }

    updateForm  = (element) => {
        console.log(element)
    }

    render() {
        return(
            <div className="logContainer">
                <form>
                    <FormFields
                        id={'email'}
                        formdata={this.state.formdata.email}
                        change={(element) => this.updateForm(element)}
                    />
                </form>
            </div>
        )
    }
}

export default SignIn;