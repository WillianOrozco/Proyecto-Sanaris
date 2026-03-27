import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import Crud from "@/components/crud/crud.jsx";

export default async function Users() {

  return <Crud />;
}