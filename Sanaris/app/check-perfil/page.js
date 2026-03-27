"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CheckPerfil() {
  const router = useRouter();

  useEffect(() => {
    async function check() {
      try {
        const res = await fetch("/auth/profile");
        if (!res.ok) {
          router.replace("/");
          return;
        }
        const user = await res.json();

        if (user.user_metadata?.perfil_completo) {
          router.replace("/dashboard");
        } else {
          router.replace("/completar-perfil");
        }
      } catch {
        router.replace("/");
      }
    }
    check();
  }, []);

  return <p className="text-center mt-20 text-muted-foreground">Cargando...</p>;
}