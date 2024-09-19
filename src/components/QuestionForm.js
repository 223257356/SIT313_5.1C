import React, { useState } from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
import { collection, addDoc } from 'firebase/firestore';  // Import from Firestore
import { firestore } from '../firebase';  // Import your Firestore instance

const QuestionForm = () => {
    const [title, setTitle] = useState('');
    const [problem, setProblem] = useState('');
    const [tags, setTags] = useState('');
    const [uploading, setUploading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent form submission from reloading the page
        setUploading(true);  // Set uploading to true to show a loading state (optional)

        try {
            // Use `addDoc` to add a new document to the "questions" collection
            await addDoc(collection(firestore, 'questions'), {
                title,
                problem,
                tags,
                createdAt: new Date(),
            });

            alert('Question posted successfully!');
        } catch (error) {
            console.error('Error posting question:', error);
            alert('Failed to post the question.');
        }

        setUploading(false);  // Set uploading to false once the operation is complete
    };

    return (
        <>
            <Form.Field>
                <label>Title</label>
                <Input
                    placeholder='Start your question with how, what, why, etc.'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <label>Describe your problem</label>
                <Input
                    placeholder='Describe your problem'
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <label>Tags</label>
                <Input
                    placeholder='Please add up to 3 tags to describe what your question is about e.g. Java'
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                />
            </Form.Field>
            <Button type='submit' onClick={handleSubmit} loading={uploading}>
                Post
            </Button>
        </>
    );
};

export default QuestionForm;
