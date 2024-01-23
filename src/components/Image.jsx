import React from "react";

const Image = (props) => {
  const { name, image } = props;
  return (
    <>
      <img src={image} alt={name} />;
    </>
  );
};
export default Image;
