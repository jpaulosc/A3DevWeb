import { useState, createContext, useContext, useEffect } from "react";

const AuthContext = createContext(null);
const isLogged = window.localStorage.getItem('accessToken') !== null

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(isLogged ? "authenticated": "")

  useEffect(() => {
    const storedToken = window.localStorage.getItem('accessToken')
    if (storedToken) {
      const userData = JSON.parse(window.localStorage.getItem('userData'))
      setUser({ ...userData })
    } else {
      setStatus("")
    }
  }, [])

  const signIn = async (newUser, callback) => {
    const [email, password] = newUser

    const res = await fetch("http://localhost:3001/login", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password
      }),
      headers: { "Content-Type": "application/json" }
    });
    const user = await res.json();
    // If no error and we have user data, return it
    if (res.ok && user) {
      const user = await res.json();
      setUser({ ...user })

      window.localStorage.setItem('accessToken', data.token)
      window.localStorage.setItem('userData', JSON.stringify(user))
      callback()
      return res;
    }

    // Caso contrário, lance um erro
    throw new Error(user?.message ?? "Falha ao autenticar usuário");
  };

  const signOut = (callback) => {
    setUser(null);
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem('accessToken')
    callback();
  };

  const data = {
    user: user
  }

  const value = { data, status, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

