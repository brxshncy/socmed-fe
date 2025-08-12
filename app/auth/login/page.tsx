"use client";
import { Button } from "@/components/ui/button";
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

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

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
                        <form className='space-y-4'>
                            <div className='space-y-2'>
                                <label className='text-sm font-medium text-foreground'>
                                    Email
                                </label>
                                <div className='relative mt-2'>
                                    <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                                    <Input
                                        className='pl-10'
                                        placeholder='Enter your email'
                                        type='email'
                                    />
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <label className='text-sm font-medium text-foreground'>
                                    Password
                                </label>
                                <div className='relative mt-2'>
                                    <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                                    <Input
                                        className='pl-10'
                                        placeholder='Enter your password'
                                        type='password'
                                    />
                                    <Button
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        type='button'
                                        className='absolute h-8 w-8 bg-transparent right-3 top-1/2 transform -translate-y-1/2 cursor-pointer hover:bg-transparent'
                                    >
                                        {!showPassword ? (
                                            <EyeIcon className='h-4 w-4' />
                                        ) : (
                                            <EyeOff className='h-4 w-4' />
                                        )}
                                    </Button>
                                </div>
                            </div>
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
                                        href=''
                                        className='text-primary hover:underline'
                                    >
                                        Sign up here
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;
