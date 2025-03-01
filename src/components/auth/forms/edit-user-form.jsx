/* eslint-disable react/prop-types */
import { useState } from "react";
import { passwordSchema } from "../../../utils/validation";
import classes from "../scss/auth.module.scss";
import { Eye, EyeOff } from "lucide-react";


export default function UpdateUserForm({ setIsOpen, onSubmit, error, username, setUsername, password, setPassword }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    try {
      passwordSchema.validateSync(e.target.value);
      setValidationErrors({ ...validationErrors, password: undefined });
    } catch (error) {
      setValidationErrors({ ...validationErrors, password: error.message });
    }
  };

  const handleRepeatPasswordChange = (e) => {
    setRepeatPassword(e.target.value);
    if (e.target.value !== password) {
      setValidationErrors({
        ...validationErrors,
        repeatPassword: "Passwords do not match",
      });
    } else {
      setValidationErrors({
        ...validationErrors,
        repeatPassword: undefined,
      });
    }
  };

  const inputStyle = "input input-md w-full bg-white";
  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-col gap-2 my-4 justify-start text-gray-700 mx-2 font-medium text-sm">
        <div className={classes.modalGridForm}>
          <label htmlFor="username">Change Name (optional)</label>
          <input id="username" name="username" type="text" className={inputStyle} value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="off" required />
        </div>
        <div className={classes.modalGridForm}>
          <label htmlFor="password">Change Password</label>
          <div className="relative">
            <input type={showPassword ? "text" : "password"} name="password" id="password" className={inputStyle} value={password} onChange={handlePasswordChange} required />
            <button type="button" className="absolute right-3 top-2.5 text-gray-400 dark:text-gray-300" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
            {validationErrors.password ? <span className="text-rose-500 italic text-sm ml-1">{validationErrors.password}</span> : undefined}
          </div>
        </div>
        <div className={classes.modalGridForm}>
          <label htmlFor="confirmPassword">Confirm password</label>
          <div className="relative">
            <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" id="confirmPassword" className={inputStyle} value={repeatPassword} onChange={handleRepeatPasswordChange} required />
            <button type="button" className="absolute right-3 top-2.5 text-gray-400 dark:text-gray-300" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
            {validationErrors.repeatPassword ? <span className="text-rose-500 italic text-sm ml-1">{validationErrors.repeatPassword}</span> : undefined}
          </div>
        </div>
        <div className="error-messages text-rose-500 text-sm italic flex flex-col items-end justify-end">
          <p>{error}</p>
        </div>
        <div className="flex gap-2 justify-end">
          <button type="reset" onClick={() => setIsOpen(false)} className="px-4 py-1.5 rounded-lg mt-4 text-white bg-rose-500 border-none transition duration-150 ease-in-out hover:opacity-75">
            Close
          </button>
          <button type="submit" className="px-4 py-1.5 rounded-lg mt-4 text-white bg-green-500 border-none transition duration-150 ease-in-out hover:opacity-75">
            Save
          </button>
        </div>
      </form>
    </>
  );
}
