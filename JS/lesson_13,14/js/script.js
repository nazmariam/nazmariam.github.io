'use strict';

$(function () {
  
// forming array of questions and answers

  var testContent = [
    {
      questionNumb: "1",
      question: "Who is John Galt?",
      answer: [
      "engineer",
      "writer",
      "nobody knows"
      ],
      correct: 1
    },
    {
      questionNumb: "2",
      question: "What the 'Red Hat' is?",
      answer: [
      "linux distribution",
      "FBI agent",
      "fashion victim"
      ],
      correct: 1
    },
    {
      questionNumb: "3",
      question: "Why she had to go?",
      answer: [
      "she was very busy",
      "oh... women",
      "I don't know, she wouldn't say"
      ],
      correct: 3

    }
  ];

// saving test's content to Local Storage

  localStorage.setItem('test', JSON.stringify(testContent));

// getting content from the Local Storage

  var questions = localStorage.getItem('test'); 
  questions = JSON.parse(questions);
  
// generating HTML with the John's Resig Templating

  var htmlQuestion = $('#testing').html();
  var content = tmpl(htmlQuestion, {
    test: questions
  });
  $('.questions').append(content);

// checking right answers + modal window drawing

function checkAnswer(e) {
  e.preventDefault();
  var choice;
  var input =[];
  var result = [];   
  function modalWindow () {
    var $modal = $('<div class="modalWindow"><h2 class="title">Test results</h2></div>');
    var $overlay = $('<div class="modalWindow-overlay"></div>');
    var $testResults;
    $('body').append($modal);
    $('body').append($overlay);    
    $overlay.one('click', hideModal);
    
    for (var i=0;  i < questions.length; i++) {
     $('.box'+(i+1)+' .checkbox label input[type=checkbox]').each(function(){
                      if($(this).prop('checked')){
                      choice = $(this).val();
                      // choice = choice*1;
                      }
                  });
    
      for (var j=0; j < questions[i].answer.length; j++) {
        var right = questions[i].correct-1;
        if (choice == right) {
          result[j]=true;
        } else {
          result[j]=false;
          };
      };
      $testResults = $('<h4>Question '+(i+1)+': answer is <span class="result">' +(result[i]? 'right':'wrong')+'</span></h4>');
      $('.modalWindow').append($testResults);
    }
      var $butClose = $('<button class="close">Close</button>');      
      $('.modalWindow').append($butClose);
      $butClose.one('click', hideModal);
      
      function hideModal() {
        $modal.remove();
        $overlay.remove();
        $( 'input:checkbox' ).prop( 'checked', false ).prop( 'disabled', false );

      };

  };
  modalWindow();
};


$('.check').on('click', checkAnswer);


});