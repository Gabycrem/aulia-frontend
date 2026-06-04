export const initialCheckInData = {
  emotionalState: "",
  context: null,
  comment: "",
  helpRequested: false,
};

export function mapCheckInFormToPayload(formData, studentData) {
  return {
    emotionalState: formData.emotionalState,
    context: formData.context?.value || "",
    comment: formData.comment.trim(),
    helpRequested: formData.helpRequested,
    studentId: Number(studentData.studentId),
    courseId: Number(studentData.courseId),
  };
}