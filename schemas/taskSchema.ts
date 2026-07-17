import * as yup from 'yup';

const notPastDateTest = (value: string | undefined): boolean => {
  if (!value) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const inputDate = new Date(value);
  inputDate.setHours(0, 0, 0, 0);
  return inputDate >= today;
};

export const taskSchema = yup.object({
  title: yup
    .string()
    .transform((value) => (typeof value === 'string' ? value.trim() : value)) // C-8: transform
    .required('タスク名は必須です'),
  assignee: yup
    .string()
    .transform((value) => (typeof value === 'string' ? value.trim() : value))
    .required('担当者は必須です'),
  priority: yup
    .string()
    .oneOf(['高', '中', '低'] as const)
    .required('優先度を選択してください'),
  dueDate: yup
    .string()
    .required('期限を選択してください')
    .test('not-past-date', '過去の日付は期限に設定できません', notPastDateTest), // C-8: test
  memo: yup
    .string()
    .transform((value) => (typeof value === 'string' ? value.trim() : value))
    .optional(),
});