import { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Mousewheel, Pagination } from "swiper";
import { useRouter } from "next/router";
import Navbar from "../../components/molecules/NavBar";
import { AppUiContext } from "../../Context";
import { BackButton } from "../../components/atoms/Icons";
import { Mobile } from "../../components/utils/Breakpoints";

export default function Search() {
  const router = useRouter();
  const [, dispatch] = useContext(AppUiContext);
  const goBackfromSearch = () => {
    router.back();
  };
  const toggleMobileSearchTab = (target) => {
    dispatch({ type: "focused-mobile-search-tab", payload: target });
  };
  SwiperCore.use([Mousewheel, Pagination]);

  return (
    <Navbar>
      <Mobile>
        <div className="flex flex-row m-3 justify-start">
          <BackButton
            className=" h-8 text-gray-200 self-center w-auto"
            onClick={goBackfromSearch}
          />
          <div className="w-11/12 text-xl text-gray-200 self-center font-inter font-medium">
            <div className="flex align-text-top">
              This is the title this is the title
            </div>
          </div>
        </div>

        <div className="bg-yellow-500">
          <Swiper
            spaceBetween={1}
            slidesPerView={1}
            mousewheel
            pagination={{ dynamicBullets: true }}
          >
            <SwiperSlide>
              <div className="bg-yellow-400 aspect-w-12 aspect-h-15 z-0" />
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-blue-400 aspect-w-12 aspect-h-15" />
            </SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
          </Swiper>
        </div>
        <div className="text-gray-300 self-center font-light font-inter text-sm p-3.5 ">
          This is the description This is the descriptionThis is the
          descriptionThis is the descripti onThis is the descriptionThis is the
          descriptionThis is the desc riptionThis is the descriptionThis is the
          description This is the description This is the descriptionTn his is
          the descriptionThis is the descript ionThis is the descriptionThis is
          the descriptionTh nis is the descriptionThis is the descriptionThis is
          the description
        </div>
      </Mobile>
    </Navbar>
  );
}
