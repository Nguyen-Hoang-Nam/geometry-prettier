import React from "react";

function ToolBar(props) {
  return (
    <div className="flex bg-white">
      <div className="p-4">Logo</div>
      <div className="flex p-4 gap-2">
        <div>Insert</div>
        <div>Font size</div>
        <div>Font family</div>
      </div>
    </div>
  );
}

export default ToolBar;
