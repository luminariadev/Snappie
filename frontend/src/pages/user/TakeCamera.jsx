import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import UploadPhotoPopup from "../../components/user/UploadPhotoPopup.jsx";
import FilterOptions from "../../components/user/FilterOptions";

export default function TakeCamera() {
  const location = useLocation();
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const delay = Number(location.state?.delay) || 3;
  const photosCount = Number(location.state?.photoMode) || 3;

  const [countdown, setCountdown] = useState(0);
  const [capturedImages, setCapturedImages] = useState([]);
  const [isCounting, setIsCounting] = useState(false);
  const [selectFilterOpen, setSelectFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("normal");
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const startCountdown = () => {
    if (capturedImages.length >= photosCount) return;
    setCountdown(delay);
    setIsCounting(true);
  };

  const filterStyles = {
    normal: "none",
    mono: "grayscale(100%) contrast(1)",
    sepia: "sepia(70%) contrast(1) brightness(1.1)",
    soft: "brightness(1.1) blur(1px) contrast(0.9) saturate(1.4)",
    pop: "saturate(2) contrast(1) brightness(1.1)",
    retro: "contrast(1.1) sepia(0.7) saturate(0.8) hue-rotate(-10deg)",
  };

  useEffect(() => {
    if (!isCounting) return;
    if (countdown <= 0) {
      const video = webcamRef.current?.video;
      const canvas = canvasRef.current;
      if (!video || !canvas) return;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.filter = filterStyles[selectedFilter] || "none";
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const filteredImage = canvas.toDataURL("image/jpeg");
      setCapturedImages((prev) => {
        if (prev.length >= photosCount) return prev;
        return [...prev, filteredImage];
      });
      setIsCounting(false);
      return;
    }
    const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, isCounting, photosCount, selectedFilter]);

  const btnBase =
    "font-press text-xs px-6 sm:px-8 py-3 sm:py-4 rounded-full text-black font-bold border-[2.5px] border-black shadow-lg hover:scale-105 active:scale-95 transition-all";

  return (
    <div
      className="min-h-screen w-full flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-10 bg-cover bg-center bg-no-repeat py-8 px-4 sm:px-6"
      style={{ backgroundImage: "url(/webImage/Camera.png)" }}
    >
      <div className="relative w-full max-w-[95%] sm:max-w-[500px] lg:max-w-[700px] xl:max-w-[800px] bg-white rounded-2xl lg:rounded-[28px] shadow-2xl border-[2.5px] border-black overflow-hidden">
        <div className="bg-snappiePink w-full px-4 sm:px-6 py-3 border-b-2 border-black relative flex items-center justify-center">
          <div className="absolute left-4 sm:left-6 flex gap-2 sm:gap-3">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#E30C10] shadow-lg shadow-black/40" />
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-snappieBlue shadow-lg shadow-black/40" />
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#28BB45] shadow-lg shadow-black/40" />
          </div>
          <h3
            className="font-press text-lg sm:text-xl font-bold text-snappieYellow2 tracking-wider"
            style={{ WebkitTextStroke: "0.5px black", textShadow: "1px 1px 3px #000" }}
          >
            SNAPPIE
          </h3>
        </div>

        <div className="bg-snappieYellow2 mx-4 sm:mx-6 mt-4 sm:mt-6 h-[250px] sm:h-[350px] lg:h-[420px] rounded-xl sm:rounded-2xl border-[2.5px] border-black flex items-center justify-center relative overflow-hidden">
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full h-full object-cover rounded-lg sm:rounded-xl"
            videoConstraints={{ facingMode: "user" }}
            style={{ filter: filterStyles[selectedFilter] }}
          />
          {isCounting && countdown > 0 && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white text-6xl sm:text-7xl font-bold drop-shadow-xl">
                {countdown}
              </span>
            </div>
          )}
        </div>

        <div className="font-press text-xs w-full flex flex-wrap justify-center items-center gap-4 sm:gap-8 py-4 sm:py-6 px-4">
          <button className={btnBase + " bg-snappieGreen"} onClick={() => setIsUploadOpen(true)}>
            UPLOAD
          </button>

          {!isCounting && capturedImages.length < photosCount && (
            <button
              onClick={startCountdown}
              className="w-14 h-14 sm:w-16 sm:h-16 bg-red-600 rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all border-2 border-black"
              aria-label="Ambil foto"
            >
              <img src="/webImage/icon-camera.png" alt="" className="w-6 sm:w-7" />
            </button>
          )}

          {isCounting && (
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-red-400 rounded-full flex items-center justify-center shadow-xl border-2 border-black animate-pulse">
              <span className="text-white font-bold text-lg">{countdown}</span>
            </div>
          )}

          <button
            onClick={() => setSelectFilterOpen(!selectFilterOpen)}
            className={btnBase + (selectFilterOpen ? " bg-snappieYellow1" : " bg-snappieYellow2")}
          >
            {selectFilterOpen ? "CLOSE" : "EFFECTS"}
          </button>
        </div>

        {selectFilterOpen && (
          <div className="px-4 sm:px-6 pb-6">
            <FilterOptions
              selected={selectedFilter}
              onSelect={(f) => { setSelectedFilter(f); setSelectFilterOpen(false); }}
            />
          </div>
        )}
      </div>

      <div className="w-full max-w-[95%] sm:max-w-[260px] flex flex-row lg:flex-col gap-3 sm:gap-4 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 items-start lg:items-center">
        {Array.from({ length: photosCount }).map((_, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[140px] sm:w-[220px] h-[80px] sm:h-[120px] bg-white border-[2.5px] border-black rounded-xl sm:rounded-2xl shadow-xl overflow-hidden flex items-center justify-center"
          >
            {capturedImages[i] ? (
              <img src={capturedImages[i]} alt={"Foto " + (i + 1)} className="w-full h-full object-cover" />
            ) : (
              <div className="opacity-30 text-xs sm:text-sm font-semibold font-press text-center px-2">
                YOUR PHOTOS
              </div>
            )}
          </div>
        ))}
        <button
          disabled={capturedImages.length < photosCount}
          onClick={() => navigate("../edit-frame", { state: { photos: capturedImages } })}
          className={
            "font-press w-full lg:w-auto mt-0 lg:mt-4 px-12 sm:px-20 py-3 rounded-full font-bold border-[2.5px] border-black shadow-lg transition-all " +
            (capturedImages.length < photosCount
              ? "bg-snappieGreen text-black cursor-not-allowed opacity-60"
              : "bg-snappieYellow1 text-black hover:scale-105 active:scale-95")
          }
        >
          NEXT
        </button>
      </div>

      <UploadPhotoPopup
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUpload={(img) => {
          setCapturedImages((prev) => {
            if (prev.length >= photosCount) return prev;
            return [...prev, img];
          });
        }}
      />

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
