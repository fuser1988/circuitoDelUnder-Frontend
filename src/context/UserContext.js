import React, { useReducer, useEffect } from "react";

let reducer = (user, newUser) => {
  if (newUser === null) {
    localStorage.removeItem("user");
    return initialState;
  }
  return { ...user, ...newUser };
};

const initialState = null;

const localState = JSON.parse(localStorage.getItem("user"));

const UserContext = React.createContext();

function UserProvider(props) {
  const [user, setUser] = useReducer(reducer, localState || initialState);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
