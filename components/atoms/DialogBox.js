import PropTypes from "prop-types";

export default function DialogBox({
  dialogCloser,
  dialogDescription,
  dialogSubmit,
  dialogTitle,
  submitText,
}) {
  return (
    <div className="antialiased text-gray-900 font-sans overflow-x-hidden">
      <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
        <div className="bg-gray-800 rounded-lg md:max-w-xl  p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
          <div className="md:flex items-center">
            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
              <div>
                <p className="font-bold text-gray-50">{dialogTitle}</p>
              </div>
              <div className="text-sm text-gray-200 mt-1 max-w-md ">
                {dialogDescription}
              </div>
              <div className="text-center md:text-right mt-4 md:flex md:justify-end">
                <button
                  type="submit"
                  onClick={() => dialogSubmit()}
                  className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-indigo-700 text-white rounded-lg font-semibold text-sm md:ml-2 md:order-2"
                >
                  {submitText}
                </button>
                <button
                  type="button"
                  onClick={() => dialogCloser()}
                  className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-indigo-200 text-indigo-800 rounded-lg font-semibold text-sm mt-4
                      md:mt-0 md:order-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

DialogBox.propTypes = {
  dialogTitle: PropTypes.string,
  dialogDescription: PropTypes.string,
  submitText: PropTypes.string,
  dialogSubmit: PropTypes.func,
  dialogCloser: PropTypes.func,
};
