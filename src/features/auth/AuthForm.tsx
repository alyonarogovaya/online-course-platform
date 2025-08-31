import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { validateEmail, validatePassword } from "./validators";
import { Input } from "../../components/UI/Input";
import { submitAuth } from "./authSlice";
import type { AuthFormErrors } from "./types";
import Button from "../../components/UI/Button";

function AuthForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<AuthFormErrors>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    if (!validateEmail(email)) newErrors.email = "Invalid email format";
    if (!validatePassword(password)) newErrors.password = "Invalid password";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      dispatch(submitAuth({ email, password, mode: "login" }))
        .unwrap()
        .then(() => {
          navigate("/");
        })
        .catch((err) => setErrors({ email: err }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <Input
        type="email"
        label="Email"
        id="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
      />
      <div className="mb-4">
        <Input
          type="password"
          id="password"
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />
        <p className="text-gray-600 text-sm">Password must have at least 6 chars, one uppercase, one lowercase and one special symbol</p>
      </div>
      <Button type="submit">
        Login
      </Button>
    </form>
  );
};

export default AuthForm
