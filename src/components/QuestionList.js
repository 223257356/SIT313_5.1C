import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Card, Button, Input, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState('');
  const [sortDate, setSortDate] = useState(false);
  const [tagsOptions, setTagsOptions] = useState([]);

  const firestore = getFirestore();

  useEffect(() => {
    const fetchQuestions = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'questions'));
      const questionsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setQuestions(questionsData);

      // Extract unique tags from questions for the filter dropdown
      const uniqueTags = [...new Set(questionsData.flatMap(q => q.tags))];
      setTagsOptions(uniqueTags.map(tag => ({ key: tag, text: tag, value: tag })));
    };

    fetchQuestions();
  }, [firestore]);

  // Handle deleting a question
  const handleDelete = async (id) => {
    await deleteDoc(doc(firestore, 'questions', id));
    setQuestions(questions.filter(question => question.id !== id));
  };

  // Filter and sort questions
  const filteredQuestions = questions
    .filter((q) =>
      q.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterTag ? q.tags.includes(filterTag) : true)
    )
    .sort((a, b) => sortDate ? new Date(b.createdAt.seconds * 1000) - new Date(a.createdAt.seconds * 1000) : 0);

  return (
    <div>
      <h2>All Questions</h2>

      {/* Search and Filter Inputs */}
      <Input
        icon='search'
        placeholder='Search by title...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginRight: '10px' }}
      />

      <Dropdown
        placeholder='Filter by tag...'
        selection
        options={tagsOptions}
        value={filterTag}
        onChange={(e, { value }) => setFilterTag(value)}
        style={{ marginRight: '10px' }}
      />

      <Button onClick={() => setSortDate(!sortDate)}>
        {sortDate ? 'Sort by Oldest' : 'Sort by Newest'}
      </Button>

      {/* Draggable Question List */}
      <div className="question-list">
        {filteredQuestions.map((question) => (
          <Draggable key={question.id}>
            <Card>
              <Card.Content>
                <Card.Header>{question.title}</Card.Header>
                <Card.Meta>{new Date(question.createdAt.seconds * 1000).toLocaleDateString()}</Card.Meta>
                <Card.Description>{question.problem}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <strong>Tags:</strong> {Array.isArray(question.tags) ? question.tags.join(', ') : question.tags}
              </Card.Content>
              <Card.Content extra>
                <Button basic color="blue" as={Link} to={`/questions/${question.id}`}>
                  View Details
                </Button>
                <Button basic color="red" onClick={() => handleDelete(question.id)}>
                  Delete
                </Button>
              </Card.Content>
            </Card>
          </Draggable>
        ))}
      </div>
    </div>
  );
};

export default QuestionList;
