import { useState, createContext, useContext, useEffect } from "react";

const AuthContext = createContext(null);

const hasAccessToken = () => window.localStorage.getItem('accessToken') !== null

export function AuthProvider({ children }) {

  const [usera, setUser] = useState(null);
  const [member, setMember] = useState(null);
  const [isLogged, setLogged] = useState(hasAccessToken())
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const storedToken = window.localStorage.getItem('accessToken')
    if (storedToken) {
      const userData = JSON.parse(window.localStorage.getItem('userData'))
      setMember({ ...userData })
    }
    setLoading(false)
  }, [])

  let signin = async (newUser, callback) => {
    const [email, password] = newUser

    const res = await fetch("http://localhost:3001/login", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password
      }),
      headers: { "Content-Type": "application/json" }
    });
    const data = await res.json();
    const userData = {
      id: data.user.id,
      name: data.user.name,
      isAdmin: data.user.isAdmin,
    }
    setMember({ ...userData })
    window.localStorage.setItem('accessToken', res.token)
    window.localStorage.setItem('userData', JSON.stringify(userData))
    if (res.ok && data) {
      callback();
    }
    return res
  };

  let signout = (callback) => {
    setUser(null);
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem('accessToken')
    callback();
  };

  const value = { member, isLoading, isLogged, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

