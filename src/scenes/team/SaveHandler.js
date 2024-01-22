const handleSave = async (
    companyName,
    userDetails,
  userDetailsCopy,
  setUsers,
  setSuccessMessage,
  setUserDetails
) => {
    try {
    const data = userDetailsCopy;
      console.log("iddddddddddddddd", userDetails);

    // Send a POST request to save all edited fields
    const saveResponse = await fetch(
      `http://192.168.16.103:8000/users/${companyName}/${userDetails.id}`,
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
      setUserDetails(userDetailsCopy);
      setSuccessMessage(responseData.message);
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);


      // // If save is successful, fetch the updated users
      // const fetchResponse = await fetch(
      //   `http://192.168.16.128:8000/users/${companyName}`
      // );
      // const updatedUsers = await fetchResponse.json();

      // console.log("Updated users:", updatedUsers);

      // // Update the users state in the Team component
      // setUsers(updatedUsers);
      //   console.log("bl saveeeeeeeeeeee userDetails", userDetails);
      //   console.log("bl saveeeeeeeeeeeeeeeeeeee userDetailCopyyyyyyyyyyyyy", userDetailsCopy)
      // console.log("Save successful");
    } else {
      console.error("Save failed");
    }
  } catch (error) {
    console.error("Error during save:", error);
  }
};

export { handleSave };