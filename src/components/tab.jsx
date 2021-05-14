import { forwardRef, useImperativeHandle, useRef } from "react";
import { DragSource, DropTarget } from "react-dnd";

const Tab = forwardRef(function Tab(props, ref) {
  const tab = useRef(null);

  props.connectDragSource(tab);
  props.connectDropSource(tab);
  useImperativeHandle(ref, () => ({
    getNode: () => tab.current,
  }));

  function chooseTab() {
    if (props.currentFile !== props.file.id) {
      props.setCurrentFile(props.file.id);
    }
  }

  return (
    <div
      ref={tab}
      onClick={chooseTab}
      className={
        "h-8 w-48 py-1 pl-2 rounded-t border-l-2 cursor-pointer " +
        (props.currentFile === props.file.id ? "bg-gray-200" : "bg-gray-100")
      }
    >
      {props.file.fileName}
    </div>
  );
});

export default DropTarget(
  "tab",
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

      props.moveTab(dragIndex, hoverIndex);
      monitor.getItem().index = hoverIndex;
    },
  },
  (connect) => ({
    connectDropSource: connect.dropTarget(),
  })
)(
  DragSource(
    "tab",
    {
      beginDrag: (props) => ({
        id: props.file.id,
        index: props.index,
      }),
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    })
  )(Tab)
);
