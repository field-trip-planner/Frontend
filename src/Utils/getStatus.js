const getStatus = (selectedStudent) => {
  if (
    selectedStudent.paid_status &&
    selectedStudent.permission_status &&
    selectedStudent.supplies_status
  ) {
    return "complete";
  }
  return "incomplete";
};

export default getStatus;
