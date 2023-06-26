import { useState } from "react";
import FormGroup from "../components/FormGroup";
import Button from "../components/Button";
import { useErrors } from "../hooks/useError";
import isEmailValid from "../utils/isEmailValid";
import { UserService } from "../services/UserService";
import { toast } from "react-toastify";
import AuthCard from "../components/AuthCard";

function SignUp() {
  const { errors, setError, removeError, getErrorMessageByFieldName } = useErrors();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const formIsValid = (email && name && lastName && password.length > 0 && errors.length === 0);

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

  async function handleSubmitRegister() {

    const formData = {
      name,
      lastName,
      email,
      password
    };

    const request = JSON.stringify(formData);

    try {
      await UserService.create(request);
      toast("Conta criada com sucesso", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (err) {
      console.log(err.response);
    }
  }

  return (
    <AuthCard backBtn={true} title="Cadastro">
      <FormGroup error={getErrorMessageByFieldName("E-mail")} className="flex w-full flex-col">
        <label>E-mail</label>
        <input type="text" value={email} onChange={handleChangeEmail} placeholder="Digite seu e-mail" className="input" />
      </FormGroup>
      <FormGroup className="flex w-full flex-col">
        <label>Nome</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Digite seu primeiro nome" className="input" />
      </FormGroup>
      <FormGroup className="flex w-full flex-col">
        <label>Último nome</label>
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Digite seu último nome" className="input" />
      </FormGroup>
      <FormGroup className="flex w-full flex-col">
        <label>Senha</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Digite sua senha" className="input" />
      </FormGroup>
      <Button onClick={handleSubmitRegister} isValid={formIsValid}>
        Cadastrar
      </Button>
    </AuthCard>
  );
}

export default SignUp;
