import { Button, Input, Spinner, Typography } from "@heroui/react";
import axios, { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { useNavigate } from "react-router-dom";
import loginValidationSchema, {
  type LoginFormSchema,
} from "../../schema/LoginSchema";
import type { LoginTypeData } from "../../interface/logininterface";
import { useContext } from "react";
import { tokenContext } from "../../Context/TokenContext/TokenContext";

const Login = () => {
  const navigate = useNavigate();
  const { saveUserToken }: any = useContext(tokenContext);
  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields, isValid, isSubmitting },
    // watch,
  } = useForm<LoginFormSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
    resolver: zodResolver(loginValidationSchema),
  });

  async function signin(values: LoginTypeData) {
    try {
      const { data } = await axios.post(
        "https://route-posts.routemisr.com/users/signin",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log(data);
      toast.success(data?.message);
      saveUserToken(data.data.token);
      navigate("/");
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
          onSubmit={handleSubmit(signin)}
          className="w-[70%] mx-auto   shadow-2xl p-7 my-7 rounded space-y-3"
        >
          <Typography
            type="h2"
            className=" text-center font-extrabold text-blue-700"
          >
            Login
          </Typography>

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
                Login
              </>
            )}
          </Button>
        </form>
      </div>
    </>
  );
};

export default Login;
