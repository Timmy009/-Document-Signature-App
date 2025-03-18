import { z } from 'zod';

enum CourseSchemaEnum {
  STUDY_MATERIAL_FORM = 'STUDY_MATERIAL_FORM',
  LESSON = 'LESSON',
  LESSONS_FORM = 'LESSONS_FORM',
  TEST_FORM = 'TEST_FORM',
  QUESTION_FORM = 'QUESTION_FORM',
}

const Option = z.object({
  optionText: z.string(),
  images: z
    .array(
      z.object({
        imageUrl: z.string(),
      })
    )
    .nullable(),
  imageFiles: z
    .array(
      z.object({
        file: z.instanceof(File),
        url: z.string(),
      })
    )
    .nullable(),
  correctOption: z.boolean(),
});

export const SCHEDULE_FORM = z.object({
  timeAllowed: z.number(),
  endTime: z.date(),
  startTime: z.date(),
  numberOfQuestionsPerSession: z.string(),
});

export const CourseSchema: Record<
  CourseSchemaEnum,
  z.AnyZodObject | z.ZodRecord
> = {
  STUDY_MATERIAL_FORM: z.object({
    institution: z.object({ courseTitle: z.string(), id: z.number() }),
    faculty: z.object({ name: z.string(), id: z.number() }),
    department: z
      .object({ name: z.string().optional(), id: z.number().optional() })
      .partial(),
    course: z.object({ courseTitle: z.string(), id: z.number() }),
    title: z.string().min(4),
    description: z.string().min(20),
    coverImage: z.instanceof(File).nullable(),
    // coverImageUrl: z.string(),
    lessonsRequests: z.array(z.string().optional()).optional(),
  }),

  LESSON: z.object({
    title: z.string().min(4).max(150),
    subTitle: z.string().min(4).max(250),
    description: z.string().min(20),
    coverImage: z.optional(z.instanceof(File)).nullable(),
    content: z
      .optional(
        z.object({
          file: z.instanceof(File),
          url: z.string(),
        })
      )

      .nullable(),
    coverImageFile: z.string().optional(),
    contentFile: z.string().optional(),
  }),

  LESSONS_FORM: z.record(
    z.string().includes('lessons_'),
    z.array(
      z.object({
        title: z.string().min(4).max(150),
        subTitle: z.string().min(4).max(250),
        description: z.string().min(20),
        coverImage: z.optional(z.instanceof(File)).nullable(),
        content: z
          .optional(
            z.object({
              file: z.instanceof(File),
              url: z.string(),
            })
          )

          .nullable(),
        coverImageFile: z.string().optional(),
        contentFile: z.string().optional(),
      })
    )
  ),
  TEST_FORM: z.object({
    institution: z.object({ courseTitle: z.string(), id: z.number() }),
    course: z.object({ courseTitle: z.string(), id: z.number() }),
    examTitle: z.string().min(4),
    objective: z.string().min(20),
    instructions: z.string().min(10),
    image: z.instanceof(File).nullable(),
    // imageUrl: z.string().optional(),
    createQuestion: z.array(z.string().optional()).optional(),
  }),
  QUESTION_FORM: z.record(
    z.string().includes('questions_'),
    z.array(
      z.object({
        questionText: z.string(),
        selections: z.array(Option).nullable(),
        instructions: z.string(),
        explanation: z.string(),
        questionType: z.enum(['MULTIPLE_CHOICE', 'SHORT_ANSWER']),
        images: z
          .array(
            z.object({
              imageUrl: z.string(),
            })
          )
          .nullable(),
        imageFiles: z
          .array(
            z.object({
              file: z.instanceof(File),
              url: z.string(),
            })
          )
          .nullable(),
      })
    )
  ),
};
