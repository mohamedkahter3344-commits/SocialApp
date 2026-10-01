import * as z from "zod";

const loginValidationSchema = z
  .object({
  
    email: z.string().email("Invalid Email"),
      password: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Please enter a valid password",
      ),
   
  })
  

  export type LoginFormSchema =  z.infer<typeof loginValidationSchema>

  export default loginValidationSchema;