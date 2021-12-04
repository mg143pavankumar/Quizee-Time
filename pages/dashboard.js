import { Select, MenuItem, FormControl, Grid } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import CustomTemplate from "../components/CustomTemplate";
import MainPanel from "../components/MainPanel";
import {
  lightPrimaryColor,
  primaryColor,
  primaryColor2,
  secondaryColor,
} from "../data/constants/constants";
import Image from "next/image";
import db from "./../utils/db";
import { Store } from "../utils/Store";
import Button from "./../components/Button";
import { useRouter } from "next/router";
import CQuestion from "../models/CQuestion";
import CppQuestion from "../models/CppQuestion";
import JavaQuestion from "../models/JavaQuestion";
import PythonQuestion from "../models/PythonQuestion";

const Dashboard = (props) => {
  const router = useRouter();
  const questions = props;
  // console.log(cQuestions.cppQuestions);

  const quizData1 = questions.cQuestions;
  const quizData2 = questions.cppQuestions;
  const quizData3 = questions.javaQuestions;
  const quizData4 = questions.pythonQuestions;

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const [course, setCourse] = useState(0);
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  const [questionNumber, setQuestionNumber] = useState(0);
  const [selectedCourseData, setSelectedCourseData] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
    category: "",
    qNo: "",
  });

  const [userScore, setUserScore] = useState(0);
  const [userOption, setUserOption] = useState(null);

  // Total number of questions
  const totalNoOfQuestions = 5;

  useEffect(() => {
    // re-direct to homepage if use doesn't exit
    if (!userInfo) {
      router.replace("/");
    }

    // data should be display on the screen when user choose any course
    try {
      if (course === "c") {
        setSelectedCourseData({
          question: quizData1[questionNumber].question,
          option1: quizData1[questionNumber].option1,
          option2: quizData1[questionNumber].option2,
          option3: quizData1[questionNumber].option3,
          option4: quizData1[questionNumber].option4,
          answer: quizData1[questionNumber].answer,
          category: quizData1[questionNumber].category,
          qNo: "1",
        });
      } else if (course === "cpp") {
        setSelectedCourseData({
          question: quizData2[questionNumber].question,
          option1: quizData2[questionNumber].option1,
          option2: quizData2[questionNumber].option2,
          option3: quizData2[questionNumber].option3,
          option4: quizData2[questionNumber].option4,
          answer: quizData2[questionNumber].answer,
          category: quizData2[questionNumber].category,
          qNo: "1",
        });
      } else if (course === "java") {
        setSelectedCourseData({
          question: quizData3[questionNumber].question,
          option1: quizData3[questionNumber].option1,
          option2: quizData3[questionNumber].option2,
          option3: quizData3[questionNumber].option3,
          option4: quizData3[questionNumber].option4,
          answer: quizData3[questionNumber].answer,
          category: quizData3[questionNumber].category,
          qNo: "1",
        });
      } else if (course === "python") {
        setSelectedCourseData({
          question: quizData4[questionNumber].question,
          option1: quizData4[questionNumber].option1,
          option2: quizData4[questionNumber].option2,
          option3: quizData4[questionNumber].option3,
          option4: quizData4[questionNumber].option4,
          answer: quizData4[questionNumber].answer,
          category: quizData4[questionNumber].category,
          qNo: "1",
        });
      }
    } catch (error) {
      // console.log(error);
    }
  }, [
    userInfo,
    router,
    course,
    questionNumber,
    quizData1,
    quizData2,
    quizData3,
    quizData4,
  ]);

  const handleChange = (e) => {
    setCourse(e.target.value);
    setIsQuizStarted(!isQuizStarted);
  };

  const handleNextButton = () => {
    if (questionNumber <= quizData1.length - 2) {
      setQuestionNumber(questionNumber + 1);
    }

    if (userOption === selectedCourseData.answer) {
      setUserScore(userScore + 1);
      // console.log(userScore);
    }
  };

  const handleSubmitButton = () => {
    setIsQuizStarted(!isQuizStarted);
    if (userOption === selectedCourseData.answer) {
      setUserScore(userScore + 1);
      // console.log(userScore);
    }
  };

  const handleResetButton = () => {
    if (!isQuizStarted) {
      setCourse(0);
      setQuestionNumber(0);
      setIsQuizStarted(false);
      setUserOption(null);
      setUserScore(0);
    }
  };

  // console.log(quizData.length);
  // console.log(course);

  return (
    <CustomTemplate>
      <MainContainer>
        <Div>
          <FormControl>
            <Select
              className="custom_select"
              value={course}
              label="Course"
              onChange={handleChange}
            >
              <MenuItem value={0} disabled>
                {" "}
                <em>Select Course </em>
              </MenuItem>
              <MenuItem value="c">C</MenuItem>
              <MenuItem value="cpp">C++</MenuItem>
              <MenuItem value="java">Java</MenuItem>
              <MenuItem value="python">Python</MenuItem>
            </Select>
          </FormControl>
        </Div>

        <MainPanelContainer>
          <MainPanel>
            {course && selectedCourseData ? (
              isQuizStarted ? (
                <MainContent>
                  <p className="question">
                    Q{questionNumber + 1}: {selectedCourseData.question}
                  </p>
                  <ul>
                    <li>
                      <input
                        type="radio"
                        name="answer"
                        value="option1"
                        onChange={(e) => setUserOption(e.target.value)}
                        id="ans1"
                        className="answer"
                      />
                      <label htmlFor="ans1" id="option1">
                        {" "}
                        {selectedCourseData.option1}
                      </label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        name="answer"
                        value="option2"
                        onChange={(e) => setUserOption(e.target.value)}
                        id="ans2"
                        className="answer"
                      />
                      <label htmlFor="ans1" id="option2">
                        {" "}
                        {selectedCourseData.option2}
                      </label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        name="answer"
                        value="option3"
                        onChange={(e) => setUserOption(e.target.value)}
                        id="ans3"
                        className="answer"
                      />
                      <label htmlFor="ans1" id="option3">
                        {" "}
                        {selectedCourseData.option3}{" "}
                      </label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        name="answer"
                        value="option4"
                        onChange={(e) => setUserOption(e.target.value)}
                        id="ans4"
                        className="answer"
                      />
                      <label htmlFor="ans1" id="option4">
                        {" "}
                        {selectedCourseData.option4}
                      </label>
                    </li>
                  </ul>
                  <div className="btnContainer">
                    {questionNumber === quizData1.length - 1 ? (
                      <Button
                        label="Submit"
                        bgColor={primaryColor}
                        textColor={lightPrimaryColor}
                        padding="12px 40px"
                        onClick={handleSubmitButton}
                      />
                    ) : (
                      <Button
                        label="Next"
                        bgColor={primaryColor}
                        textColor={lightPrimaryColor}
                        padding="12px 40px"
                        onClick={handleNextButton}
                      />
                    )}
                  </div>
                </MainContent>
              ) : (
                <MainContent>
                  <div className="content">
                    <h1 className="wish">
                      🎉 Congratulations! {userInfo.name}🎉
                    </h1>
                    <h2 className="result">
                      You had scored:{" "}
                      <span className="score">
                        {userScore}/{quizData1.length}
                      </span>
                    </h2>
                  </div>
                  <div className="centerBtn">
                    <Button
                      label="Rest Again"
                      bgColor={primaryColor}
                      textColor={lightPrimaryColor}
                      padding="12px 40px"
                      width="50%"
                      onClick={handleResetButton}
                    />
                  </div>
                </MainContent>
              )
            ) : (
              <Center>
                <Image
                  src="/assets/selecting.svg"
                  alt="selecting"
                  width={300}
                  height={300}
                />
                <div>
                  <h3>Please select course to continue</h3>
                </div>
              </Center>
            )}
          </MainPanel>
        </MainPanelContainer>
      </MainContainer>
    </CustomTemplate>
  );
};

