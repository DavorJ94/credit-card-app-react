function getIdFromLink() {
  const linkPartsArray = window.location.href.split("/");
  if (linkPartsArray[linkPartsArray.length - 1] !== "edit") return false;
  else return linkPartsArray[linkPartsArray.length - 2];
}

export default getIdFromLink;
