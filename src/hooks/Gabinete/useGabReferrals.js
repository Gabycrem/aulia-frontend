import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  acceptReferral,
  getReferralById,
  getReferrals,
  rejectReferral,
  requestReferralInfo,
} from "../../services/referralService";
import {
  isPendingReferral,
  mapReferralToReferralDetail,
  mapReferralToReferralRow,
  normalizeReferralResponse,
  normalizeReferralsResponse,
} from "./gabReferralsMappers";

function useGabReferrals() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [referralsData, setReferralsData] = useState([]);
  const [selectedReferralId, setSelectedReferralId] = useState(
    searchParams.get("referralId") || null
  );
  const [selectedReferralDetail, setSelectedReferralDetail] = useState(null);
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function loadReferrals() {
    try {
      setLoading(true);
      setError("");

      const response = await getReferrals();
      const referrals = normalizeReferralsResponse(response);

      setReferralsData(
        referrals.filter(isPendingReferral).map(mapReferralToReferralRow)
      );
    } catch (error) {
      setError(error.message || "Error al cargar derivaciones");
      setReferralsData([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReferrals();
  }, []);

  useEffect(() => {
    async function loadReferralDetail() {
      if (!selectedReferralId) {
        setSelectedReferralDetail(null);
        return;
      }

      try {
        setLoadingDetail(true);
        setError("");

        const response = await getReferralById(selectedReferralId);
        const referral = normalizeReferralResponse(response);

        setSelectedReferralDetail(mapReferralToReferralDetail(referral));
      } catch (error) {
        setError(error.message || "Error al cargar el detalle de la derivación");
        setSelectedReferralDetail(null);
      } finally {
        setLoadingDetail(false);
      }
    }

    loadReferralDetail();
  }, [selectedReferralId]);

  const selectedReferral = useMemo(() => {
    return (
      selectedReferralDetail ||
      referralsData.find(
        (referral) =>
          String(referral.referralId) === String(selectedReferralId)
      ) ||
      null
    );
  }, [referralsData, selectedReferralDetail, selectedReferralId]);

  function handleSelectReferral(referralId) {
    setSelectedReferralId(referralId);
    setSearchParams({ referralId: String(referralId) });
    setNotes("");
    setSuccessMessage("");
    if (error) setError("");
  }

  function handleNotesChange(event) {
    setNotes(event.target.value);
    if (error) setError("");
    if (successMessage) setSuccessMessage("");
  }

  async function handleAcceptReferral() {
    await handleReferralAction({
      action: acceptReferral,
      success: "Derivación aceptada correctamente",
    });
  }

  async function handleRejectReferral() {
    await handleReferralAction({
      action: rejectReferral,
      success: "Derivación rechazada correctamente",
    });
  }

  async function handleRequestInfo() {
    await handleReferralAction({
      action: requestReferralInfo,
      success: "Solicitud de información enviada correctamente",
    });
  }

  async function handleReferralAction({ action, success }) {
    if (!selectedReferralId) {
      setError("Seleccioná una derivación para continuar");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccessMessage("");

      await action(selectedReferralId, notes.trim());

      setSuccessMessage(success);
      setSelectedReferralId(null);
      setSelectedReferralDetail(null);
      setNotes("");
      setSearchParams({});

      await loadReferrals();
    } catch (error) {
      setError(error.message || "Error al gestionar la derivación");
    } finally {
      setSaving(false);
    }
  }

  return {
    referrals: referralsData,
    selectedReferralId,
    selectedReferral,
    notes,
    loading,
    loadingDetail,
    saving,
    error,
    successMessage,
    handleSelectReferral,
    handleNotesChange,
    handleAcceptReferral,
    handleRejectReferral,
    handleRequestInfo,
  };
}

export default useGabReferrals;