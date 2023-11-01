import React, { useContext, useRef } from "react";
import { useDispatch } from "react-redux";
import UserContext from "../../../../Context/UserContext";
import { createList } from "../../../../Store/dataThunks";

export function AddListInput() {
  const dispatch = useDispatch();
  const { sessionId } = useContext(UserContext);
  const newlist = useRef(null);
  async function addNewList() {
    if (newlist.current.value) {
      await dispatch(
        createList({ name: newlist.current.value, sessionId: sessionId })
      );
      newlist.current.value = "";
    }
  }
  return (
    <div>
      <label htmlFor="addlist">
        <h1>Add</h1>
      </label>
      <input type="submit" id="addlist" onClick={addNewList} />
      <input
        type="text"
        className="add_list"
        placeholder="Add a list"
        ref={newlist}
      />
    </div>
  );
}
