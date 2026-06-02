"use client";

import { Suspense } from "react";
import CompletarPerfilForm from "./completarPerfilForm";

export default function Page() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <CompletarPerfilForm />
    </Suspense>
  );
}