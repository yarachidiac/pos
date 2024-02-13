const handleSave = async (
  companyName,
  itemDetails,
  itemDetailsCopy,
  setUsers,
  setSuccessMessage,
  setItemDetails,
  setOldItemNo,
  setNewItemNo
) => {
  try {
    const data = itemDetailsCopy;
    console.log("iddddddddddddddd", itemDetails.ItemNo);

    // Send a POST request to save all edited fields
    const saveResponse = await fetch(
      `http://192.168.16.113:8000/updateItems/${companyName}/${itemDetails.ItemNo}`,
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
      setOldItemNo(responseData.oldItemNo);
      setNewItemNo(responseData.newItemNo);

      // If save is successful, update userDetails to match userDetailsCopy
      setItemDetails(itemDetailsCopy);
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
