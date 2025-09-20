export default function ReviewTable({ history }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-2">Game Review</h3>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th>Question</th>
            <th>Correct Answer</th>
            <th>Winner</th>
          </tr>
        </thead>
        <tbody>
          {history.questionsPlayed.map((q, index) => (
            <tr key={index}>
              <td>{q.questionId.question}</td>
              <td>{q.questionId.answers.find(a => a.isCorrect).text}</td>
              <td>{q.correctPlayerId || 'None'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}