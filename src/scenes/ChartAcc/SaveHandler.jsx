const handleSave = async (
  companyName,
  clientDetails,
  clientDetailsCopy,
  setClients,
  setSuccessMessage,
  setClientDetails
) => {
  try {
    const data = clientDetailsCopy;
    console.log("iddddddddddddddd", clientDetails);

    // Send a POST request to save all edited fields
    const saveResponse = await fetch(
      `http://192.168.16.113:8000/updateClients/${companyName}/${clientDetails.AccNo}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const responseData = await saveResponse.json();

    if (saveResponse.ok) {
      console.log("Save response:", responseData);

      // If save is successful, update userDetails to match userDetailsCopy
      setClientDetails(clientDetailsCopy);
      setSuccessMessage(responseData.message);
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
    } else {
      console.error("Save failed");
    }
  } catch (error) {
    console.error("Error during save:", error);
  }
};

export { handleSave };
