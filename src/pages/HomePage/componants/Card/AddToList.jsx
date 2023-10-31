import React, { useContext, useState } from "react";
import UserContext from "../../../../Context/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { updateList } from "../../../../Store/dataSlice";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export function AddToList(props) {
  const { sessionId } = useContext(UserContext);
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.data.listsData).map((e) => {
    return { id: e.id, name: e.name };
  });
  const ITEM_HEIGHT = 48;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (listId) => {
    if (lists.map((e) => e.id).includes(listId)) {
      console.log("list_id=", listId, " and movie id=", props.id);
      dispatch(
        updateList({
          listId: listId,
          movieId: props.id,
          action: "post",
          sessionId: sessionId,
        })
      );
    }
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        sx={{
          color: "#8323ff",
        }}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        key={props.id}
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
            backgroundColor: "#1e1f28",
            paddingTop: "0px",
            paddingBottom: "0px",
            boxShadow: "0.2rem 0.2rem rgba(0, 0, 0, 0.24)",
          },
        }}
      >
        {lists.map((e) => (
          <MenuItem
            key={e.name}
            selected={e.name === "Pyxis"}
            onClick={() => handleClose(e.id)}
            style={{
              backgroundColor: "#1e1f28",
              color: "#FFF",
              padding: "7px",
              fontSize: "1.1rem",
              textAlign: "center",
            }}
          >
            {e.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
