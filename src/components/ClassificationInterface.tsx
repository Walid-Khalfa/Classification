import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../App.css';

interface Tab {
  id: string;
  label: string;
  content: string;
}

interface TableRow {
  title: string;
}

interface TableData {
  rows: TableRow[];
  columns: string[];
}

const tabsData: Tab[] = [
  {
    id: 'correct-answer',
    label: 'Correct Answer',
    content: 'This is the Correct Answer tab content.',
  },
  {
    id: 'alternate1',
    label: 'Alternate 1',
    content: 'This is the Alternative 1 tab content.',
  },
  {
    id: 'alternate2',
    label: 'Alternate 2',
    content: 'This is the Alternative 2 tab content.',
  },
];

const Classification: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(tabsData[0].id);
  const [formData, setFormData] = useState({
    columnCount: '2',
    rowCount: '2',
    question: '',
  });
  const [possibleResponses, setPossibleResponses] = useState<string[]>(['', '', '']);
  const [tableData, setTableData] = useState<TableData>({ rows: [], columns: [] });

  useEffect(() => {
    openTab(activeTab);
  }, [activeTab]);

  const openTab = (tabName: string) => {
    setActiveTab(tabName);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if ((name === 'columnCount' || name === 'rowCount') && !/^\d+$/.test(value)) {
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleAddColumn = () => {
    setTableData((prevState) => {
      return {
        ...prevState,
        columns: [...prevState.columns, `Column ${prevState.columns.length + 1}`],
      };
    });
  };

  const handleAddRow = () => {
    setTableData((prevState) => {
      return {
        ...prevState,
        rows: [...prevState.rows, { title: `Row ${prevState.rows.length + 1}` }],
      };
    });
  };

  const handlePossibleResponsesChange = (index: number, value: string) => {
    setPossibleResponses((prevState) => {
      const newResponses = [...prevState];
      newResponses[index] = value;
      return newResponses;
    });
  };

  const DraggablePossibleResponse: React.FC<{ index: number; value: string }> = ({ index, value }) => {
    const [, drag] = useDrag({
      type: 'POSSIBLE_RESPONSE',
      item: { index },
    });

    return (
      <li ref={drag}>
        <input
          type="text"
          placeholder={`Possible Response ${index + 1}`}
          value={value}
          onChange={(e) => handlePossibleResponsesChange(index, e.target.value)}
        />
      </li>
    );
  };

  const DraggableTab: React.FC<{ tab: Tab }> = ({ tab }) => {
    const [, drag] = useDrag({
      type: 'TAB',
      item: { id: tab.id },
    });

    return (
      <button
        key={tab.id}
        className={`tablinks ${activeTab === tab.id ? 'active' : ''}`}
        onClick={() => openTab(tab.id)}
        ref={drag}
      >
        {tab.label}
      </button>
    );
  };

  const DraggableTableRow: React.FC<{ index: number; title: string }> = ({ index, title }) => {
    const [, drag] = useDrag({
      type: 'TABLE_ROW',
      item: { index },
    });

    return <div ref={drag}>{title}</div>;
  };

  const DraggableTableCell: React.FC<{ rowIndex: number; colIndex: number }> = ({ rowIndex, colIndex }) => {
    const [, drop] = useDrop({ accept: 'POSSIBLE_RESPONSE' });

    return <div ref={drop}>Cell {rowIndex + 1}-{colIndex + 1}</div>;
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    // Update the state to reflect the new order after the drag-and-drop operation.
    // For example, you may want to update the order of possibleResponses array.
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="page">
        <section className="compose-question-section">
          <div className="section-heading">Compose Question</div>
          <div className="grid-container">
            <div className="grid-item">Column Count</div>
            <div className="grid-item">Row Count</div>
            <div className="grid-item">
              <input
                type="text"
                id="column-count"
                name="columnCount"
                value={formData.columnCount}
                onChange={(e) => handleInputChange(e)}
                style={{ width: '150px' }}
              />
            </div>
            <div className="grid-item">
              <input
                type="text"
                id="row-count"
                name="rowCount"
                value={formData.rowCount}
                onChange={(e) => handleInputChange(e)}
                style={{ width: '150px' }}
              />
            </div>
            <div className="grid-item">
              <button className="red-button" onClick={handleAddColumn}>
                + Add Column
              </button>
            </div>
            <div className="grid-item">
              <button className="red-button" onClick={handleAddRow}>
                + Add Row
              </button>
            </div>
          </div>
          <textarea
            name="question"
            value={formData.question}
            onChange={(e) => handleInputChange(e)}
            style={{ height: '250px', width: '100%', padding: '10px' }}
            placeholder="Compose your question..."
          />
        </section>

        <section className="possible-responses-section">
          <div className="section-heading">Possible Responses</div>
          <ul>
            {possibleResponses.map((response, index) => (
              <DraggablePossibleResponse key={index} index={index} value={response} />
            ))}
          </ul>
          <button className="red-button">
            <FontAwesomeIcon icon={faPlus} />
            Add Response
          </button>
        </section>

        <section className="set-correct-answers-section">
          <div className="section-heading">Set Correct Answer(s)</div>
          <div className="tab">
            {tabsData.map((tab) => (
              <DraggableTab key={tab.id} tab={tab} />
            ))}
          </div>
          {tabsData.map((tab) => (
            <div key={tab.id} id={tab.id}
              className={`tabcontent ${activeTab === tab.id ? 'active' : ''}`}>
              {tab.content}
            </div>
          ))}
        </section>

        <section className="classify-responses-section">
          <div className="section-heading">Classify Responses</div>
          <div className="table">
            <div className="table-header">
              {tableData.columns.map((column, index) => (
                <div key={index}>{column}</div>
              ))}
            </div>
            <div className="table-body">
              {tableData.rows.map((row, rowIndex) => (
                <div key={rowIndex} className="table-row">
                  <DraggableTableRow index={rowIndex} title={row.title} />
                  {tableData.columns.map((column, colIndex) => (
                    <DraggableTableCell
                      key={colIndex}
                      rowIndex={rowIndex}
                      colIndex={colIndex}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </DndProvider>
  );
};

export default Classification;
