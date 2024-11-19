export type PpostType={
    _id: string;
    body: string;
    image?: string;
    user: UserType;
    createdAt: string;
    comments: CommentsType[];
}

export type UserType = {
    _id: string;
    name: string;
    photo: string;
}

export type CommentsType = {
    _id: string;
    content: string;
    post: string;
    createdAt: string;
    commentCreator: UserType;
}

export type UserProfileType = {
    createdAt: string;
    dateOfBirth: string;
    email: string;
    gender: string;
    name: string;
    passwordChangedAt: string;
    photo: string;
    _id: string;
}