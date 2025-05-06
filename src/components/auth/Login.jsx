import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { googleLogin, login } from "@/redux/slices/authSlice";
import { Separator } from "../ui/separator";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isPending, startTransition] = useTransition();

  const from = location.state?.from?.pathname || "/";

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    startTransition(async () => {
      try {
        await dispatch(login(data))
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
  }

  const handleGoogleError = () => {
    console.log("Google login failed");
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader className="flex flex-col items-center justify-between">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Login to your account
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
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full mt-4"
                >
                  {isPending ? "Logging in..." : "Login"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary">
            Register
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default Login;
