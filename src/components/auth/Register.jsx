import React, { useTransition } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../schemas/authSchema";
import { toast } from "react-hot-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { googleLogin, register } from "@/redux/slices/authSlice";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { Separator } from "../ui/separator";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isPending, startTransition] = useTransition();

  const from = location.state?.from?.pathname || "/";

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data) => {
    startTransition(async () => {
      try {
        const { confirmPassword:_, ...userData } = data;
        await dispatch(register(userData))
          .unwrap()
          .then(() => {
            toast.success("Register successful");
            navigate("/login");
          })
          .catch((error) => {
            toast.error("Register failed");
            console.log(error);
          });
      } catch (error) {
        toast.error("Register failed");
        console.log(error);
      }
    });
  };

  const handleGoogleSuccess = (credentialResponse) => {
    try {
      dispatch(googleLogin({ tokenId: credentialResponse.credential }))
        .unwrap()
        .then(() => {
          toast.success("Login successful");
          navigate(from, { replace: true });
        })
        .catch((error) => {
          toast.error("Login failed");
          console.log(error);
        });
    } catch (error) {
      toast.error("Login failed");
      console.log(error);
    }
  };

  const handleGoogleError = () => {
    console.log("Google login failed");
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader className="flex flex-col items-center justify-between">
        <CardTitle className="text-2xl font-bold">Register</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Register to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap
            />
          </GoogleOAuthProvider>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        placeholder="Enter your name"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        {...field}
                        placeholder="abc@gmail.com"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        placeholder="********"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        placeholder="********"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isPending}
                className="w-full mt-4"
              >
                {isPending ? "Registering..." : "Register"}
              </Button>
            </div>
          </form>
          </Form>
          </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default Register;
