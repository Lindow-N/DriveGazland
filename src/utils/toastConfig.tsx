import { toast } from "react-toastify";
import Image from "next/image";
import { getRandomMessage } from "./helper";
import { successMessages, errorMessages } from "./toastMessages";

export const showSuccessToast = (message: string | null = null) => {
  const toastMessage = message || getRandomMessage(successMessages);
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
          src="/images/toast/success-icon.png"
          alt="Success"
          layout="intrinsic"
          width={75}
          height={75}
        />
      </div>
      <span className="flex-grow text-left ml-3" style={{ color: "#ffffff" }}>
        {toastMessage}
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

// Fonction pour afficher un toast d'erreur
export const showErrorToast = (message: string | null = null) => {
  const toastMessage = message || getRandomMessage(errorMessages); // Utiliser le message fourni ou un message aléatoire
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
          src="/images/toast/error-icon.png"
          alt="Error"
          layout="intrinsic"
          width={75}
          height={75}
        />
      </div>
      <span className="flex-grow text-left ml-3" style={{ color: "#ffffff" }}>
        {toastMessage}
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

// Fonction pour afficher un toast "mock"
export const showMockToast = (message: string | null = null) => {
  const toastMessage = message || "Ceci est un toast moqueur ! 😜"; // Un message par défaut si aucun n'est fourni
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
          src="/images/toast/mock-icon.png"
          alt="Mock"
          layout="intrinsic"
          width={75}
          height={75}
        />
      </div>
      <span className="flex-grow text-left ml-3" style={{ color: "#ffffff" }}>
        {toastMessage}
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

export const showAchievementToast = (achievement: any) => {
  const toastMessage = `Succès débloqué: ${achievement.name}`;
  const imageSrc = `/images/success/${achievement.id}.png`; // Utilisation de l'ID pour charger l'image

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
          src={imageSrc} // Image du succès basée sur l'ID
          alt={achievement.name}
          layout="intrinsic"
          width={75}
          height={75}
        />
      </div>
      <span className="flex-grow text-left ml-3" style={{ color: "#ffffff" }}>
        {toastMessage}
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
