export default function Persons({ persons, deletePerson }) {
  return (
    <ul>
      {persons.map((person) => {
        return (
          <li key={person._id}>
            {person.name} {person.number}
            <button onClick={() => deletePerson(person._id)}>delete</button>
          </li>
        );
      })}
    </ul>
  );
}
