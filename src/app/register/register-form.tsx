"use client";

import {
  RegisterUserInput,
  RegisterUserSchema,
} from "@/lib/validations/user.schema";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { apiRegisterUser } from "@/lib/api-requests";
import FormInput from "@/components/FormInput";
import Link from "next/link";
import { LoadingButton } from "@/components/LoadingButton";
import useStore from "@/store";
import { handleApiError } from "@/lib/helpers";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const store = useStore();
  const router = useRouter();

  const methods = useForm<RegisterUserInput>({
    resolver: zodResolver(RegisterUserSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  async function RegisterUserFunction(credentials: RegisterUserInput) {
    store.setRequestLoading(true);
    try {
      const user = await apiRegisterUser(JSON.stringify(credentials));
      role: credentials.role // ou directement le rôle sélectionné
      store.setAuthUser(user);
      return router.push("/login");
    } catch (error: any) {
      if (error instanceof Error) {
        handleApiError(error);
      } else {
        toast.error(error.message);
        console.log("Error message:", error.message);
      }
    } finally {
      store.setRequestLoading(false);
    }
  }

  const onSubmitHandler: SubmitHandler<RegisterUserInput> = (values) => {
    RegisterUserFunction(values);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="max-w-md w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-2xl p-8 space-y-2"
      >
        <FormInput label="Nom et prénom" name="name" />
        <FormInput label="Email" name="email" type="email" />
        <FormInput label="Mot de passe" name="password" type="password" />
        
        

        <FormInput
          label="Confirmer mot de passe"
          name="passwordConfirm"
          type="password"
        />
        <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />
        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
          <span className="text-white">Role</span>
        
          </label>
          <select
            id="role"
            role="role"
            className="mt-1 block w-full p-2 border rounded-md"
            {...methods.register("role")}
          >
            <option value="student">Etudiant</option>
            <option value="teacher">Enseignant</option>
          </select>
        </div>
        <LoadingButton
          loading={store.requestLoading}
          textColor="text-ct-blue-600"
        >
          Register
        </LoadingButton>
      </form>
    </FormProvider>
  );
}
