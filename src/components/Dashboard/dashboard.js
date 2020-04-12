import React, { Component } from 'react';
import FormField from '../Widgets/Formfields/formfields';
import './dashboard.css';
import { firebaseTeams } from '../../firebase';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFronRaw, convertToRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

class Dashboard extends Component {

    state = {
        editorState: EditorState.createEmpty(),
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
            },
            body: {
                element: 'texteditor',
                value: '',
                valid: true
            },
            teams: {
                element: 'select',
                value: '',
                config: {
                    name: 'teams_input',
                    options: []
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

    componentDidMount() {
        this.loadTeams()
    }

    loadTeams = () => {
        firebaseTeams.once('value')
        .then((snapshot) => {
            let teams = [];
            snapshot.forEach((childSnapshot) => {
                teams.push({
                    id: childSnapshot.val().teamId,
                    name: childSnapshot.val().city
                })
            })
            const newFormData ={...this.state.formdata};
            const newElement ={...newFormData['teams']};
            newElement.config.options = teams;
            newFormData['teams'] = newElement;
            this.setState({
                formdata: newFormData
            })
        })
    }

    updateForm  = (element,content = '') => {
        const newFormData = {
            ...this.state.formdata
        }
        const newElement = {
            ...newFormData[element.id]
        }

        if(content === '') {
            newElement.value = element.event.target.value;
        } else {
            newElement.value = element;
        }

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

        console.log(dataToSubmit);

        if(formIsValid) {
            console.log('Submit Post');
        } else {
            this.setState({
                postError: 'Somethin went wrong'
            })
        }
    }

    showError = () => (
        this.state.registerError !==''?
            <div className="error">{this.state.postError}</div>
            : ''
    )

    onEditorStateChange = (editorState) => {
        let contentState = editorState.getCurrentContent();
        let rawState = convertToRaw(contentState);
        let html = stateToHTML(contentState);

        this.updateForm({id:'body'}, html)

        this.setState({
            editorState
        })
    }

    render() {
        return(
            <div className="postContainer"> 
                <form onSubmit={this.submitForm}>
                    <h2>Add Post</h2>
                    <FormField 
                        id={'author'}
                        formdata={this.state.formdata.author}
                        change={(element)=>this.updateForm(element)}
                    />

                    <FormField 
                        id={'title'}
                        formdata={this.state.formdata.title}
                        change={(element)=>this.updateForm(element)}
                    />

                    <Editor 
                        editorState={this.state.editorState}
                        wrapperClassName="myEditor-wrapper"
                        editorClassName="myEditor-editor"
                        onEditorStateChange={this.onEditorStateChange}
                    />

                    <FormField 
                        id={'teams'}
                        formdata={this.state.formdata.teams}
                        change={(element)=>this.updateForm(element)}
                    />

                    {this.submitButton()}
                    {this.showError()}
                </form>
            </div>
        )
    }
}

export default Dashboard;