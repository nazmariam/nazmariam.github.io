'use strict';

$(function () {
  
// forming array of questions and answers

  var testContent = [
    {
      questionNumb: "1",
      question: "Who is John Galt?",
      answer  : [
      "engineer",
      "writer",
      "nobody knows"
      ],
      correct: {
        1:true
      }
    },
    {
      questionNumb: "2",
      question: "What the 'Red Hat' is?",
      answer: [
      "fairy tale",
      "headwear",
      "linux distribution"
      ],
      correct: {
        1:true,
        2:true,
        3:true
      }
    },
    {
      questionNumb: "3",
      question: "Why she had to go?",
      answer: [
      "she was very busy",
      "oh... women",
      "I don't know, she wouldn't say"
      ],
      correct: {
        3:true
      },

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
  // console.log(content);
  console.log(questions[0].answer.length);

// checking right answers

function checkAnswer(e) {
  e.preventDefault();

  var user = [];   
  for (var i=0;  i < questions.length; i++) {

    var chosenAns = [];
    var input = [];
    // $('.box' + (i+1) +' input');
   // console.log(input[i]);
    for (var j=0; j < questions[i].answer.length; j++) {
      var right = questions[i].correct[j+1];
      var choice = input.checked;
      if (choice == right) {
        chosenAns[j]=true;
      } else {
        chosenAns[j]=false;
        };
    };
    user.push(chosenAns);
  };

      function modalWindow () {
        var $modal = $('<div class="modalWindow"><h2 class="title">Test results</h2></div>');
        var $overlay = $('<div class="modalWindow-overlay"></div>');
        
        $('body').append($modal);
        $('body').append($overlay);
        
        var htmlQuestion = $('#testing').html();
      
      var content = tmpl(htmlQuestion, {
        test: questions
      });
      
            
      $('.modalWindow').append(content);
      var $buttonOk = $('<button>OK</button>');      
      $('.modalWindow').append($buttonOk);

        for (var i = 0; i < questions.length; i++) {
          var inputs = $('.box' + (i+1) +' input:checkbox');
          var inputsShowResult =  $('.modalWindow .box' + (i+1) +' input:checkbox');
          
          for (var k = 0; k < questions[i].answer.length; k++) {
            
            var checked = inputs[k].checked;
          
          if ((checked == true)) {
            if ((user[i][k]) == true) {
              $(inputsShowResult[k]).attr({
                "disabled":true,
                "checked" : true  
                }).parent().append("<span> Правильный ответ!</span>").find("span").css({"color" : "green"});
          } else {
            $(inputsShowResult[k]).attr({
                "disabled":true,
                "checked" : true  
                }).parent().append("<span> Неправильный ответ!</span>").find("span").css({"color" : "red"});  

          }; 

          } else {
            $(inputsShowResult[k]).attr({
                "disabled":true,
                "checked" : false 
          });
          };

        };
        };

        $buttonOk.one('click', hideModal);

        function hideModal() {
      $modal.removeClass('bounceInDown').addClass('hinge');
      setTimeout(function(){$modal.remove();}, 10);
      $overlay.remove();
    };

      };

      modalWindow();

};


$('.check').on('click', checkAnswer);


});