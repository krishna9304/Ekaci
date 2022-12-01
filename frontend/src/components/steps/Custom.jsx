import React, { useContext, useState } from "react";
import { StepperContext } from "../../contexts/StepperContext";

const Custom = () => {
  const { setUserData } = useContext(StepperContext);
  const [added, setAdded] = useState(false);

  const [inputFields, setInputFields] = useState([
    { fieldName: "", fieldData: "" },
  ]);

  const handleChangeInput = (index, event) => {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputFields(values);
    setAdded(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let finalInputFields;
    inputFields.forEach((field) => {
      const fieldName = field.fieldName
        .toLowerCase()
        .trim()
        .split(" ")
        .join("_");
      finalInputFields = { ...finalInputFields, [fieldName]: field.fieldData };
    });
    setUserData((u) => ({ ...u, metadata: finalInputFields }));
    setAdded(true);
  };

  const handleAddFields = () => {
    setInputFields([...inputFields, { fieldName: "", lastName: "" }]);
  };
  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => handleAddFields()}
        className="bg-green-600 m-5 w-1/2 text-center p-2 rounded text-white"
      >
        Add Field
      </button>
      <form onSubmit={handleSubmit}>
        {inputFields.map((inputField, index) => (
          <div key={index}>
            <input
              type="text"
              name="fieldName"
              label="Field Name"
              value={inputField.fieldName}
              onChange={(event) => handleChangeInput(index, event)}
              className="border m-5 p-2"
              placeholder="Field Name"
            />
            <input
              type="text"
              name="fieldData"
              label="Field Data"
              value={inputField.fieldData}
              onChange={(event) => handleChangeInput(index, event)}
              className="border m-5 p-2"
              placeholder="Value"
            />
            <button onClick={() => handleRemoveFields(index)}>Delete</button>
          </div>
        ))}
      </form>
      {inputFields.length ? (
        <button
          className="bg-black text-white px-3 py-1 hover:bg-white hover:text-black border rounded-md border-black"
          onClick={handleSubmit}
        >
          {added ? "Added!" : "Add"}
        </button>
      ) : null}
    </div>
  );
};

export default Custom;
