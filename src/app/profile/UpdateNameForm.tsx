'use client';

import { authClient } from '@/lib/auth-client';
import { Button, Form, Input, Label, TextField } from '@heroui/react';
import { type FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

const UpdateNameForm = ({ currentName }: { currentName: string }) => {
    const [name, setName] = useState(currentName);
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const updatedName = name.trim();

        if (!updatedName) {
            toast.error('নাম লিখুন।');
            return;
        }

        setIsSaving(true);
        try {
            const result = await authClient.updateUser({ name: updatedName });

            if (result.error) {
                toast.error(result.error.message ?? 'তথ্য আপডেট করা যায়নি। আবার চেষ্টা করুন।');
                return;
            }

            toast.success('তথ্য আপডেট হয়েছে।');
        } catch (error) {
            toast.error(error instanceof Error
                ? error.message
                : 'তথ্য আপডেট করা যায়নি। আবার চেষ্টা করুন।');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <TextField className="flex flex-col gap-1" isRequired name="name">
                <Label className="text-sm font-medium text-gray-800">নাম</Label>
                <Input
                    autoComplete="name"
                    className="mt-1.5 w-full rounded-lg border border-[#dce6de] bg-transparent px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#05893e] focus:ring-2 focus:ring-[#05893e]/15"
                    maxLength={100}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
            </TextField>

            <Button
                className="w-full rounded-lg bg-[#05893e] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#007038] disabled:cursor-not-allowed disabled:opacity-60"
                isDisabled={isSaving}
                type="submit"
            >
                {isSaving ? 'আপডেট হচ্ছে…' : 'Update Information'}
            </Button>
        </Form>
    );
};

export default UpdateNameForm;