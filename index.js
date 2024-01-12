#!/usr/bin/env node

process.setMaxListeners(35);

import * as p from '@clack/prompts';
import { setTimeout } from 'node:timers/promises';
import chalk from 'chalk';
import gradient from'gradient-string';

let totalCorrect = 0;

async function askQuestion (question, answers, correctAnswerIndex) {
    const options = []
    answers.forEach((answer) => {
        options.push({value: answer, label: answer})
    })

    const answer = await p.select({
        message: question,
        initialValue: '1',
        options: options,
    })

    const s = p.spinner();
    s.start();
    await setTimeout(1000);
    s.stop();

    if (answer == answers[correctAnswerIndex]) {
        totalCorrect++
    }
}

class Question {
    constructor(question, answersArray, correctAnswerIndex) {
        this.question = question;
        this.answersArray = answersArray;
        this.correctAnswerIndex = correctAnswerIndex;
    }
}


async function main() {
    p.intro(`${gradient.cristal('Ready to twist your brain into a pretzel? Buckle up, riddles are coming!')}`);

    const question1 = new Question(
        '1) I have keys but open no locks. I have space but no room. You can enter, but you can\'t go inside. What am I?',
        [
            "Keyboard",
            "Door",
            "Wallet",
            "Car"
        ],
        2,
        "s",
        "a",

    );
    
    const question2 = new Question(
        '2) The more you take, the more you leave behind. What am I?',
        [
            "Footsteps",
            "Breath",
            "Thoughts",
            "Memories"
        ],
        3,
    );
    
    const question3 = new Question(
        '3) I can be cracked, made, told, and played. What am I?',
        [
            "Joke",
            "Egg",
            "Record",
            "Game"
        ],
        0,
      
    );
    
    const question4 = new Question(
        '4) What has keys but can\'t open locks?',
        [
            "Piano",
            "Computer",
            "Typewriter",
            "Chest"
        ],
        2,
     
    );
    
    const question5 = new Question(
        `5) I'm tall when I'm young and short when I'm old. What am I?`,
        [
            "Tree",
            "Candle",
            "Book",
            "Clock"
        ],
        2,
       
    );
    
    const question6 = new Question(
        '6) The more you have of it, the less you see. What is it?',
        [
            "Darkness",
            "Wisdom",
            "Money",
            "Love"
        ],
        0,
      
    );
    
    const question7 = new Question(
        '7) What has a heart that doesn\'t beat?',
        [
            "Artichoke",
            "Robot",
            "Clock",
            "Cabbage"
        ],
        3,
       
    );
    
    const question8 = new Question(
        '8) I have keys but no locks. I have space but no room. You can enter, but you can\'t go inside. What am I?',
        [
            "Keyboard",
            "Car",
            "Wallet",
            "Door"
        ],
        0,
        
    );
    
    const question9 = new Question(
        '9) What comes once in a minute, twice in a moment, but never in a thousand years?',
        [
            "Opportunity",
            "Chance",
            "Regret",
            "Success"
        ],
        1,
      
    );
    
    const question10 = new Question(
        '10) I can be cracked, made, told, and played. What am I?',
        [
            "Joke",
            "Egg",
            "Record",
            "Game"
        ],
        0,
      
    );
    

    const allQuestions = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10]

    const readyToPlay = await p.select({
        message: 'Ready to play',
        initialValue: 'Yes',
        options: [
            {value: "Yes", label: "Yes"},
			{value: "No", label: "No"}
        ],
    })

    if (readyToPlay == 'Yes') {
        for ( const question of allQuestions) {
            await askQuestion(question.question, question.answersArray, question.correctAnswerIndex )
        }

        p.outro(`${gradient.vice(`You got ${totalCorrect} questions correct!`)}`);

        const secretMessages = [
            "You did it, you nerd!",
            "Congratulations, you're a genius!",
            "Amazing! You cracked the code!",
            "Impressive! You're a riddle master!"
          ];

          function getRandomMessage() {
            const randomIndex = Math.floor(Math.random() * secretMessages.length);
            return secretMessages[randomIndex];
          }
          

        if (totalCorrect == 10) {
            const s = p.spinner();
            s.start("Generating Secreat Message");
            await setTimeout(5000);
            s.stop();

            const randomMessage = getRandomMessage();
            p.outro(`${gradient.rainbow(randomMessage)}`);
        }else {
			const s = p.spinner();
			s.start();
			await setTimeout(3000);
			s.stop();
			p.outro(`${chalk.bgRed(chalk.black.bold(`You need 10/10 correct to unlock the secret message. Try again.`))}`);
		}
    } else {
        p.outro(`${chalk.bgMagenta(chalk.black.underline('bye Bye!!'))}`);
    }
}

main().catch(console.error);