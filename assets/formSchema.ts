import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

export const schema = yup.object({
    email: yup
        .string()
        .email("Insira um email válido")
        .required("O email é obrigatório"),
    password: yup
        .string()
        .min(6, "A senha precisa ter pelo menos 6 dígitos")
        .required("A senha é obrigatória"),
    confirm: yup
    .string()
    .required("É preciso confirmar a senha")
    .oneOf([yup.ref("password")], "As senhas devem ser iguais")
})

export const confirmSchema = yup.object({
    name: yup
        .string()
        .required("Seu nome é obrigatório"),
    lastname: yup
        .string()
        .required("Seu sobrenome é obrigatório"),
    bio: yup
    .string()
    .required("Escreva algo sobre você")
})