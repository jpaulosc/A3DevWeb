import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/button/Button";
import FormGroup from "../components/formGroup/FormGroup";
import { useErrors } from "../hooks/useError";
import isEmailValid from "../utils/isEmailValid";
import logo from "../assets/images/logo.svg";
import Wrapper from "../components/container/Wrapper";
import { useAuth } from "../context/manageAuthContext";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkboxRegister, setCheckboxRegister] = useState(false);
  const [checkboxRecoverPassword, setCheckboxRecoverPassword] = useState(false);
  const { setError, removeError, getErrorMessageByFieldName } = useErrors();
  const auth = useAuth();
  const navigate = useNavigate();
  const formIsValid = email && password.length > 0;

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

  useEffect(() => {
    if (auth.status === "authenticated") {
      navigate("/home");
    }
  }, [auth.status, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await auth.signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });
      if (!res.error) {
        window.location.href = "/home";
      }

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
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleSubmit} className=" bg-[#cc3434] w-screen h-screen flex flex-col items-center justify-center">
      <Wrapper className="bg-[#FDECEC] rounded-lg flex items-center flex-col w-[300px] md:w-[400px] p-7 gap-2">
        <img src={logo} width={170} height={170} alt="Logo do site" />
        <FormGroup error={getErrorMessageByFieldName("E-mail")} className="flex w-full flex-col mb-3">
          <label className="text-md font-medium mb-1">E-mail</label>
          <input placeholder="Digite seu E-mail" defaultValue={email} onChange={handleChangeEmail} className="input" />
        </FormGroup>
        <FormGroup error={getErrorMessageByFieldName("Password")} className="flex flex-col w-full mb-5">
          <label className="text-md font-medium mb-1">Senha</label>
          <input type="password" placeholder="Digite sua senha" defaultValue={password} onChange={(e) => setPassword(e.target.value)} className="input" />
        </FormGroup>
        <FormGroup className="w-full">
          <div role="button" className="flex gap-3 items-center" onClick={() => navigate("/signUp")}>
            <input type="checkbox" defaultValue={checkboxRegister} onChange={(e) => setCheckboxRegister(e.target.checked)} className="w-5 h-5" />
            <div to="/signUp" className={`font-bold flex items-center gap-2 mb-1 ${checkboxRegister ? " cursor-pointer font-medium" : "pointer-events-none font-normal opacity-90"}`}>
              Registre-se
            </div>
          </div>
          <div role="button" className="flex gap-3 items-center" onClick={() => navigate("/forgotPassword")}>
            <input type="checkbox" defaultValue={checkboxRecoverPassword} onChange={(e) => setCheckboxRecoverPassword(e.target.checked)} className="w-5 h-5" />
            <div to="/forgot-password" className={`font-bold flex items-center gap-2 mb-1 ${checkboxRecoverPassword ? " cursor-pointer font-medium" : "pointer-events-none font-normal opacity-90"}`}>
              Esqueci minha senha
            </div>
          </div>
        </FormGroup>
        <Button isValid={formIsValid} type="submit">
          Entrar
        </Button>
      </Wrapper>
    </form>
  );
}
