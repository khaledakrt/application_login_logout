import Header from "@/components/Header";
import RegisterForm from "./register-form";

export default async function RegisterPage() {
  // await new Promise((resolve) => {
  //   setTimeout(resolve, 1000);
  // });
  return (
    <>
      <Header />
      <section className="py-8 bg-ct-blue-600 min-h-screen grid place-items-center">
        <div className="w-full">
          <h1 className="text-2xl xl:text-6xl text-center font-[600] text-ct-yellow-600 mb-3">
            Welcome !
          </h1>
          
          <RegisterForm />
        </div>
      </section>
    </>
  );
}
