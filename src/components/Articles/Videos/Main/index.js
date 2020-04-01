import React from 'react';
import VideoList from '../../../Widgets/VideosList/videoslist';

const VideosMain = () => (
    <VideoList 
        type="card"
        title={false}
        loadmore={true}
        start={0}
        amount={10}
    />
)

export default VideosMain;