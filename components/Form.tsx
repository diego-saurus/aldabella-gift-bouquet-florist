import React, {
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import CheckSvg from "svg/check-box.svg"
import EyeOpen from "svg/eye_open.svg"
import EyeClose from "svg/eye_close.svg"
import ArrowSvg from "svg/east_black_24dp.svg"

export interface Values {
  [key: string]: string | number | boolean
}

interface FormProps {
  initialValues: Values
  onSubmit: (e: Values) => void
}

interface ValuesContextGeneric {
  values?: Values
  changeValue?: (key: string, val: string | number | boolean) => void
}

const ValuesContext = React.createContext<ValuesContextGeneric>({})

const Form: React.FC<FormProps> = ({ children, initialValues, onSubmit }) => {
  const [values, setValues] = useState(initialValues)

  const changeValue = (key: string, val: string | number | boolean) => {
    if (!Object.prototype.hasOwnProperty.call(values, key)) return
    setValues((p) => ({ ...p, [key]: val }))
  }

  return (
    <ValuesContext.Provider value={{ values, changeValue }}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit(values)
        }}
      >
        {children}
      </form>
    </ValuesContext.Provider>
  )
}

const FormSubmit: React.FC<{ className?: string }> = ({ children }) => {
  return (
    <button className="w-full my-4 text-black px-6 py-4 rounded-2xl flex justify-center bg-gold-lightest">
      <span className="font-bold self-center">{children}</span>
      <ArrowSvg />
    </button>
  )
}

interface FormControlProps {
  label: string
  type?: React.HTMLInputTypeAttribute
  placeholder?: string
  strict?: boolean
}

const FormControl: React.FC<FormControlProps> = ({
  label,
  type,
  placeholder,
  strict,
}) => {
  const { changeValue } = useContext(ValuesContext)

  const handleChange = (e: React.FocusEvent<HTMLInputElement>) => {
    changeValue(label.toLowerCase(), e.target.value)
  }

  return (
    <div className="flex flex-col my-4">
      <label className="mx-3 mb-1" htmlFor={label.toLowerCase()}>
        {label}
      </label>
      <div className="relative bg-gradient-to-r from-black to-black p-[0.15rem] rounded-2xl hover:from-gold-lightest hover:to-gold">
        {type !== "password" ? (
          <input
            className="w-full bg-black-light text-sm px-6 py-4 rounded-2xl focus:outline-none placeholder-white placeholder-opacity-40 focus:bg-gradient-to-r from-black to-black-light"
            type={type}
            placeholder={placeholder}
            onChange={handleChange}
            id={label.toLowerCase()}
            name={label.toLowerCase()}
          />
        ) : (
          <PasswordInput
            placeholder={placeholder}
            label={label}
            onChange={handleChange}
          />
        )}
        {strict && <CheckSvg className="absolute top-3.5 right-6" />}
      </div>
    </div>
  )
}

const PasswordInput: React.FC<
  { onChange: React.ChangeEventHandler<HTMLInputElement> } & FormControlProps
> = ({ placeholder, label, onChange }) => {
  const [show, setShow] = useState(true)
  const eyeRef = useRef<HTMLDivElement>(null)

  const toggleEye = () => {
    setShow((p) => !p)
  }

  const handleOnFocus = () => {
    eyeRef.current.classList.remove("hidden")
  }

  return (
    <>
      <input
        className={`w-full bg-black-light text-sm px-6 py-4 rounded-2xl focus:outline-none placeholder-white placeholder-opacity-40 focus:bg-gradient-to-r from-black to-black-light pass`}
        placeholder={placeholder}
        id={label.toLowerCase()}
        type={show ? "password" : "text"}
        onFocus={handleOnFocus}
        onChange={onChange}
        name={label.toLowerCase()}
      />
      <div
        onClick={toggleEye}
        className="absolute top-4 right-7 hidden"
        ref={eyeRef}
      >
        {!show ? <EyeOpen className="h-6" /> : <EyeClose className="h-6" />}
      </div>
    </>
  )
}

export { Form, FormControl, FormSubmit }
