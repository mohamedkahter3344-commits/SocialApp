import * as z from "zod";

const registerValidationSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "Full name must be at least 2 characters")
      .max(50, "Full name must be at most 50 characters"),
    username: z.string().trim().regex(/^[a-z0-9_]{3,30}$/, "Invalid username"),
    email: z.string().email("Invalid Email"),
    dateOfBirth: z
      .string()
      .nonempty("dateOfBirth is required")
      .refine((value) => {
        const selectedDate = new Date(value).getFullYear();
        const currentDate = new Date().getFullYear();

        return currentDate - selectedDate >= 18;
      }, ">=18"),
    gender: z.enum(["male", "female"], { message: "select a gender" }),
    password: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Please enter a valid password",
      ),
    rePassword: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Please enter a valid rePassword",
      ),
  })
  .refine(
    (data) => {
      return data.password === data.rePassword;
    },
    { message: "rePassword is not equal Password", path: ["rePassword"] },
  );

  export type RegisterFormSchema =  z.infer<typeof registerValidationSchema>

  export default registerValidationSchema;

