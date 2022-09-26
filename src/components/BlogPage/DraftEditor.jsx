import { useState } from 'react';

import styles from './draftEditor.module.scss';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Modall from '../Layouts/Modal/Modal';

function DraftEditor() {
  const [isOpen, setIsOpen] = useState(true);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  function handleEditorState(editorState) {
    console.log(convertToRaw(editorState.getCurrentContent()));
    setEditorState(editorState);
  }

  return (
    <>
      <Modall isOpen={isOpen} setIsOpen={setIsOpen} className={styles.draftModal}>
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorState}
          editorClassName={styles.draftEditorBox}
          toolbarClassName=''
        />
      </Modall>
      <button onClick={() => setIsOpen((prevState) => !prevState)}>Open Editor</button>
    </>
  );
}

export default DraftEditor;
