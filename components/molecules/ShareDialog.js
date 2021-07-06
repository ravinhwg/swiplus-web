/* eslint-disable react/jsx-props-no-spreading */
import {
  FacebookShareButton,
  FacebookIcon,
  RedditIcon,
  RedditShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterIcon,
  EmailIcon,
  PinterestIcon,
  PinterestShareButton,
  EmailShareButton,
  TwitterShareButton,
} from "react-share";
import PropTypes from "prop-types";
import { Share } from "../atoms/Icons";

export default function ShareDialogBox({ url, title, media, closeDialogBox }) {
  return (
    <div className="antialiased text-gray-900 font-sans overflow-x-hidden overflow-y-hidden">
      <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
        <div className="bg-gray-800 rounded-lg md:max-w-xl  p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
          <div className="md:flex items-center">
            <div className="rounded-full border border-gray-500 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
              <Share className="text-gray-500 h-10 w-10" />
            </div>
            <div className="mt-4 md:mt-0 sm:ml-6 text-center md:text-left">
              <>
                <div className="m-4 p-4">
                  <p className="font-bold text-gray-50 text-2xl">Share</p>
                </div>
                <div className="text-sm  text-gray-200 max-w-md justify-center px-5 md:justify-left ">
                  <input
                    className="bg-gray-600 border-2 m-1 w-full border-transparent rounded-xl h-10 py-2 px-2 text-gray-100 font-inter leading-tight focus:outline-none  focus:border-blue-600"
                    id="inline-deck-title"
                    type="text"
                    value={`${url}?utm_source=linkbox&utm_medium=sharebutton&utm_campaign=deck_share`}
                  />
                </div>
                <div className="text-sm flex text-gray-200 mt-1 w-full justify-center overflow-scroll  ">
                  <div className=" sm:ml-0 ml-36 m-3 flex flex-col justify-between items-center">
                    <FacebookShareButton
                      url={`${url}?utm_source=facebook&utm_medium=sharebutton&utm_campaign=deck_share`}
                      quote={title}
                    >
                      <FacebookIcon size={42} round />
                    </FacebookShareButton>
                    facebook
                  </div>
                  <div className="m-3 flex flex-col justify-between items-center">
                    <TwitterShareButton
                      url={`${url}?utm_source=twitter&utm_medium=sharebutton&utm_campaign=deck_share`}
                      title={title}
                    >
                      <TwitterIcon size={42} round />
                    </TwitterShareButton>
                    Twitter
                  </div>
                  <div className="m-3 flex flex-col justify-between items-center">
                    <WhatsappShareButton
                      url={`${url}?utm_source=whatsapp&utm_medium=sharebutton&utm_campaign=deck_share`}
                      title={title}
                    >
                      <WhatsappIcon size={42} round />
                    </WhatsappShareButton>
                    WhatsApp
                  </div>
                  <div className="m-3 flex flex-col justify-between items-center">
                    <RedditShareButton
                      url={`${url}?utm_source=reddit&utm_medium=sharebutton&utm_campaign=deck_share`}
                      title={title}
                      windowWidth={660}
                      windowHeight={460}
                      className="Demo__some-network__share-button"
                    >
                      <RedditIcon size={42} round />
                    </RedditShareButton>
                    Reddit
                  </div>
                  <div className="m-3 flex flex-col justify-between items-center">
                    <PinterestShareButton
                      url={`${url}?utm_source=pinterest&utm_medium=sharebutton&utm_campaign=deck_share`}
                      media={media}
                      className="Demo__some-network__share-button"
                    >
                      <PinterestIcon size={42} round />
                    </PinterestShareButton>
                    Pinterest
                  </div>
                  <div className="m-3 flex flex-col justify-between items-center">
                    <EmailShareButton
                      url={`${url}?utm_source=email&utm_medium=sharebutton&utm_campaign=deck_share`}
                      subject={title}
                      body="body"
                      className="Demo__some-network__share-button"
                    >
                      <EmailIcon size={42} round />
                    </EmailShareButton>
                    Email
                  </div>
                </div>
                <div className="m-3 flex flex-col items-right">
                  <button
                    type="button"
                    onClick={closeDialogBox}
                    className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-indigo-200 text-indigo-800 rounded-lg font-semibold text-sm mt-4
                      md:mt-0 md:order-1"
                  >
                    Cancel
                  </button>
                </div>
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ShareDialogBox.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
  media: PropTypes.string,
  closeDialogBox: PropTypes.func,
};
