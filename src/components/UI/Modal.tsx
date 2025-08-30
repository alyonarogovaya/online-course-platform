import {
  cloneElement,
  createContext,
  useContext,
  useState,
  type ReactNode,
  type ReactElement,
  type ButtonHTMLAttributes,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import { useOutsideClick } from "../../hooks/useOutsideClick";

type ModalContextType = {
  openName: string;
  open: (name: string) => void;
  close: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

type ModalProps = {
  children: ReactNode;
};

function Modal({ children }: ModalProps) {
  const [openName, setOpenName] = useState<string>("");

  const close = () => setOpenName("");
  const open = (name: string) => setOpenName(name);

  useEffect(() => {
    if (openName) {
      const originalStyle = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [openName]);

  return (
    <ModalContext.Provider value={{ close, open, openName }}>
      {children}
    </ModalContext.Provider>
  );
}

type ClickableElement = ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>;

type OpenProps = {
  children: ClickableElement;
  opens: string;
};

function Open({ children, opens }: OpenProps) {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("Modal.Open must be used within Modal");
  const { open } = ctx;

  return cloneElement(children, {
    onClick: () => open(opens),
  });
}

type WindowChildProps = {
  onCloseModal: () => void;
};

type WindowProps = {
  children: ReactElement<WindowChildProps>;
  name: string;
};

function Window({ children, name }: WindowProps) {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("Modal.Window must be used within Modal");
  const { openName, close } = ctx;
  const ref = useOutsideClick<HTMLDivElement>(close);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed inset-0 z-[1000] bg-black/30 backdrop-blur-sm transition-all">
      <div
        ref={ref}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                   bg-white rounded-2xl shadow-xl p-12 transition-all relative max-w-3xl"
      >
        <button
          onClick={close}
          className="absolute top-4 right-5 p-1 rounded-md transition 
                     hover:bg-gray-100"
        >
          <HiXMark className="w-6 h-6 text-gray-500" />
        </button>

        <div className="">{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