export default Dashboard;

const MainContent = styled.div`
  padding: 0px 30px;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;

  @media (min-width: 640px) {
    padding: 0px 100px;
  }

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h1 {
      font-size: 2.5em;
      color: ${primaryColor};
      text-align: center;

      @media (min-width: 468px) {
        font-size: 3em;
      }
    }

    h2 {
      font-size: 1.8em;
      color: ${primaryColor2};

      @media (min-width: 468px) {
        font-size: 2em;
      }
    }
  }
  .centerBtn {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  p.question {
    font-size: 1.5rem;
    color: ${primaryColor};
    font-weight: 500;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      line-height: 2.5;

      input[type="radio"] {
        margin-right: 1rem;
        -moz-appearance: radio !important;

        &::after {
          width: 1.2rem;
          height: 1.2rem;
          border-radius: 1.5rem;
          top: -0.2rem;
          left: -0.1rem;
          position: relative;
          background-color: #d1d3d1;
          content: "";
          display: inline-block;
          visibility: visible;
          border: 0.2rem solid white;
          cursor: pointer;
        }
        &:checked:after {
          width: 1.3rem;
          height: 1.3rem;
          border-radius: 1.8rem;
          top: -0.2rem;
          left: -0.1rem;
          position: relative;
          background-color: ${primaryColor};
          content: "";
          display: inline-block;
          visibility: visible;
          border: 0.2rem solid white;
        }
      }
    }
  }

  .btnContainer {
    padding: 20px 0px 0px 0px;
    display: flex;
    justify-content: end;
    align-items: center;
  }
`;

const MainContainer = styled.div`
  /* background-color: white; */
  height: 100vh;
  width: 90%;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
  z-index: 10;
`;

const Div = styled.div`
  position: absolute;
  top: 15%;

  .custom_select {
    width: 7rem;
    padding: 0.2rem;
    background: ${lightPrimaryColor};
    border-radius: 5px;
    font-weight: bold;
    font-size: 0.8rem;
  }
`;

const MainPanelContainer = styled.div``;
const Center = styled.div`
  padding: 2rem;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (min-width: 640px) {
    flex-direction: row;
  }

  div {
    margin-left: 1rem;

    h3 {
      color: ${primaryColor};
    }
  }
`;

// Fetching the data from server
export async function getServerSideProps() {
  await db.connect();
  const cQuestions = await CQuestion.find({}).lean();
  const cppQuestions = await CppQuestion.find({}).lean();
  const javaQuestions = await JavaQuestion.find({}).lean();
  const pythonQuestions = await PythonQuestion.find({}).lean();

  // const result = await JSON.stringify(cQuestions);
  await db.disconnect();

  return {
    props: {
      cQuestions: cQuestions.map(db.convertDocToObj),
      cppQuestions: cppQuestions.map(db.convertDocToObj),
      javaQuestions: javaQuestions.map(db.convertDocToObj),
      pythonQuestions: pythonQuestions.map(db.convertDocToObj),
    },
  };
}
