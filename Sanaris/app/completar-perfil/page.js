"use client";

import { Suspense } from "react";
import CompletarPerfilForm from "../CompletarPerfilForm";

export default function Page() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <CompletarPerfilForm />
    </Suspense>
  );
}