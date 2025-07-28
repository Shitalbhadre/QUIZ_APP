import React, { useState, useRef } from 'react';
import './Quiz.css';
import { data } from '../../assets/data'; 

const Quiz = () => {
    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState(data[index]);
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false); 

    const Option1 = useRef(null);
    const Option2 = useRef(null);
    const Option3 = useRef(null);
    const Option4 = useRef(null);

    const option_array = [Option1, Option2, Option3, Option4];

    const checkAns = (e, ans) => {
        if (!lock) {
            if (question.ans === ans) {
                e.target.classList.add('correct');
                setScore((prev) => prev + 1);
            } else {
                e.target.classList.add('wrong');
                option_array[question.ans - 1].current.classList.add('correct');
            }
            setLock(true);
        }
    };

    const next = () => {
        if (lock) {
            const newIndex = index + 1;
            if (newIndex < data.length) {
                setIndex(newIndex);
                setQuestion(data[newIndex]);
                setLock(false);
                option_array.forEach((option) => {
                    option.current.classList.remove('wrong');
                    option.current.classList.remove('correct');
                });
            } else {
               
                setShowResult(true);
            }
        }
    };

    const resetQuiz = () => {
        setIndex(0);
        setQuestion(data[0]);
        setScore(0);
        setLock(false);
        setShowResult(false);
        option_array.forEach((option) => {
            option.current.classList.remove('wrong');
            option.current.classList.remove('correct');
        });
    };

    return (
        <div className="container">
            <h1>Quiz App</h1>
            <hr />

            {!showResult ? (
                <>
                    <h2>{index + 1}. {question.question}</h2>
                    <ul>
                        <li ref={Option1} onClick={(e) => checkAns(e, 1)}>{question.option1}</li>
                        <li ref={Option2} onClick={(e) => checkAns(e, 2)}>{question.option2}</li>
                        <li ref={Option3} onClick={(e) => checkAns(e, 3)}>{question.option3}</li>
                        <li ref={Option4} onClick={(e) => checkAns(e, 4)}>{question.option4}</li>
                    </ul>
                    <button onClick={next}>Next</button>
                    <div className="index">{index + 1} of {data.length} questions</div>
                </>
            ) : (
                <div className="result">
                    <h2>🎉 Quiz Finished!</h2>
                    <p>You scored <strong>{score}</strong> out of <strong>{data.length}</strong> 🎯</p>
                    <button onClick={resetQuiz}>Restart Quiz</button>
                </div>
            )}
        </div>
    );
};

export default Quiz;
