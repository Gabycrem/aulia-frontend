export function normalizeReferralsResponse(response) {
  const referrals =
    response?.referrals?.rows ||
    response?.referrals?.data ||
    response?.referrals ||
    response?.data?.rows ||
    response?.data ||
    response?.rows ||
    response ||
    [];

  return Array.isArray(referrals) ? referrals : [];
}

export function mapReferralToGabCaseRow(referral, studentOverride = null) {
  const student = studentOverride || getReferralStudent(referral);
  const user = student?.User || student?.user;
  const course = student?.Course || student?.course;

  const studentName =
    `${user?.firstName || student?.firstName || ""} ${
      user?.lastName || student?.lastName || ""
    }`.trim() || "Alumno sin nombre";

  return {
    id: referral.id,
    referralId: referral.id,
    studentId: referral.studentId || student?.id,
    caseFileId: referral.caseFileId,
    studentName,
    course: getCourseLabel(course, student?.courseId || referral.courseId),
    source: "Derivación",
    reason: referral.category || referral.reason || "Sin categoría",
    priority: getPriorityFromReferral(referral),
    status: referral.status || "Sin estado",
    lastUpdate: formatDate(referral.updatedAt || referral.createdAt),
  };
}

function getReferralStudent(referral) {
  return (
    referral.Student ||
    referral.student ||
    referral.CaseFile?.Student ||
    referral.caseFile?.student ||
    {}
  );
}

function getCourseLabel(course, fallbackCourseId) {
  if (course) {
    const label = [course.grade, course.division, course.level]
      .filter(Boolean)
      .join(" ");

    if (label) {
      return label;
    }
  }

  if (fallbackCourseId) {
    return `Curso ID ${fallbackCourseId}`;
  }

  return "Sin curso";
}

function getPriorityFromReferral(referral) {
  const status = String(referral.status || "").toLowerCase();

  if (status.includes("pendiente")) {
    return "Alta";
  }

  return referral.priority || "Normal";
}

function formatDate(date) {
  if (!date) {
    return "-";
  }

  return new Date(date).toLocaleDateString("es-AR");
}