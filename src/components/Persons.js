export default function Persons({ persons, deletePerson }) {
  return (
    <ul>
      {persons.map((person) => {
        return (
          <li key={person.name}>
            {person.name} {person.number}
            <button onClick={() => deletePerson(person.id)}>delete</button>
          </li>
        );
      })}
    </ul>
  );
}
