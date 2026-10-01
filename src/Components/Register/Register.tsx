import { Button, Input, Spinner, Typography } from "@heroui/react";
import axios, { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import type { TypeData } from "../../interface/Interface";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import registerValidationSchema, {
  type RegisterFormSchema,
} from "../../schema/schema";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields, isValid, isSubmitting },
    // watch,
  } = useForm<RegisterFormSchema>({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      dateOfBirth: "",
      gender: "male",
      password: "",
      rePassword: "",
    },
    mode: "all",
    resolver: zodResolver(registerValidationSchema),
  });

  async function signup(values: TypeData) {
    try {
      const { data } = await axios.post(
        "https://route-posts.routemisr.com/users/signup",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log(data);
      toast.success(data?.message);
      navigate("/login");
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Somthing Went Wrong");
      }
    }
  }
  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center">
        <form
          onSubmit={handleSubmit(signup)}
          className="w-[70%] mx-auto shadow-2xl p-7 my-7 rounded space-y-3"
        >
          <Typography
            type="h2"
            className=" text-center font-extrabold text-blue-700"
          >
            Register Form
          </Typography>

          {/* name */}
          <Input
            {...register("name")}
            type="text"
            id="name"
            fullWidth
            aria-label="name"
            placeholder="Enter Your name"
            variant="secondary"
          />

          {touchedFields?.name && errors.name && (
            <p className="text-red-600 font-extrabold text-sm mb-2">
              {errors?.name.message}
            </p>
          )}

          {/* username */}
          <Input
            {...register("username")}
            type="text"
            id="username"
            fullWidth
            aria-label="username"
            placeholder="Enter Your username"
            variant="secondary"
          />
          {touchedFields?.username && errors.username && (
            <p className="text-red-600 font-extrabold text-sm mb-2">
              {errors?.username.message}
            </p>
          )}

          {/* Email */}
          <Input
            {...register("email")}
            type="email"
            id="email"
            fullWidth
            aria-label="email"
            placeholder="Enter Your Email"
            variant="secondary"
          />
          {touchedFields?.email && errors.email && (
            <p className="text-red-600 font-extrabold text-sm mb-2">
              {errors?.email.message}
            </p>
          )}

          {/* Password */}
          <Input
            {...register("password")}
            type="password"
            id="password"
            fullWidth
            aria-label="password"
            placeholder="Enter Your Password"
            variant="secondary"
          />

          {touchedFields?.password && errors.password && (
            <p className="text-red-600 font-extrabold text-sm mb-2">
              {errors?.password.message}
            </p>
          )}
          {/* rePassword */}
          <Input
            {...register("rePassword")}
            type="password"
            id="rePassword"
            fullWidth
            aria-label="repassword"
            placeholder="Enter Your rePassword"
            variant="secondary"
          />
          {touchedFields?.rePassword && errors.rePassword && (
            <p className="text-red-600 font-extrabold text-sm mb-2">
              {errors?.rePassword.message}
            </p>
          )}

          {/* dateOfBirth */}
          <Input
            {...register("dateOfBirth")}
            type="date"
            id="dateOfBirth"
            fullWidth
            aria-label="dateOfBirth"
            variant="secondary"
          />

          {touchedFields?.dateOfBirth && errors.dateOfBirth && (
            <p className="text-red-600 font-extrabold text-sm mb-2">
              {errors?.dateOfBirth.message}
            </p>
          )}

          {/* Gender */}

          <div className="space-x-4">
            <input
              {...register("gender")}
              type="radio"
              name="gender"
              id="male"
              value="male"
            />
            <label htmlFor="male">Male</label>

            <input
              {...register("gender")}
              type="radio"
              name="gender"
              id="female"
              value="female"
            />
            <label htmlFor="female">Female</label>
            {touchedFields?.gender && errors.gender && (
              <p className="text-red-600 font-extrabold text-sm mb-2">
                {errors?.gender.message}
              </p>
            )}
          </div>

          <Button
            isPending={isSubmitting}
            isDisabled={!isValid}
            type="submit"
            fullWidth
            className="font-extrabold transition-all hover:translate-y-1 duration-500 rounded bg-blue-800"
          >
            {({ isPending }) => (
              <>
                {isPending ? <Spinner color="current" size="sm" /> : null}
                Create New Account
              </>
            )}
          </Button>
        </form>
      </div>
    </>
  );
};

export default Register;

/*

/name/

{
  required: {
    value: true,
    message: "name is required",
  },
  pattern: {
    value: /^[A-Za-z ]{5,50}$/,
    message: "Invalid Name",
  },
}

/username/

 {
  required: {
    value: true,
    message: "username is required",
  },
  pattern: {
    value: /^[a-z0-9_]{3,30}$/,
    message: "Invalid username",
  },
}

/Email/



{
  required: {
    value: true,
    message: "email is required",
  },
  pattern: {
    value: /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/,
    message: "Please enter a valid email",
  },
}

/Password/


{
  required: {
    value: true,
    message: "password is required",
  },
  pattern: {
    value:
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    message: "Please enter a valid password",
  },
}

/rePassword/ 


{
  required: {
    value: true,
    message: "rePassword is required",
  },
  validate: (value: string) => {
    return value === watch("password")
      ? true
      : "The rePassword is not equal password";
  },
}

/Date Of Birth/


{
  required: {
    value: true,
    message: "dateOfBirth is required",
  },
  validate: (value) => {
    const selectedDate = new Date(value).getFullYear();
    const currentDate = new Date().getFullYear();

    return (currentDate - selectedDate) >= 18 ? true : ">=18";
  },
}

/Gender/


{
  required: {
    value: true,
    message: "gender is required",
  },
}





*/
