// routes.ts

// Importez les dépendances nécessaires
import { getErrorResponse } from "@/lib/helpers";
import { prisma } from "@/lib/prisma";
import {
  RegisterUserInput,
  RegisterUserSchema,
} from "@/lib/validations/user.schema";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

// Définissez la route de traitement du formulaire
export async function POST(req: NextRequest) {
  try {
    // Récupérez les données soumises via le formulaire
    const body = (await req.json()) as RegisterUserInput;
    const data = RegisterUserSchema.parse(body);

    // Hash du mot de passe
    const hashedPassword = await hash(data.password, 12);

    // Créez un nouvel utilisateur dans la base de données
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role,
        photo: data.photo, // Utilisez le chemin relatif vers l'image ici
      },
    });

    // Réponse réussie avec les données de l'utilisateur (sans le mot de passe)
    return new NextResponse(
      JSON.stringify({
        status: "success",
        data: { user: { ...user, password: undefined } },
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    // Gérez les erreurs spécifiques
    if (error instanceof ZodError) {
      return getErrorResponse(400, "échec des validations", error);
    }

    if (error.code === "P2002") {
      return getErrorResponse(409, "un utilisateur avec cet e-mail existe déjà");
    }

    // Erreur générique
    return getErrorResponse(500, error.message);
  }
}
