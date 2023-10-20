
import React from 'react';
import ReactDOM from 'react-dom';
import '@/assets/style.css';
import MomoEditor from '@/components'

export {
    MomoEditor
}
ReactDOM.render(<MomoEditor />, document.getElementById('editor-container'));