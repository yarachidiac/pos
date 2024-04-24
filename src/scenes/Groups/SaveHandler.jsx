const handleSave = async (
  companyName,
  groupDetails,
  groupDetailsCopy,
  setSuccessMessage,
  setGroupDetails,
  setOldItemNo,
  setNewItemNo, url
) => {
  try {
    const data = groupDetailsCopy;
    console.log("iddddddddddddddd", groupDetailsCopy.GroupNo);
    console.log("itemmmmmmmmmmmmmmmmmmmmNOOOOO", groupDetails);
    // Send a POST request to save all edited fields
    const saveResponse = await fetch(
      `${url}/pos/updateGroups/${companyName}/${groupDetails.GroupNo}`,
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
      if (
        responseData.message !==
        "GroupNo already exists. Please choose another GroupNo."
      ) {
          // If save is successful, update userDetails to match userDetailsCopy
          console.log("gggggggggggggggggggggggg");
          setGroupDetails(groupDetailsCopy);
          
      }
      console.log("wwwwwwww2");
        setSuccessMessage(responseData.message);
        console.log("wwwwwwww3");
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
