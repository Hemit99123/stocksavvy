import httpHeader from '../../../services/httpHeader';
import type { Question, TopicName } from '../../../types/question';
import React from 'react';

type CreateQuestionModalProps = {
  form: Question;
  setForm: React.Dispatch<React.SetStateAction<Question>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateQuestionModal: React.FC<CreateQuestionModalProps> = ({
  form,
  setForm,
  setModalOpen,
}) => {

  const handleCreateQuestion = async () => {
    try {
       await httpHeader.post("/admin/create-question", {
        question: form.question,
        options: form.options,
        type: form.type,
        correctAnswer: form.correctAnswer
       })
    } catch (err) {
      console.error("Error creating question:", err);
    }
  };

  const handleOptionChange = (selectedLetter: string, newText: string) => {
    let updatedOptions;
  
    // Check if the form already has an options array with exactly 4 items.
    if (form.options && form.options.length === 4) {
      // Update the option that matches the selected letter.
      updatedOptions = form.options.map(option => {
        if (option.letter === selectedLetter) {
          return { ...option, text: newText };
        }
        return option;
      });
    } else {
      // If no valid options array exists, initialize it with letters A, B, C, and D.
      const letters = ['A', 'B', 'C', 'D'];
      updatedOptions = letters.map(letter => {
        if (letter === selectedLetter) {
          return { letter, text: newText };
        }
        return { letter, text: '' };
      });
    }
  
    // Update the form with the new options.
    setForm({ ...form, options: updatedOptions });
  };
  

  const getOptionText = (letter: string) =>
    form.options?.find((opt) => opt.letter === letter)?.text || '';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
        <h4 className="text-lg font-semibold mb-4">Create a New Question</h4>
        <div className="space-y-3">
          <label>Your question: </label>
          <input
            type="text"
            placeholder="How to invest?"
            value={form.question}
            onChange={(e) => setForm({ ...form, question: e.target.value })}
            className="w-full border p-2 rounded text-sm"
          />

          <label>The topic it falls under:</label>
          <select
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value as TopicName })
            }
            className="w-full border p-2 rounded text-sm"
          >
            <option value="None">None</option>
            <option value="Investing">Investing</option>
            <option value="Budgeting">Budgeting</option>
            <option value="Debt">Debt</option>
          </select>

          <label>Answer options:</label>
          {['A', 'B', 'C', 'D'].map((letter) => (
            <input
              key={letter}
              type="text"
              placeholder={`Option ${letter}`}
              value={getOptionText(letter)}
              onChange={(e) => handleOptionChange(letter, e.target.value)}
              className="w-full border p-2 rounded text-sm"
            />
          ))}

          <label>Correct Answer:</label>
          <select
            value={form.correctAnswer}
            onChange={(e) =>
              setForm({ ...form, correctAnswer: e.target.value })
            }
            className="w-full border p-2 rounded text-sm"
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 rounded bg-stone-200 hover:bg-stone-300 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateQuestion}
              className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 text-sm"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQuestionModal;
