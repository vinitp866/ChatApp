export declare const createUser: (username: string, email: string, password: string) => Promise<{
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const loginUser: (email: string, password: string) => Promise<{
    token: string;
    user: {
        id: string;
        username: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    };
}>;
//# sourceMappingURL=auth.service.d.ts.map