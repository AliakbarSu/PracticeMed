import { addPartner } from "../model/studyPartners";
import { StudyPartner } from "../../types/StudyPartner";
import { sendNewPartnerAdminNotification } from "../emails/index";

export const addStudyPartner = async (
  partner: StudyPartner,
): Promise<StudyPartner> => {
  try {
    await sendNewPartnerAdminNotification(partner.email);
  } catch (e) {
    console.log("Error while sending new partner admin notification");
    console.log(e);
  }
  return addPartner(partner);
};
