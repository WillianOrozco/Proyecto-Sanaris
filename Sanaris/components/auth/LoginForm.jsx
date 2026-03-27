"use client";
import { useState } from "react";
import { Activity, Lock, Mail, Eye, EyeOff, ArrowRight, User, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ROLES = ["Médico", "Enfermero", "Administrador"];
const DOC_TYPES = ["Cédula de ciudadanía", "Cédula de extranjería", "Pasaporte"];

const LeftPanel = () => (
  <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden"
    style={{ background: "linear-gradient(160deg, hsl(215, 65%, 18%), hsl(215, 55%, 30%), hsl(175, 40%, 35%))" }}>
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-accent blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-secondary blur-3xl" />
    </div>
    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
          <Activity className="w-6 h-6 text-white" />
        </div>
        <span className="text-2xl font-bold text-white tracking-tight">SANARIS</span>
      </div>
      <p className="text-white/60 text-sm mt-1">Sistema de Gestión Hospitalaria</p>
    </div>
    <div className="relative z-10 space-y-6">
      <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight">
        Gestión de espacios<br />
        <span className="text-white/70">en tiempo real</span>
      </h1>
      <p className="text-white/70 text-lg max-w-md leading-relaxed">
        Administra la disponibilidad de camas, salas de cirugía y consultorios con información actualizada al instante.
      </p>
      <div className="flex gap-8 pt-4">
        {[{ value: "98%", label: "Precisión" }, { value: "24/7", label: "Monitoreo" }, { value: "+500", label: "Espacios" }].map((stat) => (
          <div key={stat.label}>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-white/50 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
    <p className="relative z-10 text-white/40 text-xs">© 2026 SANARIS — Clínica Siloé</p>
  </div>
);

export default function LoginForm() {
  const [mode, setMode] = useState("login");
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    nombre: "", email: "", password: "",
    tipoDoc: "", numeroDoc: "", rol: ""
  });

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleLogin = (e) => {
    e.preventDefault();
    window.location.href = '/auth/login';
  };

  const handleStep1 = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleStep2 = (e) => {
    e.preventDefault();
    window.location.href = `/auth/login?screen_hint=signup&login_hint=${form.email}`;
  };

  const handleGoogle = () => {
    window.location.href = '/auth/login?connection=google-oauth2';
  };

  const handleGoogleStep2 = (e) => {
    e.preventDefault();
    window.location.href = '/auth/login?connection=google-oauth2';
  };

  return (
    <div className="min-h-screen flex">
      <LeftPanel />
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-background overflow-y-auto">
        <div className="w-full max-w-md space-y-8 py-8">

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">SANARIS</span>
          </div>

          {/* LOGIN */}
          {mode === "login" && (
            <>
              <div>
                <h2 className="text-3xl font-bold text-foreground">Bienvenido</h2>
                <p className="text-muted-foreground mt-2">Ingresa tus credenciales para continuar</p>
              </div>
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label>Correo electrónico</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input type="email" placeholder="tu@hospital.com" value={form.email}
                      onChange={e => update("email", e.target.value)}
                      className="pl-10 h-12 bg-muted/50" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input type={showPassword ? "text" : "password"} placeholder="••••••••"
                      value={form.password} onChange={e => update("password", e.target.value)}
                      className="pl-10 pr-10 h-12 bg-muted/50" required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button type="button" onClick={() => window.location.href = '/auth/login?forgot=true'} className="text-sm text-muted-foreground hover:text-foreground font-medium">
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
                <Button type="submit" className="w-full h-12 font-semibold text-base gap-2">
                  Iniciar sesión <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-3 text-muted-foreground">o continuar con</span>
                </div>
              </div>
              <Button type="button" variant="outline" onClick={handleGoogle} className="w-full h-12 gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continuar con Google
              </Button>
              <Button type="button" variant="outline" onClick={() => window.location.href = '/auth/login?connection=facebook'} className="w-full h-12 gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Continuar con Facebook
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                ¿No tienes cuenta?{" "}
                <button type="button" onClick={() => { window.location.href = '/auth/login?screen_hint=signup'; }}
                  className="text-foreground hover:text-foreground/80 font-semibold underline">
                  Regístrate
                </button>
              </p>
            </>
          )}

          {/* REGISTRO PASO 1 */}
          {mode === "register" && step === 1 && (
            <>
              <div>
                <h2 className="text-3xl font-bold text-foreground">Crear cuenta</h2>
                <p className="text-muted-foreground mt-2">Paso 1 de 2 — Datos de acceso</p>
              </div>
              <form onSubmit={handleStep1} className="space-y-5">
                <div className="space-y-2">
                  <Label>Nombre completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Juan Pérez" value={form.nombre}
                      onChange={e => update("nombre", e.target.value)}
                      className="pl-10 h-12 bg-muted/50" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Correo electrónico</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input type="email" placeholder="tu@hospital.com" value={form.email}
                      onChange={e => update("email", e.target.value)}
                      className="pl-10 h-12 bg-muted/50" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input type={showPassword ? "text" : "password"} placeholder="••••••••"
                      value={form.password} onChange={e => update("password", e.target.value)}
                      className="pl-10 pr-10 h-12 bg-muted/50" required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full h-12 font-semibold text-base gap-2">
                  Continuar <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
              <p className="text-center text-sm text-muted-foreground">
                ¿Ya tienes cuenta?{" "}
                <button type="button" onClick={() => setMode("login")}
                  className="text-foreground hover:text-foreground/80 font-semibold underline">
                  Inicia sesión
                </button>
              </p>
            </>
          )}

          {/* PASO 2 — PERFIL */}
          {step === 2 && (
            <>
              <div>
                <h2 className="text-3xl font-bold text-foreground">Tu perfil</h2>
                <p className="text-muted-foreground mt-2">
                  {mode === "google" ? "Un último paso para completar tu cuenta" : "Paso 2 de 2 — Información del perfil"}
                </p>
              </div>
              <form onSubmit={mode === "google" ? handleGoogleStep2 : handleStep2} className="space-y-5">
                {mode === "google" && (
                  <div className="space-y-2">
                    <Label>Nombre completo</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input placeholder="Juan Pérez" value={form.nombre}
                        onChange={e => update("nombre", e.target.value)}
                        className="pl-10 h-12 bg-muted/50" required />
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  <Label>Tipo de documento</Label>
                  <select value={form.tipoDoc} onChange={e => update("tipoDoc", e.target.value)}
                    className="w-full h-12 px-3 rounded-md border border-input bg-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-ring" required>
                    <option value="">Selecciona un tipo</option>
                    {DOC_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Número de documento</Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="1234567890" value={form.numeroDoc}
                      onChange={e => update("numeroDoc", e.target.value)}
                      className="pl-10 h-12 bg-muted/50" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Rol en la Clínica Siloé</Label>
                  <select value={form.rol} onChange={e => update("rol", e.target.value)}
                    className="w-full h-12 px-3 rounded-md border border-input bg-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-ring" required>
                    <option value="">Selecciona tu rol</option>
                    {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <Button type="submit" className="w-full h-12 font-semibold text-base gap-2">
                  Completar registro <ArrowRight className="w-4 h-4" />
                </Button>
                <button type="button" onClick={() => { setStep(1); setMode("register"); }}
                  className="w-full text-center text-sm text-muted-foreground hover:text-foreground">
                  ← Volver
                </button>
              </form>
            </>
          )}

        </div>
      </div>
    </div>
  );
}