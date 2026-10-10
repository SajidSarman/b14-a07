'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type FormEvent, useState } from 'react';
import { Button, Description, FieldError, Form, Input, Label, TextField } from '@heroui/react';
import { authClient } from '@/lib/auth-client';

const inputClassName = 'mt-1.5 w-full rounded-lg border border-[#dce6de] bg-transparent px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#05893e] focus:ring-2 focus:ring-[#05893e]/15';

const SignUpPage = () => {
    const router = useRouter();
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');

        const formData = new FormData(event.currentTarget);
        const name = String(formData.get('name') ?? '').trim();
        const email = String(formData.get('email') ?? '').trim();
        const password = String(formData.get('password') ?? '');
        const confirmPassword = String(formData.get('confirmPassword') ?? '');

        if (password !== confirmPassword) {
            setError('পাসওয়ার্ড দুটি মিলছে না।');
            return;
        }

        setIsSubmitting(true);
        try {
            const result = await authClient.signUp.email({
                name,
                email,
                password,
                callbackURL: '/',
            });

            if (result.error) {
                setError(result.error.message ?? 'অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।');
                return;
            }

            router.replace('/');
        } catch (submitError) {
            setError(submitError instanceof Error
                ? submitError.message
                : 'সার্ভারের সঙ্গে যোগাযোগ করা যায়নি। আবার চেষ্টা করুন।');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="flex w-full flex-1 flex-col items-center justify-center bg-[#f0f5f0] px-4 py-10 sm:px-6">
            <section className="w-full max-w-sm">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">অ্যাকাউন্ট তৈরি করুন</h1>
                    <p className="mt-1 text-sm text-gray-500">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন</p>
                </div>

                <div className="rounded-2xl border border-[#e1e9e2] bg-white/80 p-5 shadow-sm sm:p-6">
                    <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
                        <TextField aria-labelledby="signup-name-label" className="flex flex-col gap-1" isRequired name="name">
                            <Label id="signup-name-label" className="text-sm font-medium text-gray-800">নাম</Label>
                            <Input
                                autoComplete="name"
                                className={inputClassName}
                                maxLength={100}
                                placeholder="যেমন: রহিম উদ্দিন"
                            />
                            <FieldError className="text-sm text-red-600" />
                        </TextField>

                        <TextField
                            className="flex flex-col gap-1"
                            isRequired
                            name="email"
                            type="email"
                            aria-labelledby="signup-email-label"
                            validate={(value) => {
                                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                    return 'সঠিক ইমেইল ঠিকানা লিখুন।';
                                }

                                return null;
                            }}
                        >
                            <Label id="signup-email-label" className="text-sm font-medium text-gray-800">ইমেইল</Label>
                            <Input
                                autoComplete="email"
                                className={inputClassName}
                                placeholder="you@example.com"
                            />
                            <FieldError className="text-sm text-red-600" />
                        </TextField>

                        {/* pass area */}
                        <TextField
                            className="flex flex-col gap-1"
                            isRequired
                            minLength={8}
                            name="password"
                            type="password"
                            aria-labelledby="signup-password-label"
                            validate={(value) => {
                                if (value.length < 8) {
                                    return 'পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।';
                                }
                                if (!/[A-Z]/.test(value)) {
                                    return 'পাসওয়ার্ডে অন্তত একটি বড় হাতের ইংরেজি অক্ষর থাকতে হবে।';
                                }
                                if (!/[0-9]/.test(value)) {
                                    return 'পাসওয়ার্ডে অন্তত একটি সংখ্যা থাকতে হবে।';
                                }

                                return null;
                            }}
                        >
                            <Label id="signup-password-label" className="text-sm font-medium text-gray-800">পাসওয়ার্ড</Label>
                            <Input
                                autoComplete="new-password"
                                className={inputClassName}
                                placeholder="কমপক্ষে ৮ অক্ষর"
                                type="password"
                            />
                            {/* <Description className="text-xs text-gray-500">
                                কমপক্ষে ৮ অক্ষর, একটি বড় হাতের ইংরেজি অক্ষর ও একটি সংখ্যা দিন।
                            </Description> */}
                            <FieldError className="text-sm text-red-600" />
                        </TextField>

                        <TextField
                            className="flex flex-col gap-1"
                            isRequired
                            minLength={8}
                            name="confirmPassword"
                            type="password"
                            aria-labelledby="signup-confirm-password-label"
                            validate={(value) => {
                                if (value.length < 8) {
                                    return 'পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।';
                                }

                                return null;
                            }}
                        >
                            <Label id="signup-confirm-password-label" className="text-sm font-medium text-gray-800">পাসওয়ার্ড নিশ্চিত করুন</Label>
                            <Input
                                autoComplete="new-password"
                                className={inputClassName}
                                placeholder="আবার লিখুন"
                                type="password"
                            />
                            <FieldError className="text-sm text-red-600" />
                        </TextField>

                        {error && (
                            <p className="text-sm text-red-600">{error}</p>
                        )}

                        <Button
                            className="mt-1 w-full rounded-lg bg-[#05893e] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#007038] disabled:cursor-not-allowed disabled:opacity-60"
                            isDisabled={isSubmitting}
                            type="submit"
                        >
                            {isSubmitting ? 'অ্যাকাউন্ট তৈরি হচ্ছে…' : 'অ্যাকাউন্ট তৈরি করুন'}
                        </Button>
                    </Form>

                    <p className="mt-5 text-center text-sm text-gray-600">
                        <span className='pr-2'>অ্যাকাউন্ট আছে?</span>
                        <Link className="font-semibold text-[#05893e] hover:underline" href="/sign-in">
                            সাইন ইন করুন
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

export default SignUpPage;
