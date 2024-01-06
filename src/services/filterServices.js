
function filterTasks(data, filters) {
  const sortFunctions = {
    title: (a, b) => a.title.localeCompare(b.title),
    status: (a, b) => a.status.localeCompare(b.status),
    time_spent: (a, b) => a.time_spent - b.time_spent,
    priority: (a, b) => a.priority - b.priority,
    created: (a, b) => new Date(a.created_at) - new Date(b.created_at),
    updated: (a, b) => new Date(a.updated_at) - new Date(b.updated_at),
  };

  const sortFunction = sortFunctions[filters.sortBy];

  const sortedData = [...data].sort((a, b) => {
    const result = sortFunction(a, b);
    return filters.order === 'asc' ? result : -result;
  });

  const updatedData = sortedData.map(item => {
    const titleMatch = item.title.toLowerCase().includes(filters.title.toLowerCase());
    const statusMatch = (filters.toDo && item.status === "TODO") ||
                        (filters.inProgress && item.status === "IN_PROGRESS") ||
                        (filters.done && item.status === "DONE");

    return {
      ...item,
      show: titleMatch && statusMatch
    };
  });
  return updatedData;
}


export { filterTasks };
