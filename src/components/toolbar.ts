import { createEditor, createToolbar, IEditorConfig, IDomEditor,
  SlateElement, SlateTransforms, SlateEditor, SlateNode, DomEditor, SlateText, Boot } from '@wangeditor/editor';
// import fn from './render'
import { getEditor } from './editor';

const toolbarContainer = (function(){
  const toolbarDiv = document.createElement('div');
  toolbarDiv.setAttribute('id', 'toolbar-container');
  return toolbarDiv;
})();

const editor = getEditor();

// 创建工具栏1
const toolbar = createToolbar({
  editor,
  selector: '#toolbar-container',
  mode: 'default',
  config: {
      // modalAppendToBody: true
      insertKeys: {
          index: 0,
          keys: [
              'insertFormula', // “插入公式”菜单
              // 'editFormula',

              'uploadAttachment', // “下载附件”菜单
          ],
      },
  }
})

// @ts-ignore
window.editor = editor;

export {
  toolbar
};