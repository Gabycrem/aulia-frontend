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

export function normalizeReferralResponse(response) {
  return response?.referral || response?.data || response || null;
}

export function mapReferralToReferralRow(referral) {
  const student = getReferralStudent(referral);
  const user = student?.User || student?.user;

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
    category: referral.category || referral.reason || "Sin categoría",
    description: referral.description || "-",
    status: referral.status || "Sin estado",
    createdAt: formatDate(referral.createdAt),
  };
}

export function mapReferralToReferralDetail(referral) {
  if (!referral) {
    return null;
  }

  return mapReferralToReferralRow(referral);
}

export function isPendingReferral(referral) {
  return String(referral.status || "").toLowerCase().includes("pendiente");
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

function formatDate(date) {
  if (!date) {
    return "-";
  }

  return new Date(date).toLocaleDateString("es-AR");
}