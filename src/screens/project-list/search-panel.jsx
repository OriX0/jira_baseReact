export const SearchPanel = ({ users, params, setParams }) => {
  return (
    <form>
      <input
        placeholder="项目名"
        value={params.name}
        onChange={(event) => setParams({ ...params, name: event.target.value })}
      />
      <select
        value={params.personId}
        onChange={(event) => {
          setParams({ ...params, personId: event.target.value });
        }}
      >
        <option value={""}>负责人</option>
        {users.map((user) => {
          return (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          );
        })}
      </select>
    </form>
  );
};
