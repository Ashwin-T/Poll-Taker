import React from 'react';
import ReactLoading from 'react-loading';

const Loading = () => (
    <div className="container flexbox center">
        <ReactLoading type='spin' color='#1e90ff' />
    </div>
);

export default Loading;