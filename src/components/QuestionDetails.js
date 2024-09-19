import React, { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { Card } from 'semantic-ui-react';

const QuestionDetails = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);

  const firestore = getFirestore(); // Initialize Firestore instance

  useEffect(() => {
    const fetchQuestion = async () => {
      const questionRef = doc(firestore, 'questions', id); // Get document reference
      const docSnapshot = await getDoc(questionRef); // Fetch document snapshot
      if (docSnapshot.exists()) {
        setQuestion(docSnapshot.data()); // Set question data if exists
      } else {
        console.log('No such question found');
      }
    };

    fetchQuestion();
  }, [firestore, id]);

  if (!question) return <div>Loading...</div>;

  return (
    <Card>
      <Card.Content>
        <Card.Header>{question.title}</Card.Header>
        <Card.Meta>{new Date(question.createdAt.seconds * 1000).toLocaleDateString()}</Card.Meta>
        <Card.Description>{question.problem}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <strong>Tags:</strong> {Array.isArray(question.tags) ? question.tags.join(', ') : question.tags}
      </Card.Content>
    </Card>
  );
};

export default QuestionDetails;
