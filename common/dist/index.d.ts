import z from 'zod';
export declare const signupInput: z.ZodObject<{
    email: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    password: z.ZodString;
}, z.z.core.$strip>;
export type SignupType = z.infer<typeof signupInput>;
export declare const signinInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.z.core.$strip>;
export type SigninType = z.infer<typeof signinInput>;
export declare const createPostInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, z.z.core.$strip>;
export type CreatePostType = z.infer<typeof createPostInput>;
export declare const updatePostInput: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
}, z.z.core.$strip>;
export type UpdatePostType = z.infer<typeof updatePostInput>;
//# sourceMappingURL=index.d.ts.map