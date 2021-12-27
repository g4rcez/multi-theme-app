import { useCallback, useMemo, useRef, useState } from "react";
import { RiCloseLine, RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import MaskInput, { InputProps, InputTypes } from "the-mask-input";
import { OmitKeys } from "../../typings/utility";

type Props = OmitKeys<InputProps, "name" | "id" | "value"> & {
  id: string;
  value?: string;
  clear?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, unmasked?: string) => void;
};

const getInputType = (type: InputTypes | undefined, viewPassword: boolean): InputTypes => {
  if (type === "password") {
    return viewPassword ? "text" : "password";
  }
  return type ?? "text";
};

const getDataPassword = (type: InputTypes | undefined, viewPassword: boolean) => {
  if (type === "password") {
    return viewPassword ? "open" : "close";
  }
  return undefined;
};

export const Input: React.VFC<Props> = ({ className = "", clear = false, ...props }) => {
  const input = useRef<HTMLInputElement>(null);
  const [viewPassword, setViewPassword] = useState(false);

  const togglePassword = useCallback(() => setViewPassword((p) => !p), []);

  const inputType = useMemo(
    () => ({
      type: getInputType(props.type, viewPassword),
      password: getDataPassword(props.type, viewPassword),
    }),
    [viewPassword, props.type]
  );

  const onClearInput = useCallback(() => {
    if (input.current) {
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set?.call(input.current, props.defaultValue ?? "");
      input.current.dispatchEvent(new Event("input", { bubbles: true }));
    }
  }, [props.defaultValue]);

  return (
    <div className="input-container">
      <MaskInput
        {...props}
        ref={input}
        type={inputType.type}
        className={`input ${className}`}
        data-password={inputType.password}
        data-close={clear ? "true" : "false"}
      />
      <div className="input-label">
        <label htmlFor={props.id}>{props.placeholder}</label>
      </div>
      <div className="input-icons">
        <button onClick={togglePassword} className="input-eyes-icon" tabIndex={props.type !== "password" ? -1 : undefined}>
          <RiEyeLine className="input-eye-open-icon" aria-hidden="true" />
          <RiEyeCloseLine className="input-eye-close-icon" aria-hidden="true" />
        </button>
        <button onClick={onClearInput} className="input-close-icon">
          <RiCloseLine aria-hidden="true" />
        </button>
      </div>
      <div className="input-underline" aria-hidden="true" />
    </div>
  );
};
