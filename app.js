var app = angular.module("HangmanApp", []);

app.controller("GameController", ['$scope', '$timeout', function($scope, $timeout) {
    var words = ["Altassian", "Remember", "Mountain", "Pokemon", "things", "blanket", "world", "angular", "china", "homerun", "bed", "couch", "unbelievable", "heroic",
    "outstanding", "table"];
    $scope.incorrectLettersChosen = [];
    $scope.correctLettersChosen = [];
    var selectedWord = '';
    $scope.guesses = 6;
    $scope.displayWord = '';
    $scope.input = {
        letter: ''
    };
    
    function selectRandomWord() {
        var index = Math.floor(Math.random() * words.length);
        return words[index];
    }
    
    function newGame() {
        $scope.incorrectLettersChosen = [];
        $scope.correctLettersChosen = [];
        $scope.guesses = 6;
        $scope.displayWord = "";
        selectedWord = selectRandomWord();
        var tempDisplayWord = '';
        for (var i = 0; i < selectedWord.length; i++) {
            tempDisplayWord += '*';
        }
        $scope.displayWord = tempDisplayWord;
        // Random word selection.
    }
    
    function loseGame() {
        alert("im here");
        
        $timeout(function() {
            newGame();
        }, 500);
    }
    
    function winGame() {
        alert('asdfasf');
        
        $timeout(function() {
            newGame();
        }, 500);
    }
    
    $scope.letterChosen = function() {
        // Check if $scope.input.letter is a single letter and an alphabet and not an already chosen letter.
        // Check if its correct.
        for (var i = 0; i < $scope.correctLettersChosen.length; i++) {
            if ($scope.correctLettersChosen[i].toUpperCase() == $scope.input.letter.toUpperCase()) {
                $scope.input.letter = "";
                return;
            }
        }
        for (var i = 0; i < $scope.incorrectLettersChosen.length; i++) {
            if ($scope.incorrectLettersChosen[i].toUpperCase() == $scope.input.letter.toUpperCase()) {
                $scope.input.letter = "";
                return;
            }
        }
        var correct = false;
        for (var i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i].toLowerCase() == $scope.input.letter.toLowerCase()) {
                $scope.displayWord = $scope.displayWord.slice(0, i) + $scope.input.letter.toUpperCase() + $scope.displayWord.slice(i + 1);
                correct = true;
            }
        }
        if (correct) {
            $scope.correctLettersChosen.push($scope.input.letter.toUpperCase());
        }
        else {
            $scope.guesses--;
            $scope.incorrectLettersChosen.push($scope.input.letter.toUpperCase());
        }
        $scope.input.letter = "";
        if ($scope.guesses == 0) {
            // You Lose
            loseGame();
        }
        if ($scope.displayWord.indexOf("*") == -1) {
            // Show score
            winGame();
        }
    }
    newGame();
}]);