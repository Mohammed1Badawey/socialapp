import * as Yup from "yup";

export const postValidation = Yup.object({
    body: Yup.string().required("Post content is required"),
    image: Yup.mixed()
      .nullable()
      .test(
        "fileSize",
        "Image size should be less than 10MB",
        (value: any) =>
          !value || (value instanceof File && value.size <= 10 * 1024 * 1024)
      ),
  });

  