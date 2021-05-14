import React from "react";

function Box(props) {
  return (
    <>
      {props.content.type === 0 ? (
        <div className="w-4/5 mx-auto bg-white p-4 rounded">
          {props.content.content + props.content.id}
        </div>
      ) : (
        <div>{props.content.content}</div>
      )}
    </>
  );
}

export default Box;
