import React from "react";
import Tab from "./tab.jsx";
import { ReactComponent as AddButton } from "../img/add.svg";
import update from "immutability-helper";

function TabBar(props) {
  function createNewFile() {
    props.setFileList([
      ...props.fileList,
      {
        id: props.newId,
        fileName: "Untitled" + props.newId,
      },
    ]);
    props.setFilePosition([...props.filePosition, props.newId]);

    props.setNewId(props.newId + 1);
    props.setCurrentFile(props.newId);
  }

  function moveTab(dragIndex, hoverIndex) {
    const fileId = props.filePosition[dragIndex];

    props.setFilePosition(
      update(props.filePosition, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, fileId],
        ],
      })
    );
  }

  const TabComponent = (position, index) => {
    return (
      <React.Fragment key={position}>
        {props.fileList[position] ? (
          <Tab
            index={index}
            currentFile={props.currentFile}
            setCurrentFile={props.setCurrentFile}
            file={props.fileList[position]}
            fileList={props.fileList}
            moveTab={moveTab}
          />
        ) : (
          ""
        )}
      </React.Fragment>
    );
  };

  return (
    <div className="flex bg-white items-center">
      <div className="px-4">Logo</div>
      {props.filePosition.map(TabComponent)}
      <AddButton className="h-6 py-1 w-8" onClick={createNewFile} />
    </div>
  );
}

export default TabBar;
