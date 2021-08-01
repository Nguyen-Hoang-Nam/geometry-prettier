import { useState } from 'react';

import update from 'immutability-helper';

import textIcon from '../img/text.svg';
import imageIcon from '../img/image.svg';
import { ReactComponent as AddButton } from '../img/add.svg';

function BoxOptionsMenu(props) {
  const [show, setShow] = useState(false);

  function backgroundClick() {
    setShow(false);
  }

  function createContentBox(boxType) {
    props.setContents([
      ...props.contents,
      { id: props.newContentId, type: boxType, content: '' },
    ]);

    props.contents.push({
      id: props.content.newContentId,
      type: boxType,
      content: '',
    });
    props.boxsPosition.push(props.content.newContentId);
    props.content.newContentId = props.content.newContentId + 1;

    props.setBoxsPosition(
      update(props.boxsPosition, {
        $splice: [[props.index + 1, 0, props.newContentId]],
      })
    );
    props.setNewContentId(props.newContentId + 1);
    setShow(false);
  }

  return (
    <div className="relative">
      <AddButton
        onClick={() => setShow(true)}
        className="h-2 w-2 my-4 rounded-full bg-white box-content p-2 border-2 border-black cursor-pointer"
      />

      <div
        className={`fixed top-0 left-0 w-screen h-screen ${
          show ? 'block' : 'hidden'
        }`}
        onClick={backgroundClick}
      ></div>

      <div
        className={`absolute gap-x-4 p-4 bg-white rounded top-4 left-8 z-50 border-2 border-black ${
          show ? 'flex' : 'hidden'
        }`}
      >
        <div
          onClick={() => {
            createContentBox(0);
          }}
        >
          <img src={textIcon} className="w-8" alt="Text box" />
          <p>Text</p>
        </div>

        <div
          onClick={() => {
            createContentBox(1);
          }}
        >
          <img src={imageIcon} className="w-8" alt="Show box" />
          <p>Image</p>
        </div>
      </div>
    </div>
  );
}

export default BoxOptionsMenu;
