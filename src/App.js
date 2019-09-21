import React, { Component } from 'react';
import quizQuestions from './questions.js';
import Quiz from './components/Quiz';
import Result from './components/Result';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import logo from './logo.jpeg';

class App extends Component {
 
    // quizQuestions is basically an array on objects 
    constructor(props) 
    {
      super(props);
      
      this.state = {
      
        counter: 0,
        questionId: 1,
        question: '',
        answerOptions: [],
        answer: '',
        answersCount: {},
        result: '',
        answersValue: [],
        Microsoft: 0,
        Nintendo:0 ,
        Sony : 0
    
      };
      // We will later on bind the onAnswerSelectedHere
      this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    }
      
    setNextQuestion() {
      const counter = this.state.counter + 1;
      const questionId = this.state.questionId + 1;
  
      this.setState({
        counter: counter,
        questionId: questionId,
        question: quizQuestions[counter].question,
        answerOptions: quizQuestions[counter].answers,
        answer: ''
      });
    }
    
      componentDidMount() 
      {
        const shuffledAnswerOptions = quizQuestions.map(question =>
         question.answers
        );
        this.setState({
          question: quizQuestions[0].question,
          answerOptions: shuffledAnswerOptions[0]
        });
      }

      setUserAnswer (answer)
      {
        var joined = this.state.answersValue.concat(answer);
        this.setState((state, props) => ({ 
          answersCount: this.state.answersCount + 1,
          answersValue: joined
        }));
      }
  
 renderQuiz ()
 {
     return  (
    <Quiz
      answer= {this.state.answer}
      answerOptions={this.state.answerOptions}
      questionId = {this.state.questionID}
      question={this.state.question}
      questionTotal={quizQuestions.length}
      onAnswerSelected={this.handleAnswerSelected}
  />
   );
 }

 winner(a,b,c)
 {
     
      if (a>b)
    { 
      if (a == c)
          return "Not decided"
      if (a > c)
          return " Micosoft is the Winner! "
      else 
          return " Sony is the Winner! "
      return 

    }
    else 
    {
      if (a==b)
          return "Not decided"
      if (b > c)
          return "Nintendo is the Winner !"
      else 
          return  "Sony is the winner"
           
    }      
 
 }
getResults() {
  
  var MicrosoftValue = this.state.Microsoft;
  var NintendoValue = this.state.Nintendo;
  var SonyValue = this.state.Sony;
  
  for (var i =0;i< this.state.answersValue.length; i++ )
  {
    var value = this.state.answersValue[i];
    console.log("Value Entered" +value);
    switch(value)
    {
      case 'Microsoft':
        MicrosoftValue++;
        break;
      case 'Nintendo':
        NintendoValue++;
        break;
      case 'Sony':
        SonyValue++;
        break;
    }
  }

  console.log("Value of variables"+ MicrosoftValue+NintendoValue+SonyValue);
   var result = this.winner (MicrosoftValue, NintendoValue, SonyValue);
   console.log("Value of result"+ result);

  return result;
}

setResults(result) {
  if (result.length >= 1) {
    this.setState({ result: result });
  } else {
    this.setState({ result: 'Undetermined' });
  }
}

renderResult() {
  return <Result quizResult={this.state.result} />;
}

 handleAnswerSelected(event) 
 {   
  this.setUserAnswer(event.currentTarget.value);

  if (this.state.questionId < quizQuestions.length) {
    setTimeout(() => this.setNextQuestion(), 300);
  } else {
    console.log("Inside the setting results");
    console.log("Value of getResults"+this.getResults());
    setTimeout(() => this.setResults(this.getResults()), 300);
  }
}
 
 render() {
  return (
    <div className="App" class="App1">
    <div className="App-header">
    <img src={logo} alt="bg" class="bg"></img>
      <h4>React Quiz</h4>
    </div>
    {this.state.result ? this.renderResult() : this.renderQuiz()}
  </div>
  )
}
 
}


export default App;