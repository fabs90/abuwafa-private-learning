import FormLogin from "@/components/login/FormLogin";
import "../../components/login/formLogin.css";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen mx-6 md:mx-0 lg:mx-0">
      <FormLogin />
    </div>
  );
}
