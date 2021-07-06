import React from "react";
import PropTypes from "prop-types";

export default function Button({ text }) {
  return (
    <button
      type="button"
      className="bg-indigo-700 focus:outline-none  p-1.5 px-8 rounded-lg text-white text-sm font-inter font-bold hover:bg-indigo-500"
    >
      {text}
    </button>
  );
}
Button.propTypes = {
  text: PropTypes.string,
};
