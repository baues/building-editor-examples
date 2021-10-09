import React from 'react';
import { Editor } from 'building-editor';
import { Editor as EditorComponent, Provider } from 'building-editor-react';
import Layout from './components/Layout';
import ContextMenu from './components/ContextMenu';
import { settings } from './settings';

const editor = new Editor(undefined, settings);

export default function App(): React.ReactElement {
  return (
    <Provider editor={editor}>
      <Layout>
        <EditorComponent contextMenu={<ContextMenu />} />
      </Layout>
    </Provider>
  );
}
