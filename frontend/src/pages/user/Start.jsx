import { useState } from "react";
import { useNavigate } from "react-router-dom";

import HeaderImage from "../../components/user/HeaderImage";
import SelectDelay from "../../components/user/SelectDelay";
import SelectPhotoMode from "../../components/user/SelectPhotoMode";
import StartButton from "../../components/user/StartButton";

export default function Start() {
  const navigate = useNavigate();

  const [delay, setDelay] = useState(3);
  const [photoMode, setPhotoMode] = useState(4);

  const handleStart = () => {
    navigate("take-photo", {
      state: {
        delay: delay,
        photoMode: photoMode,
      },
    });
  };

  return (
    <div className="min-h-screen w-full bg-snappieBlue flex flex-col items-center overflow-x-hidden relative">

      {/* HEADER */}
      <div className="w-full relative z-10">
        <HeaderImage />
      </div>

      {/* REVIEW CARD */}
      <div className="
        w-full max-w-[92%] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px]
        bg-white
        rounded-3xl sm:rounded-[32px]
        border-[3px] sm:border-[4px]
        border-black
        shadow-2xl
        overflow-hidden
        relative
        z-20
        -mt-[35vh] sm:-mt-[500px] md:-mt-[600px] lg:-mt-[700px]
        mx-auto
      ">

        {/* REVIEW BAR */}
        <div className="
          bg-snappiePink
          px-4 sm:px-6 py-3
          border-b-[3px] sm:border-b-[4px] border-black
          rounded-t-[28px]
          relative
          -mt-[3px]
        ">
          <h2 className="font-press text-lg sm:text-xl tracking-wide text-center sm:text-left">
            REVIEW
          </h2>
        </div>

        {/* YELLOW AREA - Photo strip preview */}
        <div className="
          bg-snappieYellow2
          mx-4 sm:mx-6 mt-6 mb-8 sm:mb-10
          rounded-2xl sm:rounded-3xl
          border-[3px] sm:border-[4px] border-black
          h-[250px] sm:h-[300px] md:h-[350px]
          relative overflow-hidden
        ">

          {/* STRIP FRAME */}
          <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-[120px] sm:-translate-x-[150px] rotate-[10deg]">
            <div className="bg-white w-[90px] sm:w-[120px] h-[230px] sm:h-[300px] border-[6px] sm:border-[10px] border-blue-500 rounded-lg shadow-xl overflow-hidden">
              <div className="grid grid-rows-4 gap-2 sm:gap-3 p-2 sm:p-3 h-full">
                <div className="bg-gray-200 rounded" />
                <div className="bg-gray-200 rounded" />
                <div className="bg-gray-200 rounded" />
                <div className="bg-gray-200 rounded" />
              </div>
            </div>
          </div>

          {/* POLAROID FRAME */}
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 translate-x-[30px] sm:translate-x-[50px] -rotate-[8deg]">
            <div className="bg-white w-[120px] sm:w-[150px] h-[150px] sm:h-[190px] border-[6px] sm:border-[10px] border-gray-500 rounded-lg shadow-xl">
              <div className="grid grid-cols-2 grid-rows-2 gap-2 sm:gap-3 p-2 sm:p-3 h-full">
                <div className="bg-gray-200 rounded" />
                <div className="bg-gray-200 rounded" />
                <div className="bg-gray-200 rounded" />
                <div className="bg-gray-200 rounded" />
              </div>
            </div>
          </div>

        </div>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 pb-6 sm:pb-8 px-4">
          <SelectDelay onChange={setDelay} />
          <StartButton onClick={handleStart} />
          <SelectPhotoMode onChange={setPhotoMode} />
        </div>
      </div>
    </div>
  );
}
