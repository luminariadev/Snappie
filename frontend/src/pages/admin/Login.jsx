import { useState } from "react";
import { useNavigate } from "react-router-dom";

import tvLeft from "../../assets/tv/left.png";
import tvRight from "../../assets/tv/right.png";
import bgLogin from "../../assets/tv/bg-LoginAdmin.png";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Login gagal");
        return;
      }
      localStorage.setItem("admin_token", data.token);
      localStorage.setItem("admin_data", JSON.stringify(data.admin));
      navigate("/admin/frame");
    } catch {
      setErrorMsg("Terjadi kesalahan server");
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: "url(" + bgLogin + ")" }}
    >
      <div className="scale-[0.75] md:scale-[0.9] lg:scale-[1] transition-all duration-300 flex justify-center items-center">
        <div className="relative w-[1440px] h-[1024px] bg-[#1C1C1C] rounded-[80px] flex justify-center items-center overflow-visible shadow-2xl">
          <img src={tvLeft} alt="" className="absolute bottom-[400px] left-[150px] w-[330px] rotate-[-14deg] drop-shadow-[0_18px_32px_rgba(0,0,0,0.45)] z-[10] hidden xl:block" />
          <img src={tvRight} alt="" className="absolute bottom-[210px] right-[30px] w-[550px] rotate-[6deg] drop-shadow-[0_18px_32px_rgba(0,0,0,0.45)] z-[50] hidden xl:block" />

          <form onSubmit={handleLogin}
            className="relative w-[800px] h-[620px] bg-white rounded-[35px] border-[4px] border-black flex flex-col items-center"
          >
            <div className="w-full h-[150px] bg-snappiePink rounded-t-[30px] border-b-[4px] border-black flex flex-col items-center justify-center">
              <h1 className="font-pixel text-[72px] text-snappieYellow2 drop-shadow-[4px_4px_0px_#000]">SNAPPIE</h1>
              <p className="font-pixel text-black text-[20px]">Login Admin</p>
            </div>

            <div className="w-[95%] sm:w-[760px] h-[415px] bg-snappieYellow2 mt-[10px] rounded-[25px] border-[3px] border-black flex flex-col items-center justify-center gap-8 px-4">
              {errorMsg && <p className="text-red-600 font-pixel text-[18px]">{errorMsg}</p>}

              <input type="text" placeholder="NAMA AKUN" value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full max-w-[435px] h-[68px] rounded-full border-[3px] border-black text-center font-pixel text-[20px] bg-white" required />

              <input type="password" placeholder="PASSWORD" value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full max-w-[435px] h-[68px] rounded-full border-[3px] border-black text-center font-pixel text-[20px] bg-white" required />

              <button type="submit"
                className="w-full max-w-[394px] h-[62px] rounded-full border-[3px] border-black font-pixel text-[22px] bg-[#A7DA70] shadow-[0_5px_0_#000] hover:brightness-95 active:translate-y-[2px] transition-all">
                MASUK
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
