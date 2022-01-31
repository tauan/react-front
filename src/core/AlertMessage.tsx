import { useEffect, useState } from "react";

export default function AlertMessage(props: IMessage) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    toogleMessage();
  }, [props.message]);

  const toogleMessage = () => {
    if (props.message) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, props.duration ?? 5000);
    }
  };

  return (
    <>
      {show && props.message ? (
        <div
          className={
            props?.type === "success"
              ? "alertMessage success"
              : "alertMessage error"
          }
        >
          {props.message ? props.message : "Sem mensagem"}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

interface IMessage {
  message: string;
  type?: "error" | "success" | "gray";
  duration?: number;
}
