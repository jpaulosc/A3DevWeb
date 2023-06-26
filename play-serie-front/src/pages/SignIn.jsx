import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "../components/Button";
import FormGroup from "../components/FormGroup";
import AuthCard from "../components/AuthCard";
import { useErrors } from "../hooks/useError";
import isEmailValid from "../utils/isEmailValid";
import { useAuth } from "../context/manageAuthContext"

function SignIn() {
  const [email, setEmail] = useState("gabriel_jorge13@hotmail.com.br");
  const [password, setPassword] = useState("1212");
  const [checkboxRegister, setCheckboxRegister] = useState(false);
  const [checkboxRecoverPassword, setCheckboxRecoverPassword] = useState(false);
  const { setError, removeError, getErrorMessageByFieldName } = useErrors();
  const formIsValid = email && password.length > 0;

  const navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();


  async function handleSubmit(e) {
    e.preventDefault();

    let formData = new FormData(e.currentTarget);
    let email = formData.get("email");
    let password = formData.get("password");

    const from = location.state?.from?.pathname || "/home";

    const res = auth.signin([email, password], () => {
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.

      navigate(from, { replace: true });
    });

    if (res.error) {
      setError({
        field: "E-mail",
        message: "E-mail/Senha estão incorretas"
      });
      setError({
        field: "Password",
        message: "E-mail/Senha estão incorretas"
      });
    }
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
    if (e.target.value && !isEmailValid(e.target.value)) {
      setError({
        field: "E-mail",
        message: "Digite um e-mail válido"
      });
    } else {
      removeError("E-mail");
    }
  }

  return (
    <AuthCard onSubmit={handleSubmit}>
      <FormGroup error={getErrorMessageByFieldName("E-mail")} className="flex w-full flex-col">
        <label className="text-md font-medium mb-1">E-mail</label>
        <input name="email" placeholder="Digite seu E-mail" value={email} onChange={handleChangeEmail} className="input" />
      </FormGroup>
      <FormGroup error={getErrorMessageByFieldName("Password")} className="flex flex-col w-full">
        <label className="text-md font-medium mb-1">Senha</label>
        <input name="password" type="password" placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)} className="input" />
      </FormGroup>
      <FormGroup>
        <Link to="/sign-up" className={`flex gap-3 items-center ${checkboxRegister ? " cursor-pointer" : ""}`}>
          <input type="checkbox" value={checkboxRegister} onChange={(e) => setCheckboxRegister(e.target.checked)} className="w-5 h-5" />
          <span className={`font-bold flex items-center gap-2 mb-1 ${checkboxRegister ? " font-medium" : "pointer-events-none font-normal opacity-90"}`}>
            Registre-se
          </span>
        </Link>
        <Link to="/forgot-password" className={`flex gap-3 items-center ${checkboxRecoverPassword ? " cursor-pointer" : ""}`}>
          <input type="checkbox" value={checkboxRecoverPassword} onChange={(e) => setCheckboxRecoverPassword(e.target.checked)} className="w-5 h-5" />
          <span className={`font-bold flex items-center gap-2 mb-1 ${checkboxRecoverPassword ? " font-medium" : "pointer-events-none font-normal opacity-90"}`}>
            Esqueci minha senha
          </span>
        </Link>
      </FormGroup>
      <Button isValid={formIsValid} type="submit" className="mt-2">
        Entrar
      </Button>
    </AuthCard>
  );
}

export default SignIn;
