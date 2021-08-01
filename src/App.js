import { useState } from 'react';

import './App.css';

import { TabBar, Main, Footer } from './layout.js';

function App() {
  const [contents, setContents] = useState([
    {
      id: 0,
      type: 0,
      content: '',
    },
  ]);
  const [boxsPosition, setBoxsPosition] = useState([0]);
  const [newContentId, setNewContentId] = useState(1);
  const [fileList, setFileList] = useState([
    {
      id: 0,
      fileName: 'Untitled0',
      contents: [
        {
          id: 0,
          type: 0,
          content: '',
        },
      ],
      boxsPosition: [0],
      newContentId: 1,
    },
  ]);
  const [filePosition, setFilePosition] = useState([0]);
  const [currentFile, setCurrentFile] = useState(0);
  const [newId, setNewId] = useState(1);

  return (
    <div className="flex h-screen flex-col">
      <TabBar
        fileList={fileList}
        setFileList={setFileList}
        filePosition={filePosition}
        setFilePosition={setFilePosition}
        currentFile={currentFile}
        setCurrentFile={setCurrentFile}
        newId={newId}
        setNewId={setNewId}
      />
      <Main
        fileList={fileList}
        setFileList={setFileList}
        currentFile={currentFile}
        contents={contents}
        setContents={setContents}
        newContentId={newContentId}
        setNewContentId={setNewContentId}
        boxsPosition={boxsPosition}
        setBoxsPosition={setBoxsPosition}
      />
      <Footer />
    </div>
  );
}

export default App;
