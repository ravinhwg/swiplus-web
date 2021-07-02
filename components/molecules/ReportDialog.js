/* eslint-disable react/jsx-props-no-spreading */
import { useContext, useState } from "react";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import createReport from "../../apiPlugs/report";
import { FlagIcon } from "../atoms/Icons";
import { AppUiContext } from "../../Context";

export default function ReportDialogBox(props) {
  const [reportText, setReportText] = useState("");
  const [state] = useContext(AppUiContext);
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const changeText = (text) => {
    setReportText((previousReportText) => previousReportText + text);
  };
  const sendReportMutation = useMutation(createReport, {
    onSuccess: async () => {
      setSuccess(true);
    },
  });
  const sendReport = () => {
    sendReportMutation.mutate({
      reportDescription: reportText,
      reportType: props.type,
      reportEntity: props.id,
      token: state.user.accessToken,
    });
  };
  return (
    <div className="antialiased text-gray-900 font-sans overflow-x-hidden">
      <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
        <div className="bg-gray-800 rounded-lg md:max-w-xl  p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
          <div className="md:flex items-center">
            <div className="rounded-full border border-gray-500 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
              <FlagIcon className="text-gray-500 h-10 w-10" />
            </div>
            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
              {success ? (
                <>
                  <div>
                    <p className="font-bold text-gray-50">
                      Thank you for letting us know!
                    </p>
                    <div className="text-sm text-gray-200 mt-1 max-w-md ">
                      We will keep you updated through email
                    </div>
                    <div className="text-center md:text-right mt-4 md:flex md:justify-end">
                      <button
                        type="button"
                        onClick={() => props.dialogChanger()}
                        className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-indigo-200 text-indigo-800 rounded-lg font-semibold text-sm mt-4
                  md:mt-0 md:order-1"
                      >
                        close
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <p className="font-bold text-gray-50">
                      Report this {props.type}
                    </p>
                  </div>
                  <div className="text-sm text-gray-200 mt-1 max-w-md ">
                    <ul className=" w-full flex h-10 overflow-scroll">
                      <li className="mr-3">
                        <button
                          type="button"
                          onClick={() => changeText("Adult Content. ")}
                          className="inline-block text-xs rounded py-1  bg-blue w-32 bg-gray-600"
                          href="#"
                        >
                          Adult Content
                        </button>
                      </li>
                      <li className="mr-3">
                        <button
                          type="button"
                          onClick={() =>
                            changeText("Disrespectful and offensive Content. ")
                          }
                          className="inline-block text-xs rounded py-1  bg-blue w-64 bg-gray-600"
                        >
                          Disrespectful and offensive Content
                        </button>
                      </li>
                      <li className="mr-3">
                        <button
                          type="button"
                          onClick={() => changeText(" Violence and Gore. ")}
                          className="inline-block text-xs rounded py-1  bg-blue w-32 bg-gray-600"
                        >
                          Violence and Gore
                        </button>
                      </li>
                      <li className="mr-3">
                        <button
                          type="button"
                          onClick={() =>
                            changeText(" Dangerous Organizations. ")
                          }
                          className="inline-block text-xs rounded py-1  bg-blue w-48 bg-gray-600"
                        >
                          Dangerous Organizations
                        </button>
                      </li>
                    </ul>
                  </div>
                  <form onSubmit={handleSubmit(() => sendReport())}>
                    <div className=" text-red-500  p-2 rounded-md text-sm text-left w-full">
                      {errors.report?.type === "required" &&
                        "Comment text is required"}
                      {errors.report?.type === "minLength" &&
                        "Comment has to be more than one character long"}
                      {errors.report?.type === "maxLength" &&
                        "Comment has to be less than 500 characters"}
                    </div>
                    <textarea
                      rows="5"
                      {...register("report", {
                        required: true,
                        maxLength: 1040,
                        minLength: 3,
                      })}
                      value={reportText}
                      onChange={(e) => setReportText(e.target.value)}
                      placeholder="Tell us a bit about why you decided to report"
                      className="bg-gray-600 mb-4  border-2 border-transparent rounded-xl w-full py-2 px-4 text-gray-100 font-inter leading-tight focus:outline-none  focus:border-blue-600"
                    />
                    <div className="text-center md:text-right mt-4 md:flex md:justify-end">
                      <button
                        type="submit"
                        className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-indigo-700 text-white rounded-lg font-semibold text-sm md:ml-2 md:order-2"
                      >
                        Report
                      </button>
                      <button
                        type="button"
                        onClick={() => props.dialogChanger()}
                        className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-indigo-200 text-indigo-800 rounded-lg font-semibold text-sm mt-4
                      md:mt-0 md:order-1"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
