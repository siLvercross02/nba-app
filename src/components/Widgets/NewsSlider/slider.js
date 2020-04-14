import React, { Component } from 'react';
import { firebaseArticles, firebaseLooper, firebase } from '../../../firebase';
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
            // news.forEach((item,i) =>{
            //     firebase.storage().ref('images')
            //     .child(item.image).getDownloadURL()
            //     .then(url => {
            //         news[i].image = url;
            //         this.setState({
            //             news
            //         })
            //     })
            // });

            const asyncFunction = (item, i, cb) => {
                firebase.storage().ref('images')
                .child(item.image).getDownloadURL()
                .then(url => {
                    news[i].image = url;
                    cb();
                })
            }

            let requests = news.map((item,i) => {
                return new Promise((resolve) => {
                    asyncFunction(item, i, resolve)
                })
            })

            Promise.all(requests).then(()=> {
                this.setState({
                    news  
                })
            })

        });



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