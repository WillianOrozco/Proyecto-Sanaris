"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Activity, CreditCard, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ROLES = ["Médico", "Enfermero", "Administrador"];
const DOC_TYPES = ["Cédula de ciudadanía", "Cédula de extranjería", "Pasaporte"];

export default function CompletarPerfil() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [form, setForm] = useState({ tipoDoc: "", numeroDoc: "", rol: "" });
  const [loading, setLoading] = useState(false);

  const userId = searchParams.get("user_id");
  const state = searchParams.get("state");

  useEffect(() => {
    // Si no hay parámetros de Auth0, no es un redirect válido
    if (!userId || !state) {
      router.replace("/");
    }
  }, [userId, state]);

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/completar-perfil", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, form, state }),
      });

      if (!res.ok) throw new Error("Error guardando perfil");

      const { continueUrl } = await res.json();
      window.location.href = continueUrl;
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  if (!userId || !state) return null;

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "hsl(220, 20%, 10%)" }}>
      <div className="w-full max-w-md space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">SANARIS</span>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white">Completa tu perfil</h2>
          <p className="text-white/60 mt-2">Necesitamos algunos datos adicionales para continuar</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label className="text-white/80">Tipo de documento</Label>
            <select value={form.tipoDoc} onChange={e => update("tipoDoc", e.target.value)}
              className="w-full h-12 px-3 rounded-md border border-white/20 bg-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/30" required>
              <option value="" className="bg-gray-900">Selecciona un tipo</option>
              {DOC_TYPES.map(t => <option key={t} value={t} className="bg-gray-900">{t}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Número de documento</Label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <Input placeholder="1234567890" value={form.numeroDoc}
                onChange={e => update("numeroDoc", e.target.value)}
                className="pl-10 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/30" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Rol en la Clínica Siloé</Label>
            <select value={form.rol} onChange={e => update("rol", e.target.value)}
              className="w-full h-12 px-3 rounded-md border border-white/20 bg-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/30" required>
              <option value="" className="bg-gray-900">Selecciona tu rol</option>
              {ROLES.map(r => <option key={r} value={r} className="bg-gray-900">{r}</option>)}
            </select>
          </div>
          <Button type="submit" disabled={loading} className="w-full h-12 font-semibold text-base gap-2">
            {loading ? "Guardando..." : (<>Continuar <ArrowRight className="w-4 h-4" /></>)}
          </Button>
        </form>
      </div>
    </div>
  );
}