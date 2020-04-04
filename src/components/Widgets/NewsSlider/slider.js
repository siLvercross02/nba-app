import React, { Component } from 'react';
import { firebaseArticles, firebaseLooper } from '../../../firebase';
// import axios from 'axios';
// import { URL } from '../../../config';
import SliderTemplates from './slider_templates';

class NewsSlider extends Component {

    state = {
        news: []
    }

    componentWillMount() {
        firebaseArticles.limitToFirst(3).once('value')
        .then((snapshot) => {
            const news = firebaseLooper(snapshot);
            this.setState({
                news
            })
        })

        // axios.get(`${URL}/articles?_start=${this.props.start}&_end=${this.props.amount}`)
        // .then(response => {
        //     this.setState({
        //         news: response.data
        //     })
        // })
    }

    render() {
        return(
            <div>
                <SliderTemplates data={this.state.news} type={this.props.type} settings={this.props.settings}/>
            </div>
        )
    }
}

export default NewsSlider;