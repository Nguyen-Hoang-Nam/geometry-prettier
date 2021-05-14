import React from "react";

import Box from "./box.jsx";

import { ReactComponent as AddButton } from "../img/add.svg";
import update from "immutability-helper";

function Main(props) {
  function createContentBox(index) {
    props.setContents(
      update(props.contents, {
        $splice: [
          [
            index + 1,
            0,
            {
              id: props.newContentId,
              type: 0,
              content: "Empty",
            },
          ],
        ],
      })
    );

    props.setNewContentId(props.newContentId + 1);
  }

  return (
    <div className="bg-gray-300 flex-grow py-16 overflow-auto">
      {props.contents.map((content, index) => (
        <React.Fragment key={content.id}>
          <Box content={content} />
          <AddButton
            onClick={() => createContentBox(index)}
            className="h-4 w-4 mx-auto my-6 rounded-full bg-white box-content p-2 border-2 border-black cursor-pointer"
          />
        </React.Fragment>
      ))}
    </div>
  );
}

export default Main;
