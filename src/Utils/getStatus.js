const getStatus = (student) => {
  if (
    student.paid_status &&
    student.permission_status &&
    student.supplies_status
  ) {
    return "complete";
  }
  return "incomplete";
};

export default getStatus;
