export const QueryComponent = () => {
  const typeMap = {
    1: '가요',
    2: 'POP',
    3: 'JPOP',
  };
  return (
    <div>
      <select>{Object.entries(typeMap).map(([ key, value ]) => <option key={key} value={key}>{value}</option>)}</select>
      <input type="date" />
      <input type="date" />
    </div>
  );
};
