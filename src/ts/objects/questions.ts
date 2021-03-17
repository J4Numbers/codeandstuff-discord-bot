export interface Question {
  answer: string,
  question: string,
  type: string,
  question_id: number,
}

export type Questions = Array<Question>;
