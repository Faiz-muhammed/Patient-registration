export const formatDate = (dateString:any) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };