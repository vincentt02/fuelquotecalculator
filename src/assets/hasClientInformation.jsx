
const hasClientInformation = async (token) => {
    try {
      const response = await fetch("/api/clientprofilemanagement/hci", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
      });

      if (response.ok) {
        const data = await response.json();
        return data
      } else {
      }
    } catch (error) {}
  }

export default hasClientInformation