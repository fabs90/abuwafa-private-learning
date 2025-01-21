import FormLogin from "@/components/login/FormLogin";
import "../../components/login/formLogin.css";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen mx-6 md:mx-0 lg:mx-0">
      <Suspense>
        <FormLogin />
      </Suspense>
    </div>
  );
}
