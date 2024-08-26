// src/utils/toastConfig.js
import { toast } from "react-toastify";
import Image from "next/image";

export const showSuccessToast = (message) => {
  toast.success(
    <div className="flex items-center">
      <div
        style={{
          width: "75px",
          height: "75px",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Image
          src="/images/success-icon.png"
          alt="Success"
          layout="intrinsic"
          width={75}
          height={75}
        />
      </div>
      <span className="flex-grow text-left ml-3" style={{ color: "#ffffff" }}>
        {message}
      </span>
    </div>,
    {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      icon: false,
      style: { backgroundColor: "#1C7B47", color: "#ffffff" },
    }
  );
};

export const showErrorToast = (message) => {
  toast.error(
    <div className="flex items-center">
      <div
        style={{
          width: "75px",
          height: "75px",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Image
          src="/images/error-icon.png"
          alt="Error"
          layout="intrinsic"
          width={75}
          height={75}
        />
      </div>
      <span className="flex-grow text-left ml-3" style={{ color: "#ffffff" }}>
        {message}
      </span>
    </div>,
    {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      icon: false,
      style: { backgroundColor: "#D62839", color: "#ffffff" },
    }
  );
};

export const showMockToast = (message) => {
  toast.error(
    <div className="flex items-center">
      <div
        style={{
          width: "75px",
          height: "75px",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Image
          src="/images/mock-icon.png"
          alt="Mock"
          layout="intrinsic"
          width={75}
          height={75}
        />
      </div>
      <span className="flex-grow text-left ml-3" style={{ color: "#ffffff" }}>
        {message}
      </span>
    </div>,
    {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      icon: false,
      style: { backgroundColor: "#FAA613", color: "#ffffff" },
    }
  );
};
