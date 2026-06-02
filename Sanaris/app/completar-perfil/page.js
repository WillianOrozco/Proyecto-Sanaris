"use client";

import { Suspense } from "react";
import CompletarPerfilForm from "../CompletarPerfilForm.js";

export default function Page() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <CompletarPerfilForm />
    </Suspense>
  );
}