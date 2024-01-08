import { apiClient } from "../config";

export const sendPasswordResetOTP = async (email) => {
  const res = await apiClient.post("/auth/forgot_password", { email });

  console.log(res.data);
  // Error handling
  if (res.data.status !== 200) {
    alert(res?.data?.message ?? "An error occurred. Please try again");
    return;
  }
  alert("A verification code has been sent to your email.");
};
