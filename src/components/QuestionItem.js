import React, { useState } from "react";

function QuestionItem({ question, onDelete, onUpdate }) {
  const { id, prompt, answers } = question;
  const [currentCorrectIndex, setCurrentCorrectIndex] = useState(question.correctIndex);

  function handleDeleteClick() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          onDelete(id);
        } else {
          throw new Error("Delete failed");
        }
      })
      .catch((err) => console.error("Error deleting question:", err));
  }

  function handleCorrectAnswerChange(e) {
    const newCorrectIndex = parseInt(e.target.value);

    setCurrentCorrectIndex(newCorrectIndex);

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
      .then((res) => res.json())
      .then((updatedQuestion) => {
        onUpdate(updatedQuestion); 
      })
      .catch((err) => console.error("Error updating question:", err));
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select
          value={String(currentCorrectIndex)}
          onChange={handleCorrectAnswerChange}
          aria-label="Correct Answer"
        >
          {answers.map((answer, index) => (
            <option key={index} value={String(index)}>
              {answer}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
