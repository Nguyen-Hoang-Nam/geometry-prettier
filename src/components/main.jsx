import React, { useState } from 'react';

import { Scrollbars } from 'react-custom-scrollbars';
import Box from './box.jsx';
import BoxOptionsMenu from './boxOptionsMenu.jsx';

import update from 'immutability-helper';

function Main(props) {
  const [currentBox, setCurrentBox] = useState(-1);

  function moveBox(dragIndex, hoverIndex) {
    const fileId = props.boxsPosition[dragIndex];

    props.setBoxsPosition(
      update(props.boxsPosition, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, fileId],
        ],
      })
    );
  }

  //   function createContentBox(index) {
  //     props.setContents([
  //       ...props.contents,
  //       { id: props.newContentId, type: 0, content: '' },
  //     ]);

  //     props.fileList[props.currentFile].contents.push({
  //       id: props.newContentId,
  //       type: 0,
  //       content: '',
  //     });

  //     props.fileList[props.currentFile].boxsPosition.push(props.newContentId);

  //     props.setBoxsPosition(
  //       update(props.boxsPosition, {
  //         $splice: [[index + 1, 0, props.newContentId]],
  //       })
  //     );
  //     props.setNewContentId(props.newContentId + 1);
  //   }

  const scrollbarComponent = ({ style, ...props }) => {
    const customStyle = {
      backgroundColor: '#FFFFFF',
      opacity: 0.8,
    };
    return <div {...props} style={{ ...style, ...customStyle }} />;
  };

  const BoxComponent = (position, index) => {
    //     return (
    //       <React.Fragment key={position}>
    //         {props.contents[position] ? (
    //           <Box
    //             currentBox={currentBox}
    //             setCurrentBox={setCurrentBox}
    //             content={props.contents[position]}
    //             index={index}
    //             contents={props.contents}
    //             moveBox={moveBox}
    //             createContentBox={createContentBox}
    //           />
    //         ) : (
    //           ''
    //         )}

    //         <div className="flex">
    //           <div className="flex-grow flex justify-end pr-2">
    //             <BoxOptionsMenu
    //               index={index}
    //               contents={props.contents}
    //               setContents={props.setContents}
    //               boxsPosition={props.boxsPosition}
    //               setBoxsPosition={props.setBoxsPosition}
    //               newContentId={props.newContentId}
    //               setNewContentId={props.setNewContentId}
    //             />
    //           </div>

    //           <div className="w-4/5"></div>

    //           <div className="flex-grow"></div>
    //         </div>
    //       </React.Fragment>
    //     );

    return (
      <React.Fragment key={position}>
        {props.fileList[props.currentFile].contents[position] ? (
          <Box
            currentBox={currentBox}
            setCurrentBox={setCurrentBox}
            content={props.fileList[props.currentFile].contents[position]}
            currentFile={props.currentFile}
            index={index}
            contents={props.fileList[props.currentFile].contents}
            moveBox={moveBox}
            // createContentBox={createContentBox}
          />
        ) : (
          ''
        )}

        <div className="flex">
          <div className="flex-grow flex justify-end pr-2">
            <BoxOptionsMenu
              index={index}
              contents={props.fileList[props.currentFile].contents}
              content={props.fileList[props.currentFile].contents[position]}
              setContents={props.setContents}
              boxsPosition={props.fileList[props.currentFile].boxsPosition}
              setBoxsPosition={props.setBoxsPosition}
              newContentId={props.fileList[props.currentFile].newContentId}
              setNewContentId={props.setNewContentId}
            />
          </div>

          <div className="w-4/5"></div>

          <div className="flex-grow"></div>
        </div>
      </React.Fragment>
    );
  };

  return (
    <Scrollbars
      renderThumbVertical={scrollbarComponent}
      className="bg-gray-300 flex-grow"
    >
      <div className="py-20">
        {props.fileList[props.currentFile].boxsPosition.map(BoxComponent)}
      </div>
    </Scrollbars>
  );
}

export default Main;
