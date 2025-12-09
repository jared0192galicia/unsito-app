export default function Greetings() {
  function getGreetings(): string {
    const time = new Date().getHours();

    if (time >= 6 && time < 12) {
      return 'Buenos días ';
    } else if (time >= 12 && time < 19) {
      return 'Buenas tardes ';
    } else if ((time >= 19 && time <= 23) || (time >= 0 && time < 6)) {
      return 'Buenas noches ';
    } else {
      return 'Buenas noches ';
    }
  }

  return (
    <div className="px-11 my-2 ml-10">
      <span className="text-2xl md:text-4xl font-light">
        {getGreetings()}
        <span className="text-2xl md:text-4xl font-medium">Pachequin 👋</span>
      </span>
    </div>
  );
}
