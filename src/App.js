import { useState } from "react";

import "./App.css";

import { ToolBar, TabBar, Main, Footer } from "./layout.js";

function App() {
  const [contents, setContents] = useState([
    {
      id: 0,
      type: 0,
      content: "Empty",
    },
  ]);
  const [newContentId, setNewContentId] = useState(1);
  const [fileList, setFileList] = useState([{ id: 0, fileName: "Untitled0" }]);
  const [filePosition, setFilePosition] = useState([0]);
  const [currentFile, setCurrentFile] = useState(0);
  const [newId, setNewId] = useState(1);

  return (
    <div className="flex h-screen flex-col">
      <ToolBar />
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
        contents={contents}
        setContents={setContents}
        newContentId={newContentId}
        setNewContentId={setNewContentId}
      />
      <Footer />
    </div>
  );
}

export default App;
