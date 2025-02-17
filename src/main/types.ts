export type Dog = string;

export type DogPerDate = {
  // The timestamp of the day
  date: number;

  // The name of the dog
  dog: Dog;
};

// CalendarViewer.tsx
export type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];
