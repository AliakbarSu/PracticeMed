import axios from "axios";

export const addStudyPartner = async (partnerDetails: any) => {
  const {
    public: { api_endpoint },
  } = useRuntimeConfig();
  const response = await axios.post(
    `${api_endpoint}/study-partners`,
    partnerDetails,
  );
  return response.data;
};
