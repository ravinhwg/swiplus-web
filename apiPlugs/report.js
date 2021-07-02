import axios from "axios";

// eslint-disable-next-line prefer-destructuring
const API_URL = process.env.API_URL;

async function createReport({
  reportDescription,
  reportType,
  reportEntity,
  token,
}) {
  const reportTypeIndex = ["deck", "profile", "comment"].indexOf(reportType);
  try {
    const response = await axios.post(
      `${API_URL}/report`,
      { reportDescription, reportEntity, reportType: reportTypeIndex },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (e) {
    throw new Error(e);
  }
}
export default createReport;
