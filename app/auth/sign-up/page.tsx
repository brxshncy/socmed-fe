"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    User,
    Chrome,
    Github,
    Calendar,
} from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

const formSchema = z
    .object({
        firstName: z.string().min(2, {
            message: "First name must be atleast 2 characters",
        }),
        lastName: z.string().min(2, {
            message: "First name must be atleast 2 characters",
        }),
        email: z.string().email({
            message: "Invalid email address",
        }),

        dob: z.date().refine((dob) => {
            const today = new Date();
            let age = today.getFullYear() - dob.getFullYear();
            const monthDiff = today.getMonth() - dob.getMonth();
            const dayDiff = today.getDate() - dob.getDate();

            if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
                age--;
            }

            return age >= 18;
        }),
        password: z.string().min(3, {
            message: "Password must be atleast 3 characters",
        }),
        confirm_password: z.string().min(3, {
            message: "Confirm password must be at least 3 characters",
        }),
    })
    .refine((data) => data.password === data.confirm_password, {
        path: ["confirm_password"],
        message: "Passwords do not match",
    });

export default function SignupPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            dob: new Date(),
            password: "",
            confirm_password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
    };

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        dateOfBirth: "",
    });

    const handleSubmit = async (data: z.infer<typeof signUpSchema>) => {
        if (data.password !== data.confirm_password) {
            alert("Passwords don't match");
            return;
        }

        setIsLoading(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        console.log("Form data:", data);

        // Redirect to home page (mock)
        window.location.href = "/";

        setIsLoading(false);
    };

    const handleSocialSignup = (provider: string) => {
        console.log(`Sign up with ${provider}`);
        // Implement social signup logic
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-background p-4'>
            <div className='w-full max-w-md space-y-8'>
                {/* Logo and Brand */}
                <div className='text-center'>
                    <div className='mx-auto w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-4'>
                        <span className='text-primary-foreground font-bold text-2xl'>
                            S
                        </span>
                    </div>
                    <h1 className='text-3xl font-bold text-foreground'>
                        Join Social
                    </h1>
                    <p className='text-muted-foreground mt-2'>
                        Create your account and start connecting
                    </p>
                </div>

                {/* Signup Form */}
                <Card className='shadow-lg'>
                    <CardHeader className='space-y-1'>
                        <CardTitle className='text-2xl text-center'>
                            Create account
                        </CardTitle>
                        <CardDescription className='text-center'>
                            Fill in your details to get started
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(handleSubmit)}
                                className='space-y-4'
                            >
                                <div className='grid grid-cols-2 gap-3'>
                                    <FormField
                                        control={form.control}
                                        name='firstName'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='text-sm font-medium text-foreground'>
                                                    First Name
                                                </FormLabel>
                                                <FormControl>
                                                    <div className='relative'>
                                                        <User className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                                                        <Input
                                                            placeholder='First Name'
                                                            className='pl-10'
                                                            {...field}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='lastName'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='text-sm font-medium text-foreground'>
                                                    Last Name
                                                </FormLabel>
                                                <FormControl>
                                                    <div className='relative'>
                                                        <Input
                                                            placeholder='Last Name'
                                                            {...field}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <FormField
                                        control={form.control}
                                        name='email'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='text-sm font-medium text-foreground'>
                                                    Email
                                                </FormLabel>
                                                <FormControl>
                                                    <div className='relative'>
                                                        <Mail className='h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground' />
                                                        <Input
                                                            placeholder='Email'
                                                            className='pl-10'
                                                            {...field}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <FormField
                                        control={form.control}
                                        name='dob'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='text-sm font-medium text-foreground'>
                                                    Date of Birth
                                                </FormLabel>
                                                <FormControl>
                                                    <div className='relative'>
                                                        <Calendar className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                                                        <Input
                                                            type='date'
                                                            className='pl-10'
                                                            value={
                                                                field.value
                                                                    ? new Date(
                                                                          field.value
                                                                      )
                                                                          .toISOString()
                                                                          .split(
                                                                              "T"
                                                                          )[0]
                                                                    : ""
                                                            }
                                                            onChange={(e) =>
                                                                field.onChange(
                                                                    new Date(
                                                                        e.target.value
                                                                    )
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <FormField
                                        control={form.control}
                                        name='password'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='text-sm font-medium text-foreground'>
                                                    Password
                                                </FormLabel>
                                                <FormControl>
                                                    <div className='relative'>
                                                        <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                                                        <Input
                                                            className='pl-10 pr-10'
                                                            placeholder='Enter your password'
                                                            type={
                                                                showPassword
                                                                    ? "text"
                                                                    : "password"
                                                            }
                                                            {...field}
                                                        />
                                                        <Button
                                                            type='button'
                                                            onClick={() =>
                                                                setShowPassword(
                                                                    !showPassword
                                                                )
                                                            }
                                                            className='absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 bg-transparent hover:bg-transparent cursor-pointer'
                                                        >
                                                            {!showPassword ? (
                                                                <Eye className='h-4 w-4 text-muted-foreground' />
                                                            ) : (
                                                                <EyeOff className='h-4 w-4 text-muted-foreground' />
                                                            )}
                                                        </Button>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <FormField
                                        control={form.control}
                                        name='confirm_password'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='text-sm font-medium text-foreground'>
                                                    Confirm Password
                                                </FormLabel>
                                                <FormControl>
                                                    <div className='relative'>
                                                        <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                                                        <Input
                                                            className='pl-10 pr-10'
                                                            placeholder='Enter your Confirmation password'
                                                            type={
                                                                showPassword
                                                                    ? "text"
                                                                    : "password"
                                                            }
                                                            {...field}
                                                        />
                                                        <Button
                                                            type='button'
                                                            onClick={() =>
                                                                setShowPassword(
                                                                    !showPassword
                                                                )
                                                            }
                                                            className='absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 bg-transparent hover:bg-transparent cursor-pointer'
                                                        >
                                                            {!showPassword ? (
                                                                <Eye className='h-4 w-4 text-muted-foreground' />
                                                            ) : (
                                                                <EyeOff className='h-4 w-4 text-muted-foreground' />
                                                            )}
                                                        </Button>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Button
                                    type='submit'
                                    className='w-full'
                                    disabled={isLoading}
                                >
                                    {isLoading
                                        ? "Creating account..."
                                        : "Create account"}
                                </Button>
                            </form>
                        </Form>

                        {/* Divider */}
                        <div className='relative'>
                            <div className='absolute inset-0 flex items-center'>
                                <span className='w-full border-t border-border' />
                            </div>
                            <div className='relative flex justify-center text-xs uppercase'>
                                <span className='bg-card px-2 text-muted-foreground'>
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        {/* Social Signup Buttons */}
                        <div className='grid grid-cols-2 gap-3'>
                            <Button
                                variant='outline'
                                onClick={() => handleSocialSignup("google")}
                                className='w-full'
                            >
                                <Chrome className='h-4 w-4 mr-2' />
                                Google
                            </Button>
                            <Button
                                variant='outline'
                                onClick={() => handleSocialSignup("github")}
                                className='w-full'
                            >
                                <Github className='h-4 w-4 mr-2' />
                                GitHub
                            </Button>
                        </div>

                        {/* Sign In Link */}
                        <div className='text-center text-sm'>
                            <span className='text-muted-foreground'>
                                Already have an account?{" "}
                            </span>
                            <Link
                                href='/auth/login'
                                className='text-primary hover:underline font-medium'
                            >
                                Sign in
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
