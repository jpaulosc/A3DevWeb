import { useState } from "react";
import FormGroup from "../components/FormGroup";
import Button from "../components/Button";
import AuthCard from "../components/AuthCard";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  return (
    <AuthCard backBtn={true} title="Recuperar Senha">
      <FormGroup className="flex w-full flex-col">
        <label>E-mail</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu e-mail" className="input" />
      </FormGroup>
      <Button isValid={email}>
        Enviar E-mail
      </Button>
    </AuthCard>
  );
}

export default ForgotPassword;
