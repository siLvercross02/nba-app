import React, { Component } from 'react';
import FormField from '../Widgets/Formfields/formfields';
import './dashboard.css';
import FormFields from '../Widgets/Formfields/formfields';

class Dashboard extends Component {

    state = {
        postError: '',
        loading:false,
        formdata: {
            author: {
                element: 'input',
                value: '',
                config: {
                    name: 'author_input',
                    type: 'text',
                    placeholder: 'Enter your Name'
                },
                validation: {
                    required:true,
                },
                valid:false,
                touched:false,
                validationMessage: ''
            },
            title: {
                element: 'input',
                value: '',
                config: {
                    name: 'title_input',
                    type: 'text',
                    placeholder: 'Enter the Title'
                },
                validation: {
                    required:true,
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
            console.log(newFormData)

        }
        newElement.touched = element.blur;
        newFormData[element.id] = newElement ;


        this.setState({
            formdata:newFormData
        })
    }

    validate = (element) => {
        let error = [true, ''];

        if(element.validation.required) {
            const valid = element.value.trim() !=='';
            const message = `${!valid ? 'This field is required': ''}`;
            error = !valid ? [valid, message]: error;
        }
        return error;
    }

    submitButton = () => (
        this.state.loading ?
            'Loading...'
            :
            <div>
                 <button type="submit">Add Post</button>
            </div>
    )

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = {};
        let formIsValid = true;

        for(let key in this.state.formdata) {
            dataToSubmit[key] = this.state.formdata[key].value;

        }
        for(let key in this.state.formdata) {
            formIsValid = this.state.formdata[key].valid && formIsValid;
        }
    }

    render() {
        return(
            <div className="postContainer"> 
                <form onSubmit={this.submitForm}>
                    <h2>Add Post</h2>
                    <FormFields 
                        id={'author'}
                        formdata={this.state.formdata.author}
                        change={(element)=>this.updateForm(element)}
                    />
                    {this.submitButton()}
                </form>
            </div>
        )
    }
}

export default Dashboard;