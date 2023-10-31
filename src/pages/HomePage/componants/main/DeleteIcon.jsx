import React, { useContext } from "react";
import delete_icon from "../../assets/delete.svg";
import { useDispatch } from "react-redux";
import UserContext from "../../../../Context/UserContext.jsx";
import { deleteList } from "../../../../Store/dataThunks.js";

export function DeleteIcon(props) {
  const dispatch = useDispatch();
  const { sessionId } = useContext(UserContext);
  function deleteCurrentList() {
    dispatch(deleteList({ id: props.ListId, sessionId: sessionId }));
  }
  return (
    <>
      <label className="delete_list" htmlFor={"delete" + props.ListId}>
        <img src={delete_icon} alt="" />
      </label>
      <input
        type="button"
        id={"delete" + props.ListId}
        onClick={deleteCurrentList}
      />
    </>
  );
}
