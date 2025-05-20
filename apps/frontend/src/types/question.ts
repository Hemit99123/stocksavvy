export interface Option {
    letter: string;
    text: string;
    correctAnswer?: boolean;
}

export interface Question {
    question: string;
    options: Option[];
    type: TopicName;
    correctAnswer: string;
    id?: string
}

// Topic interface representing a topic with an id, name, and description
export type TopicName = "Investing" | "Budgeting" | "Debt"| "None";