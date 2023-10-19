
import React from 'react';
import ReactDOM from 'react-dom';
import '@/assets/style.css';
import MomoRichTextEditor from '@/components'

export {
    MomoRichTextEditor
}
ReactDOM.render(<MomoRichTextEditor />, document.getElementById('editor-container'));