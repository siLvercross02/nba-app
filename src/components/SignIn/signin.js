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
            password: {
                element: 'input',
                value: '',
                config: {
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter your Password'
                },
                validation: {
                    required:true,
                    password:true
                },
                valid:false,
                touched:false,
                validationMessage: ''
            }
        }
    }

    updateForm  = (element) => {
        const newFormData = {
            ...this.state.formdata
        }
        const newElement = {
            ...newFormData[element.id]
        }
        newElement.value = element.event.target.value;
        if(element.blur) {
            let validData = this.validate(newElement);
            newElement.valid = validData[0];
            newElement.validationMessage = validData[1];

        }
        newElement.touched = element.blur;
        newFormData[element.id] = newElement ;

        console.log(newFormData)

        this.setState({
            formdata:newFormData
        })
    }

    validate = (element) => {
        let error = [true, ''];

        if(element.validation.required) {
            const valid = /\S+@\S+\.\S+/.test(element.value);
            const message = `${!valid ? 'Must be a Valid Email': ''}`;
            error = !valid ? [valid, message]: error;
        }

        if(element.validation.password) {
            const valid = element.value.length >= 5;
            const message = `${!valid ? 'Must be greater than 5': ''}`;
            error = !valid ? [valid, message]: error;
        }

        if(element.validation.required) {
            const valid = element.value.trim() !=='';
            const message = `${!valid ? 'This field is required': ''}`;
            error = !valid ? [valid, message]: error;
        }
        return error;
    }

    render() {
        return(
            <div className="logContainer">
                <form>
                    <h2>Register / Log In</h2>
                    <FormFields
                        id={'email'}
                        formdata={this.state.formdata.email}
                        change={(element) => this.updateForm(element)}
                    />
                     <FormFields
                        id={'password'}
                        formdata={this.state.formdata.password}
                        change={(element) => this.updateForm(element)}
                    />
                </form>
            </div>
        )
    }
}

export default SignIn;