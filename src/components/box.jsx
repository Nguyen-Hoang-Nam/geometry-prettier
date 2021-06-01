import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";

import ReactMathjaxPreview from "react-mathjax-2.7.8-preview";
import TextareaAutosize from "react-textarea-autosize";
import { DragSource, DropTarget } from "react-dnd";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import ColorPicker from "./colorPicker.jsx";
import ImageBox from "./imageBox.jsx";
import UploadBox from "./uploadBox.jsx";

import dragIcon from "../img/drag.svg";
import boldIcon from "../img/bold.svg";
import italicIcon from "../img/italic.svg";
import underlineIcon from "../img/underline.svg";

const Box = forwardRef(function Box(props, ref) {
  const [isEditText, setIsEditText] = useState(false);
  const [isEditImage, setIsEditImage] = useState(false);
  const [content, setContent] = useState("");

  const textArea = useRef(null);
  const box = useRef(null);
  const dragHandle = useRef(null);

  props.connectDragSource(dragHandle);
  props.connectDragPreview(box);
  props.connectDropTarget(box);

  const opacity = props.isDragging ? "opacity-40" : "opacity-100";

  useImperativeHandle(ref, () => ({
    getNode: () => box.current,
  }));

  function focusContent() {
    if (props.content.type === 0 && !isEditText) {
      props.setCurrentBox(props.index);
      setIsEditText(true);
    } else if (props.content.type === 1 && !isEditImage) {
      props.setCurrentBox(props.index);
      setIsEditImage(true);
    }
  }

  function editContent(event) {
    setContent(event.target.value);
    props.contents[props.content.id].content = event.target.value;
  }

  function splice(text, start, delCount, newSubStr) {
    return (
      text.slice(0, start) + newSubStr + text.slice(start + Math.abs(delCount))
    );
  }

  function insertTex(tex) {
    const updateContent = splice(
      content,
      textArea.current.selectionStart,
      0,
      tex
    );

    setContent(updateContent);
    props.contents[props.content.id].content = updateContent;
  }

  function changeFontSize(option) {
    if (option.label !== "normal") {
      insertTex(`$\\${option.label}{}$`);
    }
  }

  useEffect(() => {
    if (isEditText) {
      textArea.current.focus();
    }
  }, [isEditText]);

  useEffect(() => {
    if (isEditText && props.currentBox !== props.index) {
      setIsEditText(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentBox]);

  const fontSizeOptions = [
    "tiny",
    "scriptsize",
    "small",
    "normal",
    "large",
    "LARGE",
    "huge",
  ];

  return (
    <div ref={box} className={`flex ${opacity}`}>
      <div className="flex-grow flex justify-end items-center pr-2">
        <img
          src={dragIcon}
          ref={dragHandle}
          className="h-8 cursor-move"
          alt="Drag box"
        />
      </div>

      <div
        className={`w-full h-full top-0 left-0 ${
          isEditText ? "absolute" : "hidden"
        }`}
        onClick={() => setIsEditText(false)}
      ></div>

      <div
        onClick={focusContent}
        className="w-4/5 mx-auto bg-white p-4 rounded relative cursor-pointer"
        style={{ minHeight: "4rem" }}
      >
        <div
          className={`absolute -top-9 bg-white rounded-t -ml-4 px-2 pt-2 gap-2 items-center ${
            isEditText ? "flex" : "hidden"
          }`}
        >
          <Dropdown
            options={fontSizeOptions}
            controlClassName="cursor-pointer border-gray-300 h-8"
            value={"normal"}
            onChange={changeFontSize}
          />

          <img
            src={boldIcon}
            className="w-8 h-8 p-2 cursor-pointer rounded border-2 border-gray-300"
            onClick={() => insertTex("$\\textbf{}$")}
            alt="Bold text"
          />

          <img
            src={italicIcon}
            className="w-8 h-8 p-2 cursor-pointer rounded border-2 border-gray-300"
            onClick={() => insertTex("$\\textit{}$")}
            alt="Italic text"
          />

          <img
            src={underlineIcon}
            className="w-8 h-8 p-2 cursor-pointer rounded border-2 border-gray-300"
            onClick={() => insertTex("$\\underline{}$")}
            alt="Underline text"
          />

          <ColorPicker insertTex={insertTex} />
        </div>

        {props.content.type === 0 ? (
          <>
            <TextareaAutosize
              minRows={1}
              ref={textArea}
              value={content}
              onChange={editContent}
              className={`w-full outline-none ${
                isEditText ? "block" : "hidden"
              }`}
              style={{ resize: "none" }}
            />

            <ReactMathjaxPreview
              math={props.content.content}
              className={isEditText ? "important-hidden" : "block"}
            />
          </>
        ) : (
          <>
            <UploadBox />
            <ImageBox img="" />
          </>
        )}
      </div>

      <div className="flex-grow"></div>
    </div>
  );
});

// export default Box;
export default DropTarget(
  "box",
  {
    hover(props, monitor, component) {
      if (!component) {
        return null;
      }

      const node = component.getNode();
      if (!node) {
        return null;
      }

      const dragIndex = monitor.getItem().index;
      const hoverIndex = props.index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = node.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      props.moveBox(dragIndex, hoverIndex);
      monitor.getItem().index = hoverIndex;
    },
  },
  (connect) => ({
    connectDropTarget: connect.dropTarget(),
  })
)(
  DragSource(
    "box",
    {
      beginDrag: (props) => ({
        id: props.content.id,
        index: props.index,
      }),
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview(),
      isDragging: monitor.isDragging(),
    })
  )(Box)
);
