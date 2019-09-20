import React, { useState } from "react";
import {axiosWithAuth} from './AxiosAuth';
import { Input, Button } from "semantic-ui-react";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, getData }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    console.log(colorToEdit);
    axiosWithAuth()
    .put(`/colors/${colorToEdit.id}`, colorToEdit)
    .then(res=>{
      console.log(res);
      getData();
      setEditing(false);
    })
    .catch(error=>{
      console.log(error);
    })
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    
    axiosWithAuth()
    .delete(`/colors/${color.id}`)
    .then(res=>{
      getData();
    })
    .catch(error=>{
      console.log(error);
    })
  };

  const [addColor, setAddColor] = useState({
    color: "",
    code: {
      hex: ""
    }
  });
  const addHandler = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/colors", addColor)
      .then(res => {
        updateColors(res.data);
        setAddColor({
          color: "",
          code: {
            hex: ""
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}

      <form onSubmit={addHandler} className="new-colors">
        <Input
          placeholder="Color Name"
          name="color"
          value={addColor.color}
          onChange={e => {
            setAddColor({
              ...addColor,
              color: e.target.value
            });
          }}
        />
        <Input
          placeholder="#Hex Code"
          name="#hex"
          value={addColor.code.hex}
          onChange={e => {
            setAddColor({
              ...addColor,
              code: {
                hex: e.target.value
              }
            });
          }}
        />
        <Button>Add Color</Button>
      </form>

      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
