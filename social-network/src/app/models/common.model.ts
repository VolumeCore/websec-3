export interface UserModel {
    username: string;
    avatarSrc: string;
    bio?: string;
    postsCount?: number;
    followersCount?: number;
    followsCount?: number;
}

export interface AuthModel {
    username: string;
    password: string;
}

export interface CommentModel {
    user: UserModel;
    date: string;
    commentText: string;
}

export interface PostModel {
    id: string;
    user: UserModel;
    date: string;
    postImageSrc: string;
    likesCount: number;
    description: string;
    commentsCount: number;
}
