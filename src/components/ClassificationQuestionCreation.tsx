import React, { useState } from 'react';
import '../App.css';

interface PossibleResponseGroup {
  title: string;
  possibleResponses: string[];
}

interface ClassificationFormData {
  question: string;
  columnCount: number;
  rowCount: number;
  columnTitles: string[];
  rowTitles: string[];
  possibleResponsesGroups: PossibleResponseGroup[];
  points: number;
  correctAnswers: string[];
  groupPossibleResponses: boolean;
  scoringType: string;
  enableDuplicateResponses: boolean;
  showDragHandles: boolean;
  maxResponsesPerCell: number;
  responseContainerPosition: string;
  showRowHeader: boolean;
  rowMinHeight: number;
  rowTitlesWidth: number;
}

const ClassificationQuestionCreation: React.FC = () => {
  const [formData, setFormData] = useState<ClassificationFormData>({
    question: '[This is the stem.]',
    columnCount: 2,
    rowCount: 1,
    columnTitles: ['COLUMN 1', 'COLUMN 2'],
    rowTitles: ['ROW 1'],
    possibleResponsesGroups: [
      {
        title: 'Group 1',
        possibleResponses: ['[Choice A]', '[Choice B]', '[Choice C]', '[Choice D]'],
      },
    ],
    points: 1,
    correctAnswers: [],
    groupPossibleResponses: false,
    scoringType: 'exactMatch',
    enableDuplicateResponses: false,
    showDragHandles: true,
    maxResponsesPerCell: 0,
    responseContainerPosition: 'bottom',
    showRowHeader: true,
    rowMinHeight: 0,
    rowTitlesWidth: 0,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof ClassificationFormData
  ) => {
    const { value } = e.target;
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };

  // ... Autres fonctions ...

  return (
    <div className="classification-question-creation">
      <h2>Classification</h2>
      <div>
        <label>Compose question</label>
        <textarea
          value={formData.question}
          onChange={(e) => handleInputChange(e, 'question')}
          rows={4}
        />
      </div>
      <div>
        <label>Column Count</label>
        <input
          type="number"
          value={formData.columnCount}
          onChange={(e) => handleInputChange(e, 'columnCount')}
          min={1}
        />
      </div>
      <div>
        <label>Row Count</label>
        <input
          type="number"
          value={formData.rowCount}
          onChange={(e) => handleInputChange(e, 'rowCount')}
          min={1}
        />
      </div>
      {/* ... Autres champs ... */}
    </div>
  );
};

export default ClassificationQuestionCreation;
