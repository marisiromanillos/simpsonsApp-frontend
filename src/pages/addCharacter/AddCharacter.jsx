import { useState } from "react";

const AddCharacter = () => {
  const [characterName, setCharacterName] = useState();
  const [characterQuote, setCharacterQuote] = useState();
  const [characterDirection, setCharacterDirection] = useState();
  return (
    <>
      <div>
        <div>
          {/* add name    */}
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="name"
            placeholder="Character"
          />
          {/* add quote    */}
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="quote"
            placeholder="Quote"
          />
          {/* add direction    */}
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="direction"
            placeholder="Direction"
          />
        </div>
      </div>
    </>
  );
};

export default AddCharacter;
