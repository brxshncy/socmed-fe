"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Chrome, EyeIcon, EyeOff, GithubIcon, Lock, Mail } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

const loginSchema = z.object({
    email: z.string().email({
        message: "Invalid email address",
    }),
    password: z.string().min(3, {
        message: "Password must be at least 3 characters",
    }),
});

const LoginPage = () => {
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        console.log("values", values);
    };
    return (
        <div className='min-h-screen flex items-center justify-center bg-background'>
            <div className='w-full max-w-md space-y-6'>
                <div className='text-center'>
                    <div className='bg-primary w-16 h-16 rounded-2xl mx-auto flex items-center justify-center'>
                        <span className='text-2xl font-bold text-primary-foreground'>
                            S
                        </span>
                    </div>
                    <h1 className='text-3xl text-foreground font-bold my-4'>
                        Welcome back
                    </h1>
                    <p className='mb-4 text-muted-foreground'>
                        Sign in to your account to continue
                    </p>
                </div>
                <Card className='shadow-lg p-4'>
                    <CardHeader className='space-y-1'>
                        <CardTitle className='text-2xl text-center'>
                            Sign in
                        </CardTitle>
                        <CardDescription className='text-center'>
                            Enter your email and password to access your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className='space-y-4'
                            >
                                <FormField
                                    control={form.control}
                                    name='email'
                                    render={({ field }) => (
                                        <FormItem className='space-y-2'>
                                            <FormLabel className='text-sm font-medium text-foreground'>
                                                Email
                                            </FormLabel>
                                            <FormControl>
                                                <div className='relative'>
                                                    <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                                                    <Input
                                                        className='pl-10'
                                                        placeholder='Enter your email'
                                                        type='email'
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
                                    name='password'
                                    render={({ field }) => (
                                        <FormItem className='space-y-2'>
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
                                                            <EyeIcon className='h-4 w-4' />
                                                        ) : (
                                                            <EyeOff className='h-4 w-4' />
                                                        )}
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className='flex justify-end'>
                                    <Link
                                        className='text-sm text-primary hover:underline'
                                        href=''
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>
                                <Button className='w-full bg-primary rounded-2xl cursor-pointer'>
                                    Sign In
                                </Button>
                                <div className='relative mt-3'>
                                    <div className='absolute inset-0 flex items-center'>
                                        <div className='w-full border-t border-border'></div>
                                    </div>
                                    <div className='relative flex items-center justify-center text-xs uppercase'>
                                        <span className='bg-card px-2 text-muted-foreground'>
                                            Or Continue With
                                        </span>
                                    </div>
                                </div>
                                <div className='flex gap-3'>
                                    <Button
                                        variant='outline'
                                        className='flex-1 cursor-pointer'
                                    >
                                        <Chrome className='h-4 w-4 mr-2' />
                                        Google
                                    </Button>
                                    <Button
                                        variant='outline'
                                        className='flex-1 cursor-pointer'
                                    >
                                        <GithubIcon className='h-4 w-4 mr-2' />
                                        GitHub
                                    </Button>
                                </div>
                                <div className='mt-5'>
                                    <p className='text-center text-sm text-foreground'>
                                        Don't have an account yet?{" "}
                                        <Link
                                            href='/auth/sign-up'
                                            className='text-primary hover:underline'
                                        >
                                            Sign up here
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;
