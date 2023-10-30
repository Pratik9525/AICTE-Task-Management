import { IonToast } from "@ionic/react";
import { createContext, useState } from "react";

export const ToastContext = createContext();

export default function ToastContextProvider({ children }) {
  const [toast, setToast] = useState({ message: "", open: false });

  return (
    <ToastContext.Provider value={{ setToast }}>
      {children}
      <IonToast
        isOpen={toast.open}
        onDidDismiss={() => setToast({ open: false })}
        message={toast.message}
        duration={1500}
        color="dark"
      />
    </ToastContext.Provider>
  );
}
