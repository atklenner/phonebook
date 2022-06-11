export default function Filter({ filter, handleFilterChange }) {
  return (
    <div>
      filter: <input value={filter} onChange={handleFilterChange} />
    </div>
  );
}
