'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type FormEvent, useState } from 'react';
import { Button, FieldError, Form, Input, Label, TextField } from '@heroui/react';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { FaGithub, FaGoogle } from 'react-icons/fa';

const inputClassName = 'mt-1.5 w-full rounded-lg border border-[#dce6de] bg-transparent px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#05893e] focus:ring-2 focus:ring-[#05893e]/15';

const SignInPage = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [socialProvider, setSocialProvider] = useState<'google' | 'github' | null>(null);

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const email = String(formData.get('email') ?? '').trim();
        const password = String(formData.get('password') ?? '');

        setIsSubmitting(true);
        try {
            const result = await authClient.signIn.email({
                email,
                password,
                callbackURL: '/',
            });

            if (result.error) {
                toast.error(result.error.message ?? 'সাইন ইন করা যায়নি। আবার চেষ্টা করুন।');
                return;
            }

            toast.success('সাইন ইন সফল হয়েছে।');
            router.replace('/');

        } catch (submitError) {
            toast.error(submitError instanceof Error
                ? submitError.message
                : 'সার্ভারের সঙ্গে যোগাযোগ করা যায়নি। আবার চেষ্টা করুন।');
        } finally {
            setIsSubmitting(false);
        }
    };


    const handleSocialSignIn = async (provider: 'google' | 'github') => {
        const providerName = provider === 'google' ? 'Google' : 'GitHub';
        setSocialProvider(provider);

        try {
            const result = await authClient.signIn.social({
                provider,
                callbackURL: '/',
            });

            if (result.error) {
                toast.error(result.error.message ?? `${providerName} দিয়ে সাইন ইন করা যায়নি।`);
                return;
            }

            toast.success(`${providerName}-এ রিডাইরেক্ট করা হচ্ছে…`);
        } catch (error) {
            toast.error(error instanceof Error
                ? error.message
                : `${providerName} দিয়ে সাইন ইন করা যায়নি। আবার চেষ্টা করুন।`);
        } finally {
            setSocialProvider(null);
        }
    }


    return (
        <main className="flex w-full flex-1 flex-col items-center justify-center bg-[#f0f5f0] px-4 py-10 sm:px-6">
            <section className="w-full max-w-md">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">আবার স্বাগতম</h1>
                    <p className="mt-1 text-sm text-gray-500">আপনার অ্যাকাউন্টে সাইন ইন করুন</p>
                </div>

                <div className="rounded-2xl border border-[#e1e9e2] bg-white/80 p-5 shadow-sm sm:p-6">
                    <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
                        <TextField
                            className="flex flex-col gap-1"
                            isRequired
                            name="email"
                            type="email"
                            aria-labelledby="signin-email-label"
                            validate={(value) => {
                                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                    return 'সঠিক ইমেইল ঠিকানা লিখুন।';
                                }

                                return null;
                            }}
                        >
                            <Label id="signin-email-label" className="text-sm font-medium text-gray-800">ইমেইল</Label>
                            <Input
                                autoComplete="email"
                                className={inputClassName}
                                placeholder="you@example.com"
                                type="email"
                            />
                            <FieldError className="text-sm text-red-600" />
                        </TextField>

                        <TextField
                            aria-labelledby="signin-password-label"
                            className="flex flex-col gap-1"
                            isRequired
                            name="password"
                            type="password"
                        >
                            <Label id="signin-password-label" className="text-sm font-medium text-gray-800">পাসওয়ার্ড</Label>
                            <Input
                                autoComplete="current-password"
                                className={inputClassName}
                                placeholder="আপনার পাসওয়ার্ড লিখুন"
                                type="password"
                            />
                            <FieldError className="text-sm text-red-600" />
                        </TextField>

                        <Button
                            className="mt-1 w-full rounded-lg bg-[#05893e] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#007038] disabled:cursor-not-allowed disabled:opacity-60"
                            isDisabled={isSubmitting}
                            type="submit"
                        >
                            {isSubmitting ? 'সাইন ইন হচ্ছে…' : 'সাইন ইন'}
                        </Button>

                    </Form>
                    <div className="mt-5">
                        <div className="mb-4 flex items-center gap-3 text-xs text-gray-500">
                            <span className="h-px flex-1 bg-[#dce6de]" />
                            <span>অথবা</span>
                            <span className="h-px flex-1 bg-[#dce6de]" />
                        </div>
                        <div className="flex flex-col gap-2 sm:flex-row">
                            <Button
                                type="button"
                                onClick={() => handleSocialSignIn('google')}
                                isDisabled={socialProvider !== null}
                                className="w-full min-w-0 gap-2 whitespace-normal rounded-lg border border-[#dce6de] bg-transparent px-3 py-2 text-sm font-semibold leading-tight text-gray-700 transition-colors hover:bg-gray-50 sm:flex-1"
                            >
                                <FaGoogle />
                                {socialProvider === 'google' ? 'রিডাইরেক্ট হচ্ছে…' : 'Google দিয়ে চালিয়ে যান'}
                            </Button>
                            <Button
                                type="button"
                                onClick={() => handleSocialSignIn('github')}
                                isDisabled={socialProvider !== null}
                                className="w-full min-w-0 gap-2 whitespace-normal rounded-lg border border-[#dce6de] bg-transparent px-3 py-2 text-sm font-semibold leading-tight text-gray-700 transition-colors hover:bg-gray-50 sm:flex-1"
                            >
                                <FaGithub />
                                {socialProvider === 'github' ? 'রিডাইরেক্ট হচ্ছে…' : 'GitHub দিয়ে চালিয়ে যান'}
                            </Button>
                        </div>
                    </div>

                    <p className="mt-5 text-center text-sm text-gray-600">
                        <span className='pr-2'>অ্যাকাউন্ট নেই?</span>

                        <Link className="font-semibold text-[#05893e] hover:underline" href="/sign-up">
                            অ্যাকাউন্ট তৈরি করুন
                        </Link>
                    </p>
                </div>
            </section>

            <Link className="mt-5 text-sm text-gray-500 transition-colors hover:text-[#05893e]" href="/">
                ← হোম পেজে ফিরে যান
            </Link>
        </main>
    );
};

export default SignInPage;
