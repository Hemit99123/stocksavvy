export interface Forum {
    id: number;
    question: string;
    email: string;
    content: string;
}

export interface Comment {
    id: string
    content: string
    forumID: number; // foreign key to link it to forum 
    email: string
}

export type FeatureType = "Home" | "Me" | "None"